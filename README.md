<div align="center">

# vedhasagaran.dev

My personal portfolio and blog — built with Astro, React, and TailwindCSS.

[![Live Site](https://img.shields.io/badge/Live-vedhasagaran.dev-c03030?style=for-the-badge&logo=astro&logoColor=white)](https://vedhasagaran.dev)

</div>

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build) v5 |
| UI | [React](https://react.dev) 18 |
| Styling | [TailwindCSS](https://tailwindcss.com) v4 |
| Animations | [Framer Motion](https://www.framer.com/motion/) · [Lenis](https://lenis.darkroom.engineering/) |
| Search | [Orama](https://orama.com) |
| Blog | Markdown + Astro Content Collections |
| RSS | `@astrojs/rss` |
| SEO | `@astrojs/sitemap` + compressed HTML |

## ✦ Features

- **Fluid Cursor** — custom interactive cursor effect with toggle control
- **Dark / Light Mode** — theme toggle with accent color support
- **Blog with Full-Text Search** — powered by Orama
- **RSS Feed** — auto-generated at `/rss.xml`
- **Smooth Scrolling** — Lenis-powered scroll experience
- **Responsive Design** — mobile-first, works across all viewports
- **Scroll Progress** — visual progress bar indicator
- **Back to Top** — quick navigation button
- **SEO Optimized** — structured data, Open Graph, sitemap, canonical URLs

## ✦ Pages

```
/              → Home (Hero + About)
/experience    → Work Experience
/projects      → Project Showcase
/blog          → Blog Index
/blog/:slug    → Blog Post
/contact       → Contact
/rss.xml       → RSS Feed
```

## ✦ Projects Showcased

| Project | Description | Links |
|---------|-------------|-------|
| **FocusGrid** | Quadrant-based collaborative task management | [Live](https://focus-grid-three.vercel.app/) |
| **RewardRally** | Agentic AI loyalty & retention platform | [Live](https://www.rewardrally.in/) |
| **DevType** | Typing practice app for developers | [Live](https://devtype-tau.vercel.app/) |
| **balloon-feedback** | React feedback component with pop animations | [npm](https://www.npmjs.com/package/@vedhasagaran/balloon-feedback) |
| **dhan-mcp-server** | MCP server for Dhan trading platform | [PyPI](https://pypi.org/project/dhan-mcp-server/) |

## ✦ Getting Started

```bash
git clone https://github.com/vedhasagaran/v1.git
cd v1
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

### Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server on `:4321` |
| `npm run build` | Build for production to `./dist` |
| `npm run preview` | Preview production build locally |

## ✦ Project Structure

```
src/
├── components/
│   ├── layout/         → Navbar, Footer
│   ├── sections/       → Hero, About, Skills, Projects, Contact
│   ├── settings/       → Theme toggle, Cursor toggle
│   └── ui/             → Reusable UI components
├── content/
│   └── blog/           → Markdown blog posts
├── data/               → Static data (skills, projects, hero, about)
├── layouts/            → Page layouts
├── pages/              → Astro page routes
├── styles/             → Global styles
└── utils/              → Utility functions
```

## ✦ License

© Vedhasagaran Mahalingam. All rights reserved.
