"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from "react";
import { Brain, Database, Network, ScanEye } from "lucide-react";
import {
  siFastapi,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
} from "simple-icons";

type Skill = { name: string; icon: ReactNode };

const brand = (path: string) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
);
const glyph = (node: ReactNode) => node;

/**
 * All 12 actual technologies from Muhammad Daniyal's portfolio (`data/skills.ts`).
 * Every single skill stays visible across all viewport sizes.
 */
const SKILLS: Skill[] = [
  { name: "Python", icon: brand(siPython.path) },
  { name: "React", icon: brand(siReact.path) },
  { name: "Next.js", icon: brand(siNextdotjs.path) },
  { name: "FastAPI", icon: brand(siFastapi.path) },
  { name: "Node.js", icon: brand(siNodedotjs.path) },
  { name: "RAG", icon: glyph(<Network size={15} aria-hidden="true" />) },
  { name: "LLMs", icon: glyph(<Brain size={15} aria-hidden="true" />) },
  { name: "Computer Vision", icon: glyph(<ScanEye size={15} aria-hidden="true" />) },
  { name: "ChromaDB", icon: glyph(<Database size={15} aria-hidden="true" />) },
  { name: "PostgreSQL", icon: brand(siPostgresql.path) },
  { name: "MongoDB", icon: brand(siMongodb.path) },
  { name: "Supabase", icon: brand(siSupabase.path) },
];

export type OrbitHandle = { setExpansion: (p: number) => void };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Two crossing, tilted 3D oval rings of glass skill cards.
 * Maintains a strict ~2.25:1 oval aspect ratio on both mobile and desktop,
 * and blooms outward in smooth 3D motion once `revealed` becomes true.
 */
const OrbitSkills = forwardRef<OrbitHandle, { paused?: boolean; revealed?: boolean }>(
  function OrbitSkills({ paused = false, revealed = true }, handle) {
    const rootRef = useRef<HTMLDivElement>(null);
    const track1Ref = useRef<SVGEllipseElement>(null);
    const track2Ref = useRef<SVGEllipseElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const expansion = useRef(0);
    const pausedRef = useRef(paused);
    const revealedRef = useRef(revealed);
    const bloomRef = useRef(revealed ? 1 : 0);
    const hovered = useRef(false);
    const draw = useRef<() => void>(() => {});
    const running = useRef(false);

    useEffect(() => {
      pausedRef.current = paused;
    }, [paused]);

    useEffect(() => {
      revealedRef.current = revealed;
    }, [revealed]);

    useImperativeHandle(handle, () => ({
      setExpansion: (p: number) => {
        expansion.current = clamp(p, 0, 1);
        if (!running.current) draw.current();
      },
    }));

    useEffect(() => {
      const root = rootRef.current;
      if (!root) return;

      let compact = root.clientWidth < 700;
      const allIndices = SKILLS.map((_, i) => i);
      const rings = [
        allIndices.filter((_, k) => k % 2 === 0),
        allIndices.filter((_, k) => k % 2 === 1),
      ];

      let angle = 0;
      let rx = 320;
      let ry = 142;

      const layout = () => {
        const w = root.clientWidth;
        compact = w < 700;
        if (compact) {
          // Strict ~2.3:1 oval ratio on mobile so orbits look distinctly oval, never circular
          rx = clamp(w * 0.42, 142, 220);
          ry = Math.round(rx * 0.43);
        } else {
          const safePad = 98;
          rx = clamp(w * 0.38, 250, Math.max(250, Math.min(w * 0.5 - safePad, 470)));
          ry = clamp(Math.round(rx * 0.45), 112, 215);
        }
      };

      const render = () => {
        const b = bloomRef.current;
        const tiltDeg = compact ? [-22, 22] : [-15, 15];
        const tilt = tiltDeg.map((d) => (d * Math.PI) / 180);
        const spread = (0.38 + 0.62 * b) * (1 + expansion.current * (compact ? 0.05 : 0.1));
        const curRx = rx * spread;
        const curRy = ry * spread;

        if (track1Ref.current) {
          track1Ref.current.setAttribute("rx", curRx.toFixed(1));
          track1Ref.current.setAttribute("ry", curRy.toFixed(1));
          track1Ref.current.setAttribute("transform", `rotate(${tiltDeg[0]})`);
          track1Ref.current.style.opacity = (0.55 * b).toFixed(3);
        }
        if (track2Ref.current) {
          track2Ref.current.setAttribute("rx", curRx.toFixed(1));
          track2Ref.current.setAttribute("ry", curRy.toFixed(1));
          track2Ref.current.setAttribute("transform", `rotate(${tiltDeg[1]})`);
          track2Ref.current.style.opacity = (0.55 * b).toFixed(3);
        }

        rings.forEach((ring, r) => {
          const dir = r === 0 ? 1 : -1;
          ring.forEach((skillIdx, idx) => {
            const el = cardRefs.current[skillIdx];
            if (!el) return;
            const t =
              dir * angle +
              (idx / ring.length) * Math.PI * 2 +
              (r ? Math.PI / ring.length : 0);
            const lx = curRx * Math.cos(t);
            const ly = curRy * Math.sin(t);
            const x = lx * Math.cos(tilt[r]) - ly * Math.sin(tilt[r]);
            const y = lx * Math.sin(tilt[r]) + ly * Math.cos(tilt[r]);
            const depth = (Math.sin(t) + 1) / 2; // 0 (far back) .. 1 (near front)
            const scale = (0.84 + depth * 0.22) * (0.68 + 0.32 * b);
            const alpha = (0.52 + depth * 0.48) * b;
            el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
            el.style.opacity = alpha.toFixed(3);
            el.style.zIndex = String(
              depth > 0.5 ? 25 + Math.round(depth * 10) : 4 + Math.round(depth * 4)
            );
          });
        });
      };
      draw.current = render;

      layout();
      render();
      const ro = new ResizeObserver(() => {
        layout();
        render();
      });
      ro.observe(root);

      let raf = 0;
      let last = performance.now();
      const loop = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        if (!pausedRef.current && !document.hidden) {
          const targetBloom = revealedRef.current ? 1 : 0;
          bloomRef.current += (targetBloom - bloomRef.current) * (1 - Math.exp(-dt * 4.5));
          if (Math.abs(targetBloom - bloomRef.current) < 0.001) {
            bloomRef.current = targetBloom;
          }
          angle = (angle + (hovered.current ? 0.05 : 0.16) * dt) % (Math.PI * 2);
          render();
        }
        raf = requestAnimationFrame(loop);
      };
      running.current = true;
      raf = requestAnimationFrame(loop);
      return () => {
        running.current = false;
        cancelAnimationFrame(raf);
        ro.disconnect();
      };
    }, []);

    return (
      <div
        ref={rootRef}
        className="orbit"
        data-revealed={revealed ? "true" : "false"}
        aria-hidden="true"
        onPointerEnter={() => (hovered.current = true)}
        onPointerLeave={() => (hovered.current = false)}
      >
        <svg className="orbit__tracks" aria-hidden="true">
          <g className="orbit__tracks-center">
            <ellipse ref={track1Ref} cx="0" cy="0" rx="320" ry="142" transform="rotate(-15)" />
            <ellipse ref={track2Ref} cx="0" cy="0" rx="320" ry="142" transform="rotate(15)" />
          </g>
        </svg>
        <div className="orbit__center">
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="orbit__card"
            >
              <span className="orbit__icon">{s.icon}</span>
              <span className="orbit__label">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default OrbitSkills;
