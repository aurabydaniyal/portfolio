"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import { siteConfig } from "@/data/site-config";

interface SkillItem {
  name: string;
  dotColor: "lime" | "cyan";
}

// Exact skills and dot colors from the user's reference image:
const ORBIT_1_SKILLS: SkillItem[] = [
  { name: "Next.js", dotColor: "lime" },
  { name: "RAG", dotColor: "lime" },
  { name: "Hugging Face", dotColor: "cyan" },
  { name: "FastAPI", dotColor: "lime" },
  { name: "Computer Vision", dotColor: "cyan" },
];

const ORBIT_2_SKILLS: SkillItem[] = [
  { name: "React", dotColor: "cyan" },
  { name: "LLMs", dotColor: "cyan" },
  { name: "Python", dotColor: "lime" },
  { name: "ChromaDB", dotColor: "cyan" },
  { name: "LangChain", dotColor: "cyan" },
];

type Phase = "intro" | "opening" | "done";

export default function IntroGate() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [dimensions, setDimensions] = useState({ w: 1200, h: 800 });

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const opening = useRef(false);
  const failsafe = useRef(0);

  // Measure window for responsive orbit radii
  useEffect(() => {
    const update = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const setLocked = useCallback((locked: boolean) => {
    const site = document.getElementById("site-root");
    if (site) {
      if (locked) site.setAttribute("inert", "");
      else site.removeAttribute("inert");
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  useEffect(() => {
    setLocked(true);
    rootRef.current?.focus({ preventScroll: true });
    return () => {
      window.clearTimeout(failsafe.current);
      setLocked(false);
    };
  }, [setLocked]);

  const open = useCallback(() => {
    if (opening.current) return;
    opening.current = true;
    setPhase("opening");
    const el = rootRef.current;
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      setLocked(false);
    };
    const finish = () => {
      unlock();
      window.clearTimeout(failsafe.current);
      setPhase("done");
      window.scrollTo(0, 0);
    };
    if (!el) return finish();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    failsafe.current = window.setTimeout(finish, 2400);

    animate(0, 1, {
      duration: reduced ? 0.35 : 1.1,
      ease: reduced ? "linear" : [0.76, 0, 0.24, 1],
      onUpdate: (v) => {
        el.style.setProperty("--open", v.toFixed(4));
        if (reduced) {
          el.style.opacity = String(1 - v);
        } else {
          el.style.transform = `translate3d(0, ${(-v * 100).toFixed(3)}%, 0)`;
        }
        if (v > 0.5) unlock();
      },
      onComplete: finish,
    });
  }, [setLocked]);

  // Orbit animation loop using requestAnimationFrame
  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(Math.PI * 0.4); // offset for balance
  const isHovered = useRef(false);

  useEffect(() => {
    if (phase !== "intro") return;
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const speed = isHovered.current ? 0.04 : 0.16; // radians per second
        setAngle1((a) => (a + speed * dt) % (Math.PI * 2));
        setAngle2((a) => (a + speed * 0.88 * dt) % (Math.PI * 2));
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Compute responsive radii
  const isMobile = dimensions.w < 640;
  const isTablet = dimensions.w >= 640 && dimensions.w < 1024;

  const rx = isMobile ? Math.min(230, dimensions.w * 0.44) : isTablet ? 360 : 490;
  const ry = isMobile ? Math.min(130, dimensions.h * 0.17) : isTablet ? 175 : 225;

  const tilt1 = -15 * (Math.PI / 180); // tilt top-left to bottom-right
  const tilt2 = 15 * (Math.PI / 180);  // crossing tilt bottom-left to top-right

  // Helper function to calculate position on tilted ellipse
  const getPosition = (
    baseAngle: number,
    index: number,
    total: number,
    rX: number,
    rY: number,
    tilt: number
  ) => {
    const t = baseAngle + (index / total) * Math.PI * 2;
    const lx = rX * Math.cos(t);
    const ly = rY * Math.sin(t);
    const cosTilt = Math.cos(tilt);
    const sinTilt = Math.sin(tilt);

    const x = lx * cosTilt - ly * sinTilt;
    const y = lx * sinTilt + ly * cosTilt;

    // Depth perspective from front (y > 0) to back (y < 0)
    const depth = (Math.sin(t) + 1) / 2; // 0 (back) to 1 (front)
    const scale = 0.88 + depth * 0.22;
    const opacity = 0.65 + depth * 0.35;
    const zIndex = Math.round(10 + depth * 70);

    return { x, y, scale, opacity, zIndex };
  };

  // Slider state in pixels for accurate real-time feedback
  const [slideX, setSlideX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const slideXRef = useRef(0);
  const isDoneRef = useRef(false);

  // Responsive track max travel (matches CSS: min(320px, calc(100vw - 44px)) - 52px)
  const maxTravel = Math.max(80, Math.min(320, dimensions.w - 44) - 52);
  const slideProgress = Math.min(1, Math.max(0, slideX / maxTravel));

  useEffect(() => {
    slideXRef.current = slideX;
  }, [slideX]);

  const triggerOpen = useCallback(
    (immediate = false) => {
      if (opening.current || isDoneRef.current) return;
      isDoneRef.current = true;
      const currentX = slideXRef.current;

      if (immediate || currentX >= maxTravel) {
        setSlideX(maxTravel);
        open();
        return;
      }

      // Smoothly animate the handle sliding to the right edge, then open
      animate(currentX, maxTravel, {
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setSlideX(v),
        onComplete: () => {
          setSlideX(maxTravel);
          open();
        },
      });
    },
    [maxTravel, open]
  );

  // Scroll wheel / touchpad scroll down or touch swipe to slide open
  useEffect(() => {
    if (phase !== "intro") return;

    let accumulatedDelta = 0;
    const handleWheel = (e: WheelEvent) => {
      if (opening.current || isDoneRef.current) return;
      if (e.deltaY > 10) {
        accumulatedDelta += e.deltaY;
        if (accumulatedDelta > 30) {
          triggerOpen();
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (opening.current || isDoneRef.current) return;
      if (e.touches.length === 1 && touchStartY > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        if (deltaY > 45) {
          triggerOpen();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [phase, triggerOpen]);

  // Pointer drag handling for slider
  const handlePointerDown = (e: React.PointerEvent) => {
    if (opening.current || isDoneRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    const startClientX = e.clientX;
    const initialSlideX = slideXRef.current;
    let moved = false;

    setIsDragging(true);
    try {
      track.setPointerCapture(e.pointerId);
    } catch {}

    const onPointerMove = (ev: PointerEvent) => {
      const deltaX = ev.clientX - startClientX;
      if (Math.abs(deltaX) > 2) moved = true;
      const nextX = Math.max(0, Math.min(maxTravel, initialSlideX + deltaX));
      setSlideX(nextX);

      // If dragged 75% across, smoothly glide the rest and open
      if (nextX >= maxTravel * 0.75) {
        cleanup();
        triggerOpen();
      }
    };

    const onPointerUp = () => {
      cleanup();
      setIsDragging(false);

      if (!moved) {
        // Direct tap or click on track/thumb
        triggerOpen();
        return;
      }

      if (slideXRef.current >= maxTravel * 0.45) {
        triggerOpen();
      } else {
        // Smoothly spring back to start
        animate(slideXRef.current, 0, {
          duration: 0.28,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => setSlideX(v),
          onComplete: () => setSlideX(0),
        });
      }
    };

    const cleanup = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  if (phase === "done") return null;

  return (
    <div
      ref={rootRef}
      className="intro-landing"
      role="dialog"
      aria-modal="true"
      aria-label={`${siteConfig.name} — introduction`}
      tabIndex={-1}
      data-phase={phase}
    >
      {/* Sci-Fi Tech Background with Cyan Grid & Vignette */}
      <div className="intro-landing__bg" aria-hidden="true">
        <div className="intro-landing__grid" />
        <div className="intro-landing__vignette" />
      </div>

      <div className="intro-landing__content">
        {/* Main Orbit Stage with Title in Center */}
        <div
          className="intro-landing__stage"
          onMouseEnter={() => {
            isHovered.current = true;
          }}
          onMouseLeave={() => {
            isHovered.current = false;
          }}
        >
          {/* SVG Orbital Paths (Two Crossing Ellipses) */}
          <svg
            className="intro-landing__paths-svg"
            viewBox={`-${rx + 80} -${ry + 80} ${(rx + 80) * 2} ${(ry + 80) * 2}`}
            aria-hidden="true"
          >
            <defs>
              <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbit 1 Track */}
            <g transform={`rotate(${-15})`}>
              <ellipse
                cx={0}
                cy={0}
                rx={rx}
                ry={ry}
                fill="none"
                stroke="rgba(56, 189, 248, 0.22)"
                strokeDasharray="4 6"
                strokeWidth={1.2}
              />
              {/* Waypoint glowing stars on Orbit 1 */}
              <circle
                cx={rx * Math.cos(angle1 + 1.2)}
                cy={ry * Math.sin(angle1 + 1.2)}
                r={2.8}
                fill="#38bdf8"
                filter="url(#star-glow)"
              />
              <circle
                cx={rx * Math.cos(angle1 + 3.8)}
                cy={ry * Math.sin(angle1 + 3.8)}
                r={2.2}
                fill="#38bdf8"
                opacity={0.8}
              />
            </g>

            {/* Orbit 2 Track (Crossing) */}
            <g transform={`rotate(${15})`}>
              <ellipse
                cx={0}
                cy={0}
                rx={rx}
                ry={ry}
                fill="none"
                stroke="rgba(56, 189, 248, 0.22)"
                strokeDasharray="4 6"
                strokeWidth={1.2}
              />
              {/* Waypoint glowing stars on Orbit 2 */}
              <circle
                cx={rx * Math.cos(angle2 + 0.8)}
                cy={ry * Math.sin(angle2 + 0.8)}
                r={2.8}
                fill="#38bdf8"
                filter="url(#star-glow)"
              />
              <circle
                cx={rx * Math.cos(angle2 + 3.4)}
                cy={ry * Math.sin(angle2 + 3.4)}
                r={2.2}
                fill="#c7f36b"
                filter="url(#star-glow)"
              />
            </g>
          </svg>

          {/* Central Title Card (Direct Match to Image) */}
          <div className="intro-landing__center">
            <div className="intro-landing__eyebrow">
              <span className="intro-landing__dot intro-landing__dot--lime" />
              <span>AI ENGINEER — PORTFOLIO</span>
            </div>

            <h1 className="intro-landing__title">
              <span className="intro-landing__line">Daniyal&apos;s</span>
              <span className="intro-landing__line">
                Portfol<span className="intro-landing__accent-io">io</span>
              </span>
            </h1>

            <p className="intro-landing__subtitle">
              AI Engineer building LLM apps, RAG pipelines &amp; vision systems.
            </p>
          </div>

          {/* Orbit 1 Skill Badges */}
          <div className="intro-landing__orbit-layer" style={{ zIndex: 30 }}>
            {ORBIT_1_SKILLS.map((skill, index) => {
              const { x, y, scale, opacity, zIndex } = getPosition(
                angle1,
                index,
                ORBIT_1_SKILLS.length,
                rx,
                ry,
                tilt1
              );
              return (
                <div
                  key={skill.name}
                  className="intro-landing__badge"
                  style={{
                    transform: `translate3d(calc(${x.toFixed(1)}px - 50%), calc(${y.toFixed(1)}px - 50%), 0) scale(${scale.toFixed(3)})`,
                    opacity: opacity.toFixed(2),
                    zIndex,
                  }}
                >
                  <span
                    className={`intro-landing__dot intro-landing__dot--${skill.dotColor}`}
                    aria-hidden="true"
                  />
                  <span className="intro-landing__badge-text">{skill.name}</span>
                </div>
              );
            })}
          </div>

          {/* Orbit 2 Skill Badges (Crossing) */}
          <div className="intro-landing__orbit-layer" style={{ zIndex: 35 }}>
            {ORBIT_2_SKILLS.map((skill, index) => {
              const { x, y, scale, opacity, zIndex } = getPosition(
                angle2,
                index,
                ORBIT_2_SKILLS.length,
                rx,
                ry,
                tilt2
              );
              return (
                <div
                  key={skill.name}
                  className="intro-landing__badge"
                  style={{
                    transform: `translate3d(calc(${x.toFixed(1)}px - 50%), calc(${y.toFixed(1)}px - 50%), 0) scale(${scale.toFixed(3)})`,
                    opacity: opacity.toFixed(2),
                    zIndex,
                  }}
                >
                  <span
                    className={`intro-landing__dot intro-landing__dot--${skill.dotColor}`}
                    aria-hidden="true"
                  />
                  <span className="intro-landing__badge-text">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Slide-to-Open Controls (Direct Match to Image) */}
        <div className="intro-landing__bottom">
          <div
            ref={trackRef}
            className="intro-landing__slide-track"
            role="slider"
            tabIndex={0}
            aria-label="Slide to open portfolio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(slideProgress * 100)}
            onPointerDown={handlePointerDown}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight" || e.key === "End") {
                e.preventDefault();
                triggerOpen();
              }
            }}
          >
            {/* Glowing Lime Trail Fill */}
            <div
              className={`intro-landing__slide-fill ${isDragging ? "dragging" : ""}`}
              style={{
                width: `${Math.max(44, Math.min(maxTravel + 44, slideX + 44))}px`,
              }}
              aria-hidden="true"
            />

            {/* Draggable Lime Circle Handle with Arrow */}
            <div
              className={`intro-landing__slide-thumb ${isDragging ? "dragging" : ""}`}
              style={{
                transform: `translate3d(${slideX.toFixed(1)}px, 0, 0)`,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            <span
              className="intro-landing__slide-label"
              style={{
                opacity: Math.max(0, 1 - slideProgress * 1.6),
                transform: `translateX(${(slideX * 0.15).toFixed(1)}px)`,
              }}
            >
              Slide to open
            </span>
          </div>

          <button
            type="button"
            className="intro-landing__skip-btn"
            onClick={() => triggerOpen(true)}
          >
            SKIP INTRO
          </button>
        </div>

        {/* Corner Technical Metadata */}
        <div className="intro-landing__corner intro-landing__corner--left" aria-hidden="true">
          © 2026 MUHAMMAD DANIYAL
        </div>
        <div className="intro-landing__corner intro-landing__corner--right" aria-hidden="true">
          01 — INTRO
        </div>
      </div>
    </div>
  );
}
