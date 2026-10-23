import LogoLoop from "@/components/LogoLoop";
import { getLogoItems } from "@/data/logos";

export default function TechLoopSection() {
  const logos = getLogoItems();
  return (
    <section className="tech-loop" aria-label="Technologies I work with">
      <p className="eyebrow tech-loop__label">Tools &amp; technologies I use</p>
      <LogoLoop
        logos={logos}
        speed={55}
        logoHeight={26}
        gap={44}
        fadeOut
        fadeOutWidth={0.12}
        pauseOnHover
        draggable
        scaleOnHover
        ariaLabel="Technology logos"
      />
    </section>
  );
}
