# CODEBASE_MAP.md — Living Architecture & Knowledge Graph

> **Agent Invariant**: Consult this map before writing code. Update it incrementally after every addition or modification.

## 1. System Overview
- **Framework**: Next.js 14 App Router (`output: 'export'`, `images.unoptimized: true`)
- **Language / Runtime**: TypeScript 5.6 / React 18 / Node.js 24
- **Styling & Identity**: Ruled Engineering Notebook theme (`#f4eddd` cream ruled paper, `#29384a` charcoal ink, `#b84f45` terracotta red ink, `#e8bd5e` mustard pill CTAs, `#d9b65e` bold footer) + optional Dark Ink toggle (`.dark`), Tailwind CSS, Three.js WebGL, Canvas 2D Physics Constellation

## 2. Entry Points & Bootstrap
- Root layout: `app/layout.tsx` (`Caveat` handwritten display, `Inter`, `JetBrains_Mono`, `Instrument_Serif`, metadata, skip-to-content)
- Home route: `app/page.tsx` (`NotebookNav`, `NotebookHero`, `NotebookToolkitAndWork`, `NotebookDemosAndJourney`, `NotebookAboutAndContact`)
- UI States: `app/loading.tsx`, `app/error.tsx`, `app/not-found.tsx`
- Deployment: `.github/workflows/deploy.yml` (publishes `./out` to GitHub Pages)

## 3. Registered Routes & Endpoints
| Route / URL | Handler File | Method | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | Static | Main portfolio landing page |
| `/404` | `app/not-found.tsx` | Static | Fallback 404 screen |

## 4. Data Models & Schemas
| Model Name | File Path | Description |
|---|---|---|
| `PROFILE`, `VERIFIED_METRICS`, `ENGINEERING_PRINCIPLES`, `CORE_TOOLKIT_DOMAINS`, `JOURNEY_TIMELINE`, `ARCHITECTURE_STAGES`, `FLAGSHIP_PROJECTS`, `DOMAIN_PROJECTS`, `CREDENTIALS`, `SKILL_GROUPS`, `CODE_SHOWCASE_TABS`, `MARQUEE_STACK`, `COMPANION_QUICK_PROMPTS` | `lib/portfolio-data.ts` | Verified portfolio copy, repository stats, 4-pillar toolkit, 3 engineering principles, journey timeline, flagship proof metrics, pipeline nodes, credentials, and skill taxonomy |
| `filterFlagshipProjects`, `filterDomainProjects`, `answerPortfolioQuery` | `lib/portfolio-helpers.ts` | Shared category/query filter logic and zero-hallucination deterministic AI Companion query matcher |
| Unit tests | `lib/__tests__/portfolio-helpers.test.ts` | Node built-in test suite covering project filtering, proof metrics, toolkit domains, principles, journey entries, and AI Companion prompt/fallback handling |

## 5. Reusable Components & Shared Utilities
| Name | Path | Purpose |
|---|---|---|
| `InteractiveParticleNetwork` | `components/InteractiveParticleNetwork.tsx` | Mouse-reactive physics particle constellation synced to notebook ink / dark theme palette |
| `NeuralHarness3D` | `components/NeuralHarness3D.tsx` | Interactive Three.js WebGL architecture stage (LLM + Harness core, Hybrid RAG vector cube & query rays, Multi-Agent loop) |
| `NotebookNav` | `components/NotebookNav.tsx` | Sticky frosted paper navbar, 2-column ruled mobile drawer with 9-section anchors, optional dark ink toggle |
| `NotebookHero` | `components/NotebookHero.tsx` | Ruled paper hero with punchy headline, mustard pill CTA, cycling `ExpertisePulse` note, location badge, and 4-column Signal Strip |
| `NotebookToolkitAndWork` | `components/NotebookToolkitAndWork.tsx` | 4 Core Engineering Domains + 3 Core Engineering Principles + expandable 7-domain stack, filterable Flagship cards with proof metrics + 8 Domain repos |
| `NotebookDemosAndJourney` | `components/NotebookDemosAndJourney.tsx` | 6-tab Systems in Motion browser stage + 3D Architecture Pipeline Journey + DeepMind/IBM/Anthropic Credentials + Education/Mentoring Journey & Languages strip |
| `NotebookAboutAndContact` | `components/NotebookAboutAndContact.tsx` | Engineering dossier, About narrative, direct email/phone/social contact links, notebook inquiry draft form, and bold Mustard Gold Footer |

## 6. Dependency Graph & Hot Spots
- Static assets: `public/.nojekyll`, `public/robots.txt`, `public/sitemap.xml`, `public/badges/deepmind-train-slm.png`, `public/badges/deepmind-build-slm.png`
- Targeted skills provisioned in `.gemini/skills/`: `interactive-portfolio`, `3d-web-experience`
