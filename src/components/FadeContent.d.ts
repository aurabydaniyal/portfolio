import type { ComponentType, CSSProperties, ReactNode } from "react";

declare const FadeContent: ComponentType<{
  children?: ReactNode;
  container?: Element | string | null;
  effect?: "fade" | "focus" | "develop" | "dissolve" | "mist" | "pixel";
  blur?: boolean | number;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  stagger?: number;
  staggerFrom?: "start" | "center" | "end" | "edges" | "random";
  trigger?: "scroll" | "mount";
  once?: boolean;
  exit?: boolean;
  scrub?: boolean | number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onStart?: () => void;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}>;
export default FadeContent;

