# Frontend Project Development & Service API

A comprehensive repository demonstrating a full-stack implementation of modern frontend practices. This project includes a **React + Vite + TypeScript** frontend and a **Node.js** backend service, designed to illustrate the lifecycle from local development to production deployment.

> **🌐 Live Demo:** [hyukiody.github.io/frontproject-development-serviceApi](https://hyukiody.github.io/frontproject-development-serviceApi/)

[![CI/CD Pipeline](https://github.com/hyukiody/frontproject-development-serviceApi/actions/workflows/deploy.yml/badge.svg)](https://github.com/hyukiody/frontproject-development-serviceApi/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

---

## 📋 Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js:** v18.x or higher
- **npm/yarn/pnpm:** Latest stable version
- **Git:** For version control

---

## 📚 Part 1: Educational Guide & Architecture

*A technical overview of the lifecycle for a frontend project ("frontproject").*

### The Lifecycle Phases

#### Phase 1: Local Development

Focuses on environment consistency and code quality.

* **Tooling:** Node.js, `npm`/`yarn`/`pnpm`.
* **Secrets:** `.env.local` files for API keys (never committed).
* **Quality Control:** ESLint (logic) and Prettier (style).
* **Bundler:** Vite (recommended) for Hot Module Replacement (HMR).

#### Phase 2: The Build Process (Artifact Generation)

Since browsers cannot efficiently execute raw JSX/TypeScript, the code must be compiled.

* **Command:** `npm run build`
* **Process:** Transpilation (Babel/SWC) → Tree-Shaking → Minification → Version Hashing (`index.a1b2c.js`).
* **Output:** A `dist/` folder containing static assets ready for distribution.

#### Phase 3: Deployment Strategies

The deployment method depends on the rendering strategy.

| Method | Type | Best For | Hosting Examples |
| --- | --- | --- | --- |
| **Static Site (SPA)** | Client-Side Rendering | React, Vue, Svelte | AWS S3 + CloudFront, GitHub Pages, Netlify |
| **SSR** | Server-Side Rendering | Next.js, Nuxt | Vercel, AWS EC2, Docker Containers |

#### Phase 4: CI/CD Automation

Manual deployments are error-prone. This project uses **GitHub Actions** to automate the bridge between code and server.

1. **Trigger:** Push to `main`.
2. **CI:** Install dependencies → Run Unit Tests.
3. **CD:** Build Artifacts → Deploy to Target (GitHub Pages/S3).

---

## 🛠 Part 2: Project Implementation

This repository contains two distinct parts: the **Frontend Application** and the **Backend API**.

### A. The Frontend (Client)

An Orange-themed React application optimized for mobile and desktop.

**Features:**

* ⚡ **Tech Stack:** React 18, Vite, TypeScript.
* 📱 **Mobile-First:** Touch-optimized controls (44px targets), responsive layout, and mobile meta tags.
* 🎨 **UI:** Custom Orange theme with gradient effects.
* 🌍 **i18n:** Internationalization support (English/Japanese) via `react-i18next`.

**Frontend Scripts:**

```bash
npm install           # Install dependencies
npm run dev           # Start local dev server (http://localhost:5173)
npm run build         # Compile for production
npm run preview       # Preview production build locally
npm run test          # Run Vitest unit tests
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

### 📹 Demo Walkthrough

*Watch a live demonstration of the application's key features and deployment process.*

https://github.com/user-attachments/assets/57f846dd-625c-4998-b90d-fbbc7aa5405a

---

### B. The Backend (Service API)

A Node.js REST API that serves data regarding deployment methods.

**API Usage:**

```bash
# Start the server (Defaults to Port 3000)
cd backend
npm install
npm start
```

**Endpoints:**

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Returns API info and available endpoints. |
| `GET` | `/health` | Health check (`{"status": "healthy"}`). |
| `GET` | `/api/deployment-methods` | Returns comparison data of deployment strategies. |

**Example Response (`/api/deployment-methods`):**

```json
{
  "deploymentMethods": [
    {
      "method": "PaaS (Vercel/Netlify)",
      "complexity": "Low",
      "cost": "Free - $$$",
      "bestFor": "Next.js, Standard SPAs"
    },
    {
      "method": "Object Storage (S3)",
      "complexity": "Medium",
      "cost": "Low",
      "bestFor": "High-traffic Static Sites"
    },
    {
      "method": "Traditional VPS",
      "complexity": "High",
      "cost": "$$",
      "bestFor": "Custom Infrastructure Requirements"
    }
  ]
}
```

---

## 🔐 Environment Configuration

### Frontend (.env)

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=Frontend Project Development
```

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```bash
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Note:** Never commit `.env` files. They are listed in `.gitignore`.

---

## 🚀 Deployment Pipeline

This project is configured to deploy automatically to **GitHub Pages**.

### Workflow Configuration

Located in `.github/workflows/deploy.yml`.

1. **Build:** Runs `npm run build` to generate the `dist` folder.
2. **Test:** Runs `npm test` to ensure code integrity.
3. **Deploy:** Syncs the `dist` folder to the `gh-pages` branch.

### How to Deploy Your Own Instance

1. **Fork this repository**
2. **Enable GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Source: Select **GitHub Actions**
3. **Configure base path** (if needed):
   - Update `base` in `vite.config.ts` to match your repo name
4. **Push to main branch** - Deployment happens automatically!

---

## 📂 Project Structure

```text
frontproject-development-serviceApi/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Continuous Integration (Tests & Linting)
│       └── deploy.yml          # Continuous Deployment (GH Pages)
├── src/                        # React Source Code
│   ├── components/             # React Components
│   ├── locales/                # i18n Translation Files
│   ├── styles/                 # CSS Modules
│   └── App.tsx                 # Main Application Entry
├── public/                     # Static Assets
├── backend/                    # Node.js API
│   ├── server.js               # Express Server
│   └── package.json            # Backend Dependencies
├── Dockerfile                  # Containerization Config
├── package.json                # Frontend Dependencies & Scripts
├── vite.config.ts              # Vite Bundler Configuration
├── tsconfig.json               # TypeScript Configuration
├── .eslintrc.cjs               # ESLint Rules
├── .prettierrc                 # Prettier Configuration
├── LICENSE                     # MIT License
├── CONTRIBUTING.md             # Contribution Guidelines
└── README.md                   # This Documentation
```

---

## 🔧 Troubleshooting

### Build Fails on GitHub Actions
- **Solution:** Check Node.js version in workflow matches your local environment (v18+).
- Verify all dependencies are listed in `package.json`.

### 404 Error on GitHub Pages
- **Solution:** Ensure `base` in `vite.config.ts` matches your repository name:
  ```ts
  export default defineConfig({
    base: '/frontproject-development-serviceApi/',
  })
  ```

### API Connection Errors
- **Solution:** Verify `VITE_API_BASE_URL` in `.env` points to the correct backend.
- Check CORS configuration in `backend/server.js`.

### Hot Module Replacement (HMR) Not Working
- **Solution:** Clear Vite cache: `rm -rf node_modules/.vite`
- Restart dev server: `npm run dev`

### TypeScript Errors
- **Solution:** Ensure `tsconfig.json` is properly configured.
- Run `npm install @types/node @types/react --save-dev`.

---

## 🧪 Testing

### Run Unit Tests

```bash
npm run test              # Run all tests
npm run test:coverage     # Generate coverage report
```

### Run E2E Tests (if configured)

```bash
npm run test:e2e
```

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Contact & Support

- **GitHub:** [@hyukiody](https://github.com/hyukiody)
- **Issues:** [Report a bug or request a feature](https://github.com/hyukiody/frontproject-development-serviceApi/issues)
- **Discussions:** [Join the conversation](https://github.com/hyukiody/frontproject-development-serviceApi/discussions)

---

## 🌟 Acknowledgments

- React Team for the amazing framework
- Vite for blazing-fast build tooling
- GitHub Actions for seamless CI/CD
- All contributors who have helped improve this project

---

**Made with 🧡 by [hyukiody](https://github.com/hyukiody)**