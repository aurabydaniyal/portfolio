"use client";

import { useRef, type CSSProperties, type ReactNode, type PointerEvent } from "react";

/**
 * Subtle 3D tilt for cards. Writes CSS transforms straight to the element (no React state, no
 * re-renders), only reacts to real mouse/pen hover - touch and reduced-motion users get a flat card.
 */
export default function Tilt({
  children,
  max = 6,
  className = "",
  style,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const reset = () => {
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-tilting");
    el.style.transform = "";
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width - 0.5;
      const py = (clientY - r.top) / r.height - 0.5;
      el.classList.add("is-tilting");
      el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`;
    });
  };

  return (
    <div ref={ref} className={`tilt ${className}`.trim()} style={style} onPointerMove={onMove} onPointerLeave={reset} onPointerCancel={reset}>
      {children}
    </div>
  );
}

