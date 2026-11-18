"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Languages,
  Terminal,
} from "lucide-react";
import { CREDENTIALS, FLAGSHIP_PROJECTS, JOURNEY_TIMELINE, PROFILE } from "@/lib/portfolio-data";

const NeuralHarness3D = dynamic(
  () => import("@/components/NeuralHarness3D").then((mod) => mod.NeuralHarness3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center font-mono text-xs text-[var(--muted)]">
        Loading 3D view...
      </div>
    ),
  }
);

const DEMO_TABS = [
  "Agent Checkpoints",
  "Browser Workflows",
  "Document Models",
  "DocuMind RAG",
  "DeepResearch",
  "3D WebGL Core",
] as const;

export function NotebookDemosAndJourney() {
  const [activeDemo, setActiveDemo] = useState(5);
  const [journeyIdx, setJourneyIdx] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  // Cycle interactive demo tabs automatically until user visits WebGL tab
  useEffect(() => {
    if (activeDemo === 5) return;
    const timer = window.setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 5);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [activeDemo]);

  // Cycle active step along the selected 3D pipeline journey
  useEffect(() => {
    const stepCount = FLAGSHIP_PROJECTS[journeyIdx]?.pipeline.length ?? 4;
    const timer = window.setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stepCount);
    }, 1550);
    return () => window.clearInterval(timer);
  }, [journeyIdx]);

  const currentProject = FLAGSHIP_PROJECTS[journeyIdx] ?? FLAGSHIP_PROJECTS[0];

  return (
    <>
      {/* 04 // Systems in Motion (Framed Notebook Browser Stage) */}
      <section
        id="demos"
        className="border-b-2 border-[var(--ink)] px-5 py-20 sm:px-10 md:px-[6.5vw]"
      >
        <div className="mx-auto max-w-[1340px]">
          <div className="grid items-end gap-8 lg:grid-cols-[0.75fr_1.15fr_0.85fr]">
            <div>
              <p className="nb-eyebrow">
                <span className="nb-num">04</span>
                <span>Systems In Motion</span>
              </p>
            </div>
            <h2 className="font-hand text-5xl font-bold leading-[0.86] tracking-tight text-[var(--ink)] sm:text-6xl lg:text-7xl">
              See how the
              <br />
              systems <span className="text-[var(--red-ink)]">run.</span>
            </h2>
            <p className="font-hand text-xl leading-[1.42] text-[var(--ink-soft)]">
              Interactive tabs showing the 3D LLM &amp; RAG view, retrieval filters, document models, and multi-agent loops.
            </p>
          </div>

          <div className="mt-12 border-2 border-[var(--ink)] bg-[#efe5cf] shadow-[6px_7px_0_rgba(41,56,74,0.14)] dark:bg-[#090d0a]">
            {/* Browser Chrome Bar */}
            <div className="flex h-12 items-center justify-between border-b-2 border-[var(--ink)] bg-[#e4d8bf] px-4 font-mono text-xs text-[var(--ink-soft)] dark:bg-[#0d120e]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border border-[var(--ink)] bg-[var(--red-ink)]" />
                <span className="h-2.5 w-2.5 rounded-full border border-[var(--ink)] bg-[var(--mustard)]" />
                <span className="h-2.5 w-2.5 rounded-full border border-[var(--ink)] bg-[var(--blue-ink)]" />
                <span className="ml-2 font-semibold">alhaj.lab / {DEMO_TABS[activeDemo].toLowerCase().replace(/\s+/g, "-")}</span>
              </div>
              <span className="font-bold text-[var(--red-ink)]">VERIFIED</span>
            </div>

            {/* Viewport */}
            <div className="relative min-h-[450px] overflow-hidden bg-[var(--paper)] [background-image:linear-gradient(var(--rule-line)_1px,transparent_1px)] [background-size:100%_32px]">
              {activeDemo === 0 && (
                <div className="flex min-h-[450px] flex-col justify-center gap-6 p-6 sm:p-12">
                  <div className="mx-auto w-full max-w-2xl rounded-lg border-2 border-[var(--ink)] bg-[#fbf6e9] p-5 shadow-[4px_5px_0_rgba(41,56,74,0.14)] dark:bg-[#101511]">
                    <div className="flex items-center justify-between font-mono text-xs text-[var(--red-ink)]">
                      <span>HASEEN-AI · CRASH RECOVERY HARNESS</span>
                      <b>PASS (0 DUPLICATES)</b>
                    </div>
                    <p className="mt-2 font-hand text-2xl font-bold text-[var(--ink)]">
                      PYTHONPATH=backend python -m haseen.cli demo crash
                    </p>
                  </div>
                  <div className="mx-auto grid w-full max-w-2xl gap-4 sm:grid-cols-3">
                    {[
                      ["01 · Step Lease", "SQLite WAL acquires worker lease", "ACTIVE"],
                      ["02 · Crash Trap", "Mid-run worker exit simulated safely", "RECOVERED"],
                      ["03 · SHA-256 Gate", "Ledger digest verified, run finishes once", "0 DUPLICATES"],
                    ].map(([title, desc, badge]) => (
                      <div key={title} className="nb-card p-4">
                        <span className="font-mono text-[10px] font-bold text-[var(--red-ink)]">
                          {badge}
                        </span>
                        <h3 className="mt-1 font-hand text-2xl font-bold text-[var(--ink)]">
                          {title}
                        </h3>
                        <p className="mt-1 font-sans text-xs text-[var(--muted)]">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeDemo === 1 && (
                <div className="flex min-h-[450px] flex-col justify-center gap-6 p-6 sm:p-12">
                  <div className="mx-auto w-full max-w-2xl rounded-lg border-2 border-[var(--ink)] bg-[#fbf6e9] p-5 shadow-[4px_5px_0_rgba(41,56,74,0.14)] dark:bg-[#101511]">
                    <span className="font-mono text-xs font-bold text-[var(--blue-ink)]">
                      MUTAHAKKIM-AI · COMPILED CAPABILITY GRAPH
                    </span>
                    <p className="mt-1 font-hand text-2xl font-bold text-[var(--ink)]">
                      Recorded Playwright Trace → Deterministic Offline Replay
                    </p>
                  </div>
                  <div className="mx-auto grid w-full max-w-2xl gap-4 sm:grid-cols-2">
                    <div className="nb-card p-5">
                      <span className="font-mono text-xs text-[var(--muted)]">REPEAT TOKEN COST</span>
                      <div className="mt-2 font-hand text-5xl font-bold text-[var(--red-ink)]">
                        0 LLM calls
                      </div>
                      <p className="mt-2 font-mono text-xs text-[var(--ink-soft)]">
                        Replays ARIA selectors and DOM checks locally once the flow is recorded.
                      </p>
                    </div>
                    <div className="nb-card p-5">
                      <span className="font-mono text-xs text-[var(--muted)]">LOCAL STABILITY</span>
                      <div className="mt-2 font-hand text-5xl font-bold text-[var(--ink)]">
                        ARIA + DOM Guard
                      </div>
                      <p className="mt-2 font-mono text-xs text-[var(--ink-soft)]">
                        Verifies page state before each action without depending on fragile screen coordinates.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 2 && (
                <div className="flex min-h-[450px] flex-col justify-center gap-6 p-6 sm:p-12">
                  <div className="mx-auto w-full max-w-2xl rounded-lg border-2 border-[var(--ink)] bg-[#fbf6e9] p-6 shadow-[4px_5px_0_rgba(41,56,74,0.14)] dark:bg-[#101511]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--red-ink)]">
                        DOCUSHIELD-AI · HELD-OUT TRANSFORMER EVAL
                      </span>
                      <span className="nb-chip">9 / 9 pytest (1.99s)</span>
                    </div>
                    <div className="mt-6 space-y-5">
                      <div>
                        <div className="flex justify-between font-mono text-xs font-bold">
                          <span>LayoutLMv3 Token Classification F1</span>
                          <span className="text-[var(--red-ink)]">0.9856 (98.71% acc)</span>
                        </div>
                        <div className="mt-2 h-3 overflow-hidden rounded-full border border-[var(--ink)] bg-black/10">
                          <div className="h-full w-[98.5%] bg-[var(--red-ink)]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between font-mono text-xs font-bold">
                          <span>XLM-RoBERTa NER Joint Lift (en_only → AR+EN)</span>
                          <span className="text-[var(--blue-ink)]">0.1292 → 0.5606 F1</span>
                        </div>
                        <div className="mt-2 h-3 overflow-hidden rounded-full border border-[var(--ink)] bg-black/10">
                          <div className="h-full w-[56%] bg-[var(--blue-ink)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 3 && (
                <div className="flex min-h-[450px] flex-col justify-center gap-6 p-6 sm:p-12">
                  <div className="mx-auto grid w-full max-w-2xl gap-4">
                    <div className="nb-card p-5">
                      <span className="font-mono text-xs font-bold text-[var(--red-ink)]">
                        DOCUMIND-RAG · TENANT ISOLATION BOUNDARY
                      </span>
                      <p className="mt-2 font-hand text-2xl font-bold text-[var(--ink)]">
                        Strict JWT tenant metadata filter BEFORE dense + lexical search &amp; CrossEncoder reranking.
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-4">
                      {FLAGSHIP_PROJECTS.find((p) => p.id === "documind-rag")?.pipeline.map((node) => (
                        <div
                          key={node.label}
                          className={`rounded-md border p-3 font-mono ${
                            node.isGate
                              ? "border-2 border-dashed border-[var(--red-ink)] bg-[#fff4ce] dark:bg-black/40"
                              : "border-[var(--ink)] bg-[#fbf6e9] dark:bg-[#101511]"
                          }`}
                        >
                          <div className="text-xs font-bold text-[var(--ink)]">{node.label}</div>
                          <div className="mt-1 text-[10px] text-[var(--muted)]">{node.sublabel}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 4 && (
                <div className="flex min-h-[450px] flex-col justify-center gap-6 p-6 sm:p-12">
                  <div className="mx-auto w-full max-w-2xl space-y-4">
                    <div className="nb-card p-5">
                      <span className="font-mono text-xs font-bold text-[var(--blue-ink)]">
                        AGENTIC-DEEPRESEARCH · LANGGRAPH CYCLIC STATEGRAPH
                      </span>
                      <p className="mt-2 font-hand text-2xl font-bold text-[var(--ink)]">
                        Planner → Parallel Searcher → Draft Writer → Critic Loop (MAX_REVISIONS=3) → Live SSE Stream
                      </p>
                      <p className="mt-2 font-mono text-xs text-[var(--muted)]">
                        12 / 12 pytest workflow, agent, and API checks passing (1.58s) in GitHub Actions.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 5 && (
                <div className="bg-[#040407] p-4 sm:p-6">
                  <NeuralHarness3D />
                </div>
              )}
            </div>

            {/* Bottom Interactive Tab Switcher */}
            <div
              role="tablist"
              aria-label="Live pipeline simulations"
              className="grid grid-cols-2 border-t-2 border-[var(--ink)] bg-[#e4d8bf] sm:grid-cols-3 lg:grid-cols-6 dark:bg-[#0d120e]"
            >
              {DEMO_TABS.map((label, idx) => {
                const isActive = activeDemo === idx;
                return (
                  <button
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveDemo(idx)}
                    className={`flex items-center gap-2 border-b border-r border-[var(--border-ink)] px-3 py-3 text-left font-mono text-[11px] font-bold transition-colors lg:border-b-0 ${
                      isActive
                        ? "bg-[#fff5db] text-[var(--ink)] dark:bg-[#1a221b] dark:text-[#b7ff4a]"
                        : "text-[var(--ink-soft)] hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="text-[var(--red-ink)]">0{idx + 1}</span>
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 05 // Split Section: Left 3D Interactive Architecture Journey + Right Verified Credentials */}
      <div id="systems" className="grid border-b-2 border-[var(--ink)] lg:grid-cols-2">
        {/* Left: Interactive 3D Perspective Project Pipeline Journey */}
        <section
          aria-label="Interactive execution pipelines"
          className="flex flex-col justify-center border-b-2 border-[var(--ink)] bg-[rgba(246,238,219,0.52)] px-5 py-16 dark:bg-[#080c09] sm:px-10 lg:border-b-0 lg:border-r-2 lg:px-12"
        >
          <div className="flex items-center justify-between font-mono text-[11px] font-bold tracking-wider">
            <span className="text-[var(--red-ink)]">EXECUTION PIPELINE</span>
            <span className="text-[var(--muted)]">
              SYSTEM 0{journeyIdx + 1} / 0{FLAGSHIP_PROJECTS.length}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {FLAGSHIP_PROJECTS.map((proj, idx) => {
              const active = idx === journeyIdx;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => {
                    setJourneyIdx(idx);
                    setActiveStage(0);
                  }}
                  className={`flex items-center gap-1.5 rounded border px-2.5 py-2 text-left font-hand text-base font-bold transition-all ${
                    active
                      ? "border-2 border-[var(--ink)] bg-[var(--mustard)] text-[#26374a] shadow-[2px_3px_0_rgba(41,56,74,0.18)] -rotate-1 dark:text-[#071006]"
                      : "border-dashed border-[var(--ink)] bg-[var(--paper-card)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[var(--red-ink)]">0{idx + 1}</span>
                  <span className="truncate">{proj.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 border-l-4 border-[var(--blue-ink)] bg-[var(--paper-card)] p-4 shadow-[3px_4px_0_rgba(41,56,74,0.08)]">
            <span className="font-mono text-[11px] font-bold uppercase text-[var(--red-ink)]">
              {currentProject.name} · {currentProject.releaseTag}
            </span>
            <p className="mt-1 font-hand text-xl leading-snug text-[var(--ink)]">
              {currentProject.problem}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {currentProject.stack.slice(0, 5).map((tool) => (
                <span key={tool} className="nb-chip text-xs">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="relative my-5 space-y-2.5">
            {currentProject.pipeline.map((stage, idx) => {
              const isDone = idx < activeStage;
              const isNow = idx === activeStage;
              return (
                <div
                  key={stage.label}
                  className={`grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-md px-3.5 py-3 transition-all ${
                    isNow
                      ? "translate-x-2 border-2 border-[var(--red-ink)] bg-[#fff8e8] shadow-[4px_5px_0_rgba(184,79,69,0.16)] dark:bg-[#101611]"
                      : "border border-dashed border-[var(--ink)] bg-[var(--paper-card)] opacity-80"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] font-bold ${
                      isDone
                        ? "border-[var(--ink)] bg-[var(--mustard)] text-[#26374a] dark:text-[#071006]"
                        : "border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <b className="block font-hand text-xl font-bold leading-tight text-[var(--ink)]">
                      {stage.label}
                    </b>
                    <small className="font-mono text-[10px] text-[var(--muted)]">
                      {stage.sublabel}
                    </small>
                  </div>
                  <em className="font-mono text-[10px] font-bold not-italic text-[var(--red-ink)]">
                    {isDone ? "DONE" : isNow ? "NOW" : "NEXT"}
                  </em>
                </div>
              );
            })}
          </div>

          <div className="relative overflow-hidden border border-[var(--border-ink)] bg-[var(--paper-card)] px-4 py-3 font-mono text-[11px]">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-[var(--red-ink)]">
                <Terminal className="mr-1.5 inline h-3.5 w-3.5" aria-hidden="true" />
                VERIFIED OUTPUT
              </span>
              <span className="truncate font-bold text-[var(--ink)]">
                {currentProject.ciLabel}
              </span>
            </div>
            <div
              key={currentProject.id}
              className="nb-progress-bar absolute bottom-0 left-0 h-[2px] bg-[var(--red-ink)]"
            />
          </div>
        </section>

        {/* Right: Verified AI Certifications & Badges (DeepMind PNGs, IBM Credly, Anthropic) */}
        <section
          id="credentials"
          className="bg-[rgba(246,238,219,0.52)] px-5 py-16 dark:bg-[#0b0f0c] sm:px-10 lg:px-12"
        >
          <p className="nb-eyebrow">
            <span className="nb-num">05</span>
            <span>Verified Credentials</span>
          </p>
          <h2 className="mt-4 font-hand text-5xl font-bold leading-[0.86] tracking-tight text-[var(--ink)] sm:text-6xl">
            Verified badges
            <br />
            and <span className="text-[var(--red-ink)]">coursework.</span>
          </h2>
          <p className="mt-4 max-w-xl font-hand text-xl leading-[1.45] text-[var(--ink-soft)]">
            Certificates covering small language model training, Retrieval-Augmented Generation, and coding workflows with Claude Code.
          </p>

          <div className="mt-8 space-y-4">
            {CREDENTIALS.map((cred) => (
              <div
                key={cred.id}
                className="nb-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                {cred.imageSrc ? (
                  <div className="w-full shrink-0 rounded border-2 border-[var(--ink)] bg-white p-1.5 sm:w-28">
                    <img
                      src={cred.imageSrc}
                      alt={`${cred.issuer} ${cred.title}`}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border-2 border-[var(--ink)] bg-[var(--mustard)] text-[#26374a]">
                    <Award className="h-6 w-6" aria-hidden="true" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold">
                    <span className="text-[var(--red-ink)]">{cred.issuer}</span>
                    <span>·</span>
                    <span className="text-[var(--blue-ink)]">{cred.level}</span>
                  </div>
                  <h3 className="mt-0.5 font-hand text-2xl font-bold text-[var(--ink)]">
                    {cred.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-[var(--muted)]">{cred.highlights}</p>
                  <div className="mt-2 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[var(--muted)]">{cred.issuedAt}</span>
                    {cred.verifyUrl ? (
                      <a
                        href={cred.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[var(--red-ink)] hover:underline"
                      >
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verify Credential
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-[var(--ink)]">
                        <BadgeCheck className="h-3.5 w-3.5 text-[var(--red-ink)]" />
                        Official Badge Displayed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 06 // Education, Community & Trajectory */}
      <section
        id="journey"
        aria-label="Education, community and engineering trajectory"
        className="border-b-2 border-[var(--ink)] bg-[rgba(247,241,226,0.4)] px-5 py-20 dark:bg-transparent sm:px-10 md:px-[6.5vw]"
      >
        <div className="mx-auto max-w-[1340px]">
          <div className="grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr_1fr]">
            <div>
              <p className="nb-eyebrow">
                <span className="nb-num">06</span>
                <span>Education &amp; Community</span>
              </p>
            </div>
            <h2 className="font-hand text-5xl font-bold leading-[0.86] tracking-tight text-[var(--ink)] sm:text-6xl">
              Still learning.
              <br />
              Still <span className="text-[var(--red-ink)]">sharing.</span>
            </h2>
            <p className="font-hand text-xl leading-[1.42] text-[var(--ink-soft)]">
              Academic foundations in artificial intelligence complemented by practical mentoring and open-source implementation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {JOURNEY_TIMELINE.map((item, idx) => {
              const Icon =
                item.category === "EDUCATION"
                  ? GraduationCap
                  : item.category === "COMMUNITY"
                  ? HeartHandshake
                  : BookOpen;
              return (
                <div
                  key={item.id}
                  className={`nb-card flex flex-col justify-between p-6 ${
                    idx % 2 === 0 ? "nb-card-tilt-left" : "nb-card-tilt-right"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                      <span className="text-[var(--red-ink)]">{item.category}</span>
                      <span className="text-[var(--muted)]">{item.period}</span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Icon className="h-5 w-5 text-[var(--red-ink)]" aria-hidden="true" />
                      <h3 className="font-hand text-2xl font-bold leading-tight text-[var(--ink)]">
                        {item.role}
                      </h3>
                    </div>

                    <p className="mt-1 font-mono text-xs font-bold text-[var(--blue-ink)]">
                      {item.institution}
                    </p>

                    <p className="mt-3 font-sans text-xs leading-relaxed text-[var(--muted)]">
                      {item.summary}
                    </p>
                  </div>

                  <ul className="mt-5 space-y-1.5 border-t border-dashed border-[var(--border-ink)] pt-4 font-mono text-[11px] text-[var(--ink-soft)]">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="text-[var(--red-ink)]">›</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Languages Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-md border-2 border-[var(--ink)] bg-[var(--paper-card)] px-5 py-3.5 shadow-[4px_5px_0_rgba(41,56,74,0.12)]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
              <Languages className="h-4 w-4 text-[var(--red-ink)]" aria-hidden="true" />
              <span>Languages</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
              {PROFILE.languages.map((lang) => (
                <div key={lang.language} className="flex items-center gap-2">
                  <span className="font-bold text-[var(--ink)]">{lang.language}</span>
                  <span className="nb-chip text-[10px]">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
