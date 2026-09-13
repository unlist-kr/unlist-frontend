import Image from "next/image";

/*
  Brand primitives. Assets live in /public/brand and come straight from the
  logo package. The wordmark is monochrome by rule; never tint it.
*/

type Tone = "ink" | "white";

/** Circle token: ink disc with terracotta + cream carve bars. */
export function Token({
  size = 28,
  tone = "ink",
  className = "",
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  const src = tone === "ink" ? "/brand/token-circle.svg" : "/brand/token-light.svg";
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}

/** English carve-out wordmark. viewBox 560x219. */
export function Wordmark({
  height = 22,
  tone = "ink",
  className = "",
}: {
  height?: number;
  tone?: Tone;
  className?: string;
}) {
  const width = Math.round(height * (560 / 219));
  const src = tone === "ink" ? "/brand/wordmark-ink.svg" : "/brand/wordmark-white.svg";
  return (
    <Image
      src={src}
      alt="unlist"
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}

/** Korean carve-out wordmark (ink only). viewBox 780x260. */
export function WordmarkKr({
  height = 22,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const width = Math.round(height * (780 / 260));
  return (
    <Image
      src="/brand/wordmark-kr-ink.svg"
      alt="언리스트"
      width={width}
      height={height}
      className={className}
    />
  );
}

/**
 * Two-bar carve mark, the favicon geometry rendered in CSS.
 * Long bar + short bar. Used as a section/card accent instead of icons.
 */
export function Mark({
  tone = "ink",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const long = tone === "ink" ? "bg-ink" : "bg-accent";
  const short = tone === "ink" ? "bg-accent" : "bg-cream";
  return (
    <div className={`flex flex-col gap-[3px] ${className}`} aria-hidden>
      <span className={`block h-[3px] w-8 ${long}`} />
      <span className={`block h-[3px] w-5 ${short}`} />
    </div>
  );
}
