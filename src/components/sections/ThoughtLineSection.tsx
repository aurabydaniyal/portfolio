"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import ThoughtLine from "@/components/ThoughtLine";
import Reveal from "@/components/ui/Reveal";
import { EncryptedText } from "@/components/ui/encrypted-text";

const statements = [
  "Building intelligence into everyday applications.",
  "Turning complex ideas into practical AI solutions.",
  "The future belongs to systems that understand, reason, and adapt.",
  "From computer vision to intelligent language systems.",
  "Engineering solutions where intelligence meets innovation.",
  "Transforming ideas into intelligent experiences.",
];

/**
 * AI-engineer "thought line", placed right after the Technology Stack. Scrolling through the panel
 * walks the thought forward one statement at a time; the ThoughtLine header shimmers while the
 * thought is "in progress" and settles once the last statement has landed.
 */
export default function ThoughtLineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 52%"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(statements.length, Math.max(0, Math.ceil(p * statements.length - 0.02)));
    setCount((c) => (c === next ? c : next));
  });

  const settled = count >= statements.length;

  return (
    <section className="thought" aria-label="Thought line: how I think about AI engineering">
      <div className="container">
        <Reveal>
          <div ref={ref} className="thought-panel">
            <div className="thought-head">
              <ThoughtLine
                label="Reasoning about intelligent systems…"
                doneLabel="Thought complete"
                working={!settled}
                collapsible={false}
                showTimer={false}
                fontSize={15}
                color="var(--text-2)"
                glyphColor="var(--text)"
              />
              <span className="eyebrow">
                {String(Math.min(count, statements.length)).padStart(2, "0")} / {String(statements.length).padStart(2, "0")}
              </span>
            </div>
            <ol className="thought-quotes">
              {statements.map((s, i) => {
                const state = i < count - 1 ? "done" : i === count - 1 ? "live" : "idle";
                return (
                  <li key={s} className="thought-quote" data-state={state}>
                    <span className="n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      {state === "idle" ? (
                        s
                      ) : (
                        <EncryptedText text={s} revealDelayMs={14} flipDelayMs={40} encryptedClassName="enc-scramble" revealedClassName="enc-revealed" />
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

