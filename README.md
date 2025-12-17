# frontproject-development-serviceApi

Orange-themed React + Vite + TypeScript frontend.

## Scripts

- `npm run dev`: Start the dev server.
- `npm run build`: Type-check and build for production.
- `npm run preview`: Preview the production build locally.
 - `npm run open`: Open local dev URL.
 - `npm run preview:open`: Preview build and open in browser.
- `npm run test`: Run unit tests (Vitest).

## Quick Start

```powershell
# From the project root
npm install
npm run dev
```

Open http://localhost:5173/ in your browser.

## Live Preview
- GitHub Pages: https://hyukiody.github.io/frontproject-development-serviceApi/

## Customize
- Edit `src/App.tsx` to change content.
- Tweak colors in `src/index.css` (e.g., `--orange`).

## Deploy (GitHub Pages)
- On push to `main`, GitHub Actions builds and deploys to Pages.
- URL: `https://hyukiody.github.io/frontproject-development-serviceApi/`
 
## Translations (i18n)
- Uses `i18next` + `react-i18next` with `en` and `ja`.
- Switch language from the top nav buttons.

## CI Tests
- `.github/workflows/ci.yml` runs tests on push/PR and daily.
- Locally: `npm run test` or one-shot `npm run test:ci`.

## Upstream Remote (optional)
If you have an upstream repository to sync from (e.g., a fork source), set it with:

```powershell
Push-Location "d:\projects\javascriptProjects\jsproject"
# Replace <upstream-url> with the original repo URL
git remote add upstream <upstream-url>
# Fetch and inspect upstream
git fetch upstream
# Merge or rebase as needed
git rebase upstream/main
```
