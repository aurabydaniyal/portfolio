import type { ReactNode } from "react";
import {
  siPython, siFastapi, siReact, siNextdotjs, siTypescript, siJavascript, siLangchain, siOllama,
  siHuggingface, siOpencv, siMediapipe, siPostgresql, siMongodb, siMysql, siTailwindcss, siNodedotjs,
  siFlask, siGithub, siN8n, siFlutter,
} from "simple-icons";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";

type Brand = { path: string };

/** Display name → icon. A logo is only shown if the name exists in the skills data or a project stack. */
const brandIcons: { name: string; icon: Brand | null; aliases?: string[] }[] = [
  { name: "Python", icon: siPython },
  { name: "FastAPI", icon: siFastapi },
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "TypeScript", icon: siTypescript },
  { name: "JavaScript", icon: siJavascript },
  { name: "LangChain", icon: siLangchain },
  { name: "Ollama", icon: siOllama },
  { name: "ChromaDB", icon: null },
  { name: "Hugging Face", icon: siHuggingface },
  { name: "OpenCV", icon: siOpencv },
  { name: "MediaPipe", icon: siMediapipe },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MongoDB", icon: siMongodb },
  { name: "MySQL", icon: siMysql },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Flask", icon: siFlask },
  { name: "Git & GitHub", icon: siGithub },
  { name: "n8n", icon: siN8n },
  { name: "React Native", icon: siReact },
  { name: "Flutter", icon: siFlutter },
];

const known = new Set<string>([
  ...skillCategories.flatMap((c) => c.items.map((i) => i.name)),
  ...projects.flatMap((p) => p.technologies),
]);

function Mark({ icon, name }: { icon: Brand | null; name: string }) {
  return (
    <span className="logo-chip">
      {icon ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d={icon.path} />
        </svg>
      ) : (
        // ChromaDB has no logo in the icon set — a neutral database glyph is used instead of a made-up logo.
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      )}
      <span>{name}</span>
    </span>
  );
}

export function getLogoItems(): { node: ReactNode; title: string; ariaLabel: string }[] {
  return brandIcons
    .filter((b) => known.has(b.name))
    .map((b) => ({ node: <Mark icon={b.icon} name={b.name} />, title: b.name, ariaLabel: b.name }));
}
