import { Outfit, Ovo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Jitendra Choudhary | Full-stack developer",
  description:
    "Full-stack developer in Bangalore building fast, accessible web apps with React, Next.js and Spring Boot. Portfolio, experience, and contact.",
};

// Runs before the first paint so the page never flashes the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* If JavaScript is off, reveal content that starts hidden for animation. */}
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body
        className={`${outfit.className} ${ovo.className} bg-white text-gray-900 antialiased leading-7 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
