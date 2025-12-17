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

## Scripts

- `npm run dev`: Start the dev server.
- `npm run build`: Type-check and build for production.
- `npm run preview`: Preview the production build locally.
- `npm run test`: Run unit tests (Vitest).

## Quick Start

```powershell
# From the project root
npm install
npm run dev
```

Open http://localhost:5173/ in your browser.

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
