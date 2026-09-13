import { Wordmark } from "./brand";

/*
  Step illustrations for "이용 방법", rebuilt from the one-pager mockups as
  live markup so they stay crisp at any DPR and follow the brand tokens.
  Content is illustrative placeholder data.
*/

/* ------------------------------------------------------------------ */
/* STEP 01 · 노출 진단 리포트                                             */
/* ------------------------------------------------------------------ */

const DIAG_TILES = [
  { label: "노출 발견", value: "14", tone: "text-accent" },
  { label: "처리 가능", value: "11", tone: "text-ok" },
  { label: "검토 필요", value: "3", tone: "text-warn" },
] as const;

const DIAG_ROWS = [
  { title: "기업조회 플랫폼 A", sub: "매출·대표자 노출", ok: true },
  { title: "채용 플랫폼 B", sub: "주소·연락처 노출", ok: true },
  { title: "신용정보 플랫폼 C", sub: "재무정보 노출", ok: false },
  { title: "검색엔진 캐시", sub: "AI Overview 인용", ok: true },
] as const;

export function DiagnosisMock() {
  return (
    <div className="card rounded-2xl p-5 shadow-[0_24px_48px_-28px_rgba(30,26,23,0.25)] sm:p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">노출 진단 리포트</div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-cream">
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-ok" />
          SCANNING
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {DIAG_TILES.map((t) => (
          <div key={t.label} className="rounded-xl border border-line bg-white px-3 py-2.5">
            <div className="text-[11px] text-mute">{t.label}</div>
            <div className={`mt-0.5 font-mono text-xl font-bold leading-none ${t.tone}`}>
              {t.value}
              <span className="ml-0.5 text-xs font-semibold">곳</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {DIAG_ROWS.map((r) => (
          <div
            key={r.title}
            className="flex items-center justify-between rounded-xl border border-line bg-white px-3.5 py-2.5"
          >
            <div className="flex items-center gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full ${r.ok ? "bg-ok" : "bg-warn"}`} />
              <div>
                <div className="text-xs font-semibold">{r.title}</div>
                <div className="text-[11px] text-mute">{r.sub}</div>
              </div>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                r.ok ? "bg-ok/10 text-ok" : "bg-warn/10 text-warn"
              }`}
            >
              {r.ok ? "처리 가능" : "검토 필요"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* STEP 02 · 원천 비공개 처리                                             */
/* ------------------------------------------------------------------ */

function Arrow() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden className="shrink-0 rotate-90 justify-self-center text-ink/25 sm:rotate-0">
      <path d="M0 6h19M14 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SourceBlockMock() {
  return (
    <div className="card rounded-2xl p-5 shadow-[0_24px_48px_-28px_rgba(30,26,23,0.25)] sm:p-6">
      <div className="text-sm font-semibold">원천 비공개 처리</div>
      <div className="mt-0.5 text-[11px] text-mute">노출 화면 → 데이터 소스 → 소스 제공자까지 역추적</div>

      <div className="mt-5 mb-5 grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="relative">
          <div className="flex h-[62px] flex-col justify-center rounded-xl border-[1.5px] border-accent bg-white px-3 text-center">
            <div className="relative inline-block text-xs font-semibold">
              소스 제공자
              <span className="absolute inset-x-[-2px] top-1/2 h-[3px] -translate-y-1/2 bg-accent" aria-hidden />
            </div>
            <div className="mt-0.5 text-[10px] text-mute">공공데이터·원천 DB</div>
          </div>
          <div className="absolute inset-x-0 -bottom-5 text-center text-[10px] font-semibold text-accent">원천 차단</div>
        </div>
        <Arrow />
        <div className="flex h-[62px] flex-col justify-center rounded-xl border border-line bg-white px-3 text-center">
          <div className="text-xs font-semibold">데이터 소스</div>
          <div className="mt-0.5 text-[10px] text-mute">조회 서비스 원본</div>
        </div>
        <Arrow />
        <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-col">
          {["①", "②", "③"].map((n) => (
            <div key={n} className="rounded-lg border border-line bg-paper px-2 py-1.5 text-center text-[10px] text-mute">
              노출 화면 {n}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-dark p-4 text-cream">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" />
          원천에서 차단 완료
        </div>
        <ul className="mt-2.5 space-y-1.5 text-[11px] text-cream-mute">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            소스 제공자 단계에서 비공개 처리 → 하위 노출 3건 동시 제거
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            재유통 경로까지 차단해 재노출 가능성 최소화
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* STEP 03 · 24시간 재감시                                                */
/* ------------------------------------------------------------------ */

const MON_ROWS = [
  { title: "기업조회 플랫폼 A", sub: "정상 · 재노출 없음", t: "03h", ok: true },
  { title: "채용 플랫폼 B", sub: "정상 · 재노출 없음", t: "01h", ok: true },
  { title: "신규 조회 서비스 D", sub: "신규 감지 → 조치", t: "08m", ok: false },
  { title: "검색·AI 답변", sub: "정상 · 인용 제거됨", t: "12m", ok: true },
] as const;

export function MonitorMock() {
  return (
    <div className="card-dark rounded-2xl p-5 shadow-[0_30px_60px_-30px_rgba(30,26,23,0.45)] sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-wider text-cream-mute">
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-ok" />
          24H MONITORING · LIVE
        </div>
        <Wordmark tone="white" height={14} className="opacity-90" />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.5fr]">
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex h-[132px] w-[132px] items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-cream/10" />
            <span className="absolute inset-[18px] rounded-full border border-cream/10" />
            <span className="absolute inset-[36px] rounded-full border border-cream/15" />
            <span className="absolute left-[8%] top-[28%] h-1.5 w-1.5 rounded-full bg-ok" />
            <span className="absolute right-[6%] top-[58%] h-1.5 w-1.5 rounded-full bg-warn" />
            <span className="absolute bottom-[10%] left-[38%] h-1.5 w-1.5 rounded-full bg-ok" />
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <span className="block h-[3px] w-5 bg-cream" />
            </span>
          </div>
          <div className="mt-2 text-xs font-semibold">unlist AI</div>
          <div className="text-[10px] text-cream-mute">에이전트 상시 가동</div>
        </div>

        <div>
          <div className="mb-2 text-[11px] text-cream-mute">감시 중인 채널</div>
          <div className="space-y-2">
            {MON_ROWS.map((r) => (
              <div
                key={r.title}
                className="flex items-center justify-between rounded-xl border border-line-dark bg-dark-2 px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${r.ok ? "bg-ok" : "bg-warn"}`} />
                  <div>
                    <div className="text-xs font-semibold">{r.title}</div>
                    <div className="text-[11px] text-cream-mute">{r.sub}</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-cream-mute">{r.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
