import Reveal from "@/components/ui/Reveal";
import OverviewCarousel from "@/components/ui/OverviewCarousel";
import { overviewCards } from "@/data/overview";

export default function OverviewSection() {
  return (
    <section id="overview" className="section overview" aria-labelledby="overview-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">At a glance</p>
          <h2 id="overview-title" className="h-section">Skills &amp; projects, in short</h2>
          <p className="lead">
            A quick tour. Swipe, drag or use the arrow keys — the full detail is in Stack and Work below.
          </p>
        </Reveal>
      </div>
      <div className="container overview-wrap">
        <OverviewCarousel cards={overviewCards} />
      </div>
    </section>
  );
}
