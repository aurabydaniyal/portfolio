import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Class-name helper expected by the shadcn / Aceternity / Magic UI components. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

