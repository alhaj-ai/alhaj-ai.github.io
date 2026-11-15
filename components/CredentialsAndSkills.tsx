import { ArrowUpRight, Award, BadgeCheck, ExternalLink } from "lucide-react";
import { CREDENTIALS, SKILL_GROUPS } from "@/lib/portfolio-data";
import { TiltCard3D } from "@/components/TiltCard3D";
import { MotionReveal } from "@/components/MotionReveal";

export function CredentialsAndSkills() {
  return (
    <>
      <section
        id="credentials"
        className="relative z-10 border-b border-border/80 bg-surface/35 py-16 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <MotionReveal>
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Credentials &amp; Badges
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Selected AI Certifications &amp; Skill Badges
              </h2>
              <p className="mt-2 text-sm text-muted sm:text-base">
                Focused credentials aligned with language model training, retrieval architectures, and agentic coding workflows.
              </p>
            </div>
          </MotionReveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {CREDENTIALS.map((cred, idx) => (
              <MotionReveal key={cred.id} delay={idx * 0.05}>
                <TiltCard3D
                  intensity={4.5}
                  className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface/80 p-5 backdrop-blur-md"
                >
                  <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
                    {cred.imageSrc ? (
                      <div className="w-full shrink-0 overflow-hidden rounded-lg border border-border bg-white p-2 sm:w-32">
                        <img
                          src={cred.imageSrc}
                          alt={`${cred.issuer} ${cred.title}`}
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                        <Award className="h-6 w-6" aria-hidden="true" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-accent">
                          {cred.issuer}
                        </span>
                        <span className="rounded border border-border bg-surface-elevated px-2 py-0.5 text-[11px] font-medium text-muted">
                          {cred.level}
                        </span>
                      </div>

                      <h3 className="mt-1.5 text-base font-bold text-ink">{cred.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {cred.highlights}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                    <span className="font-mono text-muted">{cred.issuedAt}</span>

                    {cred.verifyUrl ? (
                      <a
                        href={cred.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                      >
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        Verify Credential
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-muted">
                        <BadgeCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                        Official Badge Displayed
                      </span>
                    )}
                  </div>
                </TiltCard3D>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative z-10 border-b border-border/80 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <MotionReveal>
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Technical Stack
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Production Tools &amp; Capabilities
              </h2>
            </div>
          </MotionReveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.domain}
                className="rounded-xl border border-border bg-surface/80 p-5 backdrop-blur-md transition-colors hover:border-accent/40"
              >
                <h3 className="text-sm font-bold text-ink">{group.domain}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-surface-elevated/80 px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-ink"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-1.5 text-xs text-muted">
            <span>
              Flagship and Selected Domain sections highlight CI-verified repositories; additional TensorFlow, XGBoost, data-mining, and Django REST projects live in the
            </span>
            <a
              href="https://github.com/alhaj-ai?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 font-semibold text-accent hover:underline"
            >
              public GitHub archive
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <span>.</span>
          </p>
        </div>
      </section>
    </>
  );
}
