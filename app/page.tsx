import Image from "next/image";
import Nav from "./components/nav";
import Reveal from "./components/reveal";
import { Token, WordmarkKr } from "./components/brand";
import FeaturesExplorer from "./components/features";
import { ApplyProvider, ApplyButton } from "./components/apply-modal";
import { DiagnosisMock, SourceBlockMock, MonitorMock } from "./components/step-mocks";

export default function Home() {
  return (
    <ApplyProvider>
    <div id="top" className="relative flex flex-1 flex-col overflow-x-clip">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <SearchAi />
        <HowItWorks />
        <Features />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
    </ApplyProvider>
  );
}

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-sm font-semibold text-accent">
      <span className="block h-px w-6 bg-accent" aria-hidden />
      {children}
    </p>
  );
}

const BTN_PRIMARY =
  "inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover";
const BTN_SECONDARY =
  "inline-flex items-center justify-center rounded-full border border-ink/20 bg-transparent px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <div
            className="animate-hero inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-xs font-medium text-ink"
            style={{ animationDelay: "0ms" }}
          >
            <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            무료 노출 진단 접수 중 · 1회 클린업 9,900원
          </div>

          <h1
            className="animate-hero mt-6 text-4xl font-bold leading-[1.18] tracking-[-0.03em] sm:text-5xl lg:text-[3.3rem]"
            style={{ animationDelay: "100ms" }}
          >
            인터넷에 흩어진
            <br />
            <span className="carve-text">내 사업 정보,</span>
            <br />
            대신 지워드립니다
          </h1>

          <p
            className="animate-hero mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            기업정보 공개 사이트에 노출된 대표자 이름, 사업장 주소, 재무
            추정치까지. 언리스트가 사이트별 절차에 맞춰 삭제를 요청하고, 다시
            올라오지 않도록 24시간 감시합니다.
          </p>

          <div
            className="animate-hero mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "300ms" }}
          >
            <ApplyButton mode="diagnosis" className={BTN_PRIMARY}>
              무료 노출 진단 신청하기
            </ApplyButton>
            <a href="#problem" className={BTN_SECONDARY}>
              실제 노출 화면 보기
            </a>
          </div>

          <div
            className="animate-hero mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8"
            style={{ animationDelay: "400ms" }}
          >
            <HeroStat value="30+" label="모니터링 대상 사이트" />
            <HeroStat value="24시간" label="재노출 자동 감시" />
            <HeroStat value="100%" label="공식 절차 기반 요청" />
          </div>
        </div>

        <div
          className="animate-hero relative hidden lg:block"
          style={{ animationDelay: "250ms" }}
        >
          <EvidenceStack />
        </div>

        <div className="animate-hero lg:hidden" style={{ animationDelay: "250ms" }}>
          <Shot
            src="/onepager/pain-1.png"
            alt="구글 검색 결과의 AI 개요에 특정 병원의 연매출 추정치가 노출된 화면"
            width={896}
            height={555}
            urlLabel="google.com › 성형외과 매출"
            priority
          />
          <p className="mt-2 text-[11px] text-mute">실제 검색 화면. 개인정보는 흐림 처리했습니다.</p>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-2xl font-bold text-ink">{value}</div>
      <div className="mt-1 text-xs leading-snug text-mute">{label}</div>
    </div>
  );
}

/** Real exposure screenshots stacked: Google AI Overview in front, AI chat behind. */
function EvidenceStack() {
  return (
    <div className="relative pb-16 pl-10">
      <div className="absolute -top-3 right-4 z-20 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_12px_24px_-12px_rgba(219,104,69,0.8)]">
        상호 검색 1회 → 연매출 35억 노출
      </div>
      <div className="relative z-10">
        <Shot
          src="/onepager/pain-1.png"
          alt="구글 검색 결과의 AI 개요에 특정 병원의 연매출 추정치가 노출된 화면"
          width={896}
          height={555}
          urlLabel="google.com › 성형외과 매출"
          priority
          className="shadow-[0_40px_80px_-40px_rgba(30,26,23,0.45)]"
        />
      </div>
      <div className="absolute bottom-0 left-0 z-20 w-[58%]">
        <Shot
          src="/onepager/aeo-specific.png"
          alt="ChatGPT가 특정 회사의 2021년부터 2024년까지 연도별 매출액을 표로 답한 화면"
          width={813}
          height={615}
          urlLabel="ChatGPT › ○○ 매출"
          dark
          className="shadow-[0_40px_80px_-40px_rgba(30,26,23,0.6)]"
        />
      </div>
      <p className="absolute -bottom-6 right-0 text-[11px] text-mute">
        실제 검색·AI 화면. 개인정보는 흐림 처리했습니다.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Problem                                                             */
/* ------------------------------------------------------------------ */

const PROBLEMS = [
  {
    no: "1",
    title: "상호만 검색해도 매출 추정치가 뜬다",
    body: "부정확한 매출·직원 수 추정치가 검색 결과와 AI 답변에 그대로 노출되어, 거래처 협상·대출 심사·경쟁사 분석에 불리하게 작용합니다.",
    img: "/onepager/pain-1.png",
    alt: "구글 검색 결과의 AI 개요에 특정 병원의 연매출 추정치가 노출된 화면",
    w: 896,
    h: 555,
  },
  {
    no: "2",
    title: "집 주소가 사업장 주소로 공개돼 있다",
    body: "자택 겸 사업장인 개인사업자는 집 주소가 사실상 공개되는 것과 같습니다. 원치 않는 방문과 신변 안전 문제로 이어질 수 있습니다.",
    img: "/onepager/pain-2.png",
    alt: "기업정보 사이트에 개인사업자의 상호·대표자·사업장 주소가 게시된 화면",
    w: 895,
    h: 942,
  },
  {
    no: "3",
    title: "공개한 적 없는데 조회 사이트에 다 나와 있다",
    body: "대표자 이름, 연락처, 설립일, 직원 수까지. 검색 한 번이면 누구나 확인할 수 있어 영업 전화와 스팸에 그대로 노출됩니다.",
    img: "/onepager/pain-3.png",
    alt: "기업 조회 사이트에 법인의 기업 개요와 연락처가 정리되어 게시된 화면",
    w: 1270,
    h: 1136,
  },
  {
    no: "4",
    title: "AI에게 물어봐도 내 매출이 답으로 나온다",
    body: "ChatGPT·Gemini 같은 AI는 조회 사이트의 추정치를 그대로 인용해 답합니다. 검색을 거치지 않아도 상호 하나로 매출 순위까지 정리돼 나옵니다.",
    img: "/onepager/aeo.png",
    alt: "AI 챗봇이 특정 지역 한의원의 매출 상위 10곳을 표로 답한 화면",
    w: 1096,
    h: 762,
  },
] as const;

/** Browser-window frame for evidence screenshots. */
function Shot({
  src,
  alt,
  width,
  height,
  className = "",
  urlLabel,
  dark = false,
  flush = false,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  urlLabel?: string;
  dark?: boolean;
  flush?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden ${
        flush ? "border-b" : "rounded-xl border"
      } ${dark ? "border-line-dark bg-dark" : "border-line bg-white"} ${className}`}
    >
      <div
        className={`flex items-center gap-1.5 border-b px-3 py-2 ${
          dark ? "border-line-dark bg-dark-2" : "border-line bg-paper"
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-cream/20" : "bg-ink/15"}`} />
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-cream/20" : "bg-ink/15"}`} />
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-cream/20" : "bg-ink/15"}`} />
        {urlLabel && (
          <span
            className={`ml-2 truncate rounded-md px-2 py-0.5 font-mono text-[10px] ${
              dark ? "bg-dark text-cream-mute" : "bg-white text-mute"
            }`}
          >
            {urlLabel}
          </span>
        )}
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 560px, 100vw"
          quality={85}
          priority={priority}
          className="h-full w-full scale-[1.01] object-cover object-top"
        />
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section id="problem" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>왜 필요한가요</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-snug tracking-[-0.025em] sm:text-4xl">
            이런 적, 없으세요?
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-mute">
            수많은 기업정보 사이트가 공공 데이터와 웹 수집 정보를 조합해
            사업자의 정보를 게시하고 있습니다. 대부분의 사업자가 이 사실조차
            모르고, 알아도 사이트마다 다른 절차 때문에 직접 지우기가 어렵습니다.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.no} delay={i * 80} className="h-full">
              <div className="card flex h-full flex-col overflow-hidden rounded-2xl">
                <Shot src={p.img} alt={p.alt} width={p.w} height={p.h} flush />
                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white">
                      {p.no}
                    </span>
                    <h3 className="text-lg font-semibold leading-snug">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mute">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="card-dark mt-6 grid gap-6 rounded-2xl px-7 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#f0a98e]" aria-hidden>
                <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" /><path d="M3 21v-5h5" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                그리고, <span className="text-[#f0a98e]">지워도 다시 올라옵니다</span>
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream-mute sm:text-base">
                한 번 삭제해도 데이터가 갱신되면 재수집되어 다시 게시됩니다. 개별
                대응으로는 끝나지 않는 싸움이라서, 언리스트는 삭제한 뒤에도
                24시간 다시 감시합니다.
              </p>
            </div>
            <a
              href="#how"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-cream"
            >
              언리스트가 하는 일
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Search & AI                                                         */
/* ------------------------------------------------------------------ */

type Channel = { name: string; from: number; to: number; note: string; how: string; ai?: boolean };

const CHANNELS: Channel[] = [
  { name: "기업정보·조회 사이트", from: 2, to: 21, note: "요청 접수 후 수일~3주 · 임시조치는 30일 이내", how: "사이트별 공식 절차 + 법령 근거 요청" },
  { name: "구글 검색", from: 3, to: 28, note: "오래된 콘텐츠 삭제 요청 수일 · 개인정보 삭제 요청 수일~수주", how: "원천 삭제 후 색인 갱신 요청" },
  { name: "Bing", from: 1, to: 14, note: "요청 승인 1~7일 후 재수집까지 추가 기간", how: "콘텐츠 삭제 도구 + 재수집 확인" },
  { name: "네이버", from: 2, to: 7, note: "게시중단 요청 후 임시조치·색인 갱신에 수일", how: "게시중단 요청 서비스" },
  { name: "ChatGPT · Gemini · AI 개요", from: 7, to: 42, note: "원천과 검색이 정리되면 순차 반영 · 사업자 삭제 요청 병행", how: "인용 근거 제거 + 개인정보 삭제 요청", ai: true },
];

const SCALE_DAYS = 42;

function SearchAi() {
  return (
    <section id="search-ai" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>검색과 AI까지</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-snug tracking-[-0.025em] sm:text-4xl">
            사이트에서 내려도, 검색과 AI는 한동안 기억합니다
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-mute">
            언리스트는 조회 사이트 비공개에서 끝내지 않습니다. 검색엔진 캐시와
            색인, AI 답변이 인용하는 근거 페이지까지 채널별 절차로 정리하고,
            실제로 사라졌는지 확인합니다.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <div className="flex flex-col gap-4">
            <Reveal delay={60}>
              <div className="card h-full rounded-2xl p-6">
                <div className="font-mono text-[11px] font-semibold tracking-wider text-accent">SEO · 검색 캐시</div>
                <h3 className="mt-2 text-lg font-semibold">검색 결과에서 지웁니다</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  원천 페이지가 내려간 뒤에도 구글·네이버·Bing에는 캐시와 색인이
                  남습니다. 각 검색엔진의 오래된 콘텐츠 삭제, 개인정보 삭제,
                  게시중단 절차로 색인 갱신을 요청하고 반영을 확인합니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="card-dark h-full rounded-2xl p-6">
                <div className="font-mono text-[11px] font-semibold tracking-wider text-[#f0a98e]">AEO · AI 인용</div>
                <h3 className="mt-2 text-lg font-semibold">AI 답변에서도 지웁니다</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-mute">
                  ChatGPT, Gemini, 구글 AI 개요는 검색 색인과 근거 페이지를 따라
                  답합니다. 인용되는 원천을 먼저 정리하고, 필요하면 OpenAI 등
                  사업자에 개인정보 삭제 요청을 함께 진행합니다.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="card h-full rounded-2xl p-6 sm:p-7">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold">채널별 반영 소요</h3>
                <span className="text-[11px] text-mute">요청 후 경과일</span>
              </div>
              <div className="mt-5 space-y-4">
                {CHANNELS.map((c) => (
                  <div key={c.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium">{c.name}</span>
                      <span className="font-mono text-[11px] text-mute">
                        {c.from}–{c.to}일{c.ai ? "+" : ""}
                      </span>
                    </div>
                    <div className="relative mt-1.5 h-2 w-full rounded-full bg-paper">
                      <div
                        className={`absolute h-2 rounded-full ${c.ai ? "bg-accent" : "bg-ink"}`}
                        style={{
                          left: `${(c.from / SCALE_DAYS) * 100}%`,
                          width: `${((c.to - c.from) / SCALE_DAYS) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="mt-1 text-[11px] leading-snug text-mute">{c.note}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between border-t border-line pt-2 font-mono text-[10px] text-mute">
                <span>0</span><span>1주</span><span>2주</span><span>3주</span><span>4주</span><span>5주</span><span>6주</span>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-mute">
                각 채널의 공개 정책 기준 통상치이며 사이트와 항목에 따라 다릅니다. 모든 건의 진행 상태는 24시간 감시 대시보드와 월간 리포트로 확인하실 수 있습니다.
              </p>
            </div>
          </Reveal>
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
    body: "사업자번호만 주시면 국내 조회 서비스와 구글·네이버·AI까지 전수 스캔해 어디에 떠 있는지 리포트로 보여드립니다.",
    Mock: DiagnosisMock,
  },
  {
    no: "02",
    title: "원천 비공개",
    body: "노출된 화면만이 아니라, 그 데이터의 소스와 소스 제공자까지 역추적해 원천에서 비공개 처리합니다.",
    Mock: SourceBlockMock,
  },
  {
    no: "03",
    title: "24시간 재감시",
    body: "한 번 내린 정보가 다시 올라오는지, 새 조회 서비스가 생기는지 24시간 감시하며 자동으로 다시 막습니다.",
    Mock: MonitorMock,
  },
] as const;

function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>이용 방법</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-snug tracking-[-0.025em] sm:text-4xl">
            진행은 3단계
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            에이전트가 각 단계에서 이런 일을 합니다.
          </p>
        </Reveal>

        <div className="mt-6 divide-y divide-line">
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 80}>
              <div className="grid items-center gap-8 py-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-12">
                <div>
                  <div className="font-mono text-xs font-semibold tracking-[0.18em] text-accent">
                    STEP {s.no}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-mute">
                    {s.body}
                  </p>
                </div>
                <s.Mock />
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

function Features() {
  return (
    <section id="features" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>서비스 특징</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-snug tracking-[-0.025em] sm:text-4xl">
            믿고 맡길 수 있도록 설계했습니다
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            항목을 눌러 실제 근거와 화면을 확인하세요.
          </p>
        </Reveal>
        <FeaturesExplorer />
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
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>요금제</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-snug tracking-[-0.025em] sm:text-4xl">
            부담 없이 시작하고, 필요하면 지속 감시로.
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 lg:grid-cols-2">
          <Reveal delay={0}>
            <div className="card-dark relative h-full rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">1회 클린업</h3>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  지금 신청 가능
                </span>
              </div>
              <p className="mt-1.5 text-sm text-cream-mute">지금 떠 있는 정보를 한 번에 정리</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-mono text-4xl font-bold tracking-tight">9,900</span>
                <span className="text-base font-semibold">원</span>
              </div>
              <ul className="mt-7 space-y-3 text-sm text-cream-mute">
                <PriceItem tone="cream">전수 스캔</PriceItem>
                <PriceItem tone="cream">비공개 요청</PriceItem>
                <PriceItem tone="cream">반영 확인</PriceItem>
              </ul>
              <ApplyButton
                mode="cleanup"
                className="mt-8 block w-full rounded-full bg-accent py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                지금 신청하기
              </ApplyButton>
              <p className="mt-3 text-center text-[11px] text-cream-mute">
                이메일 접수 후 계좌이체로 결제 · 진단 리포트 먼저 드립니다
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card relative h-full rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">지속 모니터링</h3>
                <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-mute">
                  출시 예정
                </span>
              </div>
              <p className="mt-1.5 text-sm text-mute">내린 정보가 다시 올라오지 않도록</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-base font-semibold text-mute">월</span>
                <span className="ml-1 font-mono text-4xl font-bold tracking-tight">4,900</span>
                <span className="text-base font-semibold">원</span>
                <span className="ml-1.5 text-sm text-mute">(예정)</span>
              </div>
              <ul className="mt-7 space-y-3 text-sm text-mute">
                <PriceItem>재스캔</PriceItem>
                <PriceItem>신규 노출 자동 차단</PriceItem>
                <PriceItem>월간 리포트</PriceItem>
              </ul>
              <ApplyButton
                mode="waitlist"
                className="mt-8 block w-full rounded-full border border-ink/20 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                출시 알림 받기
              </ApplyButton>
              <p className="mt-3 text-center text-[11px] text-mute">
                1회 클린업 고객에게 출시 시 얼리버드 가격으로 먼저 안내합니다
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-center text-xs text-mute">
            기본 진단 기준 · 노출 범위·플랫폼 수에 따라 상이할 수 있습니다. 지속 모니터링 가격은 출시 시 변경될 수 있습니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PriceItem({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: "ink" | "cream";
}) {
  return (
    <li className="flex items-start gap-2.5">
      <svg
        className={`mt-0.5 h-4 w-4 shrink-0 ${
          tone === "cream" ? "text-cream" : "text-accent"
        }`}
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
    a: "사이트마다 다릅니다. 기업정보·조회 사이트는 요청 접수 후 통상 수일에서 2~3주 안에 비공개 처리되며, 정보통신망법상 임시조치는 최대 30일 이내에 결정됩니다.\n\n검색엔진은 원천 페이지가 내려간 뒤 색인이 갱신되어야 사라집니다. 구글은 오래된 콘텐츠 삭제 요청이 통상 수일, 개인정보 삭제 요청은 수일에서 수 주가 걸리고, Bing은 요청 승인에 1~7일 뒤 재수집까지 기간이 더 필요합니다. 네이버는 게시중단 요청 뒤 임시조치와 색인 갱신에 수일이 소요됩니다.\n\nChatGPT·Gemini·구글 AI 개요 같은 AI 답변은 검색 색인과 근거 페이지를 따라가므로 원천과 검색이 정리되면 순차적으로 반영되고, 필요하면 OpenAI 등 사업자에 개인정보 삭제 요청도 함께 진행합니다. 모든 건의 진행 상태는 24시간 감시 대시보드와 월간 리포트로 확인하실 수 있습니다.",
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
    a: "네, 가능합니다. 법인은 상법 제317조에 따라 대표자 성명과 주소 등이 등기되고 상업등기법 제10조로 누구나 열람할 수 있어, 등기·공시처럼 법령이 공개를 정한 항목은 원천 삭제가 제한될 수 있습니다.\n\n하지만 실제로 불편을 겪는 노출은 대부분 그 바깥에 있습니다. 조회 사이트가 재가공해 게시한 대표자 연락처와 이메일, 추정 매출과 직원 수, 검색·AI 답변에 인용된 요약은 법인도 개인정보 보호법과 정보통신망법 제44조의2에 근거해 비공개를 요청할 수 있고 실제로 처리됩니다.\n\n진단 단계에서 항목별 처리 가능 여부를 먼저 보여드리니, 법인이라도 우선 신청해 노출 현황부터 확인해 보시길 권합니다.",
  },
] as const;

function Faq() {
  return (
    <section id="faq" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
            자주 묻는 질문
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="faq card group rounded-2xl px-6 py-5">
                <summary className="flex items-center justify-between gap-4 text-base font-semibold">
                  {item.q}
                  <span className="faq-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink">
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
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-mute">
                  {item.a.split("\n\n").map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
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
          <div className="card-dark relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="relative">
              <div className="mx-auto flex justify-center">
                <Token size={40} tone="white" />
              </div>
              <h2 className="mx-auto mt-8 max-w-2xl text-3xl font-bold leading-snug tracking-[-0.025em] sm:text-4xl">
                내 정보가 어디에 노출되어 있는지,
                <br className="hidden sm:block" />
                <span className="carve-text carve-text--dark">
                  무료로 진단
                </span>
                해 드리겠습니다
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream-mute sm:text-base">
                상호명과 연락처를 이메일로 보내주시면 어디에 무엇이 노출되어
                있는지 진단 리포트를 무료로 드립니다. 리포트를 보고 1회 클린업
                진행 여부를 결정하세요. 지속 모니터링은 출시 시 먼저 안내드립니다.
              </p>
              <div className="mt-9 flex flex-col items-center gap-4">
                <ApplyButton
                  mode="diagnosis"
                  className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  무료 진단 신청하기
                </ApplyButton>
                <span className="font-mono text-sm text-cream-mute">
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
          <div className="flex items-center gap-3">
            <Token size={26} />
            <WordmarkKr height={22} />
          </div>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-mute">
            언리스트는 무료 노출 진단과 1회 클린업을 먼저 제공하고, 지속
            모니터링은 출시를 준비하고 있습니다. 서비스 구성과 요금은 변경될 수
            있습니다.
          </p>
        </div>
        <div className="text-xs text-mute">
          <p className="font-mono">contact@unlist.kr</p>
          <p className="mt-2">
            © {new Date().getFullYear()} Unlist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
