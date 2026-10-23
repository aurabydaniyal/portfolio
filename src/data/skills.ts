import type { SkillCategory } from "@/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    title: "AI Engineering & LLM Apps",
    summary:
      "Turning language-model capabilities into user-facing workflows, with retrieval grounding answers in real documents.",
    items: [
      { name: "LLM applications", note: "Model-powered features and assistants", tier: "primary" },
      { name: "RAG", note: "Retrieve context before generating answers", tier: "primary" },
      { name: "Embeddings & semantic search", note: "Text as vectors for retrieval", tier: "primary" },
      { name: "Prompt Engineering", note: "Generative AI and LLM application development", tier: "primary" },
      { name: "AI APIs", note: "Exposing AI through backend services", tier: "primary" },
      { name: "LangChain", note: "LLM workflow framework", tier: "also" },
      { name: "Hugging Face", note: "AI/LLM ecosystem and model tooling", tier: "also" },
      { name: "LangGraph", note: "Graph-based agent orchestration", tier: "foundation" },
      { name: "LangSmith", note: "Tracing & evaluation", tier: "foundation" },
    ],
    alsoExplored: ["Multi-agent concepts", "Tool / function calling", "Local & open models"],
  },
  {
    id: "vision",
    title: "Computer Vision",
    summary:
      "Working with pretrained models and libraries to read and understand camera input. Pretrained models and APIs — no custom training is claimed.",
    items: [
      { name: "OCR", note: "Extracting text from images and frames", tier: "primary" },
      { name: "YOLO / YOLOv8", note: "Object detection workflows", tier: "primary" },
      { name: "OpenCV", note: "Image and video capture / processing", tier: "primary" },
      { name: "MediaPipe", note: "Hand-landmark perception pipelines", tier: "primary" },
      { name: "Image preprocessing", note: "Preparing frames for inference", tier: "also" },
      { name: "Translation overlays", note: "Recognized text shown in context", tier: "also" },
    ],
    alsoExplored: ["Bounding boxes & crops", "Multimodal concepts"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    summary: "Python-first services that connect interfaces to models and data stores.",
    items: [
      { name: "Python", note: "Backend and AI programming", tier: "primary" },
      { name: "FastAPI", note: "Validated, documented async APIs", tier: "primary" },
      { name: "REST APIs", note: "Resources, methods, status codes", tier: "primary" },
      { name: "Pydantic", note: "Typed schemas and validation", tier: "also" },
      { name: "Node.js", note: "JavaScript backend runtime", tier: "also" },
      { name: "Express.js", note: "Minimal Node API framework", tier: "also" },
      { name: "Flask", note: "Lightweight Python web framework", tier: "also" },
    ],
    alsoExplored: ["File uploads", "Logging & config", "Background tasks"],
  },
  {
    id: "frontend",
    title: "Frontend & Web",
    summary: "Responsive, accessible interfaces for AI-powered products.",
    items: [
      { name: "React", note: "Component-driven UI", tier: "primary" },
      { name: "Next.js", note: "Routing and server rendering", tier: "primary" },
      { name: "JavaScript", note: "Interactive application logic", tier: "primary" },
      { name: "Tailwind CSS", note: "Utility-first styling", tier: "primary" },
      { name: "HTML5 / CSS3", note: "Semantic, responsive layouts", tier: "primary" },
      { name: "TypeScript", note: "Typed JavaScript for web apps, used in this portfolio", tier: "also" },
      { name: "Bootstrap", note: "Prebuilt responsive layout", tier: "also" },
    ],
    alsoExplored: ["Framer Motion", "GSAP", "shadcn/ui"],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    summary: "Cross-platform app development, at an intermediate level.",
    items: [
      { name: "React Native", note: "Cross-platform mobile apps with React (intermediate)", tier: "also", level: "Intermediate" },
      { name: "Flutter", note: "Cross-platform mobile apps with Dart (intermediate)", tier: "also", level: "Intermediate" },
    ],
    alsoExplored: ["Android Studio (Java + XML)"],
  },
  {
    id: "data",
    title: "Databases & Vector Storage",
    summary: "Grouped by role: relational, document and vector retrieval.",
    items: [
      { name: "PostgreSQL", note: "Relational data and transactions", tier: "primary" },
      { name: "MySQL", note: "Relational fundamentals", tier: "primary" },
      { name: "SQL", note: "Queries, joins, aggregation", tier: "primary" },
      { name: "MongoDB", note: "Document-oriented storage", tier: "also" },
      { name: "ChromaDB", note: "Vector storage for RAG", tier: "also" },
      { name: "pgvector", note: "Vector search inside PostgreSQL", tier: "also" },
    ],
    alsoExplored: ["SQLite", "Supabase", "Firebase", "Redis"],
  },
  {
    id: "workflow",
    title: "Automation & Tools",
    summary: "Workflow, integration and delivery tooling. No deep DevOps expertise is implied.",
    items: [
      { name: "Git & GitHub", note: "Version control and collaboration", tier: "primary" },
      { name: "VS Code", note: "Development environment", tier: "primary" },
      { name: "n8n", note: "Visual workflow automation", tier: "also" },
      { name: "Webhooks & APIs", note: "Event-driven integrations", tier: "also" },
      { name: "MCP", note: "Exploring tool/context connections", tier: "foundation" },
      { name: "Android Studio", note: "Java + XML Android work", tier: "also" },
    ],
    alsoExplored: ["Vercel", "Netlify", "Render", "Docker", "Postman"],
  },
];

export const foundations = [
  "Machine Learning concepts",
  "Deep Learning concepts",
  "Neural-network fundamentals",
  "Training vs. inference",
  "Supervised & unsupervised learning",
  "Model evaluation concepts",
];
