import {
  SiBootstrap,
  SiCss3,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiWix,
} from "react-icons/si";
import type { ExperienceItemProps } from "@/definitions";
import { techIcon } from "./techIcon";

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
