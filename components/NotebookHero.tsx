"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Atom, BrainCircuit, Code2, GitFork, Microscope, MousePointer2 } from "lucide-react";
import { InteractiveParticleNetwork } from "@/components/InteractiveParticleNetwork";
import { PROFILE, VERIFIED_METRICS } from "@/lib/portfolio-data";

const EXPERTISE_CARDS = [
  ["LLM FINE-TUNING", "PYTORCH · HUGGING FACE TRAINER"],
  ["HYBRID RAG", "QDRANT · FAISS · PAGE CITATIONS"],
  ["AGENT WORKFLOWS", "LANGGRAPH · PYDANTIC · FASTAPI"],
  ["BROWSER AUTOMATION", "PLAYWRIGHT · ARIA SELECTORS"],
  ["COMPUTER VISION", "YOLOV8 · LAYOUTLMV3 · OCR"],
] as const;

const SIGNAL_ICONS = [GitFork, BrainCircuit, Code2, Microscope];

export function NotebookHero() {
  const [pulseIdx, setPulseIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPulseIdx((prev) => (prev + 1) % EXPERTISE_CARDS.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  const currentPulse = EXPERTISE_CARDS[pulseIdx];

  return (
    <>
      <section
        id="top"
        className="relative flex min-h-[calc(100svh-80px)] items-center overflow-hidden border-b-2 border-[var(--ink)] bg-[rgba(247,241,226,0.44)] px-5 pb-20 pt-14 dark:bg-transparent sm:px-10 md:px-[6.5vw] lg:pb-24 lg:pt-16"
      >
        {/* Ruled horizontal lines fade mask across Hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(var(--rule-line)_1px,transparent_1px)] [background-size:100%_32px] [mask-image:linear-gradient(to_right,black,transparent_85%)]"
        />

        {/* Interactive Physics Particle Constellation */}
        <InteractiveParticleNetwork />

        <div className="relative z-[4] max-w-[780px]">
          <p className="nb-eyebrow">
            <span className="nb-num">01</span>
            <span>AI ENGINEER · LLMS · RAG · AGENT HARNESSES</span>
          </p>

          <h1 className="mt-5 font-hand text-[3.5rem] font-bold leading-[0.82] tracking-[-0.025em] text-[var(--ink)] sm:text-[5rem] lg:text-[6.25rem]">
            {PROFILE.heroHeadline}
            <br />
            <span className="text-[var(--red-ink)]">{PROFILE.heroSubheadline}</span>
          </h1>

          <p className="mt-6 max-w-[660px] font-hand text-xl font-medium leading-[1.42] text-[#4f5d6c] dark:text-[#b0b8ad] sm:text-[1.45rem]">
            {PROFILE.heroThesis}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="#work" className="nb-primary-btn">
              <span>See verified projects</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-hand text-xl font-bold text-[var(--red-ink)] underline-offset-4 hover:underline"
            >
              <GitFork className="h-4 w-4" aria-hidden="true" />
              GitHub (@{PROFILE.handle})
            </a>
          </div>

          <div className="mt-5 flex items-center gap-2 font-mono text-xs text-[var(--ink-soft)]">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>⌖ {PROFILE.location}</span>
          </div>
        </div>

        {/* Floating Handwritten Sticky Note Callout (Minhajul signature) */}
        <div
          key={pulseIdx}
          className="nb-sticky-note relative z-[5] hidden px-5 py-4 md:absolute md:bottom-[14%] md:right-[6vw] md:block md:w-[270px]"
        >
          <span className="block font-mono text-[10px] font-semibold tracking-widest text-[var(--ink-soft)]">
            0{pulseIdx + 1} / 05
          </span>
          <b className="mt-1.5 block font-hand text-xl font-bold tracking-wide text-[var(--ink)]">
            {currentPulse[0]}
          </b>
          <small className="mt-0.5 block font-mono text-[10px] font-medium tracking-wider text-[var(--red-ink)]">
            {currentPulse[1]}
          </small>
        </div>

        {/* Vertical Left Scroll Cue */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-12 left-4 z-[5] hidden origin-left -rotate-90 items-center gap-3 font-mono text-[10px] tracking-[0.14em] text-[var(--ink-soft)] lg:flex"
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="block h-[1px] w-10 bg-[var(--red-ink)]" />
        </div>

        {/* Bottom-Right Mouse Cue */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-5 right-[5vw] z-[5] hidden items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-[var(--ink-soft)] sm:flex"
        >
          <MousePointer2 className="h-3.5 w-3.5" />
          <span>MOVE CURSOR OVER PARTICLES</span>
        </div>
      </section>

      {/* 4-Column Signal Strip Directly Under Hero */}
      <section
        aria-label="Verified engineering signals"
        className="grid grid-cols-1 border-b-2 border-[var(--ink)] bg-[rgba(239,224,190,0.62)] sm:grid-cols-2 lg:grid-cols-4 dark:bg-[#090d0a]"
      >
        {VERIFIED_METRICS.map((metric, idx) => {
          const Icon = SIGNAL_ICONS[idx % SIGNAL_ICONS.length] ?? Atom;
          return (
            <div
              key={metric.label}
              className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-0.5 border-b border-[var(--border-ink)] px-5 py-6 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <Icon
                className="row-span-2 h-6 w-6 text-[var(--red-ink)]"
                aria-hidden="true"
              />
              <span className="font-hand text-2xl font-bold leading-none text-[var(--ink)]">
                {metric.value} · {metric.label}
              </span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                {metric.detail}
              </span>
            </div>
          );
        })}
      </section>
    </>
  );
}
