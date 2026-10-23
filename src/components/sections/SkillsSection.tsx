import Reveal from "@/components/ui/Reveal";
import { foundations, skillCategories } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">02 — Stack</p>
          <h2 className="h-section">Skills &amp; technology map</h2>
          <p className="lead">Grouped by domain, with a clear line between what I focus on and what I&apos;m still exploring.</p>
          <div className="legend" aria-label="Legend">
            <span><i className="p" />Primary focus</span>
            <span><i />Also used</span>
            <span><i className="f" />Foundations / exploring</span>
          </div>
        </Reveal>
        <div className="grid-2">
          {skillCategories.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 100}>
              <article className="card skill-card" style={{ height: "100%" }}>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
                <ul className="badges" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {c.items.map((s) => (
                    <li key={s.name} className={`badge ${s.tier}`} title={s.note}>
                      {s.name}
                      {s.level && <small className="level">{s.level}</small>}
                    </li>
                  ))}
                </ul>
                {c.alsoExplored && (
                  <p className="more"><b>Also explored</b>{c.alsoExplored.join(" · ")}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="card foundations">
            <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>Foundations / currently studying</h3>
            <p style={{ color: "var(--text-2)", fontSize: 15, margin: "0 0 14px" }}>
              Theoretical knowledge that underpins the applied work above — not advertised as hands-on expertise.
            </p>
            <ul className="badges" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {foundations.map((f) => <li key={f} className="badge foundation">{f}</li>)}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
