import type { SiteConfig } from "@/types/portfolio";

export const siteConfig: SiteConfig = {
  name: "Muhammad Daniyal",
  role: "AI Engineer | Computer Vision & AI Applications",
  tagline: "AI Engineer · Computer Vision & AI Applications",
  location: "Lahore, Pakistan",
  email: "aurabydaniyal@gmail.com",
  githubUrl: "https://github.com/aurabydaniyal",
  linkedinUrl: "https://www.linkedin.com/in/aurabydaniyal/",
  // Served from /public (source copy lives in src/data/Daniyal-s-Resume.pdf).
  resumeUrl: "/Muhammad-Daniyal-Resume.pdf",
  // Not supplied yet — hidden in the UI while null.
  whatsappUrl: null,
  socialLinks: [],
};

/** Builds a mailto: link with a prefilled, URL-encoded subject and body. Returns null if no email is configured. */
export function mailtoHref(): string | null {
  if (!siteConfig.email) return null;
  const subject = "Let's connect — project, collaboration or opportunity";
  const body = [
    `Hi ${siteConfig.name.split(" ")[0]},`,
    "",
    "I came across your portfolio and would love to connect. I'm interested in discussing a project, collaboration or professional opportunity.",
    "",
    "A little about me / what I have in mind:",
    "",
    "",
    "Best regards,",
  ].join("\r\n");
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
