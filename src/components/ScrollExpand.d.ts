import type { ComponentType, CSSProperties, ReactNode } from "react";

declare const ScrollExpand: ComponentType<{
  src?: string;
  mediaType?: "image" | "video";
  poster?: string;
  alt?: string;
  title?: ReactNode;
  scrollHint?: ReactNode;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  mediaNode?: ReactNode;
  stageUnder?: ReactNode;
  stageOver?: ReactNode;
  onProgress?: (p: number, eased: number, box: { width: number; height: number; radius: number }) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}>;
export default ScrollExpand;

