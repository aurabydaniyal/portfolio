"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";
import ScrollExpand from "@/components/ScrollExpand";
import FlyingButton from "@/components/FlyingButton";
import OrbitSkills, { type OrbitHandle } from "@/components/ui/OrbitSkills";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { siteConfig } from "@/data/site-config";
import { useIsDark } from "@/lib/use-theme";

const Hyperspeed = dynamic(() => import("@/components/Hyperspeed"), {
  ssr: false,
});

const LOADING_STATES = [
  { text: "Initializing Muhammad Daniyal's Portfolio..." },
  { text: "Establishing AI Engineering Environment..." },
  { text: "Loading Artificial Intelligence Projects..." },
  { text: "Initializing Computer Vision Systems..." },
  { text: "Preparing RAG & LLM Applications..." },
  { text: "Loading Technical Skills & Experience..." },
  { text: "Preparing Professional Experience..." },
  { text: "Establishing Professional Connection..." },
  { text: "Portfolio Successfully Initialized." },
  { text: "Welcome to My Digital World." },
];

type Phase = "intro" | "launching" | "loading" | "revealing" | "done";

export default function IntroGate() {
  const isDark = useIsDark();
  const [phase, setPhase] = useState<Phase>("intro");
  const [fogVisible, setFogVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loaderStep, setLoaderStep] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const frameRimRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<OrbitHandle>(null);
  const phaseRef = useRef<Phase>("intro");
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 700);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const setSiteLocked = useCallback((locked: boolean) => {
    const site = document.getElementById("site-root");
    if (site) {
      if (locked) site.setAttribute("inert", "");
      else site.removeAttribute("inert");
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
    if (locked) {
      document.documentElement.dataset.intro = "active";
    } else {
      delete document.documentElement.dataset.intro;
    }
    window.dispatchEvent(new CustomEvent("portfolio-intro-change", { detail: { locked } }));
  }, []);

  useEffect(() => {
    setSiteLocked(true);
    return () => {
      clearTimers();
      setSiteLocked(false);
    };
  }, [clearTimers, setSiteLocked]);

  const finishIntoPortfolio = useCallback(
    (immediate = false) => {
      if (phaseRef.current === "revealing" || phaseRef.current === "done") return;
      clearTimers();
      setSiteLocked(false);
      window.scrollTo(0, 0);

      if (immediate) {
        setPhase("done");
        return;
      }

      setPhase("revealing");
      schedule(() => {
        setPhase("done");
      }, 850);
    },
    [clearTimers, schedule, setSiteLocked]
  );

  // Triggered when FlyingButton launches: let FlyingButton itself ignite and climb across the screen
  // pouring out its built-in WebGL2 smoke/fog trail before transitioning into the full-page loader.
  const triggerRocketLaunch = useCallback(() => {
    if (phaseRef.current !== "intro") return;
    clearTimers();
    setPhase("launching");

    // Fade in ambient fog while the button climbs through the upper half of the screen
    schedule(() => {
      setFogVisible(true);
    }, 1350);

    // Transition to the full-page Aceternity Multi-Step Loader once the button reaches the top
    schedule(() => {
      setPhase("loading");
      setLoaderStep(0);
    }, 2150);
  }, [clearTimers, schedule]);

  // Step-by-step progression through all 10 loading states
  useEffect(() => {
    if (phase !== "loading") return;
    let cancelled = false;
    const stepMs = 310;

    const fontsReady =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready.catch(() => undefined)
        : Promise.resolve();

    let step = 0;
    const next = () => {
      if (cancelled) return;
      if (step < LOADING_STATES.length - 1) {
        step += 1;
        setLoaderStep(step);
        const id = window.setTimeout(next, stepMs);
        timersRef.current.push(id);
      } else {
        fontsReady.then(() => {
          if (cancelled) return;
          const id = window.setTimeout(() => finishIntoPortfolio(false), 450);
          timersRef.current.push(id);
        });
      }
    };

    const first = window.setTimeout(next, stepMs);
    timersRef.current.push(first);

    return () => {
      cancelled = true;
    };
  }, [phase, finishIntoPortfolio]);

  const handleExpandProgress = useCallback(
    (p: number, eased: number, box: { width: number; height: number; radius: number }) => {
      orbitRef.current?.setExpansion(eased);
      if (frameRimRef.current) {
        const ix = Math.max(0, (100 - box.width) / 2);
        const iy = Math.max(0, (100 - box.height) / 2);
        frameRimRef.current.style.inset = `${iy.toFixed(2)}% ${ix.toFixed(2)}%`;
        frameRimRef.current.style.borderRadius = `${box.radius.toFixed(1)}px`;
        frameRimRef.current.style.opacity = (1 - eased * 0.75).toFixed(3);
      }
      if (p > 0.62 && !expanded) setExpanded(true);
      else if (p <= 0.62 && expanded) setExpanded(false);
    },
    [expanded]
  );

  if (phase === "done") return null;

  const showStage = phase === "intro" || phase === "launching";
  const showFog = fogVisible || phase === "loading" || phase === "revealing";

  return (
    <div
      ref={rootRef}
      className="intro-gate"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label={siteConfig.name}
    >
      {showStage && (
        <ScrollExpand
          className="intro-gate__scroller"
          startWidth={isMobile ? 84 : 48}
          startHeight={isMobile ? 50 : 58}
          startRadius={28}
          endRadius={0}
          mediaZoom={1.22}
          scrollDistance={1.1}
          holdDistance={0.35}
          smoothing={0.09}
          overlayScrim={isDark ? 0.36 : 0.2}
          useWindowScroll={false}
          onProgress={handleExpandProgress}
          mediaNode={
            <div className="intro-gate__hyperspeed-wrap">
              <Hyperspeed
                theme={isDark ? "dark" : "light"}
                curve="winding"
                curvature={0.9}
                speed={0.95}
                boost={3.4}
                fov={88}
                boostFov={132}
                lanes={3}
                roadWidth={10}
                medianWidth={2}
                density={isMobile ? 16 : 34}
                trailLength={1.1}
                lightSize={0.95}
                poles={isMobile ? 10 : 18}
                poleHeight={1}
                dust={isMobile ? 35 : 85}
                glow={isDark ? 0.55 : 0.25}
                reflections={isDark ? 0.45 : 0.2}
                steer={0.3}
                roadOpacity={0.14}
                maxPixelRatio={isMobile ? 1.25 : 2}
                boosting={phase === "launching" || expanded}
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
          }
          stageUnder={
            <div className="intro-gate__backdrop" aria-hidden="true">
              <div className="intro-gate__grid" />
              <div className="intro-gate__vignette" />
            </div>
          }
          stageOver={
            <div className="intro-gate__hud">
              {/* Sleek glass frame border tracking ScrollExpand */}
              <div ref={frameRimRef} className="intro-gate__frame-rim" aria-hidden="true" />

              {/* 3D Orbiting Technical Skill Cards (all 12 skills) */}
              <OrbitSkills ref={orbitRef} paused={false} />

              {/* Top-Right Theme Toggle */}
              <div className="intro-gate__topbar">
                <div className="intro-gate__top-actions">
                  <AnimatedThemeToggler
                    className="theme-toggle intro-gate__theme-btn"
                    aria-label="Toggle light or dark theme"
                    duration={550}
                  />
                </div>
              </div>

              {/* Pure Typographic Central Identity (no card box) */}
              <div className="intro-gate__identity">
                <h1 className="intro-gate__name">{siteConfig.name}</h1>
                <p className="intro-gate__role mono">
                  <EncryptedText
                    text={siteConfig.role}
                    revealDelayMs={26}
                    flipDelayMs={42}
                    encryptedClassName="enc-scramble"
                    revealedClassName="enc-revealed"
                  />
                </p>
              </div>

              {/* Full-Screen FlyingButton Stage — button sits at bottom-right, flies up to top, and leaves its own WebGL smoke/fog trail */}
              <div className="intro-gate__flying-stage">
                <FlyingButton
                  theme={isDark ? "dark" : "light"}
                  size={isMobile ? "medium" : "large"}
                  radius={999}
                  altitude={1200}
                  hoverTime={6}
                  jets={3}
                  thrusters
                  trigger="click"
                  carryCursor={false}
                  doubleClick={false}
                  anchor="right"
                  inset={isMobile ? 20 : 36}
                  smoke={1.9}
                  turbulence={1.25}
                  wobble={0.85}
                  thrustColor={isDark ? "#ffffff" : "#18181b"}
                  smokeColor={isDark ? "#f4f4f5" : "#52525b"}
                  buttonColor={isDark ? "#0e0e11" : "#141417"}
                  textColor="#fafafa"
                  onLaunch={() => triggerRocketLaunch()}
                >
                  <span className="intro-gate__rocket-label">
                    <Rocket size={16} className="intro-gate__rocket-icon" aria-hidden="true" />
                    <span>READY TO FLY</span>
                  </span>
                </FlyingButton>
              </div>
            </div>
          }
        />
      )}

      {/* Full-Screen Fog Environment & Full-Page Aceternity Multi-Step Loader */}
      {showFog && (
        <div className="intro-fog" data-fog-phase={phase}>
          <div className="intro-fog__layer intro-fog__layer--1" aria-hidden="true" />
          <div className="intro-fog__layer intro-fog__layer--2" aria-hidden="true" />
          <div className="intro-fog__layer intro-fog__layer--3" aria-hidden="true" />

          {phase === "loading" && (
            <MultiStepLoader
              loadingStates={LOADING_STATES}
              loading
              value={loaderStep}
              loop={false}
            />
          )}
        </div>
      )}
    </div>
  );
}
