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
} from "react-icons/si";
import { ExperienceItemProps, ProjectCardProps } from "@/definitions";

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
      <SiTypescript key="typescript" />,
      <SiReact key="react" />,
      <SiNodedotjs key="nodejs" />,
      <SiMui key="mui" />,
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
      "PointCraft's POS, self-checkout, and invoice tools streamlining transaction tracking and record reconciliation — shipped as production React and MUI interfaces with accessible, theme-consistent design.",
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
    title: "Post-It",
    description:
      "Full-stack social platform with dynamic feeds and threaded comments built on Zustand — hardened with dual-token JWT authentication, Redis rate limiting, and raw SQL ACID transactions for data integrity.",
    technologies: [
      <SiPostgresql key="postgresql" />,
      <SiExpress key="express" />,
      <SiReact key="react" />,
      <SiNodedotjs key="nodejs" />,
      <SiTypescript key="ts" />,
      <SiRedis key="redis" />,
      <SiBootstrap key="bootstrap" />,
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
