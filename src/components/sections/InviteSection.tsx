"use client";

import { useState } from "react";
import TearTicket from "@/components/TearTicket";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site-config";

const invitations = [
  { href: "#work", label: "Discover My AI Projects" },
  { href: "#experience", label: "Explore My Technical Journey" },
  { href: "#contact", label: "Let's Build Something Intelligent", primary: true },
];

/** A professional invitation, torn open by dragging the stub (Enter / Space also tears it). */
export default function InviteSection() {
  const [torn, setTorn] = useState(false);

  return (
    <section id="invite" className="section" aria-labelledby="invite-title">
      <div className="container invite-wrap">
        <Reveal>
          <div>
            <p className="eyebrow">An invitation</p>
            <h2 id="invite-title" className="h-section">Welcome to my digital workspace.</h2>
            <p className="lead">
              A small invitation to explore my AI engineering world — computer vision, LLM apps and RAG, built into
              practical products.
            </p>
            {torn ? (
              <div className="invite-reveal" role="region" aria-label="Where to go next">
                {invitations.map((i) => (
                  <a key={i.href} href={i.href} className={`btn${i.primary ? " btn-primary" : ""}`}>
                    {i.label} <span aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="invite-hint">Drag the stub to tear it — or focus it and press Enter.</p>
            )}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="invite-stage">
            <TearTicket
              width={460}
              height={250}
              stubSize={130}
              holes={11}
              radius={18}
              rotate={-3}
              tearAngle={32}
              background="var(--surface)"
              color="var(--text)"
              borderColor="var(--border-2)"
              ariaLabel="Tear off the stub to open the invitation"
              onTear={() => setTorn(true)}
              stub={
                <div className="ticket-stub">
                  <span className="arrow" aria-hidden="true">←</span>
                  <b>TEAR</b>
                  <span className="eyebrow">to enter</span>
                </div>
              }
            >
              <div className="ticket-inner">
                <div>
                  <span className="eyebrow mono">Admit one · AI engineering world</span>
                  <h3 className="ticket-title">Let&apos;s build something intelligent.</h3>
                </div>
                <div className="ticket-meta">
                  <span>{siteConfig.name}</span>
                  <span>{siteConfig.location}</span>
                </div>
              </div>
            </TearTicket>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

