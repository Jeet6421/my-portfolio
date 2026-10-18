import { test } from "node:test";
import assert from "node:assert/strict";
import { answerQuestion, buildKnowledgeBase, FALLBACK_MESSAGE } from "./assistant.mjs";

const data = {
  profile: {
    email: "me@example.com",
    location: "Bangalore, India",
    resumeUrl: "/resume.pdf",
    links: { github: "https://github.com/x", linkedin: "https://linkedin.com/in/x" },
  },
  aboutText: "About text.",
  services: [{ title: "Frontend development", summary: "React work." }],
  experience: [
    { role: "Front-end Developer", org: "W3speedup", meta: "Remote", points: ["p1", "p2", "p3", "p4"] },
  ],
  training: [{ title: "Full stack course", org: "PSA", meta: "September 2024" }],
  education: [{ title: "BSc, Information Technology", org: "MSD University", meta: "2019 – 2022" }],
  skillGroups: [{ title: "Languages", items: ["JavaScript", "C++"] }],
  projects: [
    { title: "YouTube Clone App", summary: "A YouTube-style app.", tags: ["Web app"], links: [{ label: "Live demo", href: "https://demo" }] },
    { title: "Pokemon App", summary: "A Pokemon app.", tags: ["Web app"], links: [] },
  ],
  aiWork: [{ title: "Search assistant", summary: "Keyword matching.", usesAiModel: false, links: [] }],
};

const kb = buildKnowledgeBase(data);
const ask = (question) => answerQuestion(question, kb);
const ids = (result) => (result.results ?? []).map((entry) => entry.id);

test("empty and whitespace questions are reported as empty", () => {
  assert.equal(ask("").status, "empty");
  assert.equal(ask("   ").status, "empty");
  assert.equal(ask(undefined).status, "empty");
});

test("experience questions match the experience entry", () => {
  const result = ask("What's your experience?");
  assert.equal(result.status, "answered");
  assert.equal(result.results[0].id, "experience");
  assert.match(result.results[0].answer, /Front-end Developer at W3speedup/);
});

test("skills questions match skills", () => {
  const result = ask("What tech do you use?");
  assert.equal(result.results[0].id, "skills");
  assert.match(result.results[0].answer, /JavaScript/);
});

test("project names match their project entry with links", () => {
  const result = ask("Tell me about the YouTube clone");
  assert.equal(result.results[0].title, "YouTube Clone App");
  assert.deepEqual(result.results[0].links, [{ label: "Live demo", href: "https://demo" }]);
});

test("plural project questions find projects", () => {
  const result = ask("What projects have you built?");
  assert.ok(ids(result).some((id) => id.startsWith("project-")));
});

test("AI answers do not claim AI work when no model is used", () => {
  const result = ask("Do you work with AI?");
  assert.equal(result.results[0].id, "ai");
  assert.match(result.results[0].answer, /None of the work listed here uses an AI model yet/);
});

test("AI answers list real AI work when it exists", () => {
  const withRealAi = buildKnowledgeBase({
    ...data,
    aiWork: [{ title: "Support bot", summary: "Answers tickets with an LLM.", usesAiModel: true, links: [] }],
  });
  const result = answerQuestion("machine learning projects", withRealAi);
  assert.equal(result.results[0].id, "ai");
  assert.match(result.results[0].answer, /^AI work listed here: Support bot/);
});

test("contact questions include the email and social links", () => {
  const result = ask("How can I contact you?");
  assert.equal(result.results[0].id, "contact");
  assert.match(result.results[0].answer, /me@example\.com/);
  assert.equal(result.results[0].links.length, 2);
});

test("short keywords match whole words only", () => {
  // "ai" must not match inside "maintain" or "email".
  const result = ask("Is the code easy to maintain?");
  assert.ok(!ids(result).includes("ai"));
});

test("unrelated questions return the fallback message", () => {
  const result = ask("What is the weather on Mars today?");
  assert.equal(result.status, "not-found");
  assert.equal(result.message, FALLBACK_MESSAGE);
});

test("results are capped at two entries", () => {
  const result = ask("experience education skills projects contact");
  assert.equal(result.status, "answered");
  assert.ok(result.results.length <= 2);
});

test("answers only come from the supplied data", () => {
  const result = ask("What is your favourite colour?");
  assert.equal(result.status, "not-found");
});
