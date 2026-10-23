import type { Principle } from "@/types/portfolio";

export const principles: Principle[] = [
  {
    num: "01",
    title: "AI as a product capability",
    body: "Design the whole workflow — input, model processing, clear output and error states. Keep model calls behind an API whenever credentials or private logic are involved.",
    flow: "User input → API → Model → Clear output / error state",
    kind: "Design principle",
  },
  {
    num: "02",
    title: "Retrieval grounded in context",
    body: "For RAG work, aim for source-aware answers and treat retrieval quality as a first-class design goal.",
    flow: "Documents → Chunking → Embeddings → Vector Search → Context → LLM",
    kind: "Design principle",
  },
  {
    num: "03",
    title: "Computer-vision pipelines",
    body: "Latency and accuracy depend on the device, model, input quality and implementation, so each stage is kept separate and testable.",
    flow: "Camera → Preprocessing → OCR / Vision Model → Post-processing → Overlay / Speech",
    kind: "Applied in projects",
  },
  {
    num: "04",
    title: "Clear frontend / backend separation",
    body: "Explicit API boundaries, input validation and error handling keep systems maintainable.",
    flow: "Next.js / React UI → FastAPI or Node API → Model / Database / Service",
    kind: "Applied in projects",
  },
  {
    num: "05",
    title: "Cost-aware architecture",
    body: "Compare local inference, hosted model APIs, caching and rate limits, and document every external dependency instead of assuming free, unlimited usage.",
    flow: "Local model ⇄ Hosted API ⇄ Cache ⇄ Rate limit",
    kind: "Design principle",
  },
];
