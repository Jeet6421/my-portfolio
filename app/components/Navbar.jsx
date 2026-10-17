"use client";
import { assets } from "@/assets/assets";
import { navLinks } from "@/app/data/portfolio";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "./ui";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const openButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const menuRef = useRef(null);

  // Give the bar a background once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section currently in view.
  useEffect(() => {
    const ids = ["top", ...navLinks.map((link) => link.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu, and focus moves to the button that opens it.
  useEffect(() => {
    if (!menuOpen) return undefined;
    closeButtonRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        openButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const linkClass = (id) =>
    `font-Ovo text-base transition-colors duration-200 hover:text-black dark:hover:text-white ${
      activeId === id
        ? "font-semibold text-black underline decoration-accent decoration-4 underline-offset-8 dark:text-white dark:decoration-accent"
        : "text-gray-700 dark:text-white/80"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div aria-hidden="true" className="fixed top-0 right-0 -z-10 w-11/12 translate-y-[-80%] dark:hidden">
        <Image src={assets.header_bg_color} alt="" className="w-full" />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/85 shadow-sm backdrop-blur-lg dark:bg-darkTheme/90 dark:shadow-white/10" : ""
        }`}
      >
        <nav aria-label="Main" className="flex items-center justify-between px-5 py-4 lg:px-8 xl:px-[8%]">
          <a href="#top" aria-label="Jitendra Choudhary, back to top" className="shrink-0">
            <Image src={isDarkMode ? assets.logo_dark : assets.logo} className="w-28" alt="" />
          </a>

          <ul
            className={`hidden items-center gap-6 rounded-full px-8 py-3 md:flex lg:gap-8 ${
              isScrolled ? "" : "bg-white/60 shadow-sm dark:border dark:border-white/50 dark:bg-transparent"
            }`}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={linkClass(link.id)}
                  aria-current={activeId === link.id ? "location" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDarkMode((prev) => !prev)}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-full p-2 transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt="" className="w-6" />
            </button>

            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full border border-gray-500 px-6 py-2 font-Ovo transition hover:bg-accent hover:text-black dark:border-white/50 dark:hover:bg-accent lg:flex"
            >
              Contact
              <ArrowRight className="h-3 w-3" />
            </a>

            <button
              ref={openButtonRef}
              type="button"
              className="p-2 md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt="" className="w-6" />
            </button>
          </div>
        </nav>
      </header>

      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav
        id="mobile-menu"
        ref={menuRef}
        aria-label="Mobile"
        className={`fixed bottom-0 right-0 top-0 z-50 w-72 flex-col gap-6 bg-rose-50 px-10 pb-10 pt-24 shadow-xl md:hidden dark:bg-darkHover dark:text-white ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={closeMenu}
          aria-label="Close menu"
          className="absolute right-6 top-6 p-2"
        >
          <Image src={isDarkMode ? assets.close_white : assets.close_black} alt="" className="w-5" />
        </button>
        <ul className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={closeMenu}
                className="font-Ovo text-xl"
                aria-current={activeId === link.id ? "location" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
