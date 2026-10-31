"use client";

import { useEffect, useState } from "react";
import SlingButton from "@/components/SlingButton";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > Math.max(480, window.innerHeight * 0.8));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={`back-to-top${show ? " show" : ""}`} aria-hidden={!show}>
      <span inert={!show}>
        <SlingButton
          onSend={toTop}
          ariaLabel="Back to top"
          size={48}
          maxPull={110}
          armAt={40}
          particles={8}
          padColor="var(--accent)"
          accentColor="var(--accent)"
          iconColor="var(--on-accent)"
          wellColor="var(--fill-2)"
          bandColor="var(--border-2)"
        />
      </span>
    </div>
  );
}
