import type { ComponentType, CSSProperties, ReactNode } from "react";

export type LogoItem = { node?: ReactNode; src?: string; alt?: string; title?: string; href?: string; ariaLabel?: string };

declare const LogoLoop: ComponentType<{
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutWidth?: number;
  scaleOnHover?: boolean;
  draggable?: boolean;
  intro?: boolean;
  labels?: "none" | "inline" | "below" | "hover";
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}>;
export default LogoLoop;
