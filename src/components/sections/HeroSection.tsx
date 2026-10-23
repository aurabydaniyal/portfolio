import { siteConfig } from "@/data/site-config";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">AI Engineering · Computer Vision · Full-Stack AI</p>
          <h1>
            Building AI into <span className="grad">useful products.</span>
          </h1>
          <p className="lead">
            I build AI-powered applications combining LLMs, RAG, computer vision and modern web development — from
            Python APIs to interfaces people can actually use.
          </p>
          <div className="cta-row">
            <a href="#work" className="btn btn-primary">Explore Projects →</a>
            <a href="#contact" className="btn">Get in Touch</a>
            {siteConfig.githubUrl && (
              <a href={siteConfig.githubUrl} className="btn btn-social" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)"><GitHubIcon /> GitHub</a>
            )}
            {siteConfig.linkedinUrl && (
              <a href={siteConfig.linkedinUrl} className="btn btn-social" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><LinkedInIcon /> LinkedIn</a>
            )}
          </div>
          <ul className="chips" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["AI APPLICATIONS", "COMPUTER VISION", "LLM + RAG", "FULL-STACK DEVELOPMENT"].map((c) => (
              <li key={c} className="chip">{c}</li>
            ))}
          </ul>
        </div>

        <div className="window mono" role="img" aria-label="Illustrative graphic: computer-vision detection, OCR overlay, retrieval nodes and an API snippet. Not a real product screenshot.">
          <div className="window-bar">
            <i /><i /><i />
            <span>vision-lens · illustration</span>
          </div>
          <div className="window-body">
            <div className="scene">
              <div className="bbox" style={{ left: "14%", top: "22%", width: "34%", height: "38%" }}><b>object</b></div>
              <div className="bbox two" style={{ left: "56%", top: "30%", width: "28%", height: "30%" }}><b>text</b></div>
              <div className="ocr-line">
                <span>Bienvenue</span> → <em>Welcome</em>
              </div>
            </div>
            <div className="panel-row">
              <div className="mini">
                <h4>RAG retrieval</h4>
                <div className="nodes">
                  <span className="node">D</span><span className="link" />
                  <span className="node">E</span><span className="link" />
                  <span className="node">V</span><span className="link" />
                  <span className="node">L</span>
                </div>
              </div>
              <div className="mini code">
                <h4>API</h4>
                <span className="k">POST</span> <span className="s">/api/ocr</span>
                <br />→ {"{ text, boxes }"}
              </div>
            </div>
            <p className="illus-note">Illustrative graphic — not a live product.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
