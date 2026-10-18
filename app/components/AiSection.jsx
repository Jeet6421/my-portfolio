"use client";
import React from "react";
import { aiWork } from "@/app/data/portfolio";
import { LinkList, Reveal, SectionHeading, Tags } from "./ui";
import Assistant from "./Assistant";

const AiSection = () => {
  return (
    <section id="ai" aria-labelledby="ai-title" className="section bg-lightHover/70 dark:bg-darkHover/25">
      <SectionHeading
        id="ai-title"
        eyebrow="AI"
        title="Ask this portfolio"
        description="A search assistant built into this page, plus any AI work I've done. It answers only from what's already on this site, and it doesn't use an AI model."
      />

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <Reveal className="min-w-0">
          <Assistant />
        </Reveal>

        <Reveal delay={0.15}>
          <h3 className="font-Ovo text-2xl">AI work</h3>
          <ul className="mt-6 space-y-5">
            {aiWork.map((item) => (
              <li key={item.title}>
                <article className="card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.usesAiModel
                          ? "bg-accent text-black"
                          : "border border-gray-500 text-gray-700 dark:border-white/50 dark:text-white/80"
                      }`}
                    >
                      {item.usesAiModel ? "Uses an AI model" : "No AI model"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-white/80">{item.summary}</p>
                  <Tags tags={item.tags} className="mt-4" />
                  <LinkList links={item.links} className="mt-5" />
                </article>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default AiSection;
