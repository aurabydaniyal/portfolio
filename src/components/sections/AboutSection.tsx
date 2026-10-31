import Reveal from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { siteConfig } from "@/data/site-config";

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal>
          <p className="eyebrow">01 — About</p>
          <h2 className="h-section">
            <EncryptedText text="Practical AI, built end to end." revealDelayMs={38} encryptedClassName="enc-scramble" revealedClassName="enc-revealed" />
          </h2>
          <p className="lead">
            I&apos;m {siteConfig.name}, an aspiring AI Engineer and BS Computer Science student focused on turning modern AI
            models into useful applications. I work across LLM-powered features, Retrieval-Augmented Generation (RAG),
            computer-vision models and full-stack web development.
          </p>
          <p className="lead" style={{ marginTop: 16 }}>
            I enjoy connecting Python and FastAPI backends with modern web interfaces and databases that fit the
            problem — and I learn by building, testing and improving.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Tilt max={5}>
          <div className="facts card">
            <div className="fact"><span>Location</span><span>{siteConfig.location}</span></div>
            <div className="fact"><span>Education</span><span>BS Computer Science · Superior University · expected 2028</span></div>
            <div className="fact"><span>Focus</span><span>Computer Vision · LLM apps · RAG</span></div>
            <div className="fact"><span>Also</span><span>Full-stack development</span></div>
            <div className="fact" style={{ borderBottom: 0 }}><span>Approach</span><span>Useful apps, not just demos</span></div>
          </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
