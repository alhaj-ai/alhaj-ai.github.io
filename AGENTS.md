# Project Agent Charter

## Project Identity
- **Name**: alhaj-ai.github.io (Mohammed Al-Haj AI Engineering Portfolio)
- **Stack**: Next.js (App Router, Static Export for GitHub Pages), TypeScript, Tailwind CSS
- **Architecture**: Idiomatic Next.js App Router (`app/`, `components/`, `lib/`, `public/`)

## Agent Mandatory Rules (Every Session)
1. Read `PROJECT_PLAN.md` FIRST before writing any code or responding about implementation.
2. Work ONLY on the task currently marked `[IN PROGRESS]`. Never skip ahead.
3. Consult `CODEBASE_MAP.md` before creating new files to prevent duplicate code, data schemas, or components.
4. Incrementally update `CODEBASE_MAP.md` whenever adding or modifying routes, data models, or components.
5. After completing and verifying a task, mark it `[DONE]` and update `PROJECT_PLAN.md`.
6. Every statement, metric, project detail, and credential link must be verified directly from repository source files and user-provided credentials — zero fabricated benchmarks.

## UI Standard
Every interactive screen/section handles: Loading (`loading` / smooth hydration fallback) -> Empty State (when search/filter yields zero results with quick reset) -> Error Boundary (`app/error.tsx` & `app/not-found.tsx` with recovery) -> Success State (dark/light readable tokens, keyboard navigation, accessible ARIA labels, responsive desktop & mobile).
