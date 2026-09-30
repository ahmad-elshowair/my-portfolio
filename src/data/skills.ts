import {
  SiBootstrap,
  SiCss3,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSqlite,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVitest,
} from "react-icons/si";
import type {
  SkillCategoryId,
  SkillItem,
  SkillProjectId,
} from "@/definitions";

/* ─── Skills Lab dataset ──────────────────────────────────────────────
 * Single source for every skills-concept variant.
 * Names and context sentences are resume-verbatim; project associations mirror the
 * card technologies arrays, extended ONLY by the following traceable evidence:
 *   nodejs→pointcraft (PointCraft experience array lists Node.js);
 *   redis→clearcargo (caching/rate-limiting bullet);
 *   jwt-rbac→clearcargo+post-it (RBAC / dual-token JWT bullets);
 *   pwa→kun (PWA project bullet); zustand→post-it (Zustand bullet);
 *   realtime-dashboards→clearcargo (shipment-tracking bullet);
 *   bilingual-ui→kun (English/Arabic bullet);
 *   performance-optimization→clearcargo (hot-path bullet);
 *   acid-transactions→post-it (ACID bullet);
 *   responsive-ui→pointcraft (viewport bullet);
 *   vercel→kun (live vercel.app deployment in projects).
 * Membership is pinned to exactly 35 skills: 13 front-end, 11 back-end,
 * 9 tools & practices, 2 languages. Figma is intentionally absent — it is
 * not a resume CORE SKILLS entry (it stays rendered on project cards only).
 */

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
    icon: SiJavascript,
    category: "frontend",
    context: "ES6+ JavaScript across the front-end stack.",
    projects: [],
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: SiTypescript,
    category: "frontend",
    context:
      "Shipped in the PointCraft suite, ClearCarGO, Post-It, and the remembrance PWA.",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "react",
    name: "React.js",
    icon: SiReact,
    category: "frontend",
    context:
      "Reactive state for dynamic carts and concurrent order flows (PointCraft); feeds and threaded comments (Post-It).",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: SiNextdotjs,
    category: "frontend",
    context:
      "Next.js 14 on ClearCarGO; Next.js 15 App Router on the Kun Min Aldhaakirin PWA.",
    projects: ["clearcargo", "kun-min-aldhaakirin"],
  },
  {
    id: "html5",
    name: "HTML5",
    icon: SiHtml5,
    category: "frontend",
    context:
      "Semantic HTML5 markup and accessibility foundations under every interface.",
    projects: ["post-it"],
  },
  {
    id: "css3",
    name: "CSS3",
    icon: SiCss3,
    category: "frontend",
    context:
      "Modern CSS3 styling, responsive layouts, and visual design systems.",
    projects: ["post-it"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    category: "frontend",
    context: "UI layer for ClearCarGO and the bilingual remembrance PWA.",
    projects: ["clearcargo", "kun-min-aldhaakirin"],
  },
  {
    id: "mui",
    name: "MUI (Material UI)",
    icon: SiMui,
    category: "frontend",
    context:
      "Theme-consistent, accessible POS and invoice interfaces at PointCraft.",
    projects: ["pointcraft"],
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    icon: SiBootstrap,
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
      "Accessible, theme-consistent UI across mobile and desktop viewports.",
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
    projects: [],
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
    icon: SiNodedotjs,
    category: "backend",
    context: "Production APIs and tooling behind POS and social platforms.",
    projects: ["post-it"],
  },
  {
    id: "express",
    name: "Express.js",
    icon: SiExpress,
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
    projects: ["pointcraft"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: SiPostgresql,
    category: "backend",
    context:
      "Schema design plus raw SQL ACID transactions for production data integrity.",
    projects: ["clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "sqlite",
    name: "SQLite",
    icon: SiSqlite,
    category: "backend",
    context: "Embedded relational storage for lightweight workloads.",
    projects: [],
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: SiSupabase,
    category: "backend",
    context:
      "Persistent storage and authentication for ClearCarGO and the remembrance PWA.",
    projects: ["clearcargo", "kun-min-aldhaakirin"],
  },
  {
    id: "redis",
    name: "Redis",
    icon: SiRedis,
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
    icon: SiStripe,
    category: "backend",
    context: "Automated Stripe payment workflows in ClearCarGO.",
    projects: ["clearcargo"],
  },
  {
    id: "python",
    name: "Python",
    icon: SiPython,
    category: "backend",
    context: "Backend scripting and tooling.",
    projects: [],
  },

  // Tools & Practices (9)
  {
    id: "git",
    name: "Git",
    icon: SiGit,
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
    icon: SiVercel,
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
    icon: SiVitest,
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
