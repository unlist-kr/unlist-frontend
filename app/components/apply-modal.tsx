"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

/*
  Application modal. One dialog, three entry modes:
    diagnosis — free exposure diagnosis (doc + power of attorney optional)
    cleanup   — paid one-time cleanup (doc + PoA required)
    waitlist  — launch notice for continuous monitoring (contact only)
  Steps: 1 info → 2 documents & consent → 3 done.
*/

export type ApplyMode = "diagnosis" | "cleanup" | "waitlist";

type Ctx = { open: (mode: ApplyMode) => void };
const ApplyContext = createContext<Ctx | null>(null);

export function useApply() {
  const ctx = useContext(ApplyContext);
  if (!ctx) throw new Error("useApply must be used inside <ApplyProvider>");
  return ctx;
}

const COPY: Record<
  ApplyMode,
  { title: string; lead: string; submit: string; done: string; doneBody: string }
> = {
  diagnosis: {
    title: "무료 노출 진단 신청",
    lead: "상호와 연락처만 주시면 어디에 무엇이 노출되어 있는지 리포트로 드립니다. 비용은 없습니다.",
    submit: "무료 진단 신청하기",
    done: "접수됐습니다",
    doneBody:
      "영업일 기준 2~3일 안에 진단 리포트를 이메일로 보내드립니다. 리포트를 보고 1회 클린업 진행 여부를 결정하시면 됩니다.",
  },
  cleanup: {
    title: "1회 클린업 신청",
    lead: "전수 스캔 → 비공개 요청 → 반영 확인까지 9,900원. 삭제 요청 대행에는 대표자 본인 명의 사업자등록증과 위임 동의가 필요합니다.",
    submit: "클린업 신청하기",
    done: "신청이 접수됐습니다",
    doneBody:
      "접수 확인 메일로 입금 계좌를 안내드립니다. 입금이 확인되면 전수 스캔을 시작하고, 진행 상황은 이메일로 알려드립니다.",
  },
  waitlist: {
    title: "지속 모니터링 출시 알림",
    lead: "월 4,900원(예정) 지속 모니터링이 출시되면 가장 먼저, 얼리버드 가격으로 안내드립니다.",
    submit: "출시 알림 받기",
    done: "등록됐습니다",
    doneBody: "출시 소식과 얼리버드 가격을 이메일로 먼저 보내드립니다.",
  },
};

export function ApplyProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ApplyMode | null>(null);
  const open = useCallback((m: ApplyMode) => setMode(m), []);
  const close = useCallback(() => setMode(null), []);

  return (
    <ApplyContext.Provider value={{ open }}>
      {children}
      {mode && <ApplyDialog mode={mode} onClose={close} />}
    </ApplyContext.Provider>
  );
}

/** Drop-in replacement for the old anchor CTAs. */
export function ApplyButton({
  mode,
  className,
  children,
}: {
  mode: ApplyMode;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useApply();
  return (
    <button type="button" onClick={() => open(mode)} className={className}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Dialog                                                              */
/* ------------------------------------------------------------------ */

type Step = 1 | 2 | 3;

function ApplyDialog({ mode, onClose }: { mode: ApplyMode; onClose: () => void }) {
  const copy = COPY[mode];
  const needsDocs = mode !== "waitlist";
  const docRequired = mode === "cleanup";
  const totalSteps = needsDocs ? 2 : 1;

  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  // Lock scroll, focus first field, close on Escape.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const validateStep1 = () => {
    const f = formRef.current;
    if (!f) return false;
    const fields = ["name", "phone", "email", ...(needsDocs ? ["company"] : [])];
    for (const n of fields) {
      const el = f.elements.namedItem(n) as HTMLInputElement | null;
      if (el && !el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    setError(null);
    if (!validateStep1()) return;
    if (needsDocs) setStep(2);
    else void submit();
  };

  const submit = async () => {
    const f = formRef.current;
    if (!f) return;
    if (!validateStep1()) return;
    for (const el of Array.from(f.elements)) {
      const input = el as HTMLInputElement;
      if (!input.name || input.closest(".hidden")) continue;
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData(f);
      fd.set("mode", mode);
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "접수에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }
      setStep(3);
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-[0_40px_80px_-30px_rgba(30,26,23,0.5)] sm:max-w-lg sm:rounded-2xl"
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white/95 px-6 pt-6 pb-4 backdrop-blur">
          <div>
            {step < 3 && (
              <div className="font-mono text-[11px] font-semibold tracking-wider text-accent">
                STEP {step} / {totalSteps}
              </div>
            )}
            <h2 id={titleId} className="mt-1 text-xl font-bold tracking-[-0.02em]">
              {step === 3 ? copy.done : copy.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 2l10 10M12 2L2 12" /></svg>
          </button>
        </div>

        {step === 3 ? (
          <div className="px-6 py-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ok/10">
              <svg className="h-6 w-6 text-ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <p className="mt-5 leading-relaxed text-ink/85">{copy.doneBody}</p>
            <p className="mt-3 text-sm text-mute">
              문의는 <span className="font-mono">contact@unlist.kr</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-colors hover:bg-dark-2"
            >
              닫기
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            className="px-6 pb-6 pt-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 1) goNext();
              else void submit();
            }}
            noValidate
          >
            <p className="text-sm leading-relaxed text-mute">{copy.lead}</p>

            {/* STEP 1 — contact (kept mounted so values survive step change) */}
            <div className={step === 1 ? "mt-5 space-y-4" : "hidden"}>
              <Field label="이름" required>
                <input ref={firstFieldRef} name="name" type="text" required minLength={2} autoComplete="name" placeholder="대표자 성함" className={INPUT} />
              </Field>
              <Field label="연락처" required hint="진단 결과와 진행 상황을 문자로도 안내드립니다">
                <input name="phone" type="tel" required inputMode="numeric" pattern="^01[016789]-?\d{3,4}-?\d{4}$" autoComplete="tel" placeholder="010-0000-0000" className={INPUT} />
              </Field>
              <Field label="이메일" required>
                <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={INPUT} />
              </Field>
              {needsDocs && (
                <Field label="상호명" required hint="검색에 쓰는 이름 그대로. 여러 곳이면 쉼표로 구분">
                  <input name="company" type="text" required autoComplete="organization" placeholder="예: OO성형외과, OO학원" className={INPUT} />
                </Field>
              )}
              {!needsDocs && <ConsentPrivacy open={privacyOpen} onToggle={() => setPrivacyOpen((v) => !v)} mode={mode} />}
            </div>

            {/* STEP 2 — documents & consent */}
            {needsDocs && (
              <div className={step === 2 ? "mt-5 space-y-5" : "hidden"}>
                <Field
                  label="사업자등록증"
                  required={docRequired}
                  hint={
                    docRequired
                      ? "대표자 본인 명의. 각 사이트에 삭제를 요청할 때 본인 확인 자료로 쓰입니다."
                      : "선택. 올려주시면 상호가 같은 다른 업체와 혼동 없이 정확하게 진단합니다."
                  }
                >
                  <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-ink/25 bg-paper px-4 py-3.5 text-sm transition-colors hover:border-ink">
                    <span className={fileName ? "text-ink" : "text-mute"}>{fileName ?? "PDF 또는 사진 (10MB 이하)"}</span>
                    <span className="shrink-0 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">파일 선택</span>
                    <input
                      name="bizfile"
                      type="file"
                      accept="application/pdf,image/*"
                      required={docRequired}
                      className="sr-only"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                    />
                  </label>
                </Field>

                <Field label="요청 사항" hint="선택. 특히 지우고 싶은 사이트나 항목이 있으면 적어 주세요">
                  <textarea name="memo" rows={3} maxLength={1000} placeholder="예: 집 주소가 나오는 OO사이트부터 부탁드립니다" className={`${INPUT} resize-none`} />
                </Field>

                <div className="space-y-3 border-t border-line pt-5">
                  <ConsentPrivacy open={privacyOpen} onToggle={() => setPrivacyOpen((v) => !v)} mode={mode} />
                  <Check name="consentPoa" required={docRequired}>
                    <span className="font-medium">삭제 요청 대행을 위한 위임장 제공에 동의합니다</span>
                    <span className="ml-1 text-xs text-mute">{docRequired ? "(필수)" : "(선택)"}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-mute">
                      언리스트가 대표자 명의로 각 사이트에 비공개·삭제를 요청할 수 있도록, 접수 후 이메일로 보내드리는 위임장에 서명해 주시는 것에 동의합니다.
                      {!docRequired && " 진단만 받으시려면 체크하지 않아도 됩니다."}
                    </span>
                  </Check>
                </div>
              </div>
            )}

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-accent/10 px-3 py-2 text-sm text-accent-hover">
                {error}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  이전
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-full bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {submitting ? "접수 중…" : step === 1 && needsDocs ? "다음" : copy.submit}
              </button>
            </div>
            {mode === "cleanup" && step === 2 && (
              <p className="mt-3 text-center text-[11px] text-mute">결제는 접수 확인 후 안내드리는 계좌로 이체하시면 됩니다.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bits                                                                */
/* ------------------------------------------------------------------ */

const INPUT =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-mute/70 outline-none transition-colors focus:border-ink";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline gap-1.5 text-sm font-semibold">
        {label}
        {required ? <span className="text-accent">*</span> : <span className="text-xs font-normal text-mute">선택</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1.5 block text-xs leading-relaxed text-mute">{hint}</span>}
    </label>
  );
}

function Check({
  name,
  required,
  children,
}: {
  name: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input type="checkbox" name={name} required={required} className="mt-1 h-4 w-4 shrink-0 accent-[#db6845]" />
      <span className="text-sm leading-snug">{children}</span>
    </label>
  );
}

function ConsentPrivacy({ open, onToggle, mode }: { open: boolean; onToggle: () => void; mode: ApplyMode }) {
  const items =
    mode === "waitlist"
      ? "이름, 연락처, 이메일"
      : "이름, 연락처, 이메일, 상호명, 사업자등록증(제출 시), 요청 사항";
  const purpose =
    mode === "waitlist"
      ? "지속 모니터링 출시 안내"
      : mode === "cleanup"
        ? "노출 진단, 삭제·비공개 요청 대행, 진행 상황 안내, 결제 안내"
        : "노출 진단 리포트 작성 및 안내";
  return (
    <div>
      <Check name="consentPrivacy" required>
        <span className="font-medium">개인정보 수집·이용에 동의합니다</span>
        <span className="ml-1 text-xs text-mute">(필수)</span>
      </Check>
      <button type="button" onClick={onToggle} className="mt-1.5 ml-7 text-xs text-mute underline underline-offset-2">
        {open ? "내용 접기" : "수집 항목·목적·보유기간 보기"}
      </button>
      {open && (
        <dl className="mt-2 ml-7 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 rounded-lg bg-paper p-3 text-xs leading-relaxed text-mute">
          <dt className="font-semibold text-ink">수집 항목</dt>
          <dd>{items}</dd>
          <dt className="font-semibold text-ink">이용 목적</dt>
          <dd>{purpose}</dd>
          <dt className="font-semibold text-ink">보유 기간</dt>
          <dd>목적 달성 후 또는 요청 시 지체 없이 파기. 대행 진행 중에는 완료 시까지 보관</dd>
          <dt className="font-semibold text-ink">제공</dt>
          <dd>삭제 요청 처리를 위해 해당 게시 사이트에 필요한 최소 정보만 제공. 그 외 제3자 제공 없음</dd>
        </dl>
      )}
    </div>
  );
}
