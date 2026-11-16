"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, FolderGit2, Layers, RotateCcw, Search } from "lucide-react";
import {
  DOMAIN_PROJECTS,
  FLAGSHIP_PROJECTS,
  PROFILE,
  PROJECT_CATEGORIES,
  SKILL_GROUPS,
  type ProjectCategory,
} from "@/lib/portfolio-data";
import { filterDomainProjects, filterFlagshipProjects } from "@/lib/portfolio-helpers";

const SKILL_BARS = [
  ["Python & Async APIs", 94],
  ["LLMs & Agent Workflows", 92],
  ["PyTorch & Fine-Tuning", 89],
  ["Hybrid RAG & Reranking", 90],
  ["FastAPI & REST Services", 88],
  ["Next.js & TypeScript", 86],
  ["Computer Vision & OCR", 84],
  ["Testing & Evaluation", 92],
  ["PostgreSQL & SQLite", 85],
  ["Docker & GitHub Actions", 86],
] as const;

const CARD_ACCENTS = [
  "rgba(184, 79, 69, 0.16)",
  "rgba(85, 121, 154, 0.18)",
  "rgba(232, 189, 94, 0.25)",
  "rgba(5, 150, 105, 0.16)",
  "rgba(139, 92, 246, 0.16)",
  "rgba(234, 88, 12, 0.16)",
];

export function NotebookToolkitAndWork() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [barsVisible, setBarsVisible] = useState(false);
  const [showDomainMatrix, setShowDomainMatrix] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openTraceId, setOpenTraceId] = useState<string | null>("haseen-ai");

  useEffect(() => {
    const node = barRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const filteredFlagship = useMemo(
    () => filterFlagshipProjects(FLAGSHIP_PROJECTS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  const filteredDomain = useMemo(
    () => filterDomainProjects(DOMAIN_PROJECTS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  const totalMatches = filteredFlagship.length + filteredDomain.length;

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <>
      {/* 02 // Engineering Toolkit & Animated Skill Bars */}
      <section
        id="skills"
        className="border-b-2 border-[var(--ink)] bg-[rgba(247,241,226,0.48)] px-5 py-20 dark:bg-transparent sm:px-10 md:px-[6.5vw]"
      >
        <div className="mx-auto grid max-w-[1340px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="nb-eyebrow">
              <span className="nb-num">02</span>
              <span>Engineering Toolkit</span>
            </p>
            <h2 className="mt-4 font-hand text-5xl font-bold leading-[0.84] tracking-tight text-[var(--ink)] sm:text-6xl lg:text-7xl">
              Code, models,
              <br />
              and <span className="text-[var(--red-ink)]">harnesses.</span>
            </h2>
            <p className="mt-5 max-w-md font-hand text-xl leading-[1.45] text-[var(--ink-soft)]">
              Every tool here comes from shipped repositories covering local model training, crash-safe agent loops, Qdrant retrieval, and FastAPI services.
            </p>

            <button
              type="button"
              onClick={() => setShowDomainMatrix((prev) => !prev)}
              aria-expanded={showDomainMatrix}
              className="mt-6 inline-flex items-center gap-2 rounded-md border-2 border-[var(--ink)] bg-[var(--paper-card)] px-4 py-2 font-mono text-xs font-bold text-[var(--ink)] shadow-[3px_4px_0_rgba(41,56,74,0.14)] transition-transform hover:-translate-y-0.5"
            >
              <Layers className="h-3.5 w-3.5 text-[var(--red-ink)]" aria-hidden="true" />
              {showDomainMatrix ? "Hide 7-Domain Stack" : "Inspect All 7 Tool Domains"}
            </button>
          </div>

          <div ref={barRef} className="self-center border-t border-[var(--border-ink)]">
            {SKILL_BARS.map(([label, pct], idx) => (
              <div
                key={label}
                className="grid min-h-[54px] grid-cols-[150px_1fr_44px] items-center gap-4 border-b border-[var(--border-ink)] py-2 font-mono text-xs sm:grid-cols-[190px_1fr_48px]"
              >
                <span className="font-hand text-base font-bold text-[var(--ink-soft)]">
                  {label}
                </span>
                <div className="h-2 overflow-hidden rounded-full bg-[rgba(41,56,74,0.13)] dark:bg-white/10">
                  <div
                    style={{
                      width: barsVisible ? `${pct}%` : "0%",
                      transitionDelay: `${idx * 45}ms`,
                    }}
                    className="h-full bg-gradient-to-r from-[var(--blue-ink)] to-[var(--red-ink)] transition-all duration-1000 ease-out"
                  />
                </div>
                <b className="text-right font-mono text-xs font-bold text-[var(--red-ink)]">
                  {pct}%
                </b>
              </div>
            ))}
          </div>
        </div>

        {showDomainMatrix && (
          <div className="mx-auto mt-10 grid max-w-[1340px] gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group, idx) => (
              <div
                key={group.domain}
                className={`nb-card p-5 ${idx % 2 === 0 ? "nb-card-tilt-left" : "nb-card-tilt-right"}`}
              >
                <h3 className="font-hand text-2xl font-bold text-[var(--ink)]">{group.domain}</h3>
                <p className="mt-1 font-sans text-xs text-[var(--muted)]">{group.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((tool) => (
                    <span key={tool} className="nb-chip">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 03 // Selected Work (Tilted Sketchy Notebook Cards) */}
      <section
        id="work"
        className="border-b-2 border-[var(--ink)] px-5 py-20 sm:px-10 md:px-[6.5vw]"
      >
        <div className="mx-auto max-w-[1340px]">
          <div className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr_0.9fr]">
            <div>
              <p className="nb-eyebrow">
                <span className="nb-num">03</span>
                <span>Selected Work</span>
              </p>
            </div>

            <h2 className="font-hand text-5xl font-bold leading-[0.84] tracking-tight text-[var(--ink)] sm:text-6xl lg:text-7xl">
              Shipped systems,
              <br />
              backed by <span className="text-[var(--red-ink)]">tests.</span>
            </h2>

            <p className="font-hand text-xl leading-[1.42] text-[var(--ink-soft)]">
              Every repo below links straight to its GitHub source, pytest results, or CLI output.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-10 flex flex-col gap-4 border-y border-[var(--border-ink)] py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
              {PROJECT_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-md border px-3 py-1 font-hand text-lg font-bold transition-all ${
                      active
                        ? "border-2 border-[var(--ink)] bg-[var(--mustard)] text-[#26374a] shadow-[2px_3px_0_rgba(41,56,74,0.2)] dark:text-[#071006]"
                        : "border-dashed border-[var(--border-ink)] bg-[var(--paper-card)] text-[var(--ink-soft)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stack, metric, repo..."
                aria-label="Filter projects by stack, metric, or repository name"
                className="w-full rounded-md border-2 border-[var(--ink)] bg-[var(--paper-card)] py-1.5 pl-9 pr-3 font-hand text-lg text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
              />
            </div>
          </div>

          {totalMatches === 0 ? (
            <div className="nb-card mt-10 p-10 text-center">
              <FolderGit2 className="mx-auto h-10 w-10 text-[var(--red-ink)]" aria-hidden="true" />
              <h3 className="mt-3 font-hand text-3xl font-bold text-[var(--ink)]">
                No repositories match &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="mt-1 font-sans text-sm text-[var(--muted)]">
                Clear the search box or switch categories to show all 14 repositories.
              </p>
              <button type="button" onClick={resetFilters} className="nb-primary-btn mt-5">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset filters
              </button>
            </div>
          ) : (
            <>
              {filteredFlagship.length > 0 && (
                <div className="mt-10 grid gap-7 md:grid-cols-2">
                  {filteredFlagship.map((project, idx) => {
                    const isOpen = openTraceId === project.id;
                    const glowColor = CARD_ACCENTS[idx % CARD_ACCENTS.length];
                    return (
                      <article
                        key={project.id}
                        className={`nb-card relative flex min-h-[440px] flex-col overflow-hidden p-7 sm:p-8 ${
                          idx % 2 === 0 ? "nb-card-tilt-left" : "nb-card-tilt-right"
                        }`}
                      >
                        <div
                          aria-hidden="true"
                          style={{
                            background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
                          }}
                          className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full"
                        />

                        <div className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-4 font-mono text-[11px] font-bold tracking-widest text-[var(--muted)]">
                          <span className="text-[var(--red-ink)]">0{idx + 1}</span>
                          <span className="uppercase">{project.releaseTag} · {project.ciLabel}</span>
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.name} repository on GitHub`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ink)] bg-[var(--mustard)] text-[#26374a] transition-transform hover:scale-105 dark:text-[#071006]"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>

                        <h3 className="relative z-10 mt-6 font-hand text-4xl font-bold leading-[0.9] text-[var(--ink)] sm:text-5xl">
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[var(--red-ink)]"
                          >
                            {project.name}
                          </a>
                        </h3>
                        <p className="relative z-10 mt-1 font-mono text-xs font-bold text-[var(--blue-ink)]">
                          {project.subtitle}
                        </p>

                        <p className="relative z-10 mt-4 font-hand text-xl leading-[1.38] text-[#526171] dark:text-[#aeb6ab]">
                          {project.architecture}
                        </p>

                        <p className="relative z-10 mt-4 border-t border-dashed border-[var(--border-ink)] pt-3 font-mono text-[11px] leading-relaxed text-[var(--ink-soft)]">
                          <strong className="text-[var(--red-ink)]">CHECKS: </strong>
                          {project.verification}
                        </p>

                        <div className="relative z-10 mt-auto flex flex-wrap gap-1.5 pt-5">
                          {project.stack.map((tech) => (
                            <span key={tech} className="nb-chip">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {project.traceOutput && (
                          <div className="relative z-10 mt-4 border-t border-[var(--border-ink)] pt-3">
                            <button
                              type="button"
                              onClick={() => setOpenTraceId(isOpen ? null : project.id)}
                              aria-expanded={isOpen}
                              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[var(--red-ink)] hover:underline"
                            >
                              {isOpen ? (
                                <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                              )}
                              {project.traceTitle}
                            </button>
                            {isOpen && (
                              <pre className="mt-2 overflow-x-auto rounded border border-[var(--border-ink)] bg-[#efe5cf]/70 p-3 font-mono text-[11px] leading-relaxed text-[var(--ink)] dark:bg-black/40">
                                <code>{project.traceOutput}</code>
                              </pre>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Selected Domain Repositories (8 Specialized CI Repos) */}
              {filteredDomain.length > 0 && (
                <div className="mt-14">
                  <h3 className="font-hand text-3xl font-bold text-[var(--ink)]">
                    More tested repositories
                  </h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {filteredDomain.map((item) => (
                      <a
                        key={item.id}
                        href={item.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="nb-card flex flex-col justify-between p-4"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-hand text-xl font-bold text-[var(--ink)]">
                              {item.name}
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--red-ink)]" />
                          </div>
                          <p className="mt-1 font-mono text-[10px] font-bold text-[var(--blue-ink)]">
                            {item.verification}
                          </p>
                          <p className="mt-2 font-sans text-xs leading-relaxed text-[var(--muted)]">
                            {item.scope}
                          </p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1 pt-2">
                          {item.stack.slice(0, 4).map((tech) => (
                            <span key={tech} className="nb-chip text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <a
            href={`${PROFILE.links.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-2 border-b-2 border-current pb-1 font-hand text-xl font-bold text-[var(--red-ink)] hover:opacity-80"
          >
            Explore the complete GitHub repository archive
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
