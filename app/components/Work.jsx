"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { profile, projects } from "@/app/data/portfolio";
import { LinkList, Reveal, SectionHeading, Tags, ExternalIcon } from "./ui";

const ALL = "All";

const ProjectCard = ({ project }) => (
  <article className="card group flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-black dark:hover:shadow-white motion-reduce:hover:translate-y-0">
    {project.image ? (
      <div className="relative aspect-[4/3] overflow-hidden border-b border-gray-300 dark:border-white/30">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
      </div>
    ) : (
      <div
        aria-hidden="true"
        className="flex aspect-[4/3] items-end border-b border-gray-300 bg-gradient-to-br from-accent via-lightHover to-white p-6 dark:border-white/30 dark:from-darkHover dark:via-darkTheme dark:to-darkTheme"
      >
        <span className="font-Ovo text-3xl leading-tight text-black dark:text-white">{project.title}</span>
      </div>
    )}

    <div className="flex flex-1 flex-col p-6">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-white/80">{project.summary}</p>
      <Tags tags={project.tags} className="mt-4" />
      <LinkList links={project.links} className="mt-auto pt-6" />
    </div>
  </article>
);

const Work = () => {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(ALL);

  const tags = useMemo(() => [ALL, ...new Set(projects.flatMap((project) => project.tags))], []);

  const normalizedQuery = query.trim().toLowerCase();
  const visible = projects.filter(
    (project) =>
      (activeTag === ALL || project.tags.includes(activeTag)) &&
      (normalizedQuery === "" ||
        [project.title, project.summary, ...project.tags].join(" ").toLowerCase().includes(normalizedQuery))
  );

  const clearFilters = () => {
    setQuery("");
    setActiveTag(ALL);
  };

  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title="Projects"
        description="A few things I've built. Search or filter by tag, and open the links where a project is public."
      />

      <Reveal className="mx-auto mb-10 flex max-w-4xl flex-col gap-4">
        <div>
          <label htmlFor="work-search" className="sr-only">
            Search projects
          </label>
          <input
            id="work-search"
            type="search"
            placeholder="Search projects, tools or tags"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-full border border-gray-400 bg-white px-6 py-3 outline-none transition focus:border-black dark:border-white/50 dark:bg-darkHover/30 dark:focus:border-accent"
          />
        </div>

        <div role="group" aria-label="Filter projects by tag" className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const selected = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveTag(tag)}
                className={`chip transition ${
                  selected
                    ? "border-black bg-accent font-medium text-black dark:border-accent"
                    : "hover:border-black dark:hover:border-accent"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </Reveal>

      {visible.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.title} className="h-full">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <div role="status" className="rounded-2xl border border-dashed border-gray-400 p-10 text-center dark:border-white/40">
          <p className="font-Ovo text-xl">
            No projects match {query ? `"${query}"` : "this filter"}.
          </p>
          <button type="button" onClick={clearFilters} className="btn-secondary mt-5">
            Clear search and filters
          </button>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          See more on GitHub
          <ExternalIcon className="h-4 w-4" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </section>
  );
};

export default Work;
