import { NextResponse } from "next/server";
import { Resend } from "resend";

/*
  POST /api/apply — receives the application modal (multipart/form-data)
  and forwards it by email with the business-registration file attached.
  Abuse controls: same-origin check, per-IP rate limit (5 / 10 min, per instance), honeypot.

  Env:
    RESEND_API_KEY   — required in production (503 without it); dev logs a redacted line and accepts
    APPLY_TO_EMAIL   — recipient (default contact@unlist.kr)
    APPLY_FROM_EMAIL — verified sender (default onboarding@resend.dev)
*/

export const runtime = "nodejs";

const MODES = new Set(["diagnosis", "cleanup", "waitlist"]);
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/heic", "image/webp"]);

const MODE_LABEL: Record<string, string> = {
  diagnosis: "무료 노출 진단",
  cleanup: "1회 클린업 신청",
  waitlist: "지속 모니터링 출시 알림",
};

/* --- abuse controls -------------------------------------------------- */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>(); // per-instance; fine for a single-region MVP

function clientIp(request: Request) {
  const xff = request.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "unknown").trim();
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory guard
  return recent.length > RATE_MAX;
}

function sameOrigin(request: Request) {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "none") return false;
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return false;
    } catch {
      return false;
    }
  }
  return true;
}

const mask = (v: string, keep = 2) =>
  v.length <= keep ? "*".repeat(v.length) : v.slice(0, keep) + "*".repeat(Math.max(3, v.length - keep));
const maskEmail = (v: string) => {
  const [u, d] = v.split("@");
  return `${mask(u ?? "", 1)}@${d ?? ""}`;
};

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "허용되지 않은 요청입니다." }, { status: 403 });
  }
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요." }, { status: 429 });
  }

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  // Honeypot: real users never fill this field.
  if (str(fd, "website")) return NextResponse.json({ ok: true, delivered: false });

  const mode = str(fd, "mode");
  const name = str(fd, "name");
  const phone = str(fd, "phone").replace(/[^\d]/g, "");
  const email = str(fd, "email");
  const company = str(fd, "company");
  const memo = str(fd, "memo").slice(0, 1000);
  const consentPrivacy = str(fd, "consentPrivacy") === "on";
  const consentPoa = str(fd, "consentPoa") === "on";
  const file = fd.get("bizfile");

  if (!MODES.has(mode)) return NextResponse.json({ ok: false, error: "신청 유형이 올바르지 않습니다." }, { status: 400 });
  if (name.length < 2) return NextResponse.json({ ok: false, error: "이름을 입력해 주세요." }, { status: 400 });
  if (!/^01[016789]\d{7,8}$/.test(phone)) return NextResponse.json({ ok: false, error: "휴대폰 번호를 확인해 주세요." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "이메일을 확인해 주세요." }, { status: 400 });
  if (!consentPrivacy) return NextResponse.json({ ok: false, error: "개인정보 수집·이용 동의가 필요합니다." }, { status: 400 });
  if (mode !== "waitlist" && company.length < 1) return NextResponse.json({ ok: false, error: "상호명을 입력해 주세요." }, { status: 400 });

  let attachment: { filename: string; content: string } | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) return NextResponse.json({ ok: false, error: "파일은 10MB 이하로 올려 주세요." }, { status: 400 });
    if (file.type && !ALLOWED_TYPES.has(file.type)) return NextResponse.json({ ok: false, error: "PDF 또는 이미지 파일만 가능합니다." }, { status: 400 });
    const buf = Buffer.from(await file.arrayBuffer());
    attachment = { filename: file.name || "business-registration", content: buf.toString("base64") };
  }
  if (mode === "cleanup") {
    if (!attachment) return NextResponse.json({ ok: false, error: "1회 클린업은 사업자등록증이 필요합니다." }, { status: 400 });
    if (!consentPoa) return NextResponse.json({ ok: false, error: "삭제 요청 대행을 위한 위임 동의가 필요합니다." }, { status: 400 });
  }

  const receivedAt = new Date().toISOString();
  const lines = [
    `[언리스트] ${MODE_LABEL[mode]}`,
    ``,
    `접수 시각: ${receivedAt}`,
    `이름: ${name}`,
    `연락처: ${phone}`,
    `이메일: ${email}`,
    `상호: ${company || "-"}`,
    `사업자등록증: ${attachment ? attachment.filename : "미제출"}`,
    `개인정보 동의: ${consentPrivacy ? "예" : "아니오"}`,
    `위임장 제공 동의: ${consentPoa ? "예" : "아니오"}`,
    `메모: ${memo || "-"}`,
  ];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[apply] RESEND_API_KEY missing in production — refusing submission");
      return NextResponse.json(
        { ok: false, error: "접수 시스템 점검 중입니다. contact@unlist.kr 로 직접 보내주세요." },
        { status: 503 },
      );
    }
    console.log(
      `[apply] dev fallback (no RESEND_API_KEY) — ${MODE_LABEL[mode]} · ${mask(name, 1)} · ${mask(phone, 3)} · ${maskEmail(email)} · ${company || "-"} · file=${attachment ? "yes" : "no"} · poa=${consentPoa}`,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.APPLY_FROM_EMAIL ?? "unlist <onboarding@resend.dev>",
      to: process.env.APPLY_TO_EMAIL ?? "contact@unlist.kr",
      replyTo: email,
      subject: `[언리스트] ${MODE_LABEL[mode]} · ${company || name}`,
      text: lines.join("\n"),
      attachments: attachment ? [attachment] : undefined,
    });
    if (error) {
      console.error("[apply] resend error", error);
      return NextResponse.json({ ok: false, error: "접수 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[apply] unexpected", e);
    return NextResponse.json({ ok: false, error: "접수 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
