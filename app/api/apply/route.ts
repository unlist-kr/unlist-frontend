import { NextResponse } from "next/server";
import { Resend } from "resend";

/*
  POST /api/apply — receives the application modal (multipart/form-data)
  and forwards it by email with the business-registration file attached.

  Env:
    RESEND_API_KEY   — if missing, the submission is logged and accepted (dev)
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

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

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
    console.log("[apply] RESEND_API_KEY not set — logging submission only\n" + lines.join("\n"));
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
