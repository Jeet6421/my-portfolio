"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { assets } from "@/assets/assets";
import { heroStats, profile } from "@/app/data/portfolio";
import { ArrowRight, DownloadIcon, Reveal } from "./ui";

const Header = () => {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[90vh] items-center px-[6%] pb-20 pt-32 sm:px-[10%] lg:px-[12%]"
    >
      <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="text-center lg:text-left">
          <Reveal delay={0.1} className="flex items-center justify-center gap-2 font-Ovo text-xl md:text-2xl lg:justify-start">
            <span>Hi! I&apos;m {profile.name}</span>
            <Image src={assets.hand_icon} alt="" className="w-6" />
          </Reveal>

          <Reveal delay={0.2}>
            <h1 id="hero-title" className="mt-4 font-Ovo text-4xl leading-tight sm:text-6xl lg:text-[4.25rem]">
              {profile.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mx-auto mt-6 max-w-xl font-Ovo text-lg leading-8 text-gray-700 dark:text-white/80 lg:mx-0">
              {profile.intro}
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-white/70">Based in {profile.location}</p>
          </Reveal>

          <Reveal delay={0.5} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <motion.a href="#contact" className="btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Contact me
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a href={profile.resumeUrl} download className="btn-secondary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              My resume
              <DownloadIcon className="h-4 w-4" />
            </motion.a>
          </Reveal>

          <Reveal delay={0.65}>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-300 pt-8 text-left dark:border-white/20">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="text-sm leading-5 text-gray-600 dark:text-white/70">{stat.label}</dt>
                  <dd className="font-Ovo text-3xl sm:text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={0} className="relative mx-auto w-64 sm:w-80 lg:w-full lg:max-w-sm">
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-full bg-accent" />
          <Image
            src={assets.profile_img}
            alt="Jitendra Choudhary"
            priority
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 256px"
            className="relative h-auto w-full rounded-full border-2 border-black bg-white dark:border-white"
          />
        </Reveal>
      </div>
    </section>
  );
};

export default Header;
