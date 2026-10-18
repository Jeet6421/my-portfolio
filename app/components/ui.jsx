"use client";
import { motion } from "motion/react";

// Fades content in once when it scrolls into view. With reduced motion on, motion
// skips the vertical movement and keeps only the fade.
export const Reveal = ({ children, delay = 0, y = 24, as = "div", className = "" }) => {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
};

export const SectionHeading = ({ id, eyebrow, title, description }) => (
  <Reveal className="mx-auto mb-12 max-w-2xl text-center">
    <p className="eyebrow">{eyebrow}</p>
    <h2 id={id} className="section-title mt-2">
      {title}
    </h2>
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-5 block h-1 w-16 origin-left rounded-full bg-accent"
    />
    {description && (
      <p className="mt-5 font-Ovo text-lg leading-8 text-gray-700 dark:text-white/80">{description}</p>
    )}
  </Reveal>
);

export const Tags = ({ tags, className = "" }) => (
  <ul className={`flex flex-wrap gap-2 ${className}`}>
    {tags.map((tag) => (
      <li key={tag} className="chip">
        {tag}
      </li>
    ))}
  </ul>
);

export const LinkList = ({ links = [], className = "" }) => {
  if (links.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {links.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <li key={link.href}>
            <a
              href={link.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-link"
            >
              {link.label}
              {external && (
                <>
                  <ExternalIcon className="h-3.5 w-3.5" />
                  <span className="sr-only"> (opens in new tab)</span>
                </>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const iconProps = {
  "aria-hidden": "true",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const ArrowRight = ({ className = "h-4 w-4" }) => (
  <svg {...iconProps} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const DownloadIcon = ({ className = "h-4 w-4" }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 4v11m0 0-5-5m5 5 5-5M4 20h16" />
  </svg>
);

export const ExternalIcon = ({ className = "h-4 w-4" }) => (
  <svg {...iconProps} className={className}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);
