"use client";
import React from "react";
import Image from "next/image";
import { services } from "@/app/data/portfolio";
import { Reveal, SectionHeading } from "./ui";

const Services = () => {
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <SectionHeading
        id="services-title"
        eyebrow="What I offer"
        title="My services"
        description="The work I take on most often, from interface code to the APIs and services behind it."
      />

      <ul className="grid gap-6 md:grid-cols-3">
        {services.map(({ icon, title, description }, index) => (
          <Reveal as="li" key={title} delay={index * 0.1} className="h-full">
            <div className="card flex h-full flex-col transition hover:-translate-y-1 hover:bg-lightHover hover:shadow-black dark:hover:bg-darkHover dark:hover:shadow-white motion-reduce:hover:translate-y-0">
              <Image src={icon} alt="" className="w-10" />
              <h3 className="mb-3 mt-6 text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-6 text-gray-700 dark:text-white/80">{description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};

export default Services;
