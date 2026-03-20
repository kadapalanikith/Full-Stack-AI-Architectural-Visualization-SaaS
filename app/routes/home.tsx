import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import {
    ArrowRight,
    ArrowUpRight,
    Box,
    Clock,
    ImageIcon,
    Layers,
    Sparkles,
    Zap,
} from "lucide-react";
import Upload from "../../components/Upload";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { createProject, getProjects } from "../../lib/puter.action";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Roomify — AI Architectural Visualization" },
        {
            name: "description",
            content:
                "Roomify transforms 2D floor plans into photorealistic 3D architectural renders using AI. Upload your floor plan and get a stunning visualization in seconds.",
        },
        { name: "og:title", content: "Roomify — AI Architectural Visualization" },
        {
            name: "og:description",
            content:
                "Transform your 2D floor plans into photorealistic 3D renders with the power of AI.",
        },
        { name: "theme-color", content: "#09090b" },
    ];
}

const features = [
    {
        icon: <Zap size={20} />,
        title: "Instant AI Renders",
        desc: "Upload a floor plan and get a photorealistic 3D render in seconds — powered by Gemini 2.5.",
    },
    {
        icon: <Layers size={20} />,
        title: "Before & After Compare",
        desc: "Drag to reveal the original plan and the rendered output side-by-side with interactive slider.",
    },
    {
        icon: <ImageIcon size={20} />,
        title: "High-Resolution Export",
        desc: "Download your renders at 1024×1024 resolution, ready for client presentations and portfolios.",
    },
    {
        icon: <Box size={20} />,
        title: "Project History",
        desc: "All your renders are saved to your Puter cloud automatically — access them anytime.",
    },
    {
        icon: <Sparkles size={20} />,
        title: "Zero Setup Required",
        desc: "No API keys, no hosting costs. Sign in with Puter and start building immediately.",
    },
    {
        icon: <ArrowUpRight size={20} />,
        title: "Privacy First",
        desc: "Your files stay in your personal Puter storage — never shared without your consent.",
    },
];

const steps = [
    {
        num: "01",
        title: "Upload Your Floor Plan",
        desc: "Drop in any JPG or PNG floor plan. Roomify reads the walls, rooms, doors and windows automatically.",
    },
    {
        num: "02",
        title: "AI Generates Your Render",
        desc: "Our Gemini-powered pipeline converts your 2D plan into a photorealistic top-down 3D architectural render.",
    },
    {
        num: "03",
        title: "Compare & Export",
        desc: "Slide between before and after, then download the high-res render for your portfolio or client.",
    },
];

const stats = [
    { value: "< 30s", label: "Avg render time" },
    { value: "1024px", label: "Output resolution" },
    { value: "100%", label: "Cloud-synced" },
    { value: "Free", label: "No credit card" },
];

export default function Home() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<DesignItem[]>([]);
    const isCreatingProjectRef = useRef(false);

    const handleUploadComplete = async (base64Image: string) => {
        try {
            if (isCreatingProjectRef.current) return false;
            isCreatingProjectRef.current = true;

            const newId = Date.now().toString();
            const name = `Residence ${newId}`;

            const newItem: DesignItem = {
                id: newId,
                name,
                sourceImage: base64Image,
                renderedImage: undefined,
                timestamp: Date.now(),
            };

            const saved = await createProject({ item: newItem, visibility: "private" });

            if (!saved) {
                console.error("Failed to create project");
                return false;
            }

            setProjects((prev) => [saved, ...prev]);

            navigate(`/visualizer/${newId}`, {
                state: {
                    initialImage: saved.sourceImage,
                    initialRendered: saved.renderedImage || null,
                    name,
                },
            });

            return true;
        } finally {
            isCreatingProjectRef.current = false;
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const items = await getProjects();
            setProjects(items);
        };
        fetchProjects();
    }, []);

    return (
        <div className="home">
            {/* Ambient background glow */}
            <div className="home-bg-glow" aria-hidden="true" />

            <Navbar />

            {/* ── HERO ── */}
            <section className="hero" aria-label="Hero section">
                <div className="announce" role="status" aria-label="Product announcement">
                    <div className="dot" aria-hidden="true">
                        <div className="pulse" />
                    </div>
                    <p>Introducing Roomify 2.0</p>
                </div>

                <h1>
                    Build beautiful spaces at the{" "}
                    <span className="gradient-text">speed of thought</span>
                </h1>

                <p className="subtitle">
                    Roomify is an AI-first design environment that transforms 2D floor
                    plans into photorealistic 3D renders in under 30 seconds.
                </p>

                <div className="actions">
                    <a href="#upload" className="cta" aria-label="Start building now">
                        Start Building <ArrowRight className="icon" aria-hidden="true" />
                    </a>

                    <button className="demo" aria-label="Watch demo">
                        Watch Demo
                    </button>
                </div>

                {/* Upload Card */}
                <div id="upload" className="upload-shell" aria-label="Floor plan upload area">
                    <div className="grid-overlay" aria-hidden="true" />

                    <div className="upload-card">
                        <div className="upload-head">
                            <div className="upload-icon" aria-hidden="true">
                                <Layers className="icon" />
                            </div>
                            <h3>Upload your floor plan</h3>
                            <p>JPG · PNG · up to 50 MB</p>
                        </div>

                        <Upload onComplete={handleUploadComplete} />
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="stats-strip" aria-label="Product statistics">
                <div className="stats-inner">
                    {stats.map(({ value, label }) => (
                        <div key={label} className="stat-item">
                            <span className="stat-value">
                                <span>{value}</span>
                            </span>
                            <span className="stat-label">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section id="features" className="features" aria-label="Features">
                <div className="features-header">
                    <div className="section-badge">
                        <span>Capabilities</span>
                    </div>
                    <h2>Everything you need to visualize faster</h2>
                    <p>
                        From upload to export — Roomify handles the entire render pipeline
                        so you can focus on design.
                    </p>
                </div>

                <div className="features-grid" role="list">
                    {features.map(({ icon, title, desc }) => (
                        <div key={title} className="feature-card" role="listitem">
                            <div className="feature-icon" aria-hidden="true">{icon}</div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section id="how-it-works" className="how-it-works" aria-label="How it works">
                <div className="features-header">
                    <div className="section-badge">
                        <span>Process</span>
                    </div>
                    <h2>Three steps to your render</h2>
                    <p>No design experience required. Upload, render, export.</p>
                </div>

                <div className="steps-grid" role="list">
                    {steps.map(({ num, title, desc }) => (
                        <div key={num} className="step-item" role="listitem">
                            <div className="step-number" aria-hidden="true">{num}</div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PROJECTS ── */}
            <section id="projects" className="projects" aria-label="Your projects">
                <div className="section-inner">
                    <div className="section-head">
                        <div className="copy">
                            <h2>Projects</h2>
                            <p>Your renders, saved automatically to the cloud.</p>
                        </div>
                    </div>

                    <div className="projects-grid" role="list">
                        {projects.length === 0 ? (
                            <div className="empty-state" role="status" aria-live="polite">
                                <div className="empty-icon" aria-hidden="true">
                                    <ImageIcon size={24} />
                                </div>
                                <h3>No projects yet</h3>
                                <p>
                                    Upload a floor plan above to create your first architectural
                                    render.
                                </p>
                            </div>
                        ) : (
                            projects.map(({ id, name, renderedImage, sourceImage, timestamp }) => (
                                <article
                                    key={id}
                                    className="project-card"
                                    role="listitem"
                                    onClick={() => navigate(`/visualizer/${id}`)}
                                    tabIndex={0}
                                    aria-label={`Open project: ${name || `Residence ${id}`}`}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            navigate(`/visualizer/${id}`);
                                        }
                                    }}
                                >
                                    <div className="preview">
                                        <img
                                            src={renderedImage || sourceImage}
                                            alt={`Preview of ${name || "project"}`}
                                            loading="lazy"
                                        />
                                        <div className="badge">
                                            <span>{renderedImage ? "Rendered" : "Draft"}</span>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div>
                                            <h3>{name || `Residence ${id}`}</h3>
                                            <div className="meta">
                                                <Clock size={11} aria-hidden="true" />
                                                <span>{new Date(timestamp).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="arrow" aria-hidden="true">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="site-footer" aria-label="Site footer">
                <div className="footer-inner">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <div className="brand">
                                <Box className="logo" aria-hidden="true" />
                                <span className="name">Roomify</span>
                            </div>
                            <p>
                                AI-powered architectural visualization. Transform floor plans
                                into photorealistic renders in seconds.
                            </p>
                        </div>

                        <div className="footer-links">
                            <div className="footer-col">
                                <h4>Product</h4>
                                <a href="#features">Features</a>
                                <a href="#how-it-works">How it Works</a>
                                <a href="#upload">Get Started</a>
                            </div>
                            <div className="footer-col">
                                <h4>Resources</h4>
                                <a
                                    href="https://github.com/kadapalanikith/Full-Stack-AI-Architectural-Visualization-SaaS"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="https://puter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Puter Platform
                                </a>
                            </div>
                            <div className="footer-col">
                                <h4>Powered By</h4>
                                <a href="https://puter.com" target="_blank" rel="noopener noreferrer">
                                    Puter.js
                                </a>
                                <a
                                    href="https://deepmind.google/technologies/gemini/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Gemini AI
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} Roomify · All rights reserved</p>
                        <div className="footer-status">
                            <div className="dot" aria-hidden="true" />
                            <span>All systems operational</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}