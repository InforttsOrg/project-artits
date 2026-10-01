# Artits — Personal Portfolio & Resume

**Live domain:** `artits.infortts.site`

Artits is Sahil Rathee’s personal portfolio and professional resume hub. It is the canonical public surface for his work, skills, projects, and connections.

## Purpose

- Showcase projects and case studies
- Highlight skills and capabilities
- Provide contact/connection pathways
- Serve as a dynamic, web-native copy of his resume

## Relationship to `rttss-sahil/rttss-sahil`

The `rttss-sahil/rttss-sahil` repository is the lightweight public GitHub resume source. It contains only:
- `README.md`
- Resume assets (PDF, images)

All richer portfolio content, interactivity, and design live under this `artits` project.

## Tech Stack

- Frontend: Vite 5 + React 18 + TypeScript, styled by hand-written CSS in `src/index.css` (CSS custom properties in `:root`, no CSS framework)
- Canvas / animation: raw Canvas 2D and CSS transforms in `src/components/` (`MemoryGraph3D.tsx`, `Cursor3D.tsx`, `GameOfLife.tsx`) — no WebGL/3D library
- Edge API: Cloudflare Pages Functions (TypeScript) in `functions/api/`
- Automation: Playwright + Python in `scripts/`
- PDF generation: Playwright-based on-demand rendering (`scripts/generate_pdf.py`)
- Deployment: Cloudflare Pages (`.github/workflows/deploy.yml`) and Docker (`Dockerfile` / `docker-compose.yml`)

### Known dependency drift (not fixed here — needs a decision)

`postcss.config.js` and `tailwind.config.js` are wired into the Vite build, but `src/index.css` contains **no `@tailwind` directives**, so Tailwind emits nothing. The Tailwind classes on `<body>` in `index.html` (`bg-[#020617] text-slate-200 …`) are therefore inert and the page renders from `src/index.css` instead — which is why the body is white while `public/manifest.json` advertises a `#020617` background.

Consequently these declared dependencies have **zero references anywhere in the repo**: `gsap`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` (runtime) and `tailwindcss` (build). `postcss` and `autoprefixer` do run, but have nothing Tailwind-specific to do. Either add the `@tailwind base/components/utilities` directives and start using the classes, or delete the configs and the dependencies. Both change either the rendered output or the dependency surface, so this is left for a human.

## Layout

| Path | What lives there |
| --- | --- |
| `src/` | React app; `src/App.tsx` is the shell, `src/components/` holds the 3D/canvas pieces |
| `functions/api/` | Pages Functions: `memories.ts` (KV-backed store) and `ai.ts` (chat endpoint) |
| `public/` | Static assets copied verbatim: `sw.js` (service worker), `manifest.json`, `logo.svg` |
| `scripts/` | Python automation: blog sync, PDF render, job agent |
| `scratch/` | Local-only scraper output (`profile_scraper.py` plus its generated dossier/JSON) |
| `ci/` | Jenkins shared library (`jenkins-common.groovy`) and the Hugging Face CDN publisher (`upload_to_hf.py`) |

## Environment

There are **no build-time Vite variables** — `src/` reads no `import.meta.env.*`. Everything the project needs is declared in `.env.example`: the two Cloudflare credentials the Pages deploy reads from GitHub Actions secrets, the `MEMORIES_KV` KV binding used by `functions/api/memories.ts`, and `HF_TOKEN` for the CDN publisher on the Jenkins node. Copy it to `.env` for local use; `.env` itself is never committed.

`MEMORIES_KV` is a Cloudflare KV **binding**, not an environment variable, so it is configured in the Cloudflare dashboard (Workers & Pages → *project-app-artits* → Settings → Functions → KV namespace bindings). Until it is bound, `functions/api/memories.ts` answers `503` with `MEMORIES_KV is not configured: ...` instead of throwing.

## Getting started

```bash
npm install          # or: ./dev.sh install
npm run dev          # Vite dev server on :5173
./dev.sh             # Vite + `wrangler dev` together (Pages Functions locally)
npm run build        # production build into dist/
npm run preview      # serve the built dist/
docker compose up    # the same dev server, containerised
```

## Release gate

`./validate-release.sh` is the release authority. It validates and then bumps the minor field of `.version`, keeping `package.json` in step.

```bash
./validate-release.sh --test-only   # validate only; never writes .version
./validate-release.sh               # release path: validate, then bump
./validate-release.sh --help
```

`--test-only` is the CI-safe mode. Any other argument is rejected with exit 2 rather than falling through to the version bump, and an unparseable `.version` is refused before any arithmetic runs — a mistyped flag or a malformed version previously bumped the version and still printed `READY FOR PRODUCTION` with exit 0.

What `--test-only` checks: required release files, `bash -n` on `dev.sh`, byte-compilation of `ci/upload_to_hf.py`, `npm run build`, `tsc` on **both** `tsconfig.json` (the Vite bundle) and `tsconfig.functions.json` (the Pages Functions), `npm run lint`, a fail-closed behavioural test of the CDN publisher against a stubbed `huggingface_hub`, README paths against the working tree, and `.version` vs `package.json` drift.

The `Jenkinsfile` is auto-generated and currently swallows this gate (`./validate-release.sh … || echo GATE_WARN`), so a Jenkins run cannot go red on any of the above. Do not hand-edit it; the org-level Jenkinsfile generator is the source of truth.

## Dependency locks

`package-lock.json` is the authoritative lock — CI, `Dockerfile` and `docker-compose.yml` all use npm. A stale `pnpm-lock.yaml` / `pnpm-workspace.yaml` is also committed; a `pnpm install` will therefore not reproduce the deployed tree. Regenerate from npm, or delete the pnpm files if pnpm is no longer used.
