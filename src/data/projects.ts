import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    title: "Vision Lens",
    slug: "vision-lens",
    category: "AI Application · Computer Vision · Multimodal",
    status: "In-Process",
    statusNote: "Project report finalized; implementation is in process.",
    shortDescription:
      "A mobile-first live-camera app that translates text in context with OCR, object understanding and an AI assistant, instead of one captured image at a time.",
    features: [
      "Live camera text recognition and source-language detection where the OCR/translation pipeline supports it",
      "Translated text overlaid near the original text; English output for Lite, more languages planned for Plus",
      "Object selection with a YOLO-based classification workflow",
      "Planned Plus assistant (Lensy) using OCR results, object info and an LLM",
      "Spoken translation when speech output is enabled",
    ],
    technologies: ["Python", "FastAPI", "React", "OCR", "YOLO", "LLM / RAG", "PostgreSQL + pgvector"],
    caveat: "In-Process, not completed. Planned features are not presented as implemented.",
    futureWork: ["V2 research: MCP-based access to external information for difficult cases"],
    featured: true,
  },
  {
    title: "Offline PDF RAG Chatbot",
    slug: "offline-pdf-rag",
    category: "RAG · Local LLMs · Document Q&A",
    badge: "Offline · Local-first",
    status: "Built",
    statusNote: "Built by me; no repository or live demo link has been published.",
    shortDescription:
      "An offline document Q&A app that lets you chat with multiple PDFs and retrieve answers from them using RAG.",
    features: [
      "Runs on my own PC: the core workflow needs no cloud LLM API",
      "Local language models served through Ollama",
      "Multiple PDF ingestion and document reading",
      "Semantic retrieval from a ChromaDB vector store",
      "Context-grounded question answering",
    ],
    technologies: ["Python", "LangChain", "Ollama", "ChromaDB", "RAG"],
    caveat: "Internet may still be needed once to install dependencies and download models.",
    featured: true,
  },
  {
    title: "InfinitySign — Neon Hand VFX",
    slug: "infinitysign-neon-hand-vfx",
    category: "Computer Vision · Real-time Graphics · Hand Tracking",
    status: "Built",
    statusNote: "Built by me; no repository or live demo link has been published.",
    shortDescription:
      "An interactive hand-tracking experience that wraps detected hands in cinematic neon-power effects, with laser-like connections when both hands are visible.",
    features: [
      "Real-time hand tracking with MediaPipe",
      "Two distinct visual effects for a single detected hand",
      "Cinematic neon aura and power-hand graphics",
      "Detects both hands and links them with laser-beam-style effects",
    ],
    technologies: ["JavaScript", "MediaPipe", "Hand tracking", "Real-time graphics"],
    featured: true,
  },
  {
    title: "AI Sign Language Reader",
    slug: "sign-language-reader",
    category: "Computer Vision · Accessibility · Speech/Text",
    status: "Built",
    statusNote: "Described as implemented; demo and repository to be linked.",
    shortDescription:
      "A camera-based app that maps supported hand gestures to text and speech.",
    features: [
      "MediaPipe hand landmarks (21-point hand representation)",
      "Dataset of 350+ phrases and support for 30+ gestures",
      "Text-to-speech and speech/text interaction",
      "Flask backend with MySQL history and session storage",
      "Routes for prediction, text-to-gesture, history, statistics and analytics",
    ],
    technologies: ["Python", "Flask", "MediaPipe", "OpenCV", "MySQL", "Web Speech API", "pyttsx3"],
    caveat: "No accuracy figure is published until the evaluation method and test set are documented.",
    featured: true,
  },
  {
    title: "CA Management & Audit System",
    slug: "ca-audit-system",
    category: "AI Agents · RAG · Workflow Automation",
    status: "Concept",
    statusNote: "Proposed system — not a completed product.",
    shortDescription:
      "A local-first, AI-assisted audit workflow concept that organizes evidence and documentation while keeping a human approving every sensitive decision.",
    features: [
      "Retrieve relevant audit SOPs and reference material",
      "Help check PBC (Provided by Client) evidence completeness",
      "Explain ledger entries with supporting context",
      "Flag possible anomalies for human review",
      "Summaries linked back to source documents",
    ],
    technologies: ["n8n", "LLM", "MCP", "PostgreSQL + pgvector", "Python / FastAPI"],
    caveat: "Concept only. No audit authority or autonomous compliance decisions are implied.",
    featured: false,
  },
  {
    title: "Bluetooth File Sharing & Chat",
    slug: "bluetooth-share",
    category: "Peer-to-Peer · Desktop + Android",
    status: "Concept",
    statusNote: "Early design discussion.",
    shortDescription:
      "A proposed app for nearby device discovery, direct file transfer and private or group chat over Bluetooth, without internet.",
    features: [
      "Discover nearby compatible users by display name",
      "Direct file transfer and one-to-one chat",
      "Group chat, subject to Bluetooth platform limits",
      "Python desktop prototype; Android client in Java + XML",
    ],
    technologies: ["Python", "Android Studio", "Java", "XML"],
    caveat:
      "Transfer speed, discovery and group size vary by platform and device. Cross-platform interoperability is untested.",
    featured: false,
  },
];
