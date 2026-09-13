"use client";

import { useEffect, useState } from "react";
import { Token, Wordmark } from "./brand";

const LINKS = [
  { href: "#problem", label: "왜 필요한가요" },
  { href: "#how", label: "이용 방법" },
  { href: "#features", label: "서비스 특징" },
  { href: "#pricing", label: "요금제" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/90 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="unlist 홈">
          <Token size={30} />
          <Wordmark height={26} className="mt-px" />
        </a>

        <ul className="hidden items-center gap-8 text-sm text-mute md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-dark-2"
          >
            사전 등록
          </a>
        </div>

        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 5.5h14M3 10h14M3 14.5h14" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line px-5 pb-6 pt-3 md:hidden">
          <ul className="flex flex-col gap-1 text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-mute transition-colors hover:bg-paper hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-ink py-2.5 text-center text-sm font-semibold text-white"
          >
            사전 등록
          </a>
        </div>
      )}
    </header>
  );
}
