export type ProjectCategory =
  | "All"
  | "Agents & Harnesses"
  | "RAG & Search"
  | "Fine-Tuning & Vision"
  | "Data & Apps";

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
  domain: string;
  items: string[];
}

export const PROFILE = {
  name: "Mohammed Al-Haj",
  handle: "alhaj-ai",
  role: "AI Engineer",
  tagline:
    "LLMs · Agent Harnesses · Model Fine-Tuning · Hybrid RAG · Computer Vision · Backend Systems",
  availability: "Open to AI / LLM Engineer roles · Remote",
  heroThesis:
    "I design, fine-tune, and ship production AI systems — combining PyTorch and Hugging Face model adaptation with the deterministic execution harnesses, isolated retrieval pipelines, and test suites that keep autonomous workflows reliable.",
  aboutParagraphs: [
    "I design, fine-tune, and ship production AI systems, backed by hands-on experience in LLM engineering, agent harnesses, model adaptation, hybrid RAG, and computer vision.",
    "For language and retrieval workflows, I fine-tune Transformer and deep learning architectures with PyTorch and Hugging Face, implement hybrid vector search with tenant isolation and source grounding, and run both local open-weights models and cloud APIs.",
    "Around the LLM itself, I build the execution harness that makes autonomy reliable: stateful orchestration, strict schema boundaries, measurable evaluations, crash recovery, latency and cost controls, and automated test suites.",
    "Because production AI depends on the infrastructure around the model, my experience also spans computer vision and OCR pipelines, real-time speech and voice applications, distributed PySpark and SQL/NoSQL data flows, and shipping complete services with FastAPI, Django, Next.js, Flutter, Docker, and GitHub Actions.",
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
    label: "CI-Verified Repos",
    detail: "Automated pytest, build, and runtime checks on GitHub Actions",
  },
  {
    value: "0.9856",
    label: "LayoutLMv3 Eval F1",
    detail: "Token classification accuracy 0.9871 via Hugging Face Trainer",
  },
  {
    value: "0 calls · 813ms",
    label: "Deterministic Replay",
    detail: "Compiled Playwright capability graphs run with zero token spend",
  },
  {
    value: "0 duplicates",
    label: "SIGKILL Recovery",
    detail: "SHA-256 checkpoint ledger & worker lease fencing in Haseen-AI",
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
    subtitle: "Domain adaptation with quantitative evaluation",
    details: [
      "Fine-tune Transformer and vision architectures on curated domain splits with Hugging Face Trainer and PyTorch.",
      "Benchmark baselines vs cross-lingual transfer with seqeval F1 and strict held-out validation.",
      "Serve local open-weights models via Ollama / LM Studio alongside cloud LLM providers.",
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
    subtitle: "Multi-tenant vector search & source provenance",
    details: [
      "Partition embeddings by account into isolated Qdrant collections or tuned FAISS indexes.",
      "Apply overlapping document chunking and CrossEncoder re-ranking for sharper context.",
      "Bind generated answers to exact page-level citations and explicit empty/unrecognized states.",
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
    subtitle: "Deterministic guarantees wrapping model autonomy",
    details: [
      "Coordinate cyclic planner-searcher-writer-critic workflows with bounded revision loops in LangGraph.",
      "Enforce Pydantic schemas, append-only SHA-256 execution ledgers, worker lease fencing, and shadow diff sandboxes.",
      "Compile one-time VLM browser discoveries into ARIA-anchored YAML capability graphs executed at zero LLM cost.",
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
    subtitle: "Production backends, interfaces & automated CI",
    details: [
      "Engineer ETL routers scaling from Python streams to distributed PySpark with rule-based quarantine.",
      "Ship FastAPI, Django REST, Next.js 14, Flutter offline-first mobile, and Twilio/Deepgram voice bridges.",
      "Gate every core repository behind Docker, pytest suites, TypeScript checks, and GitHub Actions CI.",
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
      "Long-running coding agents lose state or leave partial broken edits behind when a worker dies mid-execution.",
    architecture:
      "Each run records checkpoints in an append-only SHA-256 execution ledger, fences stale workers using lease expiry, and evaluates patches inside an isolated shadow workspace before idempotent promotion.",
    verification:
      "Live CLI `demo crash` survives forced SIGKILL mid-run and completes on a second worker with patch applied 1 time and 0 duplicate side effects.",
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
      "Driving every browser step through a Vision LLM is slow, expensive, and fragile whenever layout coordinates shift.",
    architecture:
      "Compiles a single workflow discovery into versioned YAML capability graphs anchored on accessible ARIA roles and names, complete with pre/post DOM guards and OTP handoff hooks for deterministic replay.",
    verification:
      "Deterministic capability replay completes with model_calls: 0 in 813ms locally on Windows (716ms repo baseline).",
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
      "Shared vector indexes risk cross-tenant leakage, and uncited PDF answers break institutional auditability.",
    architecture:
      "Splits documents into 1,000-character chunks with 200-character overlap, isolates every user account inside its own Qdrant collection, protects endpoints with JWT and Bcrypt, and links outputs back to source page numbers.",
    verification:
      "17 / 17 pytest unit and integration tests passing (5.00s) in GitHub Actions (Hybrid RAG & Security Test Suite).",
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
      "Single-pass web research agents frequently publish shallow summaries with unresolved evidence gaps.",
    architecture:
      "Wires a cyclic LangGraph StateGraph (planner -> searcher -> writer -> critic, bounded by MAX_REVISIONS=3) for bilingual Arabic/English query planning, parallel retrieval, critic-gated refinement, and SSE streaming.",
    verification:
      "12 / 12 pytest workflow, agent, and API tests passing (1.58s) in GitHub Actions (Multi-Agent DeepResearch Tests).",
    codePaths: ["graph/workflow.py"],
  },
  {
    id: "docushield-ai",
    name: "DocuShield-AI",
    subtitle: "Local Fine-Tuned Document & PII Intelligence",
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
      "Sensitive medical and institutional records cannot safely leave local infrastructure for external cloud processing.",
    architecture:
      "Trains and runs local Transformer models with Hugging Face Trainer: LayoutLMv3 for structured field extraction and XLM-RoBERTa evaluated via seqeval for cross-lingual entity recognition, paired with deterministic Arabic PII redaction rules.",
    verification:
      "LayoutLMv3 achieved 0.9856 eval F1 (0.9871 accuracy); joint XLM-RoBERTa lifted cross-lingual NER from 0.1292 to 0.5606 eval F1; 9 / 9 pytest passing (1.99s) in CI.",
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
      "Interactive vision education systems often silently fall back to fake default labels or block on sequential cloud audio requests.",
    architecture:
      "Pairs YOLOv8 instance segmentation across 82 mapped Arabic classes with RTL Pillow overlays (NotoNaskhArabic-Regular.ttf), concurrent Edge TTS + HTTP fallback speech synthesis, explicit unrecognized empty states, and Next.js 14 UI.",
    verification:
      "7 / 7 pytest API & phonics tests passing (0.91s), verified live segmentation with best.pt, Next.js TypeScript check & production build green in CI, and v1.0.0 model weights released.",
    codePaths: ["backend/main.py", "backend/tests/test_api.py", "frontend/src/app/page.tsx"],
  },
];

export const DOMAIN_PROJECTS: DomainProject[] = [
  {
    id: "data-migration-pipeline",
    name: "data-migration-pipeline",
    repoUrl: "https://github.com/alhaj-ai/data-migration-pipeline",
    scope:
      "Hybrid CSV-to-MongoDB ETL router (src/file_router.py) choosing Python streaming vs distributed PySpark, normalizing Eastern Arabic numerals, and quarantining invalid rows across 9 quality rules.",
    verification: "15 / 15 pytest (0.02s) · CI Passing",
    categories: ["Data & Apps"],
    stack: ["Python", "PySpark", "MongoDB", "Pytest"],
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    repoUrl: "https://github.com/alhaj-ai/taskflow",
    scope:
      "Offline-first Flutter mobile client (SQLite sqflite) paired with a FastAPI + PostgreSQL (8 tables) backend supporting Gemini task breakdown and local fallback.",
    verification: "Backend & Flutter Analyze CI · v1.0.0 APK",
    categories: ["Data & Apps"],
    stack: ["Flutter", "SQLite", "FastAPI", "PostgreSQL", "Gemini"],
  },
  {
    id: "majles-ai",
    name: "Majles-AI",
    repoUrl: "https://github.com/alhaj-ai/Majles-AI",
    scope:
      "Local-first Arabic meeting assistant combining WhisperX speaker diarization, FAISS + CrossEncoder retrieval, and Ollama Qwen2.5 Q&A behind FastAPI and Next.js 14.",
    verification: "4 / 4 pytest (0.99s) · CI Passing",
    categories: ["RAG & Search", "Data & Apps"],
    stack: ["WhisperX", "FAISS", "CrossEncoder", "Ollama", "Next.js 14"],
  },
  {
    id: "mohawir-ai",
    name: "Mohawir-AI",
    repoUrl: "https://github.com/alhaj-ai/Mohawir-AI",
    scope:
      "Technical interview simulator orchestrating 5 LangGraph StateGraph agents, FAISS knowledge retrieval, isolated code execution evaluation, and a Next.js 14 frontend.",
    verification: "4 / 4 pytest (0.59s) · CI Passing",
    categories: ["Agents & Harnesses", "RAG & Search"],
    stack: ["LangGraph", "FAISS", "FastAPI", "Next.js 14"],
  },
  {
    id: "azal-ai",
    name: "Azal-AI",
    repoUrl: "https://github.com/alhaj-ai/Azal-AI",
    scope:
      "Multi-agent e-commerce operations platform with supervisor routing, supplier PDF invoice compliance auditing, and React 19 UI supporting LM Studio local models and cloud LLMs.",
    verification: "2 / 2 pytest (0.06s) · CI Passing",
    categories: ["Agents & Harnesses", "Data & Apps"],
    stack: ["LangGraph", "LM Studio", "React 19", "FastAPI"],
  },
  {
    id: "voice-agent-pharmacy",
    name: "voice-agent-Pharmacy-Assistant",
    repoUrl: "https://github.com/alhaj-ai/voice-agent-Pharmacy-Assistant",
    scope:
      "Real-time bidirectional Twilio Media Streams and Deepgram Voice Agent WebSocket bridge implementing live barge-in interruption handling.",
    verification: "Function & WebSocket Bridge CI Passing",
    categories: ["Agents & Harnesses", "Data & Apps"],
    stack: ["Twilio Media Streams", "Deepgram", "WebSockets", "Python"],
  },
  {
    id: "ai-multi-search-agent",
    name: "ai-multi-search-agent",
    repoUrl: "https://github.com/alhaj-ai/ai-multi-search-agent",
    scope:
      "9-node parallel LangGraph retrieval pipeline aggregating and synthesizing search signals across Google, Bing, and Reddit via Streamlit.",
    verification: "Graph Topology CI Passing",
    categories: ["Agents & Harnesses", "RAG & Search"],
    stack: ["LangGraph", "Streamlit", "Python"],
  },
  {
    id: "mindrouter-agent",
    name: "mindRouter-agent",
    repoUrl: "https://github.com/alhaj-ai/mindRouter-agent",
    scope:
      "Stateful LangGraph conditional intent router maintaining conversation context across specialized assistant personas.",
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
      "Focuses on preparing training data, model adaptation, and training small language models efficiently.",
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
      "Covers core Transformer language model architecture, tokenization, training loop mechanics, and inference.",
  },
  {
    id: "ibm-rag",
    title: "Retrieval-Augmented Generation for Enhanced AI Outputs",
    issuer: "IBM SkillsBuild · Credly",
    level: "Verified Credential",
    issuedAt: "Nov 10, 2026",
    verifyUrl: "https://www.credly.com/go/UgVkZXK1",
    highlights:
      "Applied RAG architectures pairing vector retrieval pipelines with grounded generation.",
  },
  {
    id: "claude-code-action",
    title: "Claude Code in action",
    issuer: "Claude Academy (Anthropic)",
    level: "Course Certificate",
    issuedAt: "Nov 10, 2026",
    verifyUrl: "https://academy.claude.com/verify/05b91e59e106a6115c912602a55340d8",
    highlights:
      "Practical agentic coding workflows, repository inspection, tool orchestration, and verification discipline.",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    domain: "LLMs, Fine-Tuning & AI",
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
    domain: "AI Frameworks & Serving",
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
    domain: "Vision, OCR & Speech",
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
    domain: "Data, Retrieval & Eval",
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
    domain: "Languages & Databases",
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
    domain: "Web, Mobile & Automation",
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
    domain: "DevOps, Testing & Tooling",
    items: ["Docker", "Git", "GitHub", "GitHub Actions CI/CD", "Pytest", "Linux"],
  },
];
