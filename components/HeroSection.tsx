"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, TerminalSquare } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PROFILE, VERIFIED_METRICS } from "@/lib/portfolio-data";
import { TiltCard3D } from "@/components/TiltCard3D";

const NeuralHarness3D = dynamic(
  () => import("@/components/NeuralHarness3D").then((mod) => mod.NeuralHarness3D),
  {
    ssr: false,
    loading: () => (
      <div
        aria-label="Loading 3D scene"
        className="flex h-[430px] w-full animate-pulse items-center justify-center rounded-2xl border border-border bg-surface/80 backdrop-blur-md"
      >
        <span className="font-mono text-xs text-muted">Initializing 3D Execution Core...</span>
      </div>
    ),
  }
);

const TYPEWRITER_PHRASES = [
  "LLM fine-tuning pipelines.",
  "deterministic agent harnesses.",
  "multi-tenant hybrid RAG.",
  "computer vision & OCR systems.",
  "crash-resilient AI backends.",
];

export function HeroSection() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charCount, setCharCount] = useState(TYPEWRITER_PHRASES[0].length);
  const [deleting, setDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const currentPhrase = TYPEWRITER_PHRASES[phraseIdx];
    const delay = !deleting && charCount === currentPhrase.length
      ? 1800
      : deleting && charCount === 0
      ? 280
      : deleting
      ? 32
      : 58;

    const timer = window.setTimeout(() => {
      if (!deleting && charCount < currentPhrase.length) {
        setCharCount((c) => c + 1);
      } else if (!deleting && charCount === currentPhrase.length) {
        setDeleting(true);
      } else if (deleting && charCount > 0) {
        setCharCount((c) => c - 1);
      } else {
        setDeleting(false);
        setPhraseIdx((idx) => (idx + 1) % TYPEWRITER_PHRASES.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charCount, deleting, phraseIdx, shouldReduceMotion]);

  const activeText = shouldReduceMotion
    ? TYPEWRITER_PHRASES[0]
    : TYPEWRITER_PHRASES[phraseIdx].slice(0, charCount);

  return (
    <section className="relative z-10 border-b border-border/80 py-14 sm:py-20">
      {/* Subtle monochrome obsidian glow behind the 3D scene */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-8 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/35 bg-surface/85 px-3.5 py-1 text-xs font-medium text-accent backdrop-blur-md">
              <span className="beacon-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span>{PROFILE.availability}</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-ink">Mohammed </span>
              <span className="bg-gradient-to-r from-ink via-accent to-sky-400 bg-clip-text text-transparent">
                Al-Haj
              </span>
            </h1>

            <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted sm:text-sm">
              {PROFILE.tagline}
            </p>

            <div className="mt-4 flex min-h-[28px] items-center gap-2 font-mono text-sm text-accent sm:text-base">
              <span className="text-muted">&gt;</span>
              <span>Shipping</span>
              <span className="text-ink">{activeText}</span>
              <span
                aria-hidden="true"
                className="inline-block h-4 w-[2px] animate-pulse bg-accent"
              />
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {PROFILE.heroThesis}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.28)] transition-all hover:opacity-95"
              >
                <TerminalSquare className="h-4 w-4" aria-hidden="true" />
                Explore Flagship Systems
              </a>

              <a
                href={`mailto:${PROFILE.links.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/80 px-4 py-2.5 text-sm font-medium text-ink backdrop-blur-md transition-colors hover:border-accent/60"
              >
                <Mail className="h-4 w-4 text-muted" aria-hidden="true" />
                Email Me
              </a>

              <a
                href={PROFILE.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/80 px-3.5 py-2.5 text-sm font-medium text-muted backdrop-blur-md transition-colors hover:border-accent/50 hover:text-ink"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              <a
                href={PROFILE.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/80 px-3.5 py-2.5 text-sm font-medium text-muted backdrop-blur-md transition-colors hover:border-accent/50 hover:text-ink"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <NeuralHarness3D />
          </motion.div>
        </div>

        {/* Obsidian Glass Verified Metrics Bar */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VERIFIED_METRICS.map((metric) => (
            <TiltCard3D
              key={metric.label}
              intensity={4.5}
              className="rounded-xl border border-border bg-surface/80 p-4 backdrop-blur-md"
            >
              <div className="relative z-10">
                <div className="font-mono text-2xl font-bold tracking-tight text-ink">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {metric.label}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{metric.detail}</p>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
