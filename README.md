# frontproject-development-serviceApi

Orange-themed React + Vite + TypeScript frontend with mobile-optimized design.

## Live Demo

🌐 **GitHub Pages**: [https://hyukiody.github.io/frontproject-development-serviceApi/](https://hyukiody.github.io/frontproject-development-serviceApi/)

> **Note**: The site is optimized for both desktop and mobile viewing with responsive design.

## Features

- ⚡ Vite for fast development and optimized builds
- ⚛️ React 18 with TypeScript
- 📱 Mobile-responsive design with touch-optimized controls
- 🎨 Orange-themed UI with gradient effects
- ♿ Accessibility features (skip links, ARIA labels)
- 🚀 Automated GitHub Pages deployment
[![Deploy](https://github.com/hyukiody/frontproject-development-serviceApi/actions/workflows/deploy.yml/badge.svg)](https://github.com/hyukiody/frontproject-development-serviceApi/actions/workflows/deploy.yml)
[![CI Tests](https://github.com/hyukiody/frontproject-development-serviceApi/actions/workflows/ci.yml/badge.svg)](https://github.com/hyukiody/frontproject-development-serviceApi/actions/workflows/ci.yml)

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
- Mobile responsiveness is configured via media queries in `src/index.css`.

## Mobile Optimization

This application includes several mobile-specific enhancements:

- **Responsive Layout**: Adapts to different screen sizes (desktop, tablet, mobile)
- **Touch-Friendly**: Buttons meet minimum 44px touch target size
- **Optimized Typography**: Font sizes scale appropriately on smaller screens
- **Mobile Meta Tags**: Configured for mobile web apps and proper viewport behavior
- **Touch Feedback**: Visual feedback on touch interactions (no hover on touch devices)

## Deploy (GitHub Pages)
- On push to `main`, GitHub Actions builds and deploys to Pages.
- URL: `https://hyukiody.github.io/frontproject-development-serviceApi/`
- Pages must be enabled in repository Settings → Pages with source set to "GitHub Actions"

## Status & Shortcuts
- Actions (Deploy): https://github.com/hyukiody/frontproject-development-serviceApi/actions/workflows/deploy.yml
- Actions (CI): https://github.com/hyukiody/frontproject-development-serviceApi/actions/workflows/ci.yml
- Live: https://hyukiody.github.io/frontproject-development-serviceApi/
 
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
