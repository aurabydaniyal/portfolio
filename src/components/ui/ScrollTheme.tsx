"use client";

import { useEffect } from "react";

/**
 * Writes the page scroll progress (0 → 1) to the `--p` custom property on <html>.
 * All colour shifting (emerald → sky blue) is pure CSS driven by that variable, so there is
 * no animation loop: one rAF-throttled, passive scroll listener and a quantised value.
 * Without JS (or if this never runs) `--p` stays 0 and the original green theme is shown.
 */
export default function ScrollTheme() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      const raw = Math.min(1, Math.max(0, window.scrollY / max));
      // Ease so the green stays dominant through the hero and the blue arrives toward the end.
      const eased = raw * raw * (3 - 2 * raw);
      const q = Math.round(eased * 400) / 400;
      if (q !== last) {
        last = q;
        root.style.setProperty("--p", q.toString());
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
