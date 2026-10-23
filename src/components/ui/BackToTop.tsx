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
          padColor="var(--lime)"
          accentColor="var(--lime)"
          iconColor="#071008"
          wellColor="rgba(10, 16, 20, 0.55)"
          bandColor="rgba(255, 255, 255, 0.35)"
        />
      </span>
    </div>
  );
}
