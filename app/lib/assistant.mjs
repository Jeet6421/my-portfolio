// Answers for the portfolio assistant.
//
// This is keyword matching over the portfolio's own data. It does not call an AI
// model, an API, or any server. Every answer is assembled from the data passed in,
// so the assistant can only say what the site already says.

export const FALLBACK_MESSAGE =
  "I couldn't find an answer to that on this site. Try one of the suggested questions, or send a message through the contact form.";

const GENERIC_WORDS = new Set(["the", "a", "an", "app", "project", "this", "and", "of", "my"]);

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Matches a keyword as a whole word, allowing a plural "s" or "es".
const keywordPattern = (keyword) => new RegExp(`(^|[^a-z0-9])${escapeRegExp(keyword)}(?:e?s)?(?![a-z0-9])`, "i");

const words = (text) => (text.toLowerCase().match(/[a-z0-9+#]+/g) ?? []).filter(Boolean);

const projectKeywords = (project) => {
  const titleWords = words(project.title).filter((word) => !GENERIC_WORDS.has(word));
  const tagWords = project.tags.flatMap((tag) => [tag.toLowerCase(), ...words(tag)]);
  return [...new Set([project.title.toLowerCase(), ...titleWords, ...tagWords, "project"])];
};

const describe = (item) => `${item.title}. ${item.summary}`;

const linksOf = (items) => items.map((item) => ({ label: item.label, href: item.href }));

/**
 * Builds the searchable entries from the portfolio data.
 * Each entry: { id, title, keywords, answer, links?, anchor? }
 */
export function buildKnowledgeBase(data) {
  const { profile, aboutText, services, experience, training, education, skillGroups, projects, aiWork } = data;
  const entries = [];

  entries.push({
    id: "about",
    title: "About me",
    keywords: ["about", "who", "yourself", "introduce", "bio", "background", "intro", "story"],
    answer: aboutText,
    anchor: "about",
  });

  entries.push({
    id: "services",
    title: "What I do",
    keywords: ["services", "offer", "provide", "help", "frontend", "front-end", "backend", "back-end", "full-stack", "fullstack", "performance", "ui", "ux"],
    answer: services.map(describe).join(" "),
    anchor: "about",
  });

  entries.push({
    id: "experience",
    title: "Experience",
    keywords: ["experience", "job", "company", "employer", "career", "worked", "professional", "w3speedup", "role"],
    answer: [
      ...experience.map((item) => `${item.role} at ${item.org} (${item.meta}).`),
      experience[0]?.points.slice(0, 3).join(" "),
    ]
      .filter(Boolean)
      .join(" "),
    anchor: "experience",
  });

  entries.push({
    id: "training",
    title: "Training and education",
    keywords: ["education", "study", "studied", "degree", "university", "college", "bsc", "school", "certification", "course", "training", "trainee", "psa", "newton", "qualification"],
    answer: [
      ...education.map((item) => `${item.title}, ${item.org} (${item.meta}).`),
      ...training.map((item) => `${item.org}: ${item.title} (${item.meta}).`),
    ].join(" "),
    anchor: "experience",
  });

  entries.push({
    id: "skills",
    title: "Skills",
    keywords: ["skill", "stack", "tech", "technology", "technologies", "language", "framework", "tools", "know", "use", "javascript", "typescript", "react", "next", "java", "spring", "css", "html", "sql", "mongodb", "tailwind", "redux", "graphql"],
    answer: skillGroups.map((group) => `${group.title}: ${group.items.join(", ")}.`).join(" "),
    anchor: "experience",
  });

  for (const project of projects) {
    entries.push({
      id: `project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title: project.title,
      keywords: projectKeywords(project),
      answer: [project.summary, project.tags.length ? `Tags: ${project.tags.join(", ")}.` : ""]
        .filter(Boolean)
        .join(" "),
      links: linksOf(project.links ?? []),
      anchor: "work",
    });
  }

  const realAi = aiWork.filter((item) => item.usesAiModel);
  const otherAi = aiWork.filter((item) => !item.usesAiModel);
  const aiAnswer = realAi.length
    ? `AI work listed here: ${realAi.map(describe).join(" ")}`
    : `None of the work listed here uses an AI model yet.${
        otherAi.length ? ` The AI-related item on this site is a demo: ${otherAi.map(describe).join(" ")}` : ""
      }`;
  entries.push({
    id: "ai",
    title: "AI",
    keywords: ["ai", "artificial", "intelligence", "machine", "learning", "llm", "gpt", "model", "generative", "ml", "chatgpt", "openai", "assistant", "agent"],
    answer: aiAnswer,
    links: linksOf(aiWork.flatMap((item) => item.links ?? [])),
    anchor: "ai",
  });

  entries.push({
    id: "contact",
    title: "Contact",
    keywords: ["contact", "email", "reach", "hire", "hiring", "message", "touch", "linkedin", "github", "connect", "social", "mail"],
    answer: `Email me at ${profile.email}, or send a message through the contact form.`,
    links: [
      { label: "GitHub", href: profile.links.github },
      { label: "LinkedIn", href: profile.links.linkedin },
    ],
    anchor: "contact",
  });

  entries.push({
    id: "resume",
    title: "Resume",
    keywords: ["resume", "cv", "download", "pdf"],
    answer: "You can download my resume from the top of the page.",
    links: [{ label: "Download resume (PDF)", href: profile.resumeUrl }],
  });

  entries.push({
    id: "location",
    title: "Location",
    keywords: ["location", "based", "city", "country", "bangalore", "bengaluru", "india", "where", "remote"],
    answer: `I'm based in ${profile.location}.`,
  });

  return entries;
}

/**
 * Finds the best matching entries for a question.
 * Returns { status: "empty" } | { status: "answered", results } | { status: "not-found", message }
 */
export function answerQuestion(question, knowledgeBase) {
  const text = String(question ?? "").trim().toLowerCase();
  if (!text) {
    return { status: "empty" };
  }

  const scored = knowledgeBase
    .map((entry) => {
      const score = entry.keywords.reduce((total, keyword) => {
        if (!keywordPattern(keyword).test(text)) return total;
        // Multi-word phrases are more specific, so they count for more.
        return total + (keyword.includes(" ") ? 2 : 1);
      }, 0);
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return { status: "not-found", message: FALLBACK_MESSAGE };
  }

  return { status: "answered", results: scored.slice(0, 2).map(({ entry }) => entry) };
}
