import type { ComponentType, CSSProperties, MouseEvent, ReactNode } from "react";

declare const FlyingButton: ComponentType<{
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  theme?: "dark" | "light";
  size?: "small" | "medium" | "large" | "extra-large";
  radius?: number;
  altitude?: number;
  hoverTime?: number;
  jets?: number;
  thrusters?: boolean;
  trigger?: "hover" | "click";
  carryCursor?: boolean;
  ramp?: boolean;
  doubleClick?: boolean;
  anchor?: "center" | "left" | "right";
  inset?: number;
  onLaunch?: (launched: boolean) => void;
  onArm?: () => void;
  rampColor?: string;
  smoke?: number;
  turbulence?: number;
  wobble?: number;
  thrustColor?: string;
  smokeColor?: string;
  buttonColor?: string;
  textColor?: string;
  className?: string;
  style?: CSSProperties;
}>;
export default FlyingButton;

