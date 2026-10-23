import type { ComponentType, CSSProperties, ReactNode } from "react";

declare const GlassSurface: ComponentType<{
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  refraction?: boolean;
  renderer?: "auto" | "webgl" | "svg";
  className?: string;
  style?: CSSProperties;
}>;
export default GlassSurface;
