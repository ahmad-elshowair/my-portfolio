import {
  SiCss3,
  SiExpress,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiGit,
  SiBootstrap,
  SiGithub,
  SiWix,
  SiPython,
  SiSqlite,
  SiVitest,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

/** Renders a technology icon with its screen-reader name — bare icons carry no meaning. */
const techIcon = (name: string, Icon: IconType) => (
  <span key={name} className="inline-flex items-center">
    <Icon aria-hidden="true" />
    <span className="sr-only">{name}</span>
  </span>
);

import {
  ExperienceItemProps,
  ProjectCardProps,
  SkillCategoryId,
  SkillItem,
  SkillProjectId,
} from "@/definitions";

export const experiences: ExperienceItemProps[] = [
  {
    title: "front-end developer",
    company: "PointCraft - remotely",
    companyUrl: "https://point-craft.com/",
    period: "july 2025 - present",
    description:
      "Building and maintaining a suite of POS and payment solutions, including Restaurant POS, Restaurant Self Checkout, Online Payment, and Invoice Management systems — engineered for responsive, accessible, theme-consistent operation with React, TypeScript, and MUI.",
    projects: [
      {
        name: "POS",
        url: "https://point-craft.com/",
      },
      {
        name: "Restaurant POS",
        url: "https://point-craft.com/",
      },
      {
        name: "Restaurant Self Checkout",
        url: "https://point-craft.com/",
      },
      {
        name: "Online Payment",
        url: "https://point-craft.com/",
      },
      {
        name: "Invoice Management",
        url: "https://point-craft.com/",
      },
    ],
    technologies: [
      techIcon("TypeScript", SiTypescript),
      techIcon("React", SiReact),
      techIcon("Node.js", SiNodedotjs),
      techIcon("MUI", SiMui),
      techIcon("Git", SiGit),
      techIcon("Github", SiGithub),
      techIcon("Figma", SiFigma),
    ],
  },
  {
    title: "full-stack developer",
    company: "remotely",
    period: "2023 - july 2025",
    description:
      "I work with different clients across freelancing platforms or offline to implement projects, according to my experience as a full-stack | front-end | back-end developer, Developed Kun Min Aldhaakirin, A PWA for Islamic daily remembrance. Built a full-stack customs clearance platform ClearCarGo with secure-auth and role-based access and payment gateway Stripe. BuiltPost It, a full-stack social media platform including secure-auth.",
    projects: [
      {
        name: "Kun Min Aldhaakirin",
        url: "https://kun-min-aldhaakirin.vercel.app",
      },
      {
        name: "ClearCarGo",
        url: "https://github.com/ahmad-elshowair/clearcargo",
      },

      {
        name: "Post It",
        url: "https://github.com/ahmad-elshowair/post-it",
      },
    ],
    technologies: [
      techIcon("TypeScript", SiTypescript),
      techIcon("Next.js", SiNextdotjs),
      techIcon("Tailwind CSS", SiTailwindcss),
      techIcon("Node.js", SiNodedotjs),
      techIcon("Express", SiExpress),
      techIcon("PostgreSQL", SiPostgresql),
      techIcon("Supabase", SiSupabase),
      techIcon("React", SiReact),
      techIcon("Bootstrap", SiBootstrap),
      techIcon("Git", SiGit),
      techIcon("Github", SiGithub),
      techIcon("Figma", SiFigma),
    ],
  },
  {
    title: "web developer",
    company: "coins for change vietnam",
    companyUrl: "https://www.catalystforchangevietnam.com/",
    period: "sep 2019 - Mar 2020",
    description:
      "I was a member of the volunteers. developing the organization's website through CMS WIX. redesigning the layout of the website.",
    technologies: [
      techIcon("HTML5", SiHtml5),
      techIcon("JavaScript", SiJavascript),
      techIcon("CSS3", SiCss3),
      techIcon("WIX", SiWix),
    ],
  },
];

export const projects: ProjectCardProps[] = [
  {
    anchorId: "pointcraft",
    title: "PointCraft — POS & Billing Suite",
    description:
      "PointCraft's POS, self-checkout, and invoice tools streamlining transaction tracking and record reconciliation — shipped as production React and MUI interfaces with accessible, theme-consistent design.",
    technologies: [
      techIcon("TypeScript", SiTypescript),
      techIcon("React", SiReact),
      techIcon("MUI", SiMui),
      techIcon("Git", SiGit),
      techIcon("Github", SiGithub),
      techIcon("Figma", SiFigma),
    ],
    link: "https://point-craft.com/",
    images: [
      {
        url: "/images/invoice-0.png",
        alt: "Invoice for a $9.52 chicken noodle soup order with a save-and-continue button",
      },
      {
        url: "/images/POS-0.png",
        alt: "POS register in a ready-for-product-scan state with add-item, note, and coupon quick actions",
      },
      {
        url: "/images/invoice-1.png",
        alt: "Create-invoice form with customer details, line items, totals, and notes",
      },
      {
        url: "/images/POS-1.png",
        alt: "Product grid browsing 36 items with prices like ribeye steak and buffalo wings",
      },
      {
        url: "/images/invoice-2.png",
        alt: "Overpaid invoice with itemized charges, a $3,195.95 total, and $0.00 due",
      },
      {
        url: "/images/POS-2.png",
        alt: "Checkout screen with subtotal, discounts, tax, order total, and confirm-order button",
      },
      {
        url: "/images/invoice-3.png",
        alt: "Invoices dashboard with summary stats, status filters, search, and a records table",
      },
      {
        url: "/images/POS-3.png",
        alt: "Cart panel with added items, quantity controls, and a charge button",
      },
      {
        url: "/images/POS-4.png",
        alt: "Item-not-found dialog with name and price fields over a numeric keypad",
      },
    ],
  },

  {
    anchorId: "clearcargo",
    title: "ClearCarGo",
    description:
      "Full-stack customs-clearance platform with real-time shipment tracking, automated Stripe payment workflows, and role-based access control — built end-to-end with Next.js, TypeScript, and PostgreSQL.",
    technologies: [
      techIcon("Next.js", SiNextdotjs),
      techIcon("TypeScript", SiTypescript),
      techIcon("Tailwind CSS", SiTailwindcss),
      techIcon("PostgreSQL", SiPostgresql),
      techIcon("Supabase", SiSupabase),
      techIcon("Stripe", SiStripe),
      techIcon("React", SiReact),
      techIcon("Git", SiGit),
      techIcon("Github", SiGithub),
      techIcon("Figma", SiFigma),
    ],
    githubUrl: "https://github.com/ahmad-elshowair/clearcargo",
    statusNote: "live demo redeploying — source on GitHub",
    images: [
      {
        url: "/images/clearcargo-1.png",
        alt: "Clearances page with search, create button, and a record table showing invoice, VAT, and status",
      },
      {
        url: "/images/clearcargo-2.png",
        alt: "Welcome page prompting login to access shipments, with register and login buttons",
      },
      {
        url: "/images/clearcargo-3.png",
        alt: "Login form with email and password fields and a forgot-password link",
      },
      {
        url: "/images/clearcargo-4.png",
        alt: "Registration form with name, email, password, date of birth, and mobile fields",
      },
    ],
  },

  {
    anchorId: "post-it",
    title: "Post-It",
    description:
      "Full-stack social platform with dynamic feeds and threaded comments built on Zustand — hardened with dual-token JWT authentication, Redis rate limiting, and raw SQL ACID transactions for data integrity.",
    technologies: [
      techIcon("PostgreSQL", SiPostgresql),
      techIcon("Express", SiExpress),
      techIcon("React", SiReact),
      techIcon("Node.js", SiNodedotjs),
      techIcon("TypeScript", SiTypescript),
      techIcon("Redis", SiRedis),
      techIcon("Bootstrap", SiBootstrap),
      techIcon("Git", SiGit),
    ],
    githubUrl: "https://github.com/ahmad-elshowair/post-it",
    images: [],
  },

  {
    anchorId: "kun-min-aldhaakirin",
    title: "Kun Min Aldhaakirin",
    description:
      "A progressive web app for Islamic daily remembrance with service-worker caching, dynamic dark and light themes, and full English/Arabic support — installable and fully usable offline.",
    technologies: [
      techIcon("Next.js", SiNextdotjs),
      techIcon("TypeScript", SiTypescript),
      techIcon("Tailwind CSS", SiTailwindcss),
      techIcon("Git", SiGit),
      techIcon("PostgreSQL", SiPostgresql),
      techIcon("Supabase", SiSupabase),
      techIcon("React", SiReact),
    ],
    link: "https://kun-min-aldhaakirin.vercel.app/",
    githubUrl: "https://github.com/ahmad-elshowair/kun-min-aldhaakirin",
    images: [
      {
        url: "/images/kun-min-aldhaakirin-1.png",
        alt: "Arabic dhikr cards with audio play buttons and recitation counters in dark theme",
      },
      {
        url: "/images/kun-min-aldhaakirin-2.png",
        alt: "Morning azkar view of Ayatul Kursi with translation, audio playback, and the language menu open",
      },
      {
        url: "/images/kun-min-aldhaakirin-3.png",
        alt: "Arabic dhikr counters with the light, dark, and system theme menu open",
      },
    ],
  },
];

/* ─── Skills Lab dataset ──────────────────────────────────────────────
 * Single source for every skills-concept variant.
 * Names and context sentences are resume-verbatim; project associations mirror the
 * card technologies arrays above, extended ONLY by the following traceable evidence:
 *   nodejs→pointcraft (PointCraft experience array lists Node.js);
 *   redis→clearcargo (caching/rate-limiting bullet);
 *   jwt-rbac→clearcargo+post-it (RBAC / dual-token JWT bullets);
 *   pwa→kun (PWA project bullet); zustand→post-it (Zustand bullet);
 *   realtime-dashboards→clearcargo (shipment-tracking bullet);
 *   bilingual-ui→kun (English/Arabic bullet);
 *   performance-optimization→clearcargo (hot-path bullet);
 *   acid-transactions→post-it (ACID bullet);
 *   responsive-ui→pointcraft (viewport bullet);
 *   vercel→kun (live vercel.app deployment in portfolioData).
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
  // Front-End (13)
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
    context: "Semantic HTML5 markup and accessibility foundations under every interface.",
    projects: ["post-it"],
  },
  {
    id: "css3",
    name: "CSS3",
    icon: SiCss3,
    category: "frontend",
    context: "Modern CSS3 styling, responsive layouts, and visual design systems.",
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
    category: "frontend",
    context:
      "Accessible, theme-consistent UI across mobile and desktop viewports (PointCraft).",
    projects: ["pointcraft", "clearcargo", "kun-min-aldhaakirin"],
  },
  {
    id: "cross-browser",
    name: "Cross-Browser & Accessible UI",
    category: "frontend",
    context:
      "Cross-browser rendering with accessible, keyboard-operable markup.",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "pwa",
    name: "Progressive Web Apps (PWA)",
    category: "frontend",
    context:
      "Installable, offline-capable PWA with service-worker caching and dynamic themes (Kun Min Aldhaakirin).",
    projects: ["kun-min-aldhaakirin"],
  },
  {
    id: "api-integration",
    name: "API Integration",
    category: "frontend",
    context: "Front-end consumption of RESTful APIs.",
    projects: [],
  },
  {
    id: "fe-architecture",
    name: "Front-end architecture",
    category: "frontend",
    context:
      "Structured reactive state and component composition for production apps.",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },

  // Back-End (11)
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
    category: "backend",
    context: "Dual-token JWT authentication with role-based access control.",
    projects: ["clearcargo", "post-it"],
  },
  {
    id: "acid-transactions",
    name: "Raw SQL ACID transactions",
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
    name: "Git/GitHub",
    icon: SiGit,
    category: "tools",
    context: "Branch-based collaboration across every production codebase.",
    projects: ["pointcraft", "clearcargo", "post-it", "kun-min-aldhaakirin"],
  },
  {
    id: "agile-remote",
    name: "Agile remote collaboration",
    category: "tools",
    context: "Async collaboration with international teams.",
    projects: ["pointcraft", "clearcargo"],
  },
  {
    id: "zustand",
    name: "State management (Zustand)",
    category: "tools",
    context:
      "State management for dynamic feeds and threaded comments in Post-It.",
    projects: ["post-it", "pointcraft", "kun-min-aldhaakirin"],
  },
  {
    id: "realtime-dashboards",
    name: "Real-time dashboards",
    category: "tools",
    context: "Real-time shipment tracking in ClearCarGO.",
    projects: ["clearcargo", "pointcraft"],
  },
  {
    id: "bilingual-ui",
    name: "Bilingual UI development",
    category: "tools",
    context: "English/Arabic interfaces in the Kun Min Aldhaakirin PWA.",
    projects: ["kun-min-aldhaakirin"],
  },
  {
    id: "performance-optimization",
    name: "Performance optimization",
    category: "tools",
    context: "Hot-path performance work on production APIs.",
    projects: ["clearcargo", "post-it", "pointcraft", "kun-min-aldhaakirin"],
  },
  {
    id: "vercel",
    name: "Vercel deployment",
    icon: SiVercel,
    category: "tools",
    context: "Deployment pipeline for production apps (Kun Min Aldhaakirin).",
    projects: ["kun-min-aldhaakirin", "clearcargo"],
  },
  {
    id: "ai-assisted",
    name: "AI-assisted development",
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
    category: "languages",
    context: "Arabic — native.",
    projects: [],
  },
  {
    id: "english",
    name: "English (fluent)",
    category: "languages",
    context: "English — fluent.",
    projects: [],
  },
];
