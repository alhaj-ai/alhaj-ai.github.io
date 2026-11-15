# CODEBASE_MAP.md — Living Architecture & Knowledge Graph

> **Agent Invariant**: Consult this map before writing code. Update it incrementally after every addition or modification.

## 1. System Overview
- **Framework**: Next.js 14 App Router (`output: 'export'`, `images.unoptimized: true`)
- **Language / Runtime**: TypeScript 5.6 / React 18 / Node.js 24
- **Styling & Identity**: True Pitch-Black Obsidian dark mode (`--canvas: 3 3 5`) + Light toggle (`--canvas: 250 250 252`), Tailwind CSS, Framer Motion, Three.js WebGL

## 2. Entry Points & Bootstrap
- Root layout: `app/layout.tsx` (`Inter` & `JetBrains_Mono`, metadata, skip-to-content)
- Home route: `app/page.tsx`
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
| `PROFILE`, `VERIFIED_METRICS`, `ARCHITECTURE_STAGES`, `FLAGSHIP_PROJECTS`, `DOMAIN_PROJECTS`, `CREDENTIALS`, `SKILL_GROUPS` | `lib/portfolio-data.ts` | Verified portfolio copy, repository stats, credentials, and skill taxonomy |

## 5. Reusable Components & Shared Utilities
| Name | Path | Purpose |
|---|---|---|
| `NeuralBackdrop` | `components/NeuralBackdrop.tsx` | Fixed canvas 2D constellation particle network on obsidian black backdrop |
| `NeuralHarness3D` | `components/NeuralHarness3D.tsx` | Interactive Three.js WebGL obsidian LLM core + 3 rotating harness orbital rings + pointer drag/camera presets + WebGL fallback |
| `TiltCard3D` | `components/TiltCard3D.tsx` | Physics-lerped 3D perspective card wrapper with cursor-angle tracking conic border glow |
| `MotionReveal` | `components/MotionReveal.tsx` | Reduced-motion-aware Framer Motion entrance wrapper |
| `Navbar` | `components/Navbar.tsx` | Frosted obsidian sticky header, mobile drawer, dark/light theme switcher |
| `HeroSection` | `components/HeroSection.tsx` | Identity headline, typewriter loop, dynamic 3D hero core, verified metric strip |
| `AboutAndArchitecture` | `components/AboutAndArchitecture.tsx` | Narrative + glowing vertical-track interactive 4-layer workflow explorer |
| `ProjectsShowcase` | `components/ProjectsShowcase.tsx` | Filterable Flagship 6 + Domain 8 grid with expandable traces & empty-state reset |
| `CredentialsAndSkills` | `components/CredentialsAndSkills.tsx` | Verified DeepMind/IBM/Anthropic cards + full technical stack grid |
| `FooterSection` | `components/FooterSection.tsx` | Contact CTA with clipboard email copy + social links |

## 6. Dependency Graph & Hot Spots
- Static assets: `public/.nojekyll`, `public/badges/deepmind-train-slm.png`, `public/badges/deepmind-build-slm.png`
- Targeted skills provisioned in `.gemini/skills/`: `interactive-portfolio`, `3d-web-experience`
