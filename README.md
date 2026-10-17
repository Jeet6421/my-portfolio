# Jitendra Choudhary: portfolio

A single-page portfolio built with Next.js 15 (App Router), Tailwind CSS 3 and `motion`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm test         # unit tests for the portfolio assistant
```

## Configuration

The contact form sends through [Web3Forms](https://web3forms.com). Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_ACCESS_KEY=your_web3forms_access_key
```

Without this variable the form is disabled and shows a notice with your email address.

## Editing content

- **All copy and project data** lives in `app/data/portfolio.js`: profile, navigation, about text, services, projects, AI work, experience, training, education, skills, and suggested assistant questions.
- **Images** are in `assets/` (imported in `assets/assets.js`) and `public/` (served from the site root, such as project screenshots and the résumé PDF).
- **AI work**: add real entries to `aiWork`. Set `usesAiModel: true` only for work that calls an AI model or API.

## The "Ask this portfolio" assistant

The assistant in the AI section does not use an AI model or any API. It matches a question to entries built from `app/data/portfolio.js` and shows the matching text, so it can only repeat what the site already says. Matching logic lives in `app/lib/assistant.mjs`, and `app/lib/assistant.test.mjs` covers it.

## Structure

```
app/
  page.js              section order and theme state
  layout.js            metadata, theme script (prevents a flash of the wrong theme)
  globals.css          design tokens, shared component classes, reduced-motion rules
  data/portfolio.js    all portfolio content
  lib/assistant.mjs    keyword matching for the assistant
  components/          one component per section, plus ui.jsx for shared pieces
assets/                images and the image import map
public/                served files (project images, résumé PDF)
```

## Accessibility and motion

- Skip link, landmark regions, labelled form fields, and a live region for form status.
- Visible focus rings in both themes.
- Animations use `motion` and respect the reduced-motion setting, both in JavaScript (`MotionConfig`) and in CSS.
