import type { ProjectCardProps } from "@/definitions";

export const projects: ProjectCardProps[] = [
  {
    anchorId: "pointcraft",
    title: "PointCraft — POS & Billing Suite",
    featured: true,
    description:
      "PointCraft's POS, self-checkout, and invoice tools streamlining transaction tracking and record reconciliation — shipped as production React and MUI interfaces with accessible, theme-consistent design.",
    technologies: [
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "React", icon: "simple-icons:react" },
      { name: "MUI", icon: "simple-icons:mui" },
      { name: "Git", icon: "simple-icons:git" },
      { name: "Github", icon: "simple-icons:github" },
      { name: "Figma", icon: "simple-icons:figma" },
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
      { name: "Next.js", icon: "simple-icons:nextdotjs" },
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
      { name: "PostgreSQL", icon: "simple-icons:postgresql" },
      { name: "Supabase", icon: "simple-icons:supabase" },
      { name: "Stripe", icon: "simple-icons:stripe" },
      { name: "React", icon: "simple-icons:react" },
      { name: "Git", icon: "simple-icons:git" },
      { name: "Github", icon: "simple-icons:github" },
      { name: "Figma", icon: "simple-icons:figma" },
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
      { name: "PostgreSQL", icon: "simple-icons:postgresql" },
      { name: "Express", icon: "simple-icons:express" },
      { name: "React", icon: "simple-icons:react" },
      { name: "Node.js", icon: "simple-icons:nodedotjs" },
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "Redis", icon: "simple-icons:redis" },
      { name: "Bootstrap", icon: "simple-icons:bootstrap" },
      { name: "Git", icon: "simple-icons:git" },
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
      { name: "Next.js", icon: "simple-icons:nextdotjs" },
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
      { name: "Git", icon: "simple-icons:git" },
      { name: "PostgreSQL", icon: "simple-icons:postgresql" },
      { name: "Supabase", icon: "simple-icons:supabase" },
      { name: "React", icon: "simple-icons:react" },
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

  {
    anchorId: "hayya-ala-al-salah",
    title: "Hayya 'Ala Al-Salah — Masjid Kiosk Display",
    description:
      "24/7 masjid kiosk display with a live prayer countdown, Hijri and Gregorian dates, an announcements ticker, and a fundraising overlay — engineered unattended-safe with auto-recovering error boundaries, service-worker offline caching, and full Arabic RTL and English support.",
    technologies: [
      { name: "React", icon: "simple-icons:react" },
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "MUI", icon: "simple-icons:mui" },
      { name: "Zustand", icon: "devicon-plain:zustand" },
      { name: "Vite", icon: "simple-icons:vite" },
      { name: "Github", icon: "simple-icons:github" },
    ],
    link: "https://ahmad-pointcraft.github.io/hayya-ala-al-salah/",
    githubUrl: "https://github.com/ahmad-pointcraft/hayya-ala-al-salah",
    images: [
      {
        url: "/images/hayya-1.png",
        alt: "Masjid display with five prayer cards showing Adhan and Iqama times, a countdown to the next prayer, and Hijri and Gregorian dates",
      },
      {
        url: "/images/hayya-2.png",
        alt: "Fundraising overlay with collected and goal amounts, donation progress, and a QR code over the dimmed display",
      },
      {
        url: "/images/hayya-3.png",
        alt: "Prayer-in-progress state with a silence message",
      },
    ],
  },
];
