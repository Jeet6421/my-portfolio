/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette. Every text/background pair used on the site was checked for WCAG AA contrast.
        accent: "#c8f169", // lime: highlights, selected states, CTA hover
        violet: "#6d28d9", // links, focus rings, AI cues on light backgrounds
        violetLight: "#c4b5fd", // the same cue on dark backgrounds
        violetSoft: "#efe9ff", // quiet section tint
        ink: "#16111f", // dark panels and headings
        paper: "#fbfaf7", // warm page background (light mode)
        lightHover: "#f3eeff", // hover and tint surfaces (light mode)
        darkHover: "#241a3a", // hover surfaces (dark mode)
        darkTheme: "#0f0b17", // page background (dark mode)
        darkSurface: "#171323", // cards (dark mode)
        // Neutrals with a violet cast, so greys sit well with the palette.
        gray: {
          50: "#faf9fc",
          100: "#f3f1f8",
          200: "#e7e4ef",
          300: "#d6d1e2",
          400: "#8c869e",
          500: "#746e86",
          600: "#5b566b",
          700: "#3f3b4d",
          800: "#2a2636",
          900: "#15131c",
        },
      },
      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
        Ovo: ["Ovo", "serif"],
      },
      boxShadow: {
        black: "4px 4px 0 #000",
        white: "4px 4px 0 #fff",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
