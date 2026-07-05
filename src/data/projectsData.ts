import { ASSETS } from './assets';

export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  image?: string;
  objectFit?: 'cover' | 'contain';
  stats?: {
    label: string;
    value: string;
  };
}

export const projects: Project[] = [
  {
    title: "FocusGrid",
    description:
      "A collaborative task management application featuring quadrant-based organization, real-time team boards, and detailed task history tracking.",
    link: "https://focus-grid-three.vercel.app/",
    tags: ["React", "TypeScript", "Vite", "Firebase"],
    image: ASSETS.projects.focusGrid,
    stats: {
      label: "Status",
      value: "Live",
    },
  },
  {
    title: "RewardRally",
    description:
      "An Agentic AI loyalty program that autonomously analyzes customer behavior, predicts intent, and executes personalized retention campaigns in real time.",
    link: "https://www.rewardrally.in/",
    tags: ["Node.js","DotNet", "React", "TypeScript", "AI"],
    image: ASSETS.projects.rewardRally,
    objectFit: "contain",
    stats: {
      label: "Status",
      value: "Live",
    },
  },
  {
    title: "DevType",
    description:
      "A specialized typing practice application for developers, featuring context-specific categories like AI prompts and code snippets to improve typing speed and accuracy.",
    link: "https://devtype-tau.vercel.app/",
    tags: ["Html", "Css", "Javascript", "Vite"],
    image: ASSETS.projects.devType,
    stats: {
      label: "Status",
      value: "Live",
    },
  },
  {
    title: "balloon-feedback",
    description:
      "Interactive balloon pop feedback component for React. Collect user feedback with satisfying burst animations, sound effects, and analytics integration.",
    link: "https://www.npmjs.com/package/@vedhasagaran/balloon-feedback",
    tags: ["React", "TypeScript", "Framer Motion", "npm"],
    stats: {
      label: "npm",
      value: "Package",
    },
  },
  {
    title: "dhan-mcp-server",
    description:
      "A Model Context Protocol (MCP) server for Dhan trading platform integration. Enables seamless trading operations through MCP interface.",
    link: "https://pypi.org/project/dhan-mcp-server/",
    tags: ["Python", "MCP", "Trading", "API"],
    stats: {
      label: "PyPI",
      value: "Package",
    },
  },
];
