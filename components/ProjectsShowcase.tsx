"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  RotateCcw,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  DOMAIN_PROJECTS,
  FLAGSHIP_PROJECTS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/lib/portfolio-data";
import { TiltCard3D } from "@/components/TiltCard3D";
import { MotionReveal } from "@/components/MotionReveal";

export function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTraceId, setExpandedTraceId] = useState<string | null>("haseen-ai");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredFlagship = useMemo(() => {
    return FLAGSHIP_PROJECTS.filter((project) => {
      const categoryMatch =
        selectedCategory === "All" || project.categories.includes(selectedCategory);
      if (!categoryMatch) return false;
      if (!normalizedQuery) return true;
      const haystack = [
        project.name,
        project.subtitle,
        project.problem,
        project.architecture,
        project.verification,
        ...project.stack,
        ...project.codePaths,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [selectedCategory, normalizedQuery]);

  const filteredDomain = useMemo(() => {
    return DOMAIN_PROJECTS.filter((project) => {
      const categoryMatch =
        selectedCategory === "All" || project.categories.includes(selectedCategory);
      if (!categoryMatch) return false;
      if (!normalizedQuery) return true;
      const haystack = [
        project.name,
        project.scope,
        project.verification,
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [selectedCategory, normalizedQuery]);

  const totalMatches = filteredFlagship.length + filteredDomain.length;

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <section id="projects" className="relative z-10 border-b border-border/80 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <MotionReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Verified Portfolio
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Flagship &amp; CI-Verified Engineering Systems
              </h2>
              <p className="mt-2 text-sm text-muted sm:text-base">
                Every project below links directly to its GitHub source with verified tests, release tags, or runnable execution traces.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Filter by stack, metric, or repo..."
                aria-label="Filter projects by technology, metric, or repository name"
                className="w-full rounded-lg border border-border bg-surface/85 py-2 pl-9 pr-3 text-sm text-ink backdrop-blur-md placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
            {PROJECT_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "border-accent bg-accent text-slate-950 shadow-[0_0_16px_rgba(16,185,129,0.28)]"
                      : "border-border bg-surface/75 text-muted backdrop-blur-md hover:border-accent/40 hover:text-ink"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {totalMatches === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-surface/80 p-10 text-center backdrop-blur-md">
            <FolderGit2 className="mx-auto h-10 w-10 text-muted" aria-hidden="true" />
            <h3 className="mt-3 text-base font-semibold text-ink">
              No repositories match &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="mt-1 text-sm text-muted">
              Try clearing your filter or switching back to all categories.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-slate-950 transition-opacity hover:opacity-90"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset filters
            </button>
          </div>
        ) : (
          <>
            {filteredFlagship.length > 0 && (
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {filteredFlagship.map((project, idx) => {
                  const isTraceOpen = expandedTraceId === project.id;
                  return (
                    <MotionReveal key={project.id} delay={idx * 0.04}>
                      <TiltCard3D
                        intensity={5.5}
                        className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface/80 p-6 backdrop-blur-md"
                      >
                        <div className="relative z-10">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-lg font-bold text-ink transition-colors hover:text-accent"
                              >
                                {project.name}
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                              </a>
                              <p className="text-sm font-medium text-accent">{project.subtitle}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="rounded-md border border-border bg-surface-elevated px-2 py-0.5 font-mono text-xs text-muted">
                                {project.releaseTag}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                                {project.ciLabel}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded border border-border bg-surface-elevated/80 px-2 py-0.5 font-mono text-[11px] text-muted"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <dl className="mt-4 space-y-2.5 text-sm">
                            <div>
                              <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                                Failure Mode
                              </dt>
                              <dd className="mt-0.5 text-muted">{project.problem}</dd>
                            </div>
                            <div>
                              <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                                Architecture
                              </dt>
                              <dd className="mt-0.5 leading-relaxed text-ink">
                                {project.architecture}
                              </dd>
                            </div>
                            <div>
                              <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                                Verification
                              </dt>
                              <dd className="mt-0.5 font-medium text-ink">
                                {project.verification}
                              </dd>
                            </div>
                          </dl>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.codePaths.map((path) => (
                              <code
                                key={path}
                                className="rounded bg-surface-elevated px-2 py-1 font-mono text-[11px] text-muted"
                              >
                                {path}
                              </code>
                            ))}
                          </div>
                        </div>

                        {project.traceOutput && (
                          <div className="relative z-10 mt-5 border-t border-border pt-3">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedTraceId(isTraceOpen ? null : project.id)
                              }
                              aria-expanded={isTraceOpen}
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:underline"
                            >
                              {isTraceOpen ? (
                                <ChevronUp className="h-4 w-4" aria-hidden="true" />
                              ) : (
                                <ChevronDown className="h-4 w-4" aria-hidden="true" />
                              )}
                              {project.traceTitle}
                            </button>

                            {isTraceOpen && (
                              <pre className="mt-2.5 overflow-x-auto rounded-lg border border-border bg-canvas/90 p-3 font-mono text-xs leading-relaxed text-ink">
                                <code>{project.traceOutput}</code>
                              </pre>
                            )}
                          </div>
                        )}
                      </TiltCard3D>
                    </MotionReveal>
                  );
                })}
              </div>
            )}

            {filteredDomain.length > 0 && (
              <div className="mt-12">
                <h3 className="text-lg font-bold text-ink">Selected Domain Systems</h3>
                <p className="mt-1 text-sm text-muted">
                  Additional production and specialized agent repositories passing automated CI checks.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {filteredDomain.map((item) => (
                    <TiltCard3D
                      key={item.id}
                      intensity={3.5}
                      className="rounded-xl border border-border bg-surface/80 backdrop-blur-md"
                    >
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative z-10 block p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 text-sm font-bold text-ink group-hover:text-accent">
                            {item.name}
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="font-mono text-[11px] font-medium text-accent">
                            {item.verification}
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-muted">{item.scope}</p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-border bg-surface-elevated px-2 py-0.5 font-mono text-[11px] text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </a>
                    </TiltCard3D>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
