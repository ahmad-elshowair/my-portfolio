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
} from "react-icons/si";
import { ExperienceItemProps, ProjectCardProps } from "@/definitions";

export const experiences: ExperienceItemProps[] = [
  {
    title: "front-end developer",
    company: "PointCraft - remotely",
    companyUrl: "https://point-craft.com/",
    period: "july 2025 - present",
    description:
      "Building and maintaining a suite of POS and payment solutions, including Restaurant POS, Restaurant Self Checkout, Online Payment, and Invoice Management systems. Designing UI/UX interfaces in Figma and translating them into responsive, production-ready applications using React and Material UI.",
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
      <SiTypescript key="typescript" />,
      <SiReact key="react" />,
      <SiNodedotjs key="nodejs" />,
      <SiMui key="mui" />,
      <SiFigma key="figma" />,
    ],
  },
  {
    title: "full-stack developer",
    company: "remotely",
    period: "2023 - july 2025",
    description:
      "I work with different clients across freelancing platforms or offline to implement projects, according to my experience as a full-stack | front-end | back-end developer, Developed Kun Min Aldhaakirin, A PWA for Islamic daily remembrance. Built a full-stack customs clearance platform ClearCarGo with secure-auth and role-based access and payment gateway Stripe. Built Task, a full-stack task management system including secure-auth and role-based access.",
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
        name: "Task",
        url: "https://github.com/ahmad-elshowair/next-tasks",
      },
    ],
    technologies: [
      <SiTypescript key="typescript" />,
      <SiNextdotjs key="nextjs" />,
      <SiTailwindcss key="tailwind" />,
      <SiNodedotjs key="nodejs" />,
      <SiExpress key="express" />,
      <SiPostgresql key="postgresql" />,
      <SiSupabase key="supabase" />,
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
      <SiHtml5 key="html5" />,
      <SiJavascript key="javascript" />,
      <SiCss3 key="css3" />,
    ],
  },
];

export const projects: ProjectCardProps[] = [
  {
    title: "PointCraft — POS & Billing Suite",
    description:
      "PointCraft's restaurant POS, self-checkout, and invoice tools streamlining transaction tracking and record reconciliation — designed in Figma, shipped as production React and Material UI apps.",
    technologies: [
      <SiTypescript key="ts" />,
      <SiReact key="react" />,
      <SiMui key="mui" />,
      <SiFigma key="figma" />,
      <SiGit key="git" />,
    ],
    link: "https://point-craft.com/",
    images: [
      {
        url: "/images/invoice-0.png",
        alt: "Invoice Page ",
      },
      {
        url: "/images/POS-0.png",
        alt: "POS Page ",
      },
      {
        url: "/images/invoice-1.png",
        alt: "Invoice Page ",
      },
      {
        url: "/images/POS-1.png",
        alt: "POS Page ",
      },
      {
        url: "/images/invoice-2.png",
        alt: "Invoice Page",
      },
      {
        url: "/images/POS-2.png",
        alt: "POS Page",
      },
      {
        url: "/images/invoice-3.png",
        alt: "Invoice Page",
      },
      {
        url: "/images/POS-3.png",
        alt: "POS Page",
      },
      {
        url: "/images/POS-4.png",
        alt: "POS Page",
      },
    ],
  },

  {
    title: "ClearCarGo",
    description:
      "Full-stack customs-clearance platform with real-time shipment tracking, automated Stripe payment workflows, and role-based access control — built end-to-end with Next.js, TypeScript, and PostgreSQL.",
    technologies: [
      <SiNextdotjs key="next" />,
      <SiTypescript key="ts" />,
      <SiTailwindcss key="tailwind" />,
      <SiPostgresql key="postgresql" />,
      <SiSupabase key="supabase" />,
      <SiStripe key="stripe" />,
      <SiReact key="react" />,
      <SiGit key="git" />,
    ],
    githubUrl: "https://github.com/ahmad-elshowair/clearcargo",
    statusNote: "live demo redeploying — source on GitHub",
    images: [
      {
        url: "/images/clearcargo-1.png",
        alt: "Clearances Page ",
      },
      {
        url: "/images/clearcargo-2.png",
        alt: "Home Page",
      },
      {
        url: "/images/clearcargo-3.png",
        alt: "Login Page",
      },
      {
        url: "/images/clearcargo-4.png",
        alt: "Register Page",
      },
    ],
  },

  {
    title: "Post-It",
    description:
      "Full-stack social platform with dynamic feeds and threaded comments built on Zustand — hardened with dual-token JWT authentication, Redis rate limiting, and raw SQL ACID transactions for data integrity.",
    technologies: [
      <SiNextdotjs key="next" />,
      <SiTypescript key="ts" />,
      <SiReact key="react" />,
      <SiPostgresql key="postgresql" />,
      <SiRedis key="redis" />,
      <SiGit key="git" />,
    ],
    githubUrl: "https://github.com/ahmad-elshowair/post-it",
    images: [],
  },

  {
    title: "Kun Min Aldhaakirin",
    description:
      "A progressive web app for Islamic daily remembrance with service-worker caching, dynamic dark and light themes, and full English/Arabic support — installable and fully usable offline.",
    technologies: [
      <SiNextdotjs key="next" />,
      <SiTypescript key="ts" />,
      <SiTailwindcss key="tailwind" />,
      <SiGit key="git" />,
      <SiPostgresql key="postgresql" />,
      <SiSupabase key="supabase" />,
      <SiReact key="react" />,
    ],
    link: "https://kun-min-aldhaakirin.vercel.app/",
    githubUrl: "https://github.com/ahmad-elshowair/kun-min-aldhaakirin",
    images: [
      {
        url: "/images/kun-min-aldhaakirin-1.png",
        alt: "morning adhkar",
      },
      {
        url: "/images/kun-min-aldhaakirin-2.png",
        alt: "morning adhkar english",
      },
      {
        url: "/images/kun-min-aldhaakirin-3.png",
        alt: "adhkar light theme ",
      },
    ],
  },
];
