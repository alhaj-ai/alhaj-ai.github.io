# PROJECT_PLAN.md — Living Roadmap

> **Rule**: This file is the single source of truth. Update it after every completed task.

## Phase 1: Foundation & Setup
- [x] [DONE] Project scaffolding (`package.json`, `next.config.mjs` static export, Tailwind CSS, TypeScript, `.gitignore`, GitHub Pages workflow)
- [x] [DONE] Typed portfolio data model (`lib/portfolio-data.ts`) grounded in verified repos & credentials
- [x] [DONE] Initialize & maintain live `CODEBASE_MAP.md`

## Phase 2: Core Features & UI Experience
- [x] [DONE] Root layout, dark obsidian (`#030305`) / light theme system, accessible navigation header, and custom metadata (`app/layout.tsx`, `app/globals.css`)
- [x] [DONE] Hero identity section + live `Open to Remote` badge + Three.js 3D WebGL Execution Harness Core + constellation backdrop (`NeuralHarness3D.tsx`, `NeuralBackdrop.tsx`)
- [x] [DONE] Interactive filterable Projects Showcase (`6` Flagship systems + `8` Domain systems + `TiltCard3D` cursor glow + live filter & empty-state reset)
- [x] [DONE] AI Engineering Workflow & Execution Harness visual diagram (`AboutAndArchitecture.tsx`)
- [x] [DONE] Verified Credentials & Skills Matrix (`Google DeepMind`, `IBM Credly RAG`, `Anthropic Claude Code in Action`)

## Phase 3: Polish, Verification & Live Deployment
- [x] [DONE] Error boundary (`app/error.tsx`), 404 page (`app/not-found.tsx`), loading state, and `tsc --noEmit` + `next build` static export verification
- [x] [DONE] Live headless browser verification (WebGL 3D rendering, presets, filters, empty state, theme toggle, DeepMind images, 0 exceptions)
- [x] [DONE] Create GitHub repo `alhaj-ai/alhaj-ai.github.io`, push `main`, enable GitHub Pages workflow, verify live HTTP 200 & link in `alhaj-ai/README.md`

## Phase 4: Ruled Engineering Notebook Redesign & 3D LLM/RAG Architecture
- [x] [DONE] Shared `lib/portfolio-helpers.ts` + TDD unit tests (`lib/__tests__/portfolio-helpers.test.ts`)
- [x] [DONE] Upgrade `NeuralHarness3D` with 3 interactive views: `LLM + Harness`, `Hybrid RAG Vectors` (Tenant Qdrant cube + Top-K query rays), and `Multi-Agent Graph`
- [x] [DONE] Implement warm ruled Engineering Notebook theme + optional Dark Ink toggle (`InteractiveParticleNetwork`, `NotebookNav`, `NotebookHero`, `NotebookToolkitAndWork`, `NotebookDemosAndJourney`, `NotebookAboutAndContact`)
- [x] [DONE] Apply `humanizer` prose pass across all UI copy and remove unused legacy components
- [x] [DONE] Final verification (`tsc --noEmit`, tests, `next build`), PR merge to `main`, and live GitHub Pages check

## Phase 5: Concise Outcome-First Copy & Portfolio Refinement
- [x] [DONE] Update `lib/portfolio-data.ts`, `lib/__tests__/portfolio-helpers.test.ts`, and `Notebook*` components with concise, humanized, outcome-first copy (4-pillar toolkit without arbitrary skill percentages, tightened 2-sentence project cards with verified proof metrics, Education/Experience/Mentoring journey, and 3 engineering principles)
- [x] [DONE] Run `typecheck` (0 errors), 6/6 unit tests with `tsx`, and `next build` static export (`out/` generated successfully), updating `CODEBASE_MAP.md` and `PROJECT_PLAN.md`

## Current Sprint
**Active Task**: Phase 5 — Concise Outcome-First Copy & Portfolio Refinement
**Status**: ✅ COMPLETE
