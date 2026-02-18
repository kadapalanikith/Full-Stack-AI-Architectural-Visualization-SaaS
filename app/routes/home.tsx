import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import { ArrowRight, Clock, Layers, ArrowUpRight } from "lucide-react";

import Button from "../../components/ui/Button";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  return (
    <div className="home">
      <Navbar />
      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse">

            </div>
          </div>
          <p>Introducing roomyfi 2.0</p>
        </div>
        <h1>Bulid beautiful sapces at the Speed of through with Roomify</h1>
        <p className="subtitle">Roomify is the AI-powered interior design platform that helps you create stunning, personalized spaces in minutes. From room layouts to furniture selection, we bring your vision to life with intelligent design suggestions and seamless collaboration tools.</p>
        <div className="actions">
          <a href="#upload" className="cta">Start Building<ArrowRight className="icon" /></a>
          <Button className="demo" size="lg" variant="outline">Watch Demo</Button>
        </div>
        <div className="upload-shell" id="upload">
          <div className="grid-overlay" />
          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>
              <h3>Uplaod Your Floor plan</h3>
              <p>Support JPG,PNG, formats up to 10mb</p>
            </div>
            <p>Upload images</p>
          </div>
        </div>
      </section>
      <section className="projests">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>
                Your latest work and shared projects all in one place
              </p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img src="" alt="Project" />
                <div className="badge">
                  <span>
                    Community
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div >
                  <h3>Project</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date('01.01.2020').toLocaleDateString()}</span>
                    <span>By JS, Mastery</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
