import Nav from "./components/nav";
import Reveal from "./components/reveal";

export default function Home() {
  return (
    <div id="top" className="relative flex flex-1 flex-col overflow-x-clip">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div className="bg-grid absolute inset-0" />
      <div
        className="glow-orb left-1/2 top-[-180px] h-[420px] w-[640px] -translate-x-1/2"
        style={{ background: "rgb(56 189 248 / 0.16)" }}
      />
      <div
        className="glow-orb right-[-160px] top-[240px] h-[360px] w-[360px]"
        style={{ background: "rgb(99 102 241 / 0.14)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div
            className="animate-hero inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-xs font-medium text-sky-300"
            style={{ animationDelay: "0ms" }}
          >
            <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-sky-400" />
            사전 등록 접수 중 · 얼리버드 혜택
          </div>

          <h1
            className="animate-hero mt-6 text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl lg:text-[3.4rem]"
            style={{ animationDelay: "100ms" }}
          >
            인터넷에 흩어진
            <br />
            <span className="gradient-text">내 사업 정보,</span>
            <br />
            대신 지워드립니다
          </h1>

          <p
            className="animate-hero mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            기업정보 공개 사이트에 노출된 대표자 이름, 사업장 주소, 재무
            추정치까지. 언리스트가 사이트별 절차에 맞춰 삭제를 요청하고, 다시
            올라오지 않도록 매달 감시합니다.
          </p>

          <div
            className="animate-hero mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-7 py-3.5 text-center text-sm font-semibold text-night shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.03]"
            >
              무료 노출 진단 신청하기
            </a>
            <a
              href="#how"
              className="rounded-full border border-line bg-panel px-7 py-3.5 text-center text-sm font-semibold text-snow transition-colors hover:border-sky-400/40"
            >
              서비스 알아보기
            </a>
          </div>

          <div
            className="animate-hero mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8"
            style={{ animationDelay: "400ms" }}
          >
            <HeroStat value="30+" label="모니터링 대상 사이트" />
            <HeroStat value="매월" label="재노출 감시 리포트" />
            <HeroStat value="100%" label="공식 절차 기반 요청" />
          </div>
        </div>

        <div
          className="animate-hero relative hidden lg:block"
          style={{ animationDelay: "250ms" }}
        >
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-2xl font-bold text-snow">{value}</div>
      <div className="mt-1 text-xs leading-snug text-mute">{label}</div>
    </div>
  );
}

const MOCK_ROWS = [
  { site: "기업정보 포털 A", detail: "대표자명 · 주소", status: "done" },
  { site: "재무정보 플랫폼 B", detail: "매출 추정치", status: "done" },
  { site: "채용정보 사이트 C", detail: "직원 수 · 연봉 추정", status: "progress" },
  { site: "상권분석 서비스 D", detail: "사업장 위치", status: "progress" },
  { site: "기업 DB 사이트 E", detail: "법인 등기 정보", status: "watch" },
] as const;

const STATUS_STYLE = {
  done: { label: "삭제 완료", cls: "bg-emerald-400/10 text-emerald-300" },
  progress: { label: "처리 중", cls: "bg-amber-400/10 text-amber-300" },
  watch: { label: "모니터링", cls: "bg-sky-400/10 text-sky-300" },
} as const;

function DashboardMock() {
  return (
    <div className="animate-float relative">
      <div className="card-glass relative overflow-hidden rounded-2xl p-6 shadow-2xl shadow-black/40">
        <div
          className="scan-line absolute left-0 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgb(56 189 248 / 0.7), transparent)",
          }}
        />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">내 정보 노출 현황</div>
            <div className="mt-0.5 text-xs text-mute">
              이번 달 리포트 · 5개 사이트
            </div>
          </div>
          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            보호 활성화
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          {MOCK_ROWS.map((row) => {
            const s = STATUS_STYLE[row.status];
            return (
              <div
                key={row.site}
                className="flex items-center justify-between rounded-xl border border-line bg-night/60 px-4 py-3"
              >
                <div>
                  <div className="text-sm font-medium">{row.site}</div>
                  <div className="mt-0.5 text-xs text-mute">{row.detail}</div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${s.cls}`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-sky-400/10 to-indigo-500/10 px-4 py-3.5">
          <div className="text-xs text-mute">
            노출 감소율{" "}
            <span className="ml-1 font-mono text-sm font-bold text-sky-300">
              80%
            </span>
          </div>
          <div className="text-xs text-mute">
            다음 스캔까지{" "}
            <span className="ml-1 font-mono text-sm font-bold text-snow">
              D-12
            </span>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-4/5 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Problem                                                             */
/* ------------------------------------------------------------------ */

const PROBLEMS = [
  {
    icon: "👤",
    title: "대표자 실명과 연락처",
    body: "검색 한 번이면 누구나 대표자의 이름과 사업장 연락처를 확인할 수 있어, 원치 않는 영업 전화와 스팸에 그대로 노출됩니다.",
  },
  {
    icon: "📍",
    title: "사업장 주소 공개",
    body: "자택 겸 사업장인 개인사업자의 경우, 집 주소가 사실상 공개되는 것과 같습니다. 신변 안전 문제로 이어질 수 있습니다.",
  },
  {
    icon: "📊",
    title: "매출·재무 추정치",
    body: "부정확한 매출·직원 수 추정치가 공개되어 거래처 협상, 대출 심사, 경쟁사 분석에 불리하게 작용할 수 있습니다.",
  },
  {
    icon: "🔁",
    title: "지워도 다시 올라옵니다",
    body: "한 번 삭제해도 데이터가 갱신되면 재수집되어 다시 게시됩니다. 개별 대응으로는 끝나지 않는 싸움입니다.",
  },
] as const;

function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold text-sky-400">왜 필요한가요</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
            내 동의 없이, 내 사업 정보는
            <br className="hidden sm:block" /> 이미 공개되어 있습니다
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-mute">
            수많은 기업정보 사이트가 공공 데이터와 웹 수집 정보를 조합해
            사업자의 정보를 게시하고 있습니다. 문제는 대부분의 사업자가 이
            사실조차 모른다는 것, 그리고 알아도 사이트마다 다른 절차 때문에
            직접 지우기가 매우 번거롭다는 것입니다.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="card-glass h-full rounded-2xl p-7 transition-colors hover:border-sky-400/30">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-panel-2 text-xl">
                  {p.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mute">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    no: "01",
    title: "노출 진단",
    body: "사업자 정보를 게시 중인 기업정보 사이트를 전수 스캔하고, 어떤 정보가 어디에 노출되어 있는지 한눈에 보이는 진단 리포트를 드립니다.",
  },
  {
    no: "02",
    title: "삭제 요청 대행",
    body: "위임을 받아 각 사이트의 공식 절차와 관련 법령(개인정보 보호법 등)에 근거해 삭제·비공개 처리를 대신 요청하고, 처리 결과를 추적합니다.",
  },
  {
    no: "03",
    title: "지속 모니터링",
    body: "삭제 후에도 매달 재노출 여부를 감시합니다. 정보가 다시 게시되면 자동으로 재요청하고, 월간 리포트로 현황을 투명하게 공유합니다.",
  },
] as const;

function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div
        className="glow-orb left-[-200px] top-1/3 h-[400px] w-[400px]"
        style={{ background: "rgb(56 189 248 / 0.08)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-sky-400">이용 방법</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
            신청 한 번이면, 나머지는
            <br className="hidden sm:block" /> 언리스트가 알아서 합니다
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 100}>
              <div className="card-glass relative h-full overflow-hidden rounded-2xl p-8">
                <div className="font-mono text-5xl font-bold text-sky-400/15">
                  {s.no}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {s.body}
                </p>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    title: "법적 근거에 기반한 요청",
    body: "감이 아니라 근거로 요청합니다. 개인정보 보호법, 정보통신망법 등 관련 법령과 각 사이트의 처리 방침에 맞춘 공식 요청서를 작성합니다.",
  },
  {
    title: "월간 투명 리포트",
    body: "무엇을 요청했고 어디까지 처리됐는지, 매달 리포트로 받아보세요. 진행 상황을 숨기지 않습니다.",
  },
  {
    title: "재노출 자동 감지",
    body: "삭제된 정보가 다시 수집·게시되면 자동으로 감지하고 재요청합니다. 구독 기간 동안 보호가 유지됩니다.",
  },
  {
    title: "데이터 최소 수집 원칙",
    body: "정보를 지우는 회사가 정보를 쌓아둘 수는 없습니다. 대행에 필요한 최소한의 정보만 받고, 해지 시 파기합니다.",
  },
  {
    title: "전담 매니저 배정",
    body: "챗봇이 아닌 사람이 응대합니다. 처리 현황이 궁금할 때 언제든 전담 매니저에게 문의하세요.",
  },
  {
    title: "신규 사이트 지속 추가",
    body: "새로운 기업정보 사이트가 생기면 모니터링 대상에 계속 추가됩니다. 추가 비용 없이 보호 범위가 넓어집니다.",
  },
] as const;

function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold text-sky-400">서비스 특징</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
            믿고 맡길 수 있도록 설계했습니다
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 80} className="h-full">
              <div className="h-full bg-panel p-7 transition-colors hover:bg-panel-2">
                <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
                <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mute">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div
        className="glow-orb right-[-160px] top-1/4 h-[380px] w-[380px]"
        style={{ background: "rgb(99 102 241 / 0.1)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-sky-400">요금제</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
            커피 몇 잔 값으로, 내 정보를 지키세요
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mute">
            아래 요금은 출시 예정 가격이며, 사전 등록 고객에게는 얼리버드
            할인가가 우선 안내됩니다.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 lg:grid-cols-2">
          <Reveal delay={0}>
            <div className="card-glass h-full rounded-2xl p-8">
              <h3 className="text-lg font-semibold">스탠다드</h3>
              <p className="mt-1.5 text-sm text-mute">
                개인사업자 1인을 위한 기본 보호
              </p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-bold">₩29,000</span>
                <span className="text-sm text-mute">/ 월 (예정)</span>
              </div>
              <ul className="mt-7 space-y-3 text-sm text-mute">
                <PriceItem>주요 기업정보 사이트 노출 스캔</PriceItem>
                <PriceItem>삭제·비공개 요청 대행</PriceItem>
                <PriceItem>월 1회 모니터링 및 리포트</PriceItem>
                <PriceItem>재노출 시 자동 재요청</PriceItem>
              </ul>
              <a
                href="#contact"
                className="mt-8 block rounded-full border border-line py-3 text-center text-sm font-semibold transition-colors hover:border-sky-400/50"
              >
                사전 등록하기
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative h-full rounded-2xl bg-gradient-to-b from-sky-400/40 to-indigo-500/40 p-px">
              <div className="h-full rounded-2xl bg-panel-2 p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">프로</h3>
                  <span className="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-semibold text-sky-300">
                    추천
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-mute">
                  법인·공동대표 등 폭넓은 보호가 필요할 때
                </p>
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-mono text-4xl font-bold">₩59,000</span>
                  <span className="text-sm text-mute">/ 월 (예정)</span>
                </div>
                <ul className="mt-7 space-y-3 text-sm text-mute">
                  <PriceItem>스탠다드의 모든 기능 포함</PriceItem>
                  <PriceItem>대표자 최대 3인 동시 보호</PriceItem>
                  <PriceItem>월 2회 모니터링 및 우선 처리</PriceItem>
                  <PriceItem>전담 매니저 1:1 응대</PriceItem>
                </ul>
                <a
                  href="#contact"
                  className="mt-8 block rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 py-3 text-center text-sm font-semibold text-night transition-transform hover:scale-[1.02]"
                >
                  사전 등록하기
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-center text-xs text-mute">
            표기 요금은 준비 중인 가격으로, 정식 출시 시 변경될 수 있습니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PriceItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg
        className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8.5l3.5 3.5L13 4.5" />
      </svg>
      {children}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "정말 삭제가 가능한가요?",
    a: "사이트와 정보 유형에 따라 다릅니다. 개인정보에 해당하는 항목(대표자 개인 식별 정보 등)은 관련 법령에 근거해 삭제 또는 비공개를 요청할 수 있으며, 법령상 공시 의무가 있는 정보는 삭제가 제한될 수 있습니다. 진단 단계에서 항목별로 처리 가능성을 투명하게 안내드립니다.",
  },
  {
    q: "삭제까지 얼마나 걸리나요?",
    a: "사이트별 처리 절차에 따라 통상 수일에서 수 주가 소요됩니다. 모든 요청 건의 진행 상태는 월간 리포트와 전담 매니저를 통해 확인하실 수 있습니다.",
  },
  {
    q: "어떤 정보를 제공해야 하나요?",
    a: "삭제 요청 대행에 필요한 최소한의 정보(사업자등록번호, 대표자 성명, 위임장)만 수집합니다. 수집된 정보는 대행 목적 외에 사용하지 않으며, 구독 해지 시 파기합니다.",
  },
  {
    q: "구독을 해지하면 어떻게 되나요?",
    a: "이미 삭제된 정보가 되살아나지는 않지만, 이후 재수집·재게시에 대한 모니터링과 재요청은 중단됩니다. 언제든 다시 구독하실 수 있습니다.",
  },
  {
    q: "법인 사업자도 이용할 수 있나요?",
    a: "네. 다만 법인은 법령상 공시 의무가 있는 정보의 범위가 넓어, 삭제 가능한 항목이 개인사업자와 다를 수 있습니다. 프로 플랜에서 법인 맞춤 진단을 제공합니다.",
  },
] as const;

function Faq() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-sky-400">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            자주 묻는 질문
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="faq card-glass group rounded-2xl px-6 py-5">
                <summary className="flex items-center justify-between gap-4 text-base font-semibold">
                  {item.q}
                  <span className="faq-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-sky-400">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    >
                      <path d="M6 1v10M1 6h10" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-mute">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact / CTA                                                       */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="card-glass relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              className="glow-orb left-1/2 top-[-120px] h-[280px] w-[560px] -translate-x-1/2"
              style={{ background: "rgb(56 189 248 / 0.18)" }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
                내 정보가 어디에 노출되어 있는지,
                <br className="hidden sm:block" />
                <span className="gradient-text">무료로 진단</span>해
                드리겠습니다
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-mute sm:text-base">
                사전 등록 고객에게는 출시 시 무료 노출 진단 리포트와 얼리버드
                할인 혜택을 가장 먼저 안내드립니다. 아래 이메일로 상호명과
                연락처를 보내주세요.
              </p>
              <div className="mt-9 flex flex-col items-center gap-4">
                <a
                  href="mailto:contact@unlist.kr?subject=%5B%EC%96%B8%EB%A6%AC%EC%8A%A4%ED%8A%B8%5D%20%EC%82%AC%EC%A0%84%20%EB%93%B1%EB%A1%9D%20%EC%8B%A0%EC%B2%AD"
                  className="rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-8 py-4 text-sm font-semibold text-night shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.03]"
                >
                  이메일로 사전 등록하기
                </a>
                <span className="font-mono text-sm text-mute">
                  contact@unlist.kr
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-night">
              U
            </span>
            <span className="font-bold">언리스트 UNLIST</span>
          </div>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-mute">
            언리스트는 현재 서비스 출시를 준비하며 사전 등록을 받고 있습니다.
            본 페이지의 서비스 구성과 요금은 출시 시점에 변경될 수 있습니다.
          </p>
        </div>
        <div className="text-xs text-mute">
          <p>contact@unlist.kr</p>
          <p className="mt-2">
            © {new Date().getFullYear()} Unlist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
