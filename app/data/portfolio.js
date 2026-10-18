import { assets } from "@/assets/assets";

// Single source of truth for portfolio copy.
// Facts come from the existing site and the résumé in public/jitendrachoudharyFrontendResume.pdf.
// Anything not stated there is left out rather than invented.
//
// TODO (you): add real AI projects to `aiWork`, and add stack/outcome details to
// `projects` where you have them. Replace the stock images in `projects` with
// screenshots of your own work.

export const profile = {
  name: "Jitendra Choudhary",
  location: "Bangalore, India",
  headline: "Full-stack developer building fast, accessible web apps.",
  intro:
    "I build React and Next.js interfaces and the Spring Boot services behind them. I care about speed, clean UI, and code that's easy to maintain.",
  email: "jeetdemouser@gmail.com",
  resumeUrl: "/jitendrachoudharyFrontendResume.pdf",
  links: {
    github: "https://github.com/Jeet6421",
    linkedin: "https://www.linkedin.com/in/jitendrachoudhary1137/",
    x: "https://x.com/yayjeetz",
  },
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "ai", label: "AI" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const heroStats = [
  { value: "2 yrs", label: "Professional experience" },
  { value: "30%", label: "Lower page load time on a React.js feature" },
  { value: "5+", label: "Projects built" },
];

export const aboutText =
  "I'm a full-stack developer with two years of professional experience. At W3speedup I work as a front-end developer on React.js and Material-UI interfaces, where I contributed features that reduced page load times by 30% and introduced Tailwind CSS, which improved development efficiency by 25%. I studied Information Technology at MSD University, Ajmer (BSc, 2019–2022).";

export const facts = [
  {
    icon: assets.code_icon,
    iconDark: assets.code_icon_dark,
    title: "Experience",
    description: "Two years professional. Front-end developer at W3speedup, working remotely.",
  },
  {
    icon: assets.edu_icon,
    iconDark: assets.edu_icon_dark,
    title: "Education",
    description: "BSc in Information Technology, MSD University, Ajmer (2019–2022).",
  },
  {
    icon: assets.project_icon,
    iconDark: assets.project_icon_dark,
    title: "Projects",
    description: "Built more than five projects, including the ones in the Work section.",
  },
];

export const tools = [
  { name: "Visual Studio Code", image: assets.vscode },
  { name: "Postman", image: assets.postman },
  { name: "MongoDB", image: assets.mongodb },
  { name: "IntelliJ IDEA", image: assets.intelij },
  { name: "Git", image: assets.git },
];

export const services = [
  {
    icon: assets.web_icon,
    title: "Frontend development",
    description:
      "Responsive, component-based interfaces in React and Next.js, with Redux, Context API or Zustand for state.",
  },
  {
    icon: assets.mobile_icon,
    title: "Full-stack web apps",
    description:
      "REST and GraphQL APIs, JWT, OAuth and Firebase authentication, and Java services built with Spring Boot, Hibernate and SQL.",
  },
  {
    icon: assets.ui_icon,
    title: "UI and performance",
    description:
      "Turning Figma and Adobe XD designs into accessible UI (WCAG, ARIA), with code splitting and lazy loading to keep pages fast.",
  },
];

export const projects = [
  {
    id: "portfolio",
    title: "This portfolio",
    summary:
      "The site you're on. Built with Next.js and Tailwind CSS, with dark mode, a contact form, and a search assistant that answers from this site's own content.",
    tags: ["Next.js", "Tailwind CSS", "Motion", "Accessibility"],
    links: [{ label: "Source code", href: "https://github.com/Jeet6421/my-portfolio" }],
    image: null,
  },
  {
    title: "YouTube Clone App",
    summary: "A YouTube-style video app, deployed on Netlify.",
    tags: ["Web app", "Frontend"],
    links: [{ label: "Live demo", href: "https://movieclone1.netlify.app/" }],
    // TODO (you): this screenshot may not match the project. Replace with your own.
    image: "/work-2.png",
  },
  {
    title: "Pokemon App",
    summary: "A simple Pokemon app.",
    tags: ["Web app"],
    links: [{ label: "Source code", href: "https://github.com/Jeet6421/pokemon-app" }],
    // TODO (you): this screenshot may not match the project. Replace with your own.
    image: "/work-3.png",
  },
  {
    title: "Frontend project",
    summary: "A web design project.",
    tags: ["Web design"],
    links: [],
    // TODO (you): stock-style image. Replace with a screenshot of this project.
    image: "/work-1.png",
  },
  {
    title: "UI/UX design",
    summary: "UI and UX design work.",
    tags: ["UI/UX"],
    links: [],
    // TODO (you): stock-style image. Replace with a screenshot of this project.
    image: "/work-4.png",
  },
];

// AI work. Each item must be something you actually built or ran.
// Set usesAiModel to true only for work that calls an AI model or API.
// The current entry is this site's own assistant: keyword matching, no model.
export const aiWork = [
  {
    title: "Portfolio search assistant",
    summary:
      "The assistant on this site. It answers questions by matching them to this portfolio's own content. It runs in the browser and calls no AI model or API.",
    tags: ["Keyword matching", "Client-side", "No AI model"],
    usesAiModel: false,
    links: [{ label: "Source code", href: "https://github.com/Jeet6421/my-portfolio" }],
  },
  // Example of a real entry to add:
  // {
  //   title: "Your project",
  //   summary: "What it does, what you built, and the result.",
  //   tags: ["Tool, model or method"],
  //   usesAiModel: true,
  //   links: [{ label: "Source code", href: "https://..." }],
  // },
];

export const experience = [
  {
    role: "Front-end Developer",
    org: "W3speedup",
    meta: "Remote (WFH)",
    points: [
      "Built and maintained user interfaces with React.js and Material-UI, working with cross-functional teams to define, design, and ship new features.",
      "Checked the technical feasibility of UI/UX designs and optimized applications for speed and scale.",
      "Contributed features that reduced page load times by 30%.",
      "Introduced Tailwind CSS, improving development efficiency by 25%.",
      "Built a mobile application with React Native, increasing user engagement by 15%.",
      "Improved application performance by 20% through JavaScript optimization.",
    ],
  },
];

export const training = [
  {
    title: "Full Stack Web Development with Data Structures, Algorithms and Problem Solving",
    org: "Trainee, PSA",
    meta: "September 2024",
    points: [
      "Worked on real-time projects and took part in a coding contest held by Newton School.",
      "Learned component architecture, state management, and user authentication and authorization.",
    ],
  },
];

export const education = [
  {
    title: "BSc, Information Technology",
    org: "MSD University, Ajmer, Rajasthan",
    meta: "2019 – 2022",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "HTML", "CSS", "Java", "SQL"],
  },
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Material-UI",
      "Responsive & mobile-first design",
      "SSR, SSG, SPA, PWA",
    ],
  },
  {
    title: "Backend & data",
    items: [
      "Spring Boot",
      "Hibernate",
      "Microservices",
      "MongoDB",
      "RESTful APIs",
      "GraphQL",
      "JWT, OAuth, Firebase Auth",
    ],
  },
  {
    title: "Testing & quality",
    items: [
      "Jest",
      "Cypress",
      "React Testing Library",
      "WCAG & ARIA accessibility",
      "Performance optimization",
    ],
  },
  {
    title: "Design & tools",
    items: ["Figma", "Adobe XD", "Git & GitHub", "Postman", "CI/CD", "Agile"],
  },
];

export const suggestedQuestions = [
  "What's your experience?",
  "What tech do you use?",
  "What projects have you built?",
  "Do you work with AI?",
  "How can I contact you?",
];
