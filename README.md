# Frontend Project Development & Deployment Guide

A comprehensive technical overview of the lifecycle for a **Frontend Project** ("frontproject"), covering the transition from **Local Development** to **Production Deployment**.

## Overview

* **Context:** Modern web stack (React, Vue, Angular, or Svelte).
* **Tooling:** Node.js environment, Git version control, and CI/CD automation.
* **Goal:** Establish a pipeline that moves code from a developer's machine to a public server.

---

## Phase 1: Local Development Architecture

This phase focuses on environment consistency and code quality before the code ever leaves the developer's machine.

### 1. Environment Management

* **Node.js/Package Managers:** Use `npm`, `yarn`, or `pnpm` to manage dependencies.
* **Variables:** Use `.env.local` files for secrets (API keys) that are **never committed** to Git.

### 2. Tooling Configuration

* **Bundler:** Vite (recommended) or Webpack. These handle "Hot Module Replacement" (HMR) for instant feedback during coding.
* **Linters:** ESLint (logic) and Prettier (style) to enforce code standards.

---

## Phase 2: The Build Process (Artifact Generation)

Browsers cannot execute raw framework code (JSX, Vue templates, TypeScript) efficiently. You must compile it.

* **Command:** `npm run build`
* **Action:**
  * **Transpilation:** Converts TypeScript/Modern JS → Browser-compatible JS (via Babel/SWC).
  * **Tree-Shaking:** Removes unused code to reduce file size.
  * **Minification:** Compresses files (removes whitespace/comments).
  * **Versioning/Hashing:** Renames files (e.g., `index.a1b2c.js`) to prevent browser cache issues.

* **Output:** A `dist/` or `build/` folder containing static assets (`index.html`, `.css`, `.js`).

---

## Phase 3: Deployment Strategies

The deployment method depends on your framework's rendering strategy.

### Option A: Static Site (SPA / CSR)

*Best for: React (CRA/Vite), Vue, Svelte*

The project is compiled into static HTML/CSS/JS files. No backend server logic is required to serve the frontend.

* **Hosting:** AWS S3 + CloudFront, Netlify, Vercel, GitHub Pages, Nginx.
* **Mechanism:** Upload the `dist/` folder to the storage bucket or web root.

### Option B: Server-Side Rendering (SSR)

*Best for: Next.js, Nuxt, SvelteKit*

A Node.js server is required to render HTML on demand before sending it to the client.

* **Hosting:** Vercel (managed), AWS EC2, Docker Containers.
* **Mechanism:** The server application must be started (e.g., `npm start`) and kept running using a process manager like PM2 or within a Docker container.

---

## Phase 4: CI/CD Automation (The Bridge)

Do not deploy manually from your laptop. Use a Continuous Deployment pipeline.

### Typical GitHub Actions Workflow

See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for a complete example.

**Pipeline Steps:**

1. **Trigger:** Developer pushes code to `main` branch.
2. **CI (Integration):**
   * Runner spins up (Ubuntu).
   * `npm install` (Installs dependencies).
   * `npm test` (Runs unit tests).
3. **CD (Deployment):**
   * `npm run build` (Creates artifacts).
   * **Deploy Action:** Transmits `dist/` folder to target (e.g., AWS S3 or Vercel).

---

## Comparison of Deployment Targets

| Method | Complexity | Cost | Best For |
| --- | --- | --- | --- |
| **PaaS (Vercel/Netlify)** | Low | Free - $$$ | Next.js, Standard SPAs, Rapid Prototyping |
| **Object Storage (S3)** | Medium | Low | High-traffic Static Sites, Enterprise |
| **Docker / K8s** | High | High | Complex Microservices, Strict Security |
| **VPS (Nginx)** | Medium | Low | Traditional setups, self-hosting |

---

## Quick Start Guide

To deploy a frontend project:

1. **Develop:** Write code locally using Git and environment variables.
2. **Build:** Run `npm run build` to generate the optimized `dist` folder.
3. **Automate:** Configure a **CI/CD pipeline** (GitHub Actions) to run the build on every push to `main`.
4. **Host:**
   * If **Static** (React/Vue): Sync `dist` folder to an S3 bucket or Vercel.
   * If **SSR** (Next.js): Build a Docker image or deploy to a Node.js managed service.

---

## Docker Support

For containerizing a frontend application, see the [`Dockerfile`](./Dockerfile) in this repository.

---

## Project Structure

```
frontproject-development-serviceApi/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline configuration
├── Dockerfile                  # Docker containerization example
├── README.md                   # This documentation
└── .gitignore                  # Git ignore patterns
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
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
- **Setup Required:** See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for instructions to enable GitHub Pages
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
