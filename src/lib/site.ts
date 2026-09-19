/**
 * Single source of truth for portfolio site identity, metadata,
 * social previews, Schema.org identity graphs, and crawl manifests.
 *
 * Migration Note: To migrate from vercel.app to a custom domain (e.g. elshowair.com),
 * update SITE_URL here. It will propagate across canonical links, OpenGraph tags,
 * Twitter cards, JSON-LD structured data, sitemap.xml, and robots.txt.
 */

export const SITE_URL = "https://ahmad-elshowair.vercel.app" as const;

export const SITE_TITLE =
  "Ahmad Elshowair — Full-Stack Developer (React · Next.js · TypeScript)" as const;

/**
 * Meta description matching Hero section positioning (144 characters, target <= 160).
 */
export const SITE_DESCRIPTION =
  "Full-stack developer with 3+ years remote experience shipping billing, POS, and payments platforms with React, Next.js, TypeScript, and Node.js." as const;

export const SITE_NAME = "Ahmad Elshowair Portfolio" as const;

export const AUTHOR = {
  name: "Ahmad Elshowair",
  role: "Full-Stack Developer",
  email: "ahmad-elshowair.dev@outlook.com",
  location: {
    city: "Hanoi",
    country: "Vietnam",
  },
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/ahmad-elshowair",
  linkedin: "https://www.linkedin.com/in/ahmad-elshowair",
} as const;
