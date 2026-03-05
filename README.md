# Fotios Pongas — Portfolio

Personal portfolio site built with React + Vite, deployed via GitHub Actions to GitHub Pages.

## Tech Stack
- **React 18** — UI framework
- **Vite** — Build tool
- **GitHub Actions** — CI/CD pipeline
- **GitHub Pages** — Hosting (free)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deployment

Deployment is fully automated. Every push to `main` triggers the GitHub Actions workflow which:

1. Installs dependencies
2. Builds the production bundle
3. Deploys to GitHub Pages

## Setup GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the workflow will handle the rest

## Features
- EN/DE language toggle
- Responsive design with mobile menu
- Scroll-triggered animations
- Career timeline (Hospitality → Retail → DevOps)
- Project showcase
- SEO meta tags

---
Built with passion, deployed with CI/CD.
