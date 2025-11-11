export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  stats?: {
    label: string;
    value: string;
  };
}

export const projects: Project[] = [
  {
    title: "balloon-feedback",
    description: "Interactive balloon pop feedback component for React. Collect user feedback with satisfying burst animations, sound effects, and analytics integration.",
    link: "https://www.npmjs.com/package/@vedhasagaran/balloon-feedback",
    tags: ["React", "TypeScript", "Framer Motion", "npm"],
    stats: {
      label: "npm",
      value: "Package"
    }
  },
  {
    title: "dhan-mcp-server",
    description: "A Model Context Protocol (MCP) server for Dhan trading platform integration. Enables seamless trading operations through MCP interface.",
    link: "https://pypi.org/project/dhan-mcp-server/",
    tags: ["Python", "MCP", "Trading", "API"],
    stats: {
      label: "PyPI",
      value: "Package"
    }
  },
  // Add more projects here
];
