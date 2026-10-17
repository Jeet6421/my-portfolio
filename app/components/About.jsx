"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { aboutText, facts, tools } from "@/app/data/portfolio";
import { Reveal, SectionHeading } from "./ui";

const About = ({ isDarkMode }) => {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <SectionHeading id="about-title" eyebrow="Introduction" title="About me" />

      <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="w-64 shrink-0 sm:w-80">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-accent" />
            <Image
              src={assets.user_image}
              alt="Jitendra Choudhary"
              sizes="(min-width: 640px) 320px, 256px"
              className="relative w-full rounded-3xl border-2 border-black object-cover dark:border-white"
            />
          </div>
        </Reveal>

        <div className="w-full max-w-2xl flex-1">
          <Reveal delay={0.1}>
            <p className="font-Ovo text-xl leading-9 text-gray-800 dark:text-white/90">{aboutText}</p>
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {facts.map(({ icon, iconDark, title, description }, index) => (
              <Reveal as="li" key={title} delay={0.2 + index * 0.1} className="h-full">
                <div className="card h-full transition hover:-translate-y-1 hover:bg-lightHover hover:shadow-black dark:hover:bg-darkHover dark:hover:shadow-white motion-reduce:hover:translate-y-0">
                  <Image src={isDarkMode ? iconDark : icon} alt="" className="w-7" />
                  <h3 className="mb-2 mt-4 font-semibold">{title}</h3>
                  <p className="text-sm leading-6 text-gray-700 dark:text-white/80">{description}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5} className="mt-12">
            <h3 className="font-Ovo text-lg text-gray-700 dark:text-white/80">Tools I use</h3>
            <ul className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              {tools.map((tool) => (
                <li
                  key={tool.name}
                  title={tool.name}
                  className="flex aspect-square w-14 items-center justify-center rounded-xl border border-gray-400 bg-white transition duration-300 hover:-translate-y-1 hover:bg-accent motion-reduce:hover:translate-y-0 dark:border-white/40 dark:bg-transparent"
                >
                  <Image src={tool.image} alt={tool.name} className="w-7" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
