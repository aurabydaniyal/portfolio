import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";

export type OverviewCard = {
  kind: "Skill" | "Project";
  title: string;
  text: string;
  tags: string[];
};

/** Tags are looked up from the skills data so this overview can never drift from the Skills section. */
const skillNames = new Set(skillCategories.flatMap((c) => c.items.map((i) => i.name)));
const pick = (...names: string[]) => names.filter((n) => skillNames.has(n));

function project(slug: string, text: string, tagCount = 3): OverviewCard {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project slug: ${slug}`);
  return { kind: "Project", title: p.title, text, tags: p.technologies.slice(0, tagCount) };
}

export const overviewCards: OverviewCard[] = [
  {
    kind: "Skill",
    title: "Computer Vision & AI Applications",
    text: "Pretrained vision models and camera input turned into useful apps.",
    tags: pick("OCR", "YOLO / YOLOv8", "OpenCV", "MediaPipe").slice(0, 3),
  },
  {
    kind: "Skill",
    title: "LLMs & Retrieval-Augmented Generation",
    text: "Answers grounded in real documents, with retrieval before generation.",
    tags: pick("RAG", "LangChain", "Hugging Face"),
  },
  {
    kind: "Skill",
    title: "FastAPI & AI Backends",
    text: "Validated Python APIs that connect interfaces to models and data.",
    tags: pick("FastAPI", "Python", "REST APIs"),
  },
  {
    kind: "Skill",
    title: "React & Next.js",
    text: "Responsive, accessible interfaces for AI-powered products.",
    tags: pick("React", "Next.js", "TypeScript"),
  },
  project("offline-pdf-rag", "Chat with multiple PDFs. Runs locally, no cloud LLM API for the core flow.", 4),
  project("vision-lens", "Live-camera text translation with OCR and an AI assistant. In-Process.", 3),
  project("infinitysign-neon-hand-vfx", "Neon hand effects with MediaPipe, plus laser links between both hands.", 3),
];
