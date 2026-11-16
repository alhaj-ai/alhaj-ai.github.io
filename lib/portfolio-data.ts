export type ProjectCategory =
  | "All"
  | "Agents & Harnesses"
  | "RAG & Search"
  | "Fine-Tuning & Vision"
  | "Data & Apps";

export interface PipelineNode {
  label: string;
  sublabel: string;
  isGate?: boolean;
}

export interface CodeShowcaseTab {
  id: string;
  filename: string;
  repoName: string;
  repoUrl: string;
  language: string;
  metricBadge: string;
  codeLines: string[];
  traceLines: string[];
}

export interface FlagshipProject {
  id: string;
  name: string;
  subtitle: string;
  repoUrl: string;
  releaseTag: string;
  ciLabel: string;
  categories: Exclude<ProjectCategory, "All">[];
  stack: string[];
  problem: string;
  architecture: string;
  verification: string;
  pipeline: PipelineNode[];
  codePaths: string[];
  traceTitle?: string;
  traceOutput?: string;
}

export interface DomainProject {
  id: string;
  name: string;
  repoUrl: string;
  scope: string;
  verification: string;
  categories: Exclude<ProjectCategory, "All">[];
  stack: string[];
}

export interface PipelineStage {
  step: string;
  title: string;
  subtitle: string;
  details: string[];
  tools: string[];
  linkedRepos: { name: string; href: string }[];
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  level: string;
  issuedAt: string;
  verifyUrl: string | null;
  imageSrc?: string;
  highlights: string;
}

export interface SkillGroup {
  id: string;
  domain: string;
  shortLabel: string;
  summary: string;
  items: string[];
  linkedRepos: { name: string; href: string }[];
}

export const PROFILE = {
  name: "Mohammed Al-Haj",
  handle: "alhaj-ai",
  role: "AI Engineer",
  tagline:
    "LLMs · Agent Harnesses · Model Fine-Tuning · Hybrid RAG · Computer Vision · Backend Systems",
  availability: "Open to AI / LLM Engineer roles · Remote",
  heroThesis:
    "I build LLM systems, hybrid RAG pipelines, and fine-tuned models backed by clean APIs and automated tests.",
  aboutParagraphs: [
    "I work across applied LLM systems, model fine-tuning, and retrieval pipelines, focusing on turning prototypes into software that holds up on real infrastructure.",
    "For private or domain-specific workloads, I fine-tune local Transformer and vision models using PyTorch and Hugging Face Trainer, and build isolated vector search pipelines with Qdrant, FAISS, and page-level citations.",
    "On the application side, I connect models to LangGraph workflows, FastAPI backends, Next.js interfaces, Flutter mobile apps, and real-time voice streams, with Docker builds and automated checks on GitHub Actions.",
  ],
  links: {
    github: "https://github.com/alhaj-ai",
    linkedin: "https://linkedin.com/in/mohammed-mohammed-al-haj-341ab7369",
    x: "https://x.com/mod_alhaj",
    email: "ai.mohammed.alhaj@gmail.com",
    portfolioRepo: "https://github.com/alhaj-ai/alhaj-ai.github.io",
  },
} as const;

export const VERIFIED_METRICS = [
  {
    value: "14",
    label: "GitHub Repositories",
    detail: "Open-source LLMs, RAG, agents, vision & full-stack APIs",
  },
  {
    value: "6",
    label: "Flagship Systems",
    detail: "Production builds with clean architecture and automated tests",
  },
  {
    value: "4",
    label: "AI Credentials",
    detail: "Google DeepMind, IBM SkillsBuild & Anthropic badges",
  },
  {
    value: "PyTorch · RAG",
    label: "Core Stack",
    detail: "Local Transformers, LangGraph, Qdrant & FastAPI services",
  },
] as const;

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "All",
  "Agents & Harnesses",
  "RAG & Search",
  "Fine-Tuning & Vision",
  "Data & Apps",
];

export const ARCHITECTURE_STAGES: PipelineStage[] = [
  {
    step: "01",
    title: "Models & Fine-Tuning",
    subtitle: "Training and measuring models on domain splits",
    details: [
      "Train Transformer and vision models on split datasets with Hugging Face Trainer and PyTorch.",
      "Compare baseline runs against joint cross-lingual training with seqeval F1 on held-out splits.",
      "Run local open weights through Ollama or LM Studio when data stays off external APIs.",
    ],
    tools: [
      "PyTorch",
      "Hugging Face Trainer",
      "LayoutLMv3",
      "XLM-RoBERTa",
      "YOLOv8-Seg",
      "SeqEval",
    ],
    linkedRepos: [
      { name: "DocuShield-AI", href: "https://github.com/alhaj-ai/DocuShield-AI" },
      { name: "Mustakshef-AI", href: "https://github.com/alhaj-ai/Mustakshef-AI" },
    ],
  },
  {
    step: "02",
    title: "Retrieval & Grounding",
    subtitle: "Isolated vector indexes and page citations",
    details: [
      "Keep each user's embeddings in its own Qdrant collection or FAISS index.",
      "Split documents with overlapping windows and reorder matches with a CrossEncoder before answering.",
      "Attach page numbers to answers and return explicit empty states instead of guessing.",
    ],
    tools: [
      "Qdrant",
      "FAISS",
      "CrossEncoder",
      "Gemini Embeddings",
      "Source Citations",
      "Tenant Isolation",
    ],
    linkedRepos: [
      { name: "DocuMind-RAG", href: "https://github.com/alhaj-ai/DocuMind-RAG" },
      { name: "Majles-AI", href: "https://github.com/alhaj-ai/Majles-AI" },
    ],
  },
  {
    step: "03",
    title: "LLM Execution Harness",
    subtitle: "Checkpoints and schema guards around agent loops",
    details: [
      "Cap cyclic LangGraph planner, search, and critic loops with fixed revision limits.",
      "Check tool inputs with Pydantic, write checkpoints to an append-only SHA-256 log, expire dead worker leases, and test patches in a shadow copy.",
      "Record one VLM browser pass into an ARIA-based YAML playbook, then replay it with zero model calls.",
    ],
    tools: [
      "LangGraph",
      "Pydantic",
      "SHA-256 Checkpoints",
      "Shadow Workspace",
      "Playwright YAML Graphs",
    ],
    linkedRepos: [
      { name: "Haseen-AI", href: "https://github.com/alhaj-ai/Haseen-AI" },
      { name: "Mutahakkim-AI", href: "https://github.com/alhaj-ai/Mutahakkim-AI" },
      { name: "Agentic-DeepResearch", href: "https://github.com/alhaj-ai/Agentic-DeepResearch" },
    ],
  },
  {
    step: "04",
    title: "Data, Apps & Verification",
    subtitle: "APIs, apps, data routers, and CI tests",
    details: [
      "Route small files through Python streams and larger ones through PySpark, splitting bad rows out for review.",
      "Build FastAPI and Django APIs, Next.js interfaces, offline SQLite Flutter apps, and live Twilio/Deepgram voice streams.",
      "Check every repository with pytest suites, TypeScript checks, Docker builds, and GitHub Actions.",
    ],
    tools: [
      "FastAPI",
      "PySpark",
      "Next.js 14",
      "Flutter",
      "PostgreSQL / MongoDB",
      "Docker & GitHub Actions",
    ],
    linkedRepos: [
      { name: "data-migration-pipeline", href: "https://github.com/alhaj-ai/data-migration-pipeline" },
      { name: "taskflow", href: "https://github.com/alhaj-ai/taskflow" },
    ],
  },
];

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: "haseen-ai",
    name: "Haseen-AI",
    subtitle: "Crash-Resilient Software Agent Runtime",
    repoUrl: "https://github.com/alhaj-ai/Haseen-AI",
    releaseTag: "v0.1.0",
    ciLabel: "Crash Recovery & Runtime CI",
    categories: ["Agents & Harnesses"],
    stack: ["Python 3.11", "FastAPI", "Pydantic", "Next.js 14", "Docker"],
    problem:
      "Long-running coding agents lose their progress or leave half-written edits behind if a worker exits unexpectedly mid-task.",
    architecture:
      "Logs each step to an append-only SHA-256 ledger, lets a second worker take over once the dead worker's lease expires, and tests patches inside a shadow copy before updating the workspace.",
    verification:
      "CLI recovery demo simulates a mid-run worker exit; worker-2 resumes from checkpoint #6 and applies the patch once with 0 duplicate side effects.",
    pipeline: [
      { label: "Plan Spec", sublabel: "Structured task" },
      { label: "Lease Lock", sublabel: "Fenced worker" },
      { label: "Shadow Diff", sublabel: "Isolation gate", isGate: true },
      { label: "SHA-256 Ledger", sublabel: "0 duplicates" },
    ],
    codePaths: ["backend/haseen/", "PYTHONPATH=backend python -m haseen.cli demo crash"],
    traceTitle: "CLI Crash-Recovery Trace (Verified Live)",
    traceOutput: `$ PYTHONPATH=backend python -m haseen.cli demo crash
worker-1 holds the lease and is mid-run - killing it with SIGKILL
worker-1 (pid 8404) is gone; its last checkpoint is #6 after 'analysis' (6 saved)
worker-2: the lease expired 2.2s after the kill; run recovered as 'queued'
ledger: patch_applied          runtime    Patch applied to 1 files
result: completed/applied/passed; patch applied 1 time(s); repository fixed: True
evidence: planner model calls 1 (the plan was kept, not redone); duplicate side effects 0; finished by worker-2`,
  },
  {
    id: "mutahakkim-ai",
    name: "Mutahakkim-AI",
    subtitle: "Discover-Once, Zero-Token Browser Automation",
    repoUrl: "https://github.com/alhaj-ai/Mutahakkim-AI",
    releaseTag: "v0.1.0",
    ciLabel: "Capability Graph & CLI CI",
    categories: ["Agents & Harnesses"],
    stack: ["Python 3.11", "Playwright", "FastAPI", "Pydantic", "PyYAML", "Next.js 14"],
    problem:
      "Sending screenshots to a Vision LLM for every click is slow, burns tokens, and breaks whenever UI coordinates shift.",
    architecture:
      "After one VLM exploration pass, the compiler saves a YAML workflow around ARIA roles and element names, with pre/post DOM checks and OTP handoff hooks so future runs replay without the model.",
    verification:
      "Deterministic capability replay completes with model_calls: 0 in 813ms locally on Windows (716ms repo baseline).",
    pipeline: [
      { label: "VLM Scan", sublabel: "One-time explore" },
      { label: "YAML Compile", sublabel: "ARIA selectors" },
      { label: "DOM Guard", sublabel: "State check", isGate: true },
      { label: "Replay Run", sublabel: "0 LLM calls" },
    ],
    codePaths: [
      "src/computer_use/compiler.py",
      "python -m mutahakkim.cli replay --capability lookup_savings_balance",
    ],
    traceTitle: "Zero-Token Replay Output (Verified Live)",
    traceOutput: `{
  "kind": "success",
  "run_id": "14a1c83e1da1",
  "outputs": {
    "savings_balance": "$12040.00",
    "member_name": "Marcus Chen"
  },
  "model_calls": 0,
  "duration_ms": 813,
  "evidence_dir": "evidence\\\\replay-success"
}`,
  },
  {
    id: "documind-rag",
    name: "DocuMind-RAG",
    subtitle: "Multi-Tenant PDF Q&A with Source-Page Citations",
    repoUrl: "https://github.com/alhaj-ai/DocuMind-RAG",
    releaseTag: "v0.1.0",
    ciLabel: "17 / 17 pytest (5.00s)",
    categories: ["RAG & Search", "Data & Apps"],
    stack: ["Python", "FastAPI", "Qdrant", "PostgreSQL / SQLAlchemy", "Google Gemini", "Docker"],
    problem:
      "Putting everyone's documents in one vector index risks cross-account leaks, and answers without page numbers are hard to trust or audit.",
    architecture:
      "Splits PDFs into 1,000-character chunks with 200-character overlap, stores each user's chunks in a separate Qdrant collection behind JWT and Bcrypt auth, and attaches exact source page numbers to every answer.",
    verification:
      "17 / 17 pytest unit and integration tests passing (5.00s) in GitHub Actions (Hybrid RAG & Security Test Suite).",
    pipeline: [
      { label: "PDF Split", sublabel: "1k / 200 overlap" },
      { label: "Qdrant Slice", sublabel: "Tenant isolated" },
      { label: "JWT + Auth", sublabel: "Access gate", isGate: true },
      { label: "Cited Output", sublabel: "Page numbers" },
    ],
    codePaths: ["rag/chunker.py", "rag/vectorstore.py", "rag/citations.py", "auth/security.py"],
  },
  {
    id: "agentic-deepresearch",
    name: "Agentic-DeepResearch",
    subtitle: "Self-Correcting Multi-Agent Research Pipeline",
    repoUrl: "https://github.com/alhaj-ai/Agentic-DeepResearch",
    releaseTag: "v0.1.0",
    ciLabel: "12 / 12 pytest (1.58s)",
    categories: ["Agents & Harnesses", "RAG & Search"],
    stack: ["Python 3.11", "LangGraph", "FastAPI", "Google Gemini", "Tavily API", "SSE", "Docker"],
    problem:
      "Single-pass search agents often stop too early and return thin summaries with missing sources.",
    architecture:
      "Uses a LangGraph StateGraph (planner -> searcher -> writer -> critic, capped at MAX_REVISIONS=3) to plan Arabic and English queries, search in parallel, review drafts before approval, and stream results over SSE.",
    verification:
      "12 / 12 pytest workflow, agent, and API tests passing (1.58s) in GitHub Actions (Multi-Agent DeepResearch Tests).",
    pipeline: [
      { label: "Planner", sublabel: "AR/EN queries" },
      { label: "Searcher", sublabel: "Parallel fetch" },
      { label: "Critic Gate", sublabel: "MAX_REVISIONS=3", isGate: true },
      { label: "SSE Brief", sublabel: "Live stream" },
    ],
    codePaths: ["graph/workflow.py"],
  },
  {
    id: "docushield-ai",
    name: "DocuShield-AI",
    subtitle: "Local Document Layout & PII Redaction Models",
    repoUrl: "https://github.com/alhaj-ai/DocuShield-AI",
    releaseTag: "v0.1.0",
    ciLabel: "9 / 9 pytest (1.99s)",
    categories: ["Fine-Tuning & Vision"],
    stack: [
      "Python",
      "PyTorch",
      "Hugging Face Trainer",
      "LayoutLMv3",
      "XLM-RoBERTa",
      "FastAPI",
      "Streamlit",
    ],
    problem:
      "Medical and legal records cannot safely be uploaded to third-party cloud APIs just for extraction or redaction.",
    architecture:
      "Trains LayoutLMv3 locally for document field extraction and XLM-RoBERTa for cross-lingual entity recognition (checked with seqeval), paired with rule-based Arabic PII redaction that keeps all data local.",
    verification:
      "LayoutLMv3 achieved 0.9856 eval F1 (0.9871 accuracy); joint XLM-RoBERTa lifted cross-lingual NER from 0.1292 to 0.5606 eval F1; 9 / 9 pytest passing (1.99s) in CI.",
    pipeline: [
      { label: "Local Scan", sublabel: "Zero cloud upload" },
      { label: "LayoutLMv3", sublabel: "0.9856 eval F1" },
      { label: "PII + SeqEval", sublabel: "Redaction gate", isGate: true },
      { label: "XLM-R Joint", sublabel: "0.5606 NER F1" },
    ],
    codePaths: [
      "src/problem1_document_understanding/train_layout_model.py",
      "src/problem2_ner_classification/train_ner.py",
    ],
    traceTitle: "Recorded Training Evaluation Metrics",
    traceOutput: `LayoutLMv3 (models/problem1_layoutlmv3/eval_metrics.json):
  eval_f1: 0.9856 | eval_accuracy: 0.9871 | eval_precision: 0.9846 | eval_recall: 0.9866 (15 epochs)

XLM-RoBERTa Cross-Lingual NER (seqeval):
  en_only baseline -> eval_f1: 0.1292 | eval_accuracy: 0.7622
  joint fine-tuned -> eval_f1: 0.5606 | eval_accuracy: 0.8675`,
  },
  {
    id: "mustakshef-ai",
    name: "Mustakshef-AI",
    subtitle: "Interactive Arabic Vision & Phonics System",
    repoUrl: "https://github.com/alhaj-ai/Mustakshef-AI",
    releaseTag: "v1.0.0",
    ciLabel: "7 / 7 pytest + Next.js Build CI",
    categories: ["Fine-Tuning & Vision", "Data & Apps"],
    stack: ["Python", "YOLOv8-Seg", "FastAPI", "Edge TTS", "Next.js 14", "Docker"],
    problem:
      "Camera learning apps often stall waiting on cloud speech calls or show fake fallback labels when nothing recognizable is in the frame.",
    architecture:
      "Runs YOLOv8 segmentation over 82 Arabic object classes, draws RTL Pillow overlays (NotoNaskhArabic-Regular.ttf), speaks labels with concurrent Edge TTS and HTTP fallback, and shows an explicit empty state when nothing matches.",
    verification:
      "7 / 7 pytest API & phonics tests passing (0.91s), verified live segmentation with best.pt, Next.js TypeScript check & production build green in CI, and v1.0.0 model weights released.",
    pipeline: [
      { label: "Frame Capture", sublabel: "Camera feed" },
      { label: "YOLOv8-Seg", sublabel: "82 Arabic classes" },
      { label: "Empty Guard", sublabel: "No fake labels", isGate: true },
      { label: "Edge TTS", sublabel: "RTL overlay" },
    ],
    codePaths: ["backend/main.py", "backend/tests/test_api.py", "frontend/src/app/page.tsx"],
  },
];

export const DOMAIN_PROJECTS: DomainProject[] = [
  {
    id: "data-migration-pipeline",
    name: "data-migration-pipeline",
    repoUrl: "https://github.com/alhaj-ai/data-migration-pipeline",
    scope:
      "Routes CSV-to-MongoDB imports in src/file_router.py between Python streaming and PySpark, normalizes Eastern Arabic numerals, and quarantines rows that fail 9 validation rules.",
    verification: "15 / 15 pytest (0.02s) · CI Passing",
    categories: ["Data & Apps"],
    stack: ["Python", "PySpark", "MongoDB", "Pytest"],
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    repoUrl: "https://github.com/alhaj-ai/taskflow",
    scope:
      "Offline-first Flutter app backed by local SQLite (sqflite) syncing with an 8-table FastAPI and PostgreSQL API, with Gemini task breakdown and local fallback.",
    verification: "Backend & Flutter Analyze CI · v1.0.0 APK",
    categories: ["Data & Apps"],
    stack: ["Flutter", "SQLite", "FastAPI", "PostgreSQL", "Gemini"],
  },
  {
    id: "majles-ai",
    name: "Majles-AI",
    repoUrl: "https://github.com/alhaj-ai/Majles-AI",
    scope:
      "Local-first Arabic meeting assistant pairing WhisperX speaker diarization with FAISS + CrossEncoder search and Ollama Qwen2.5 Q&A behind FastAPI and Next.js 14.",
    verification: "4 / 4 pytest (0.99s) · CI Passing",
    categories: ["RAG & Search", "Data & Apps"],
    stack: ["WhisperX", "FAISS", "CrossEncoder", "Ollama", "Next.js 14"],
  },
  {
    id: "mohawir-ai",
    name: "Mohawir-AI",
    repoUrl: "https://github.com/alhaj-ai/Mohawir-AI",
    scope:
      "Technical interview simulator coordinating 5 LangGraph StateGraph agents, FAISS question lookup, sandboxed code evaluation, and a Next.js 14 frontend.",
    verification: "4 / 4 pytest (0.59s) · CI Passing",
    categories: ["Agents & Harnesses", "RAG & Search"],
    stack: ["LangGraph", "FAISS", "FastAPI", "Next.js 14"],
  },
  {
    id: "azal-ai",
    name: "Azal-AI",
    repoUrl: "https://github.com/alhaj-ai/Azal-AI",
    scope:
      "Multi-agent e-commerce ops tool with supervisor routing, supplier PDF invoice compliance checks, and a React 19 UI supporting LM Studio local models and cloud LLMs.",
    verification: "2 / 2 pytest (0.06s) · CI Passing",
    categories: ["Agents & Harnesses", "Data & Apps"],
    stack: ["LangGraph", "LM Studio", "React 19", "FastAPI"],
  },
  {
    id: "voice-agent-pharmacy",
    name: "voice-agent-Pharmacy-Assistant",
    repoUrl: "https://github.com/alhaj-ai/voice-agent-Pharmacy-Assistant",
    scope:
      "Two-way Twilio Media Streams and Deepgram Voice Agent WebSocket bridge that handles caller barge-in interruptions live.",
    verification: "Function & WebSocket Bridge CI Passing",
    categories: ["Agents & Harnesses", "Data & Apps"],
    stack: ["Twilio Media Streams", "Deepgram", "WebSockets", "Python"],
  },
  {
    id: "ai-multi-search-agent",
    name: "ai-multi-search-agent",
    repoUrl: "https://github.com/alhaj-ai/ai-multi-search-agent",
    scope:
      "9-node parallel LangGraph workflow that collects search signals from Google, Bing, and Reddit and summarizes them in Streamlit.",
    verification: "Graph Topology CI Passing",
    categories: ["Agents & Harnesses", "RAG & Search"],
    stack: ["LangGraph", "Streamlit", "Python"],
  },
  {
    id: "mindrouter-agent",
    name: "mindRouter-agent",
    repoUrl: "https://github.com/alhaj-ai/mindRouter-agent",
    scope:
      "Stateful LangGraph intent router that keeps conversation history while switching between specialized assistant roles.",
    verification: "Routing Logic CI Passing",
    categories: ["Agents & Harnesses"],
    stack: ["LangGraph", "LangChain", "Python"],
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: "deepmind-train-slm",
    title: "Train a Small Language Model",
    issuer: "Google DeepMind",
    level: "Skill Badge · Advanced",
    issuedAt: "Badge Image Uploaded",
    verifyUrl: null,
    imageSrc: "/badges/deepmind-train-slm.png",
    highlights:
      "Covers dataset preparation, fine-tuning, and training workflows for small language models.",
  },
  {
    id: "deepmind-build-slm",
    title: "Build Your Own Small Language Model",
    issuer: "Google DeepMind",
    level: "Completion Badge",
    issuedAt: "Badge Image Uploaded",
    verifyUrl: null,
    imageSrc: "/badges/deepmind-build-slm.png",
    highlights:
      "Covers core Transformer architecture, tokenization, training loops, and local inference.",
  },
  {
    id: "ibm-rag",
    title: "Retrieval-Augmented Generation for Enhanced AI Outputs",
    issuer: "IBM SkillsBuild · Credly",
    level: "Verified Credential",
    issuedAt: "Nov 10, 2026",
    verifyUrl: "https://www.credly.com/go/UgVkZXK1",
    highlights:
      "Applied RAG patterns pairing vector retrieval with grounded answers.",
  },
  {
    id: "claude-code-action",
    title: "Claude Code in action",
    issuer: "Claude Academy (Anthropic)",
    level: "Course Certificate",
    issuedAt: "Nov 10, 2026",
    verifyUrl: "https://academy.claude.com/verify/05b91e59e106a6115c912602a55340d8",
    highlights:
      "Practical agentic coding workflows covering repo inspection, tool calls, and test checks.",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "llms-finetuning",
    domain: "LLMs, Fine-Tuning & AI",
    shortLabel: "LLMs & Tuning",
    summary:
      "Training domain-specific Transformers, wiring multi-agent loops, and keeping autonomous runs recoverable.",
    linkedRepos: [
      { name: "DocuShield-AI", href: "https://github.com/alhaj-ai/DocuShield-AI" },
      { name: "Haseen-AI", href: "https://github.com/alhaj-ai/Haseen-AI" },
    ],
    items: [
      "Large Language Models (LLMs)",
      "Model Fine-Tuning",
      "Transfer Learning",
      "Agent Harnesses",
      "Multi-Agent Orchestration",
      "Hybrid RAG",
      "Prompt Engineering",
      "NLP",
      "Computer Vision",
      "Machine Learning",
      "Deep Learning",
    ],
  },
  {
    id: "frameworks-serving",
    domain: "AI Frameworks & Serving",
    shortLabel: "Frameworks",
    summary:
      "Stateful LangGraph flows, PyTorch and Hugging Face Trainer runs, Pydantic validation, and local or API model serving.",
    linkedRepos: [
      { name: "Agentic-DeepResearch", href: "https://github.com/alhaj-ai/Agentic-DeepResearch" },
      { name: "Mohawir-AI", href: "https://github.com/alhaj-ai/Mohawir-AI" },
    ],
    items: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face Transformers & Trainer",
      "LangGraph",
      "LangChain",
      "Scikit-learn",
      "XGBoost",
      "Pydantic",
      "Ollama",
      "LM Studio",
      "Google Gemini",
      "Tavily",
    ],
  },
  {
    id: "vision-speech",
    domain: "Vision, OCR & Speech",
    shortLabel: "Vision & Speech",
    summary:
      "YOLOv8 object segmentation, LayoutLMv3 form extraction, OCR, WhisperX speaker diarization, and live voice bridges.",
    linkedRepos: [
      { name: "Mustakshef-AI", href: "https://github.com/alhaj-ai/Mustakshef-AI" },
      {
        name: "voice-agent-Pharmacy-Assistant",
        href: "https://github.com/alhaj-ai/voice-agent-Pharmacy-Assistant",
      },
    ],
    items: [
      "Ultralytics YOLOv8",
      "LayoutLMv3",
      "XLM-RoBERTa",
      "OpenCV",
      "EasyOCR",
      "Tesseract OCR",
      "spaCy",
      "NLTK",
      "WhisperX",
      "Edge TTS",
      "Twilio Media Streams",
      "Deepgram",
    ],
  },
  {
    id: "data-retrieval",
    domain: "Data, Retrieval & Eval",
    shortLabel: "RAG & Data",
    summary:
      "Account-isolated Qdrant and FAISS vector stores, CrossEncoder reranking, PySpark routing, and seqeval checks.",
    linkedRepos: [
      { name: "DocuMind-RAG", href: "https://github.com/alhaj-ai/DocuMind-RAG" },
      { name: "data-migration-pipeline", href: "https://github.com/alhaj-ai/data-migration-pipeline" },
    ],
    items: [
      "Qdrant",
      "FAISS",
      "CrossEncoder",
      "Apache Spark (PySpark)",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "SeqEval / F1 Evaluation",
      "ETL Pipelines",
    ],
  },
  {
    id: "languages-dbs",
    domain: "Languages & Databases",
    shortLabel: "Languages & DB",
    summary:
      "Typed Python and TypeScript backends paired with PostgreSQL, MongoDB, SQLAlchemy, and offline SQLite storage.",
    linkedRepos: [
      { name: "TaskFlow", href: "https://github.com/alhaj-ai/taskflow" },
      { name: "DocuMind-RAG", href: "https://github.com/alhaj-ai/DocuMind-RAG" },
    ],
    items: [
      "Python",
      "TypeScript",
      "JavaScript (ES6+)",
      "SQL",
      "Dart",
      "PostgreSQL",
      "MongoDB",
      "SQLite",
      "SQLAlchemy",
    ],
  },
  {
    id: "web-automation",
    domain: "Web, Mobile & Automation",
    shortLabel: "Apps & Browser",
    summary:
      "ARIA-anchored Playwright replay graphs paired with FastAPI, Next.js 14, Flutter mobile clients, and SSE or WebSocket streams.",
    linkedRepos: [
      { name: "Mutahakkim-AI", href: "https://github.com/alhaj-ai/Mutahakkim-AI" },
      { name: "Azal-AI", href: "https://github.com/alhaj-ai/Azal-AI" },
    ],
    items: [
      "FastAPI",
      "Django REST Framework",
      "Next.js 14",
      "React",
      "Flutter",
      "Streamlit",
      "Playwright",
      "REST APIs",
      "WebSockets",
      "SSE",
      "JWT / Bcrypt",
    ],
  },
  {
    id: "devops-ci",
    domain: "DevOps, Testing & Tooling",
    shortLabel: "DevOps & CI",
    summary:
      "Automated checks across 14 repositories using Docker containers, pytest suites, and GitHub Actions.",
    linkedRepos: [
      { name: "Haseen-AI", href: "https://github.com/alhaj-ai/Haseen-AI" },
      { name: "Majles-AI", href: "https://github.com/alhaj-ai/Majles-AI" },
    ],
    items: ["Docker", "Git", "GitHub", "GitHub Actions CI/CD", "Pytest", "Linux"],
  },
];

export const MARQUEE_STACK = [
  "PyTorch",
  "Hugging Face Trainer",
  "LayoutLMv3",
  "XLM-RoBERTa",
  "LangGraph",
  "Playwright",
  "FastAPI",
  "Qdrant",
  "FAISS",
  "CrossEncoder",
  "YOLOv8-Seg",
  "PySpark",
  "Next.js 14",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "GitHub Actions",
] as const;

export const CODE_SHOWCASE_TABS: CodeShowcaseTab[] = [
  {
    id: "haseen",
    filename: "haseen_ledger.py",
    repoName: "Haseen-AI",
    repoUrl: "https://github.com/alhaj-ai/Haseen-AI",
    language: "Python · Harness Runtime",
    metricBadge: "SIGKILL Recovery · 0 duplicates",
    codeLines: [
      "# Append-only SHA-256 ledger + worker lease fencing",
      "class ExecutionHarness:",
      "    def recover_and_apply(self, run_id: str):",
      "        checkpoint = self.ledger.latest(run_id)  # SHA-256 verified",
      "        self.lease.assert_expired(checkpoint.worker_id)",
      "        with ShadowWorkspace(checkpoint.patch) as sandbox:",
      "            assert sandbox.verify_tests() == 'passed'",
      "            return self.promote_idempotent(run_id, checkpoint)",
    ],
    traceLines: [
      "$ PYTHONPATH=backend python -m haseen.cli demo crash",
      "worker-1 (pid 8404) killed; last checkpoint #6 ('analysis')",
      "worker-2: lease expired 2.2s after kill; run recovered",
      "result: completed/applied/passed | duplicate side effects: 0",
    ],
  },
  {
    id: "mutahakkim",
    filename: "mutahakkim_replay.py",
    repoName: "Mutahakkim-AI",
    repoUrl: "https://github.com/alhaj-ai/Mutahakkim-AI",
    language: "Python · Playwright Graph",
    metricBadge: "0 model_calls · 813ms",
    codeLines: [
      "# Compile one VLM exploration into deterministic ARIA YAML",
      "def replay_capability(graph_path: str, inputs: dict):",
      "    graph = CapabilityCompiler.load_yaml(graph_path)",
      "    for step in graph.aria_steps:",
      "        assert step.pre_dom_guard.matches(page)",
      "        page.get_by_role(step.role, name=step.name).execute(inputs)",
      "        assert step.post_dom_guard.matches(page)",
      "    return {'model_calls': 0, 'status': 'deterministic_ok'}",
    ],
    traceLines: [
      "$ python -m mutahakkim.cli replay --capability lookup_savings_balance",
      '{"kind": "success", "run_id": "14a1c83e1da1", "model_calls": 0}',
      '{"duration_ms": 813, "savings_balance": "$12040.00"}',
    ],
  },
  {
    id: "docushield",
    filename: "docushield_eval.py",
    repoName: "DocuShield-AI",
    repoUrl: "https://github.com/alhaj-ai/DocuShield-AI",
    language: "PyTorch · HF Trainer",
    metricBadge: "0.9856 Eval F1 · Local PII",
    codeLines: [
      "# Local Transformer layout understanding + Arabic PII gate",
      "trainer = Trainer(",
      "    model=layoutlmv3_for_token_classification,",
      "    compute_metrics=seqeval_token_f1_metrics,",
      ")",
      "metrics = trainer.evaluate(held_out_split)",
      "# Cross-lingual XLM-R NER joint lift: 0.1292 -> 0.5606 F1",
      "redacted = apply_deterministic_arabic_pii_rules(metrics.predictions)",
    ],
    traceLines: [
      "LayoutLMv3 (models/problem1_layoutlmv3/eval_metrics.json):",
      "eval_f1: 0.9856 | eval_accuracy: 0.9871 (15 epochs)",
      "XLM-RoBERTa NER: 0.1292 (en_only) -> 0.5606 (joint fine-tuned)",
      "CI: 9 / 9 pytest passing (1.99s)",
    ],
  },
];

export const COMPANION_QUICK_PROMPTS = [
  "Why hire Mohammed?",
  "Show Agent Harness proof",
  "Fine-Tuning & F1 metrics",
  "Verified Certifications",
  "Tech Stack summary",
  "Contact & availability",
] as const;
