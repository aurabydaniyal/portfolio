"use client";

import type { ReactNode } from "react";
import FadeContent from "@/components/FadeContent";

/**
 * Scroll-entrance wrapper used by every section. Powered by React Bits FadeContent
 * with GPU-accelerated opacity transitions (`blur={false}`) for silky 60fps scrolling.
 */
export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <FadeContent blur={false} duration={0.7} ease="power2.out" delay={delay} threshold={0.1}>
      {children}
    </FadeContent>
  );
}
