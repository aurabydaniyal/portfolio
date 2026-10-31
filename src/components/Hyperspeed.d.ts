import type { ComponentType, CSSProperties } from "react";

declare const Hyperspeed: ComponentType<{
  curve?: "straight" | "gentle" | "winding" | "hills" | "racing" | "deep";
  curvature?: number;
  speed?: number;
  boost?: number;
  fov?: number;
  boostFov?: number;
  lanes?: number;
  roadWidth?: number;
  medianWidth?: number;
  density?: number;
  trailLength?: number;
  lightSize?: number;
  poles?: number;
  poleHeight?: number;
  dust?: number;
  glow?: number;
  reflections?: number;
  steer?: number;
  tailColors?: string[];
  headColors?: string[];
  poleColors?: string[];
  roadColor?: string;
  roadOpacity?: number;
  lineColor?: string;
  background?: string;
  theme?: "dark" | "light";
  interactive?: boolean;
  boosting?: boolean;
  maxPixelRatio?: number;
  onBoostStart?: () => void;
  onBoostEnd?: () => void;
  className?: string;
  style?: CSSProperties;
}>;
export default Hyperspeed;

