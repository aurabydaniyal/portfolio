import type { ComponentType, CSSProperties, RefObject } from "react";

declare const GradualBlur: ComponentType<{
  position?: "top" | "bottom" | "left" | "right";
  target?: "parent" | "page";
  height?: number | string;
  width?: number | string;
  strength?: number;
  layers?: number;
  curve?: "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
  exponential?: boolean;
  opacity?: number;
  saturation?: number;
  tint?: string;
  autoHide?: boolean;
  container?: Element | string | RefObject<Element | null> | null;
  hoverIntensity?: number;
  duration?: number | string;
  easing?: string;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
}>;
export default GradualBlur;

