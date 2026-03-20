# Contributing to Roomify

Thank you for considering contributing to Roomify! We welcome all kinds of contributions — bug fixes, UI improvements, documentation, and new features.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Full-Stack-AI-Architectural-Visualization-SaaS.git
   cd Full-Stack-AI-Architectural-Visualization-SaaS
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Copy the environment file:**
   ```bash
   cp .env.example .env.local
   ```
5. **Start the dev server:**
   ```bash
   npm run dev
   ```

---

## Development Setup

### Prerequisites
- Node.js **18+**
- npm **9+**
- A free [Puter](https://puter.com) account (for auth + storage)

### Environment Variables
Fill in `.env.local` with your Puter Worker URL. See `.env.example` for the required keys.

---

## Contribution Guidelines

- **Frontend only**: The backend is the Puter Worker (`lib/puter.worker.js`). Please do **not** propose changes to this file unless specifically fixing a documented bug.
- **One concern per PR**: Keep pull requests focused. Large, sweeping changes are hard to review.
- **Responsive design**: All UI changes must work on mobile, tablet, and desktop.
- **No `console.log` in production code**: Use `console.error` / `console.warn` only for genuine error paths.
- **TypeScript**: Keep the codebase typed. Avoid `any`.

---

## Code Style

- **CSS**: Vanilla CSS with Tailwind 4 utilities inside `app/app.css`. No inline styles.
- **Components**: Functional React components with explicit prop interfaces.
- **Naming**: camelCase for variables/functions, PascalCase for components, kebab-case for CSS classes.
- **Imports**: Absolute paths preferred (configured in `tsconfig.json`).

---

## Pull Request Process

1. Create a branch from `master`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes and commit with a descriptive message:
   ```bash
   git commit -m "feat: add comparison export button"
   ```
3. Push and open a Pull Request against `master`.
4. Fill in the PR template: what changes, why, and screenshots if UI.
5. One approving review is required before merging.

---

## Reporting Bugs

Open an [issue](https://github.com/kadapalanikith/Full-Stack-AI-Architectural-Visualization-SaaS/issues) and include:

- **Steps to reproduce**
- **Expected behaviour**
- **Actual behaviour**
- **Browser & OS**
- **Console errors** (screenshot or paste)

---

Thank you for helping make Roomify better! 🚀
