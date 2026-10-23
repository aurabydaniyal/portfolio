import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import type { Project } from "@/types/portfolio";
import Glass from "@/components/ui/Glass";

function Card({ p }: { p: Project }) {
  return (
    <Glass className="project-glass">
    <article className="project glass-pad">
      <div className="proj-top">
        <span className={`status ${p.status.replace(" ", "")}`}>{p.status}</span>
        <span className="cat mono">{p.category}</span>
      </div>
      {p.badge && <span className="proj-badge mono">{p.badge}</span>}
      <h3>{p.title}</h3>
      <p className="lead" style={{ margin: 0, fontSize: 16 }}>{p.shortDescription}</p>
      <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
      <ul className="badges" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {p.technologies.map((t) => <li key={t} className="badge">{t}</li>)}
      </ul>
      <p className="statusnote"><strong>Status:</strong> {p.statusNote}</p>
      {p.caveat && <p className="caveat">{p.caveat}</p>}
      {p.futureWork && <p className="statusnote"><strong>Future:</strong> {p.futureWork.join("; ")}</p>}
      {(p.repoUrl || p.liveUrl) && (
        <div className="cta-row" style={{ margin: 0 }}>
          {p.repoUrl && <a className="btn" href={p.repoUrl} target="_blank" rel="noopener noreferrer">Repository</a>}
          {p.liveUrl && <a className="btn" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Live demo</a>}
        </div>
      )}
    </article>
    </Glass>
  );
}

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const explorations = projects.filter((p) => !p.featured);
  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">03 — Selected Work</p>
          <h2 className="h-section">Projects</h2>
          <p className="lead">Every project carries an honest status label. Concepts are labeled as concepts.</p>
        </Reveal>
        <div className="grid-2" style={{ marginTop: 40 }}>
          {featured.map((p, i) => <Reveal key={p.slug} delay={i * 100}><Card p={p} /></Reveal>)}
        </div>
        <Reveal>
          <h3 className="explore-title">Explorations</h3>
          <p className="lead" style={{ marginBottom: 24 }}>Early-stage ideas I&apos;m designing and researching.</p>
        </Reveal>
        <div className="grid-2">
          {explorations.map((p, i) => <Reveal key={p.slug} delay={i * 100}><Card p={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}
