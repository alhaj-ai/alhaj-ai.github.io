"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, FolderGit2, Layers, RotateCcw, Search } from "lucide-react";
import {
  CORE_TOOLKIT_DOMAINS,
  DOMAIN_PROJECTS,
  ENGINEERING_PRINCIPLES,
  FLAGSHIP_PROJECTS,
  PROFILE,
  PROJECT_CATEGORIES,
  SKILL_GROUPS,
  type ProjectCategory,
} from "@/lib/portfolio-data";
import { filterDomainProjects, filterFlagshipProjects } from "@/lib/portfolio-helpers";

const CARD_ACCENTS = [
  "rgba(184, 79, 69, 0.16)",
  "rgba(85, 121, 154, 0.18)",
  "rgba(232, 189, 94, 0.25)",
  "rgba(5, 150, 105, 0.16)",
  "rgba(139, 92, 246, 0.16)",
  "rgba(234, 88, 12, 0.16)",
];

export function NotebookToolkitAndWork() {
  const [showDomainMatrix, setShowDomainMatrix] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openTraceId, setOpenTraceId] = useState<string | null>("haseen-ai");

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
      {/* 02 // Engineering Toolkit & Working Range */}
      <section
        id="skills"
        className="border-b-2 border-[var(--ink)] bg-[rgba(247,241,226,0.48)] px-5 py-20 dark:bg-transparent sm:px-10 md:px-[6.5vw]"
      >
        <div className="mx-auto grid max-w-[1340px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="nb-eyebrow">
              <span className="nb-num">02</span>
              <span>Technical Range</span>
            </p>
            <h2 className="mt-4 font-hand text-5xl font-bold leading-[0.84] tracking-tight text-[var(--ink)] sm:text-6xl lg:text-7xl">
              Depth where
              <br />
              it <span className="text-[var(--red-ink)]">matters.</span>
            </h2>
            <p className="mt-5 max-w-md font-hand text-xl leading-[1.45] text-[var(--ink-soft)]">
              A working toolkit organized around shipped systems: grounded retrieval, deterministic agent loops, local model fine-tuning, and production APIs.
            </p>

            {/* 3 Core Engineering Principles (inspired by Manus & Senior Systems) */}
            <div className="mt-8 space-y-4 border-t border-dashed border-[var(--border-ink)] pt-6">
              {ENGINEERING_PRINCIPLES.map((principle) => (
                <div key={principle.letter} className="flex items-start gap-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--ink)] bg-[var(--mustard)] font-mono text-xs font-bold text-[#26374a] dark:text-[#071006]">
                    {principle.letter}
                  </span>
                  <div>
                    <h3 className="font-hand text-xl font-bold text-[var(--ink)]">
                      {principle.title}
                    </h3>
                    <p className="font-sans text-xs leading-relaxed text-[var(--muted)]">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowDomainMatrix((prev) => !prev)}
              aria-expanded={showDomainMatrix}
              className="mt-8 inline-flex items-center gap-2 rounded-md border-2 border-[var(--ink)] bg-[var(--paper-card)] px-4 py-2 font-mono text-xs font-bold text-[var(--ink)] shadow-[3px_4px_0_rgba(41,56,74,0.14)] transition-transform hover:-translate-y-0.5"
            >
              <Layers className="h-3.5 w-3.5 text-[var(--red-ink)]" aria-hidden="true" />
              {showDomainMatrix ? "Hide Detailed 7-Domain Breakdown" : "Inspect All 7 Tool Domains"}
            </button>
          </div>

          {/* 4 Pillars 2x2 Grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {CORE_TOOLKIT_DOMAINS.map((domain, idx) => (
              <div
                key={domain.id}
                className={`nb-card flex flex-col justify-between p-5 ${
                  idx % 2 === 0 ? "nb-card-tilt-left" : "nb-card-tilt-right"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] font-bold text-[var(--red-ink)]">
                    <span>DOMAIN {domain.number}</span>
                    <span className="text-[var(--muted)]">{domain.skills.length} TOOLS</span>
                  </div>
                  <h3 className="mt-2 font-hand text-2xl font-bold leading-tight text-[var(--ink)]">
                    {domain.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-[var(--muted)]">{domain.focus}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                  {domain.skills.map((skill) => (
                    <span key={skill} className="nb-chip text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showDomainMatrix && (
          <div className="mx-auto mt-12 grid max-w-[1340px] gap-5 md:grid-cols-2 lg:grid-cols-3">
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

                        {/* Concrete Proof Metrics (Manus & Minhajul inspired) */}
                        {project.proofMetrics && project.proofMetrics.length > 0 && (
                          <div className="relative z-10 mt-4 grid grid-cols-2 gap-3 rounded-md border border-[var(--border-ink)] bg-[var(--paper)]/60 p-3 font-mono">
                            {project.proofMetrics.map((pm) => (
                              <div key={pm.label} className="min-w-0">
                                <span className="block text-base font-bold text-[var(--red-ink)]">
                                  {pm.value}
                                </span>
                                <span className="block truncate text-[10px] uppercase tracking-wider text-[var(--muted)]">
                                  {pm.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

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
