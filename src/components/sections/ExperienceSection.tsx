import Reveal from "@/components/ui/Reveal";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { education, experience } from "@/data/experience";
import type { TimelineEntry } from "@/types/portfolio";

function Col({ title, items }: { title: string; items: TimelineEntry[] }) {
  return (
    <div>
      <h3 className="col-title">{title}</h3>
      {items.map((e) => (
        <div key={e.title} className="timeline-item">
          <h4>{e.title}</h4>
          <div className="meta">{e.org} · {e.period}</div>
          <p>{e.detail}</p>
        </div>
      ))}
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">05 — Background</p>
          <h2 className="h-section">
            <EncryptedText text="Experience & education" revealDelayMs={50} encryptedClassName="enc-scramble" revealedClassName="enc-revealed" />
          </h2>
        </Reveal>
        <Reveal>
          <div className="grid-2" style={{ marginTop: 40, gap: 56 }}>
            <Col title="Experience" items={experience} />
            <Col title="Education" items={education} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
