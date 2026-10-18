"use client";
import { MotionConfig } from "motion/react";
import { useEffect, useRef, useState } from "react";
import About from "./components/About";
import AiSection from "./components/AiSection";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Work from "./components/Work";
import ScrollProgress from "./components/ScrollProgress";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const hasMounted = useRef(false);

  // layout.js sets the "dark" class before first paint. After hydration, read it into state.
  // On later changes (the user toggling the theme), apply the class and save the choice.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      setIsDarkMode(document.documentElement.classList.contains("dark"));
      return;
    }
    document.documentElement.classList.toggle("dark", isDarkMode);
    try {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    } catch (error) {
      // Storage can be blocked (private mode). The theme still applies for this visit.
    }
  }, [isDarkMode]);

  return (
    // reducedMotion="user" turns off movement-based animation for people who have asked for less motion.
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main id="main">
        <Header />
        <About isDarkMode={isDarkMode} />
        <Services />
        <AiSection />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </MotionConfig>
  );
}
