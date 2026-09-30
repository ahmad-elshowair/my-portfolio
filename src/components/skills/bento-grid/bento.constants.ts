import { skills } from "@/data/portfolioData";
import type { SkillItem } from "@/definitions";
import type { BentoZoneConfig } from "./bento.types";

export const ZONES: BentoZoneConfig[] = [
  {
    id: "frontend",
    title: "Front-End & UI Systems",
    subtitle: "Core Strengths & Architecture",
    spanClass: "md:col-span-2 lg:col-span-2",
    heroIds: [
      "typescript",
      "react",
      "nextjs",
      "tailwind",
      "mui",
      "fe-architecture",
    ],
    ids: [
      "typescript",
      "react",
      "nextjs",
      "tailwind",
      "javascript",
      "html5",
      "css3",
      "mui",
      "bootstrap",
      "responsive-ui",
      "cross-browser",
      "pwa",
      "api-integration",
      "fe-architecture",
    ],
  },
  {
    id: "backend",
    title: "Back-End, Data & APIs",
    subtitle: "Server Architecture & Pipelines",
    spanClass: "md:col-span-2 lg:col-span-2",
    heroIds: ["nodejs", "postgresql", "acid-transactions", "express"],
    ids: [
      "nodejs",
      "postgresql",
      "express",
      "rest-apis",
      "sqlite",
      "supabase",
      "redis",
      "jwt-rbac",
      "acid-transactions",
      "stripe",
      "python",
    ],
  },
  {
    id: "devops",
    title: "State, Testing & DevOps",
    subtitle: "Quality & Deployment",
    spanClass: "md:col-span-1 lg:col-span-1",
    heroIds: ["git", "zustand", "github", "ai-assisted"],
    ids: [
      "zustand",
      "vitest",
      "git",
      "github",
      "vercel",
      "performance-optimization",
      "realtime-dashboards",
      "ai-assisted",
    ],
  },
  {
    id: "global",
    title: "Global Remote & Communication",
    subtitle: "Agile & Multilingual",
    spanClass: "md:col-span-1 lg:col-span-1",
    heroIds: ["arabic", "english"],
    ids: ["agile-remote", "bilingual-ui", "arabic", "english"],
  },
];

export const CORE_DAILY = new Set<string>([
  "typescript",
  "react",
  "nextjs",
  "tailwind",
  "mui",
  "nodejs",
  "postgresql",
  "git",
  "github",
]);

export function statusBadge(skill: SkillItem): string {
  if (CORE_DAILY.has(skill.id)) return "Core Daily Stack";
  if (skill.projects.length > 0) return "Production Deployed";
  return "Verified in Resume";
}

export const byId = new Map<string, SkillItem>(skills.map((s) => [s.id, s]));
