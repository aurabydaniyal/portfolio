import type { ComponentType, CSSProperties } from "react";

export type CarouselItem = { src: string; alt?: string; title?: string; subtitle?: string };

declare const FlexCarousel: ComponentType<{
  items?: CarouselItem[];
  preset?: "liquid" | "ribbon" | "vortex" | "arch";
  intro?: "none" | "rise" | "bloom" | "spin" | "deal" | "fade";
  cardHeight?: number;
  gap?: number;
  radius?: number;
  fit?: "natural" | "portrait" | "square" | "landscape";
  squeeze?: number;
  focusOnClick?: boolean;
  autoplay?: boolean;
  interval?: number;
  captions?: boolean;
  captureWheel?: boolean;
  onChange?: (index: number, item: CarouselItem) => void;
  onSelect?: (index: number, item: CarouselItem) => void;
  className?: string;
  style?: CSSProperties;
}>;
export default FlexCarousel;
