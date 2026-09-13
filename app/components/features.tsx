"use client";

import { useState, type ReactNode } from "react";

/*
  "서비스 특징" — six claims, each backed by a concrete artifact:
  statute text, a report page, a timeline, a data inventory, a message
  thread, a coverage ledger. Click a row to expand. Desktop shows the
  artifact in a sticky panel on the right; mobile inlines it.
*/

type Feature = {
  id: string;
  title: string;
  summary: string;
  body: string;
  Visual: () => ReactNode;
};

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

const STATUTES = [
  {
    law: "개인정보 보호법",
    article: "제36조 제1항",
    tag: "정정·삭제 요구권",
    text: "자신의 개인정보를 열람한 정보주체는 개인정보처리자에게 그 개인정보의 정정 또는 삭제를 요구할 수 있다. 다만, 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없다.",
    primary: true,
  },
  {
    law: "개인정보 보호법",
    article: "제36조 제2항",
    tag: "지체 없이 조치·통지",
    text: "개인정보처리자는 정보주체의 요구를 받았을 때에는 … 지체 없이 그 개인정보를 조사하여 정보주체의 요구에 따라 정정·삭제 등 필요한 조치를 한 후 그 결과를 정보주체에게 알려야 한다.",
    primary: false,
  },
  {
    law: "정보통신망법",
    article: "제44조의2 제1항·제4항",
    tag: "삭제 요청·임시조치 30일",
    text: "사생활 침해나 명예훼손 등 타인의 권리가 침해된 경우 그 침해를 받은 자는 … 침해사실을 소명하여 그 정보의 삭제 또는 반박내용의 게재를 요청할 수 있다. … 임시조치의 기간은 30일 이내로 한다.",
    primary: false,
  },
] as const;

function LegalVisual() {
  return (
    <div className="space-y-3">
      {STATUTES.map((s) => (
        <blockquote
          key={s.article}
          className={`rounded-xl border p-4 ${
            s.primary ? "border-ink bg-white" : "border-line bg-white"
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-mono text-[11px] font-semibold tracking-wide text-ink">
              {s.law} {s.article}
            </span>
            <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-medium text-mute">
              {s.tag}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/85">“{s.text}”</p>
        </blockquote>
      ))}
      <p className="text-[11px] text-mute">국가법령정보센터 조문 기준 · 요청서에는 해당 조문과 침해 사실 소명을 함께 적습니다.</p>
    </div>
  );
}

const REPORT_ROWS = [
  { site: "기업조회 플랫폼 A", item: "대표자명 · 주소", date: "09.02", status: "완료" },
  { site: "재무정보 플랫폼 B", item: "매출 추정치", date: "09.05", status: "완료" },
  { site: "채용 플랫폼 C", item: "직원 수 · 연봉 추정", date: "09.12", status: "진행" },
  { site: "검색엔진 캐시", item: "AI Overview 인용", date: "09.14", status: "완료" },
] as const;

function ReportVisual() {
  return (
    <div className="card rounded-xl p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[11px] text-mute">월간 리포트</div>
          <div className="text-sm font-semibold">2026년 9월 · 홍길동 원장님</div>
        </div>
        <span className="font-mono text-[10px] text-mute">RPT-2609-014</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-y border-line py-3">
        {[
          ["요청", "12건"],
          ["처리 완료", "9건"],
          ["진행 중", "3건"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="text-[11px] text-mute">{k}</div>
            <div className="font-mono text-lg font-bold">{v}</div>
          </div>
        ))}
      </div>
      <table className="mt-3 w-full text-left text-[12px]">
        <thead className="text-[10px] uppercase tracking-wide text-mute">
          <tr>
            <th className="py-1.5 font-medium">사이트</th>
            <th className="py-1.5 font-medium">항목</th>
            <th className="py-1.5 font-medium">요청일</th>
            <th className="py-1.5 text-right font-medium">상태</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {REPORT_ROWS.map((r) => (
            <tr key={r.site}>
              <td className="py-2 font-medium">{r.site}</td>
              <td className="py-2 text-mute">{r.item}</td>
              <td className="py-2 font-mono text-mute">{r.date}</td>
              <td className="py-2 text-right">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    r.status === "완료" ? "bg-ok/10 text-ok" : "bg-warn/10 text-warn"
                  }`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-[10px] text-mute">예시 데이터</p>
    </div>
  );
}

const TIMELINE = [
  { t: "09.02 14:20", title: "삭제 완료 확인", sub: "기업조회 플랫폼 A · 대표자명·주소", tone: "bg-ok" },
  { t: "09.19 07:12", title: "재수집 감지", sub: "데이터 갱신으로 동일 항목 재게시", tone: "bg-accent" },
  { t: "09.19 07:14", title: "자동 재요청 발송", sub: "기존 처리 이력과 근거 조문 첨부", tone: "bg-ink" },
  { t: "09.23 11:05", title: "재삭제 확인", sub: "월간 리포트에 이력 반영", tone: "bg-ok" },
] as const;

function RedetectVisual() {
  return (
    <div className="card rounded-xl p-5">
      <ol className="relative ml-2 border-l border-line">
        {TIMELINE.map((e) => (
          <li key={e.t} className="relative pb-5 pl-6 last:pb-0">
            <span className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${e.tone}`} />
            <div className="font-mono text-[10px] text-mute">{e.t}</div>
            <div className="text-sm font-semibold">{e.title}</div>
            <div className="text-[12px] text-mute">{e.sub}</div>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-paper px-3 py-2 text-[11px]">
        <span className="text-mute">감지에서 재요청까지</span>
        <span className="font-mono font-semibold">2분</span>
      </div>
    </div>
  );
}

function MinimalDataVisual() {
  const take = ["사업자등록번호", "대표자 성명", "위임장 1부"];
  const skip = ["주민등록번호 뒷자리", "계좌·카드 정보", "직원·고객 정보", "매출·재무 원본"];
  return (
    <div className="card rounded-xl p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="text-[11px] font-semibold text-ink">받는 것</div>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            {take.map((x) => (
              <li key={x} className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 shrink-0 text-ok" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.5 3.5L13 4.5" /></svg>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[11px] font-semibold text-mute">받지 않는 것</div>
          <ul className="mt-2 space-y-1.5 text-[13px] text-mute">
            {skip.map((x) => (
              <li key={x} className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 shrink-0 text-ink/30" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
                <span className="line-through decoration-ink/30">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line text-center text-[11px]">
        {["수집 3항목", "대행 목적 외 사용 없음", "해지 시 파기"].map((x) => (
          <div key={x} className="bg-white px-2 py-2 font-medium">{x}</div>
        ))}
      </div>
    </div>
  );
}

function ManagerVisual() {
  return (
    <div className="card rounded-xl p-5">
      <div className="flex items-center gap-2.5 border-b border-line pb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-cream">담</span>
        <div>
          <div className="text-sm font-semibold">담당 매니저</div>
          <div className="text-[11px] text-mute">평일 10:00–18:00 · 알림톡·이메일</div>
        </div>
      </div>
      <div className="mt-4 space-y-3 text-[13px]">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-cream">
            채용 사이트 C는 언제쯤 내려가나요?
            <div className="mt-1 text-right font-mono text-[10px] text-cream-mute">09.15 11:02</div>
          </div>
        </div>
        <div className="flex">
          <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-paper px-3.5 py-2.5">
            C사는 9월 12일에 요청 접수됐고, 이 사이트는 통상 2주 안에 처리됩니다. 처리되면 바로 알려드리고, 리포트에도 반영해 두겠습니다.
            <div className="mt-1 font-mono text-[10px] text-mute">09.15 11:09</div>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 text-[11px] text-mute">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" />
          09.23 처리 완료 알림 발송
        </div>
      </div>
      <p className="mt-3 text-[10px] text-mute">예시 대화</p>
    </div>
  );
}

const COVERAGE = [
  { cat: "기업조회·기업정보", n: 12 },
  { cat: "검색엔진·AI 답변", n: 6 },
  { cat: "채용·구인", n: 5 },
  { cat: "신용·재무정보", n: 4 },
  { cat: "상권·지도", n: 3 },
] as const;

const ADDED = [
  { d: "2026.08", what: "AI 답변 인용 모니터링 (ChatGPT · Gemini · AI 개요)" },
  { d: "2026.07", what: "상권분석 서비스 D" },
  { d: "2026.06", what: "채용 플랫폼 B" },
] as const;

function CoverageVisual() {
  const total = COVERAGE.reduce((a, c) => a + c.n, 0);
  return (
    <div className="card rounded-xl p-5">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-semibold">모니터링 대상</div>
        <div className="font-mono text-lg font-bold">{total}<span className="ml-0.5 text-xs font-semibold text-mute">곳</span></div>
      </div>
      <div className="mt-3 space-y-2">
        {COVERAGE.map((c) => (
          <div key={c.cat} className="grid grid-cols-[1fr_auto] items-center gap-3 text-[12px]">
            <div>
              <div className="flex items-center justify-between">
                <span>{c.cat}</span>
                <span className="font-mono text-mute">{c.n}</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-paper">
                <div className="h-1.5 rounded-full bg-ink" style={{ width: `${(c.n / COVERAGE[0].n) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-line pt-3">
        <div className="text-[11px] font-semibold text-mute">최근 추가</div>
        <ul className="mt-1.5 space-y-1 text-[12px]">
          {ADDED.map((a) => (
            <li key={a.d} className="flex gap-3">
              <span className="font-mono text-mute">{a.d}</span>
              <span>{a.what}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-[10px] text-mute">예시 데이터 · 추가 비용 없음</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FEATURES: Feature[] = [
  {
    id: "legal",
    title: "법적 근거에 기반한 요청",
    summary: "감이 아니라 조문으로 요청합니다.",
    body: "개인정보 보호법 제36조의 정정·삭제 요구권과 정보통신망법 제44조의2의 삭제 요청 절차, 각 사이트의 처리 방침에 맞춰 침해 사실을 소명한 공식 요청서를 작성합니다. 법령이 공개를 정한 항목은 진단 단계에서 미리 구분해 드립니다.",
    Visual: LegalVisual,
  },
  {
    id: "report",
    title: "월간 투명 리포트",
    summary: "무엇을 요청했고 어디까지 됐는지, 매달 문서로.",
    body: "요청 건마다 사이트, 항목, 요청일, 처리 상태를 기록해 매달 리포트로 보내드립니다. 진행 상황을 숨기지 않고, 처리되지 않은 건은 사유와 다음 조치를 함께 적습니다.",
    Visual: ReportVisual,
  },
  {
    id: "redetect",
    title: "재노출 자동 감지",
    summary: "다시 올라오면 사람보다 먼저 알아채고 다시 요청합니다.",
    body: "삭제된 항목이 데이터 갱신으로 다시 게시되면 24시간 감시가 감지하고, 기존 처리 이력과 근거 조문을 첨부해 자동으로 재요청합니다. 구독 기간 동안 보호가 유지됩니다.",
    Visual: RedetectVisual,
  },
  {
    id: "minimal",
    title: "데이터 최소 수집 원칙",
    summary: "정보를 지우는 회사가 정보를 쌓아둘 수는 없습니다.",
    body: "대행에 필요한 사업자등록번호, 대표자 성명, 위임장만 받습니다. 대행 목적 외에는 사용하지 않고, 구독을 해지하면 파기합니다.",
    Visual: MinimalDataVisual,
  },
  {
    id: "manager",
    title: "전담 매니저 배정",
    summary: "챗봇이 아닌 사람이 답합니다.",
    body: "처리 현황이 궁금할 때 알림톡이나 이메일로 담당 매니저에게 바로 물어보세요. 사이트별 통상 처리 기간과 현재 단계를 사람이 설명합니다.",
    Visual: ManagerVisual,
  },
  {
    id: "coverage",
    title: "신규 사이트 지속 추가",
    summary: "새 조회 서비스가 생기면 감시 대상에 바로 넣습니다.",
    body: "기업정보 사이트, 채용 플랫폼, 신용·재무 정보, 상권 서비스, 검색엔진과 AI 답변까지 모니터링 대상을 계속 넓힙니다. 추가 비용 없이 보호 범위가 넓어집니다.",
    Visual: CoverageVisual,
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function FeaturesExplorer() {
  const [active, setActive] = useState(0);
  const current = FEATURES[active];

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
      <ol className="divide-y divide-line border-y border-line">
        {FEATURES.map((f, i) => {
          const open = i === active;
          return (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={open}
                aria-controls={`feature-panel-${f.id}`}
                className="group flex w-full items-start gap-4 py-5 text-left"
              >
                <span
                  className={`mt-1 font-mono text-xs font-semibold tabular-nums ${
                    open ? "text-accent" : "text-mute"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span
                    className={`block text-lg font-semibold transition-colors ${
                      open ? "text-ink" : "text-ink/70 group-hover:text-ink"
                    }`}
                  >
                    {f.title}
                  </span>
                  <span
                    className={`mt-1 block text-sm text-mute ${open ? "" : "hidden sm:block"}`}
                  >
                    {f.summary}
                  </span>
                </span>
                <span
                  className={`mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-transform ${
                    open ? "rotate-45 border-ink text-ink" : "border-line text-mute"
                  }`}
                  aria-hidden
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
                </span>
              </button>

              {open && (
                <div id={`feature-panel-${f.id}`} className="pb-6 pl-9 lg:hidden">
                  <f.Visual />
                  <p className="mt-4 text-sm leading-relaxed text-mute">{f.body}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <current.Visual />
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-mute">{current.body}</p>
        </div>
      </div>
    </div>
  );
}
