import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { profile } from "@/app/data/portfolio";

const Footer = ({ isDarkMode }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 px-[6%] pb-10 sm:px-[10%] lg:px-[12%]">
      <div className="text-center">
        <Image
          src={isDarkMode ? assets.logo_dark : assets.logo}
          alt="Jitendra Choudhary"
          className="mx-auto mb-3 w-36"
        />
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:bg-accent hover:text-black"
        >
          <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt="" className="w-6" />
          {profile.email}
        </a>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-gray-400 py-6 text-center text-sm sm:flex-row sm:text-left">
        <p>© {year} Jitendra Choudhary. All rights reserved.</p>

        <ul className="flex items-center gap-8">
          <li>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in new tab)"
              className="inline-flex rounded-full transition hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              <Image src={isDarkMode ? assets.github_icon : assets.github_icon_dark} alt="" className="w-7" />
            </a>
          </li>
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)"
              className="inline-flex rounded-full transition hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              <Image src={assets.linkdin_icon} alt="" className="w-7" />
            </a>
          </li>
          <li>
            <a
              href={profile.links.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (opens in new tab)"
              className="inline-flex rounded-full transition hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              <Image src={isDarkMode ? assets.twitter_icon_dark : assets.twitter_icon} alt="" className="w-7" />
            </a>
          </li>
        </ul>

        <a href="#top" className="text-link">
          Back to top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
