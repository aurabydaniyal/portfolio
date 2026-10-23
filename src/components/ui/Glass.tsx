"use client";

import type { CSSProperties, ReactNode } from "react";
import GlassSurface from "@/components/GlassSurface";

/**
 * Glass panel built on React Bits GlassSurface. Refraction (WebGL / SVG backdrop filters) is
 * switched off on purpose: the frosted fallback is a light backdrop-filter blur, which keeps
 * dozens of panels cheap on mobile while text stays crisp. Colours come from the scroll-driven
 * accent variables in globals.css.
 */
export default function Glass({
  children,
  className = "",
  radius = 16,
  style,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  style?: CSSProperties;
}) {
  return (
    <GlassSurface
      width="100%"
      height="100%"
      borderRadius={radius}
      refraction={false}
      backgroundOpacity={0.1}
      saturation={1.15}
      className={`glass-card ${className}`.trim()}
      style={style}
    >
      {children}
    </GlassSurface>
  );
}
