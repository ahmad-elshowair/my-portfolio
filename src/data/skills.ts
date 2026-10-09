import type { SkillCategoryId, SkillItem, SkillProjectId } from "@/definitions";

/* ─── Skills Lab dataset ────────────────────────────────────────────── */

export const SKILL_CATEGORIES: Record<SkillCategoryId, string> = {
  frontend: "Front-End",
  backend: "Back-End",
  tools: "Tools & Practices",
  languages: "Languages",
};

export const SKILL_PROJECTS: Record<
  SkillProjectId,
  { name: string; anchor: string }
> = {
  pointcraft: { name: "PointCraft", anchor: "pointcraft" },
  clearcargo: { name: "ClearCarGO", anchor: "clearcargo" },
  "post-it": { name: "Post-It", anchor: "post-it" },
  "kun-min-aldhaakirin": {
    name: "Kun Min Aldhaakirin",
    anchor: "kun-min-aldhaakirin",
  },
};

export const skills: SkillItem[] = [
  // Front-End
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    icon: "simple-icons:javascript",
    category: "frontend",
    context: "ES6+ JavaScript across the front-end stack.",
    projects: [],
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "simple-icons:typescript",
    category: "frontend",
    context:
      "Shipped in the PointCraft suite, ClearCarGO, Post-It, and the remembrance PWA.",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "react",
    name: "React.js",
    icon: "simple-icons:react",
    category: "frontend",
    context:
      "Reactive state for dynamic carts and concurrent order flows (PointCraft); feeds and threaded comments (Post-It).",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "simple-icons:nextdotjs",
    category: "frontend",
    context:
      "Next.js 14 on ClearCarGO; Next.js 15 App Router on the Kun Min Aldhaakirin PWA.",
    projects: ["clearcargo", "kun-min-aldhaakirin"],
  },
  {
    id: "html5",
    name: "HTML5",
    icon: "simple-icons:html5",
    category: "frontend",
    context:
      "Semantic HTML5 markup and accessibility foundations under every interface.",
    projects: ["post-it"],
  },
  {
    id: "css3",
    name: "CSS3",
    icon: "simple-icons:css3",
    category: "frontend",
    context:
      "Modern CSS3 styling, responsive layouts, and visual design systems.",
    projects: ["post-it"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "simple-icons:tailwindcss",
    category: "frontend",
    context: "UI layer for ClearCarGO and the bilingual remembrance PWA.",
    projects: ["clearcargo", "kun-min-aldhaakirin"],
  },
  {
    id: "mui",
    name: "MUI (Material UI)",
    icon: "simple-icons:mui",
    category: "frontend",
    context:
      "Theme-consistent, accessible POS and invoice interfaces at PointCraft.",
    projects: ["pointcraft"],
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    icon: "simple-icons:bootstrap",
    category: "frontend",
    context: "Component toolkit for the Post-It social platform.",
    projects: ["post-it"],
  },
  {
    id: "responsive-ui",
    name: "Responsive UI",
    icon: "streamline-ultimate:responsive-design-bold",
    category: "frontend",
    context:
      "Accessible, theme-consistent UI across mobile and desktop viewports3.",
    projects: ["pointcraft", "clearcargo", "kun-min-aldhaakirin"],
  },
  {
    id: "cross-browser",
    name: "Cross-Browser & Accessible UI",
    icon: "tabler:browser-check",
    category: "frontend",
    context:
      "Cross-browser rendering with accessible, keyboard-operable markup.",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "pwa",
    name: "Progressive Web Apps (PWA)",
    icon: "simple-icons:pwa",
    category: "frontend",
    context:
      "Installable, offline-capable PWA with service-worker caching and dynamic themes.",
    projects: ["kun-min-aldhaakirin"],
  },
  {
    id: "api-integration",
    name: "API Integration",
    icon: "tabler:webhook",
    category: "frontend",
    context: "Front-end consumption of RESTful APIs.",
    projects: ["clearcargo", "kun-min-aldhaakirin", "pointcraft", "post-it"],
  },
  {
    id: "fe-architecture",
    name: "Front-end architecture",
    icon: "carbon:layers",
    category: "frontend",
    context:
      "Structured reactive state and component composition for production apps.",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },

  // Back-End
  {
    id: "nodejs",
    name: "Node.js",
    icon: "simple-icons:nodedotjs",
    category: "backend",
    context: "Production APIs and tooling behind POS and social platforms.",
    projects: ["post-it"],
  },
  {
    id: "express",
    name: "Express.js",
    icon: "simple-icons:express",
    category: "backend",
    context: "RESTful API layer for Post-It.",
    projects: ["post-it"],
  },
  {
    id: "rest-apis",
    name: "RESTful APIs",
    icon: "tabler:api",
    category: "backend",
    context: "RESTful API design and consumption.",
    projects: ["post-it"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "simple-icons:postgresql",
    category: "backend",
    context:
      "Schema design plus raw SQL ACID transactions for production data integrity.",
    projects: ["clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "sqlite",
    name: "SQLite",
    icon: "simple-icons:sqlite",
    category: "backend",
    context: "Embedded relational storage for lightweight workloads.",
    projects: [],
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: "simple-icons:supabase",
    category: "backend",
    context:
      "Persistent storage and authentication for ClearCarGO and the remembrance PWA.",
    projects: ["clearcargo", "kun-min-aldhaakirin"],
  },
  {
    id: "redis",
    name: "Redis",
    icon: "simple-icons:redis",
    category: "backend",
    context:
      "Caching and rate limiting keeping API hot paths fast and abuse-resistant.",
    projects: ["post-it"],
  },
  {
    id: "jwt-rbac",
    name: "JWT & RBAC authentication",
    icon: "lucide:shield-check",
    category: "backend",
    context: "Dual-token JWT authentication with role-based access control.",
    projects: ["clearcargo", "post-it"],
  },
  {
    id: "acid-transactions",
    name: "Raw SQL ACID transactions",
    icon: "gravity-ui:abbr-sql",
    category: "backend",
    context: "Raw SQL ACID transactions for production-grade data integrity.",
    projects: ["post-it"],
  },
  {
    id: "stripe",
    name: "Stripe payments integration",
    icon: "simple-icons:stripe",
    category: "backend",
    context: "Automated Stripe payment workflows in ClearCarGO.",
    projects: ["clearcargo"],
  },
  {
    id: "python",
    name: "Python",
    icon: "simple-icons:python",
    category: "backend",
    context: "Backend scripting and tooling.",
    projects: [],
  },

  // Tools & Practices (9)
  {
    id: "git",
    name: "Git",
    icon: "simple-icons:git",
    category: "tools",
    context: "Git for version control.",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "github",
    name: "GitHub",
    icon: "akar-icons:github-fill",
    category: "tools",
    context: "GitHub for version control and collaboration.",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "agile-remote",
    name: "Agile remote collaboration",
    icon: "lucide:users",
    category: "tools",
    context: "Async collaboration with international teams.",
    projects: ["pointcraft", "clearcargo"],
  },
  {
    id: "zustand",
    name: "S.M. (Zustand)",
    icon: "devicon-plain:zustand",
    category: "tools",
    context: "Global state management for applications.",
    projects: ["post-it", "pointcraft", "kun-min-aldhaakirin"],
  },
  {
    id: "realtime-dashboards",
    name: "Real-time dashboards",
    icon: "lucide:activity",
    category: "tools",
    context: "Real-time shipment tracking in ClearCarGO.",
    projects: ["clearcargo", "pointcraft"],
  },
  {
    id: "bilingual-ui",
    name: "Bilingual UI development",
    icon: "lucide:languages",
    category: "tools",
    context: "English/Arabic interfaces in the Kun Min Aldhaakirin PWA.",
    projects: ["kun-min-aldhaakirin"],
  },
  {
    id: "performance-optimization",
    name: "Performance optimization",
    icon: "lucide:gauge",
    category: "tools",
    context: "Hot-path performance work on production APIs.",
    projects: ["clearcargo", "post-it", "pointcraft", "kun-min-aldhaakirin"],
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "simple-icons:vercel",
    category: "tools",
    context: "Deployment pipeline for production apps (Kun Min Aldhaakirin).",
    projects: ["kun-min-aldhaakirin", "clearcargo"],
  },
  {
    id: "ai-assisted",
    name: "AI-assisted development",
    icon: "lucide:sparkles",
    category: "tools",
    context: "AI-augmented engineering workflow.",
    projects: ["pointcraft", "clearcargo", "kun-min-aldhaakirin", "post-it"],
  },
  {
    id: "vitest",
    name: "Vitest",
    icon: "devicon-plain:vitest",
    category: "tools",
    context: "Unit testing for production modules.",
    projects: [],
  },

  // Languages (2)
  {
    id: "arabic",
    name: "Arabic (native)",
    icon: "iconoir:ar-tag",
    category: "languages",
    context: "Arabic — native.",
    projects: [],
  },
  {
    id: "english",
    name: "English (fluent)",
    icon: "icon-park-solid:english",
    category: "languages",
    context: "English — fluent.",
    projects: [],
  },
];
