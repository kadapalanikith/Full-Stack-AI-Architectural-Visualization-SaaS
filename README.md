<div align="center">

# 🏗️ Roomify

### AI-Powered Architectural Visualization SaaS

Transform 2D floor plans into photorealistic 3D renders in under 30 seconds — powered by **Gemini 2.5 Flash** and **Puter.js**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-f97316?style=for-the-badge&logo=vercel&logoColor=white)](https://full-stack-ai-architectural-visuali.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-6366f1?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)

![Roomify Banner](https://full-stack-ai-architectural-visuali.vercel.app/)

</div>

---

## ✨ What is Roomify?

**Roomify** is a full-stack SaaS application that uses Google's Gemini 2.5 Flash multimodal AI to convert 2D architectural floor plans into stunning, photorealistic top-down 3D renders. Sign in with your free Puter account, upload a floor plan, and your render is ready in seconds — no setup, no API keys, no credit card.

### Key Capabilities

| Feature | Description |
|---|---|
| 🤖 **AI Rendering** | Gemini 2.5 Flash converts your floor plan to a 3D architectural visualization |
| 🔀 **Before/After Slider** | Drag the interactive comparison slider to see the transformation |
| ☁️ **Cloud Storage** | Projects auto-save to your personal Puter cloud volume |
| 📥 **1024px Export** | Download renders in full quality for client presentations |
| 🔐 **Zero Config Auth** | Sign in with Puter — no OAuth flows or external providers |
| 📱 **Fully Responsive** | Works beautifully on mobile, tablet, and desktop |

---

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI framework |
| [React Router](https://reactrouter.com/) | 7 (framework mode) | Routing & SSR |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [Vite](https://vitejs.dev/) | 7 | Build tool |
| [Lucide React](https://lucide.dev/) | 0.564 | Icon system |
| [react-compare-slider](https://react-compare-slider.vercel.app/) | 3 | Before/after comparison |

### Backend / Platform
| Technology | Purpose |
|---|---|
| [Puter.js](https://puter.com) | Auth, KV store, file hosting, and AI gateway |
| [Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/) | Image-to-image AI rendering via Puter AI |
| [Puter Workers](https://docs.puter.com/workers/) | Serverless edge functions for project persistence |

### Infrastructure
| Service | Purpose |
|---|---|
| [Vercel](https://vercel.com/) | Frontend hosting & deployment |
| [Docker](https://www.docker.com/) | Containerized production build |

---

## 🏛️ Project Architecture

```
roomify/
├── app/                        # React Router application
│   ├── routes/
│   │   ├── home.tsx            # Landing page + upload flow
│   │   └── visualizer.$id.tsx  # Render view + comparison panel
│   ├── routes.ts               # Route configuration
│   ├── root.tsx                # App shell + auth context
│   └── app.css                 # Global design system (Tailwind 4)
│
├── components/                 # Shared UI components
│   ├── Navbar.tsx              # Responsive navigation with mobile menu
│   ├── Upload.tsx              # Drag-and-drop file uploader
│   └── ui/
│       └── Button.tsx          # Polymorphic button component
│
├── lib/                        # Business logic & integrations
│   ├── ai.action.ts            # Gemini AI render pipeline
│   ├── puter.action.ts         # Puter auth + project CRUD
│   ├── puter.hosting.ts        # Image hosting on Puter static sites
│   ├── puter.worker.js         # Puter Worker (backend edge function)
│   ├── constants.ts            # App-wide constants & AI prompt
│   └── utils.ts                # Image utilities (blob, data URL, canvas)
│
├── public/                     # Static assets
├── type.d.ts                   # Global TypeScript declarations
├── react-router.config.ts      # React Router SSR config
├── vite.config.ts              # Vite + Tailwind plugin
├── tsconfig.json               # TypeScript config
├── Dockerfile                  # Production Docker image
├── .env.example                # Environment variable template
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- A free **[Puter](https://puter.com)** account

### 1. Clone the Repository

```bash
git clone https://github.com/kadapalanikith/Full-Stack-AI-Architectural-Visualization-SaaS.git
cd Full-Stack-AI-Architectural-Visualization-SaaS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Open `.env.local` and set your Puter Worker URL:

```env
VITE_PUTER_WORKER_URL=https://your-worker.puter.site
```

> **Note:** If `VITE_PUTER_WORKER_URL` is left empty, the app will still render images — project persistence (save/load) will simply be disabled.

### 4. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔄 Application Flow

```
User uploads floor plan (JPG/PNG)
        │
        ▼
[Puter Auth Check] → Not signed in → Puter sign-in modal
        │
        ▼
[puter.hosting] → Upload source image to Puter static hosting
        │
        ▼
[puter.worker] → Save project metadata to Puter KV store
        │
        ▼
Navigate to /visualizer/:id
        │
        ▼
[ai.action.ts] → Call Gemini 2.5 Flash (image → image)
        │
        ▼
Render displayed + saved to cloud
        │
        ▼
User can export or use comparison slider
```

---

## 🧠 AI Prompt Engineering

The AI rendering is driven by a carefully crafted system prompt defined in [`lib/constants.ts`](lib/constants.ts). Key constraints enforced:

- **Strict geometry matching** — walls, rooms, doors follow exact plan lines
- **No text rendering** — all labels, dimensions, and annotations are removed
- **Top-down orthographic** — no perspective tilt
- **Photorealistic materials** — wood floors, glass windows, realistic furniture
- **No hallucination** — only objects explicitly shown in the plan are rendered

---

## 🐳 Docker Deployment

Build and run with Docker:

```bash
# Build
docker build -t roomify .

# Run
docker run -p 3000:3000 \
  -e VITE_PUTER_WORKER_URL=https://your-worker.puter.site \
  roomify
```

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build (React Router + Vite) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Generate route types + run TypeScript |

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push and open a PR

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Nikith Kadapala**

[![GitHub](https://img.shields.io/badge/GitHub-kadapalanikith-24292e?style=flat-square&logo=github)](https://github.com/kadapalanikith)

---

## 🙏 Acknowledgements

- [**Puter.com**](https://puter.com) — for the incredible platform (auth, storage, AI, workers — all free)
- [**Google DeepMind**](https://deepmind.google/technologies/gemini/) — for Gemini 2.5 Flash multimodal capabilities
- [**React Router**](https://reactrouter.com/) — for the modern full-stack React framework
- [**Tailwind CSS**](https://tailwindcss.com/) — for the utility-first styling system

---

<div align="center">

**Built with ❤️ using React, Puter, and Gemini AI**

⭐ Star this repo if you found it useful!

</div>
