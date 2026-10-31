"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useIsDark } from "@/lib/use-theme";

const Hyperspeed = dynamic(() => import("@/components/Hyperspeed"), {
  ssr: false,
});

export default function PortfolioBackground() {
  const isDark = useIsDark();
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 700);
    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });

    const checkIntro = () => {
      if (document.documentElement.dataset.intro !== "active") {
        setActive(true);
      }
    };
    checkIntro();

    const onIntroChange = (e: Event) => {
      const detail = (e as CustomEvent<{ locked?: boolean }>).detail;
      if (detail && detail.locked === false) {
        setActive(true);
      }
    };
    window.addEventListener("portfolio-intro-change", onIntroChange);

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("portfolio-intro-change", onIntroChange);
    };
  }, []);

  return (
    <div className="portfolio-bg" aria-hidden="true">
      {active && (
        <div className="portfolio-bg__canvas">
          <Hyperspeed
            theme={isDark ? "dark" : "light"}
            curve="winding"
            curvature={0.85}
            speed={0.75}
            boost={2.2}
            fov={86}
            boostFov={118}
            lanes={3}
            roadWidth={10}
            medianWidth={2}
            density={isMobile ? 14 : 26}
            trailLength={1.05}
            lightSize={0.9}
            poles={isMobile ? 8 : 14}
            poleHeight={1}
            dust={isMobile ? 24 : 55}
            glow={isDark ? 0.45 : 0.2}
            reflections={isDark ? 0.35 : 0.15}
            steer={0.18}
            roadOpacity={0.12}
            maxPixelRatio={isMobile ? 1.15 : 1.5}
            boosting={false}
            tailColors={
              isDark
                ? ["#ffffff", "#d4d4d8", "#71717a"]
                : ["#09090b", "#3f3f46", "#71717a"]
            }
            headColors={
              isDark
                ? ["#ffffff", "#e4e4e7", "#a1a1aa"]
                : ["#18181b", "#52525b", "#a1a1aa"]
            }
            poleColors={isDark ? ["#e4e4e7"] : ["#27272a"]}
            roadColor={isDark ? "#070708" : "#ececea"}
            lineColor={isDark ? "#222226" : "#d4d4d8"}
            background={isDark ? "#050505" : "#f4f4f2"}
          />
        </div>
      )}
      <div className="portfolio-bg__scrim" />
    </div>
  );
}
