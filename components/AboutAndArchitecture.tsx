"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Cpu, Database, Layers, ShieldCheck } from "lucide-react";
import { ARCHITECTURE_STAGES, PROFILE } from "@/lib/portfolio-data";
import { MotionReveal } from "@/components/MotionReveal";
import { TiltCard3D } from "@/components/TiltCard3D";

const STAGE_ICONS = [Cpu, Database, ShieldCheck, Layers];

export function AboutAndArchitecture() {
  const [activeIndex, setActiveIndex] = useState(2);
  const currentStage = ARCHITECTURE_STAGES[activeIndex];

  return (
    <>
      <section id="about" className="relative z-10 border-b border-border/80 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <MotionReveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  Engineering Identity
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  From Model Weights to Production Guardrails
                </h2>
              </div>

              <div className="space-y-4 lg:col-span-8">
                {PROFILE.aboutParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "text-base font-medium leading-relaxed text-ink sm:text-lg"
                        : "text-sm leading-relaxed text-muted sm:text-base"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section
        id="architecture"
        className="relative z-10 border-b border-border/80 bg-surface/35 py-16 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <MotionReveal>
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                How I Build AI Systems
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Four-Layer LLM &amp; Execution Harness Workflow
              </h2>
              <p className="mt-2 text-sm text-muted sm:text-base">
                Inspect each layer across the stack from PyTorch fine-tuning to the deterministic harness wrapping model execution.
              </p>
            </div>
          </MotionReveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            {/* Glowing vertical node track selector */}
            <div className="relative pl-6 lg:col-span-5">
              <div
                aria-hidden="true"
                className="absolute bottom-5 left-2.5 top-5 w-[1px] bg-gradient-to-b from-accent via-sky-400/50 to-border"
              />
              <div className="grid gap-3">
                {ARCHITECTURE_STAGES.map((stage, idx) => {
                  const Icon = STAGE_ICONS[idx] ?? Layers;
                  const isSelected = idx === activeIndex;
                  return (
                    <div key={stage.step} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[19px] top-6 h-3 w-3 rounded-full border-2 transition-all ${
                          isSelected
                            ? "border-accent bg-accent shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                            : "border-border bg-canvas"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        aria-pressed={isSelected}
                        className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left backdrop-blur-md transition-all ${
                          isSelected
                            ? "border-accent bg-surface shadow-[0_0_24px_rgba(16,185,129,0.12)]"
                            : "border-border bg-surface/65 hover:border-accent/40 hover:bg-surface"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                            isSelected
                              ? "border-accent/40 bg-accent/15 text-accent"
                              : "border-border bg-surface-elevated text-muted"
                          }`}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-accent">
                              {stage.step}
                            </span>
                            <span className="text-sm font-semibold text-ink">{stage.title}</span>
                          </div>
                          <p className="mt-1 text-xs text-muted">{stage.subtitle}</p>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7">
              <TiltCard3D
                intensity={3.5}
                className="h-full rounded-xl border border-border bg-surface/85 p-6 backdrop-blur-md"
              >
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="border-b border-border pb-4">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                        Layer {currentStage.step}
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-ink">{currentStage.title}</h3>
                      <p className="text-sm text-muted">{currentStage.subtitle}</p>
                    </div>

                    <ul className="mt-5 space-y-3">
                      {currentStage.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                        >
                          <Check
                            className="mt-1 h-4 w-4 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                        Core Components
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {currentStage.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-md border border-border bg-surface-elevated px-2.5 py-1 font-mono text-xs text-ink"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                      Implemented In
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {currentStage.linkedRepos.map((repo) => (
                        <a
                          key={repo.name}
                          href={repo.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-accent/35 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
                        >
                          {repo.name}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
