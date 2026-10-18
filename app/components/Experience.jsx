"use client";
import React from "react";
import { education, experience, skillGroups, training } from "@/app/data/portfolio";
import { Reveal, SectionHeading } from "./ui";

const TimelineItem = ({ heading, org, meta, points }) => (
  <li className="relative pb-2">
    <span
      aria-hidden="true"
      className="absolute -left-12 top-2 h-4 w-4 rounded-full border-2 border-black bg-accent dark:border-white"
    />
    <h4 className="font-semibold">{heading}</h4>
    <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
      {org}
      {meta && <span> · {meta}</span>}
    </p>
    {points && points.length > 0 && (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700 marker:text-gray-500 dark:text-white/80">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    )}
  </li>
);

const Experience = () => {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <SectionHeading
        id="experience-title"
        eyebrow="Background"
        title="Experience and skills"
        description="Where I've worked, how I trained, and the tools I use day to day."
      />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h3 className="font-Ovo text-2xl">Work</h3>
          <ol className="mt-8 space-y-10 border-l border-gray-400 pl-10 dark:border-white/40">
            {experience.map((item) => (
              <TimelineItem
                key={item.role}
                heading={item.role}
                org={item.org}
                meta={item.meta}
                points={item.points}
              />
            ))}
          </ol>

          <h3 className="mt-14 font-Ovo text-2xl">Training</h3>
          <ol className="mt-8 space-y-10 border-l border-gray-400 pl-10 dark:border-white/40">
            {training.map((item) => (
              <TimelineItem
                key={item.title}
                heading={item.title}
                org={item.org}
                meta={item.meta}
                points={item.points}
              />
            ))}
          </ol>

          <h3 className="mt-14 font-Ovo text-2xl">Education</h3>
          <ol className="mt-8 space-y-10 border-l border-gray-400 pl-10 dark:border-white/40">
            {education.map((item) => (
              <TimelineItem key={item.title} heading={item.title} org={item.org} meta={item.meta} />
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 className="font-Ovo text-2xl">Skills</h3>
          <div className="mt-8 space-y-8">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-white/70">
                  {group.title}
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;
