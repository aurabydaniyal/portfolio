import Reveal from "@/components/ui/Reveal";
import { principles } from "@/data/engineering-principles";

export default function EngineeringSection() {
  return (
    <section id="engineering" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">04 — Under the Hood</p>
          <h2 className="h-section">How I think about building systems</h2>
          <p className="lead">Principles I design toward. Each card says whether it&apos;s a goal or already applied in project work.</p>
        </Reveal>
        <div className="grid-2" style={{ marginTop: 40 }}>
          {principles.map((p, i) => (
            <Reveal key={p.num} delay={(i % 2) * 100}>
              <article className="card principle" style={{ height: "100%" }}>
                <span className="num">{p.num}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <div className="terminal">{p.flow}</div>
                  <span className="pkind">{p.kind}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
