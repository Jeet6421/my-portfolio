"use client";
import React, { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { answerQuestion, buildKnowledgeBase } from "@/app/lib/assistant.mjs";
import {
  aboutText,
  aiWork,
  education,
  experience,
  profile,
  projects,
  services,
  skillGroups,
  suggestedQuestions,
  training,
} from "@/app/data/portfolio";

const MAX_MESSAGES = 6;

const AnswerView = ({ result }) => {
  if (result.status !== "answered") {
    return (
      <p role="status" className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm leading-6 text-white/90">
        {result.message}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {result.results.map((entry) => (
        <article key={entry.id} className="rounded-2xl border border-white/20 bg-white/5 p-4">
          <h4 className="font-semibold text-accent">{entry.title}</h4>
          <p className="mt-1 text-sm leading-6 text-white/90">{entry.answer}</p>

          {entry.links?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {entry.links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="underline underline-offset-4 hover:text-accent"
                    >
                      {link.label}
                      {external && <span className="sr-only"> (opens in new tab)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          {entry.anchor && entry.anchor !== "ai" && (
            <a href={`#${entry.anchor}`} className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-accent">
              Go to section
            </a>
          )}
        </article>
      ))}
    </div>
  );
};

const Assistant = () => {
  const knowledgeBase = useMemo(
    () =>
      buildKnowledgeBase({
        profile,
        aboutText,
        services,
        experience,
        training,
        education,
        skillGroups,
        projects,
        aiWork,
      }),
    []
  );

  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);
  const nextId = useRef(0);

  const ask = (question) => {
    const text = question.trim();
    if (!text) return;

    let result;
    try {
      result = answerQuestion(text, knowledgeBase);
    } catch (error) {
      console.error("Portfolio assistant could not answer:", error);
      result = { status: "error", message: "Something went wrong while answering. Please try another question." };
    }

    nextId.current += 1;
    setMessages((previous) => [...previous, { id: nextId.current, question: text, result }].slice(-MAX_MESSAGES));
    setDraft("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    ask(draft);
  };

  return (
    <div className="rounded-3xl bg-ink p-6 text-white shadow-[6px_6px_0_#000] sm:p-8 dark:shadow-[6px_6px_0_#c8f169]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-Ovo text-2xl">Ask this portfolio</h3>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
          Demo · no AI model
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-white/85">
        Answers come from this site&apos;s own content, matched by keyword in your browser. Nothing you type is sent to an
        AI service.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => ask(question)}
            className="rounded-full border border-white/30 px-3 py-1.5 text-sm transition hover:border-accent hover:text-accent"
          >
            {question}
          </button>
        ))}
      </div>

      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation with the portfolio assistant"
        className="mt-6 max-h-96 min-h-[10rem] space-y-5 overflow-y-auto pr-1"
      >
        {messages.length === 0 ? (
          <p className="text-sm leading-6 text-white/75">
            Ask about my experience, skills, projects, or how to get in touch. Or choose a suggestion above.
          </p>
        ) : (
          messages.map(({ id, question, result }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              <div className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-white px-4 py-2 text-sm text-black">
                  <span className="sr-only">You asked: </span>
                  {question}
                </p>
              </div>
              <AnswerView result={result} />
            </motion.div>
          ))
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-6 flex gap-2">
        <label htmlFor="assistant-question" className="sr-only">
          Ask a question about this portfolio
        </label>
        <input
          id="assistant-question"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="For example: What did you build with React?"
          maxLength={200}
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full border border-white/30 bg-white/5 px-5 py-3 text-white placeholder:text-white/50 transition focus:border-accent"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Ask
        </button>
      </form>

      {messages.length > 0 && (
        <button
          type="button"
          onClick={() => setMessages([])}
          className="mt-4 text-sm text-white/75 underline underline-offset-4 hover:text-white"
        >
          Clear conversation
        </button>
      )}
    </div>
  );
};

export default Assistant;
