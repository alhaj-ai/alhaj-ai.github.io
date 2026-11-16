import {
  COMPANION_QUICK_PROMPTS,
  CREDENTIALS,
  DOMAIN_PROJECTS,
  FLAGSHIP_PROJECTS,
  PROFILE,
  SKILL_GROUPS,
  VERIFIED_METRICS,
  type DomainProject,
  type FlagshipProject,
  type ProjectCategory,
} from "./portfolio-data";

export interface CompanionLink {
  label: string;
  href: string;
}

export interface CompanionResponse {
  matched: boolean;
  headline: string;
  answer: string;
  links: CompanionLink[];
  followUps: string[];
}

interface SearchableProject {
  categories: Exclude<ProjectCategory, "All">[];
  name: string;
  verification: string;
  stack: string[];
}

function matchesProjectFilter(
  project: SearchableProject,
  category: ProjectCategory,
  normalizedQuery: string,
  extraFields: string[]
): boolean {
  const categoryMatch = category === "All" || project.categories.includes(category);
  if (!categoryMatch) return false;
  if (!normalizedQuery) return true;

  const haystack = [
    project.name,
    project.verification,
    ...project.stack,
    ...extraFields,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

/**
 * Filter flagship case-study projects by active category tab and search query.
 */
export function filterFlagshipProjects(
  projects: FlagshipProject[],
  category: ProjectCategory,
  query: string
): FlagshipProject[] {
  const normalized = query.trim().toLowerCase();
  return projects.filter((project) =>
    matchesProjectFilter(project, category, normalized, [
      project.subtitle,
      project.problem,
      project.architecture,
      ...project.codePaths,
    ])
  );
}

/**
 * Filter compact domain systems by active category tab and search query.
 */
export function filterDomainProjects(
  projects: DomainProject[],
  category: ProjectCategory,
  query: string
): DomainProject[] {
  const normalized = query.trim().toLowerCase();
  return projects.filter((project) =>
    matchesProjectFilter(project, category, normalized, [project.scope])
  );
}

interface TopicRule {
  keywords: string[];
  build: () => CompanionResponse;
}

const DEFAULT_FOLLOW_UPS = [...COMPANION_QUICK_PROMPTS.slice(0, 3)];

const TOPIC_RULES: TopicRule[] = [
  {
    keywords: ["why", "hire", "overview", "summary", "strength", "fit", "about", "mohammed"],
    build: () => ({
      matched: true,
      headline: "Why Hire Mohammed Al-Haj",
      answer:
        "14 public repositories combining local model fine-tuning (0.9856 LayoutLMv3 F1) with multi-tenant RAG systems, LangGraph agent workflows, and FastAPI/Next.js backends verified on GitHub Actions.",
      links: [
        { label: "Haseen-AI", href: "https://github.com/alhaj-ai/Haseen-AI" },
        { label: "DocuShield-AI", href: "https://github.com/alhaj-ai/DocuShield-AI" },
        { label: "GitHub Profile", href: PROFILE.links.github },
      ],
      followUps: ["Show Agent Harness proof", "Fine-Tuning & F1 metrics", "Contact & availability"],
    }),
  },
  {
    keywords: ["harness", "sigkill", "crash", "lease", "replay", "haseen", "mutahakkim", "playwright"],
    build: () => ({
      matched: true,
      headline: "Deterministic Agent Harness Proof",
      answer:
        "Haseen-AI uses an append-only SHA-256 checkpoint ledger, worker lease fencing, and shadow diff sandboxes to survive forced SIGKILL with 0 duplicate side effects. Mutahakkim-AI compiles one VLM run into ARIA-anchored YAML capability graphs replayed with 0 model calls in 813ms.",
      links: [
        { label: "Haseen-AI Repo", href: "https://github.com/alhaj-ai/Haseen-AI" },
        { label: "Mutahakkim-AI Repo", href: "https://github.com/alhaj-ai/Mutahakkim-AI" },
      ],
      followUps: ["Fine-Tuning & F1 metrics", "Tech Stack summary", "Verified Certifications"],
    }),
  },
  {
    keywords: ["fine-tuning", "finetuning", "f1", "layoutlm", "xlm", "ner", "docushield", "pytorch", "training"],
    build: () => ({
      matched: true,
      headline: "Local Model Fine-Tuning & F1 Scores",
      answer:
        "In DocuShield-AI, local LayoutLMv3 fine-tuning with Hugging Face Trainer reached 0.9856 eval F1 (0.9871 accuracy), while joint cross-lingual XLM-RoBERTa NER lifted F1 from 0.1292 (en_only) to 0.5606. Backed by 9 / 9 pytest checks passing in CI.",
      links: [
        { label: "DocuShield-AI Repo", href: "https://github.com/alhaj-ai/DocuShield-AI" },
        { label: "Mustakshef-AI (YOLOv8-Seg)", href: "https://github.com/alhaj-ai/Mustakshef-AI" },
      ],
      followUps: ["Show Agent Harness proof", "Verified Certifications"],
    }),
  },
  {
    keywords: ["cert", "badge", "deepmind", "ibm", "credly", "claude", "anthropic", "credential"],
    build: () => ({
      matched: true,
      headline: "Verified Credentials & Badges",
      answer:
        "Holds Google DeepMind Skill Badge (Advanced: Train a Small Language Model) and Completion Badge (Build Your Own Small Language Model), IBM SkillsBuild RAG Credential on Credly (Nov 10, 2026), and Anthropic Claude Code in action Certificate (Nov 10, 2026).",
      links: CREDENTIALS.filter((c) => Boolean(c.verifyUrl)).map((c) => ({
        label: `${c.issuer}: Verify`,
        href: c.verifyUrl as string,
      })),
      followUps: ["Why hire Mohammed?", "Tech Stack summary"],
    }),
  },
  {
    keywords: ["stack", "skill", "tech", "tool", "langgraph", "rag", "qdrant", "fastapi", "docker"],
    build: () => ({
      matched: true,
      headline: "Core Technical Stack",
      answer: `${SKILL_GROUPS.map((g) => `${g.shortLabel}: ${g.items.slice(0, 4).join(", ")}`).join(" | ")}.`,
      links: [
        { label: "DocuMind-RAG", href: "https://github.com/alhaj-ai/DocuMind-RAG" },
        { label: "Agentic-DeepResearch", href: "https://github.com/alhaj-ai/Agentic-DeepResearch" },
      ],
      followUps: ["Fine-Tuning & F1 metrics", "Show Agent Harness proof"],
    }),
  },
  {
    keywords: ["contact", "email", "linkedin", "remote", "role", "availability", "hire me", "reach"],
    build: () => ({
      matched: true,
      headline: PROFILE.availability,
      answer: `Open for remote AI Engineering, LLM Fine-Tuning, Multi-Agent Systems, and Applied ML backend roles. Direct email: ${PROFILE.links.email}.`,
      links: [
        { label: `Email ${PROFILE.links.email}`, href: `mailto:${PROFILE.links.email}` },
        { label: "LinkedIn", href: PROFILE.links.linkedin },
        { label: "GitHub", href: PROFILE.links.github },
      ],
      followUps: ["Why hire Mohammed?", "Verified Certifications"],
    }),
  },
];

/**
 * Resolve recruiter or visitor questions deterministically against verified portfolio records.
 */
export function answerPortfolioQuery(rawQuery: string): CompanionResponse {
  const normalized = rawQuery.trim().toLowerCase();
  if (!normalized) {
    return {
      matched: false,
      headline: "Ask about verified projects, metrics, or stack",
      answer:
        "Choose a prompt chip above or enter a keyword such as LayoutLMv3, SIGKILL, Playwright, Qdrant, LangGraph, or certifications.",
      links: [{ label: "GitHub Profile", href: PROFILE.links.github }],
      followUps: DEFAULT_FOLLOW_UPS,
    };
  }

  // Exact or substring match against a specific flagship or domain project name first
  const matchingFlagship = FLAGSHIP_PROJECTS.find((p) =>
    normalized.includes(p.name.toLowerCase()) || normalized.includes(p.id.toLowerCase())
  );
  if (matchingFlagship) {
    return {
      matched: true,
      headline: `${matchingFlagship.name}: ${matchingFlagship.subtitle}`,
      answer: `${matchingFlagship.architecture} Verification: ${matchingFlagship.verification}`,
      links: [{ label: `Inspect ${matchingFlagship.name}`, href: matchingFlagship.repoUrl }],
      followUps: DEFAULT_FOLLOW_UPS,
    };
  }

  const matchingDomain = DOMAIN_PROJECTS.find((p) =>
    normalized.includes(p.name.toLowerCase()) || normalized.includes(p.id.toLowerCase())
  );
  if (matchingDomain) {
    return {
      matched: true,
      headline: `${matchingDomain.name} (${matchingDomain.verification})`,
      answer: `${matchingDomain.scope} Stack: ${matchingDomain.stack.join(", ")}.`,
      links: [{ label: `Open ${matchingDomain.name}`, href: matchingDomain.repoUrl }],
      followUps: DEFAULT_FOLLOW_UPS,
    };
  }

  const topicMatch = TOPIC_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword))
  );
  if (topicMatch) {
    return topicMatch.build();
  }

  return {
    matched: false,
    headline: `No exact verified entry for "${rawQuery.trim()}"`,
    answer:
      "This assistant only responds from verified repository and certification records on this portfolio. Try asking about Haseen-AI, Mutahakkim-AI, DocuShield-AI, DocuMind-RAG, DeepMind/Credly badges, or contact details.",
    links: [
      { label: "GitHub Archive", href: PROFILE.links.github },
      { label: "Email Mohammed", href: `mailto:${PROFILE.links.email}` },
    ],
    followUps: [...COMPANION_QUICK_PROMPTS.slice(0, 4)],
  };
}
