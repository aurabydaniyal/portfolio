"use client";

import TechText from "@/components/TechText";
import { siteConfig } from "@/data/site-config";

/**
 * React Bits TechText, used only for the name in the navbar. The canvas is decorative,
 * so the real name is exposed to assistive tech through a visually hidden span.
 */
export default function NavName() {
  const shortName = "M. Daniyal";
  return (
    <span className="tech-name">
      <span className="sr-only">{siteConfig.name}</span>
      <span className="tech-name__canvas" aria-hidden="true">
        <TechText
          text={shortName}
          fontSize={60}
          fontWeight={700}
          letterSpacing={-0.02}
          color="currentColor"
          accentColor="var(--lime)"
          align="left"
          reach={80}
          intro="type"
          introDuration={1.4}
          reveal="letter"
          specks={4}
          labels={false}
          draggable={false}
          clickKick={false}
          sweep={false}
          bounce={0.25}
        />
      </span>
    </span>
  );
}
