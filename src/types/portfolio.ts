export type SocialLink = { label: string; url: string };

export type SiteConfig = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  resumeUrl: string | null;
  whatsappUrl: string | null;
  socialLinks: SocialLink[];
};

export type SkillTier = "primary" | "also" | "foundation";

export type SkillItem = { name: string; note?: string; tier: SkillTier; level?: "Intermediate" };

export type SkillCategory = {
  id: string;
  title: string;
  summary: string;
  items: SkillItem[];
  alsoExplored?: string[];
};

export type ProjectStatus = "Built" | "In Progress" | "In-Process" | "Prototype" | "Concept";

export type Project = {
  title: string;
  slug: string;
  category: string;
  badge?: string;
  status: ProjectStatus;
  statusNote: string;
  shortDescription: string;
  features: string[];
  technologies: string[];
  caveat?: string;
  futureWork?: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
};

export type Principle = {
  num: string;
  title: string;
  body: string;
  flow: string;
  kind: "Design principle" | "Applied in projects";
};

export type TimelineEntry = {
  title: string;
  org: string;
  period: string;
  detail: string;
};
