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

- Frontend: Flutter Web (Dart) in `dashboard/`
  - Riverpod for state, `http` for the Pages Functions API
  - `CustomPainter` for the 3D memory graph and the Conway Game of Life
  - Google Fonts (Outfit / Inter / JetBrains Mono) per the design system
- Backend: Cloudflare Pages Functions in `functions/api/` (`ai.ts`, `memories.ts`)
- Deployment: Cloudflare Pages, `dist/` as the published output directory
  (`wrangler.toml` → `pages_build_output_dir`); `.github/workflows/deploy.yml` builds
  and stages the Flutter bundle there and leaves the Functions untouched
- Automation: Playwright + Python for on-demand PDF resume rendering

## Development

```bash
cd dashboard
flutter pub get
flutter run -d chrome --web-port 5173   # frontend only
```

Run the Pages Functions locally alongside the Flutter app:

```bash
npx wrangler pages dev dist --port 8787   # serves dist/ + functions/
```

## Release gate

```bash
./validate-release.sh
```

Runs `flutter pub get`, `flutter analyze`, `flutter test`, and a release web build,
stages the output into `dist/`, verifies `dist/index.html` and `functions/api/ai.ts`
are both present, then bumps the patch component of `.version`.

