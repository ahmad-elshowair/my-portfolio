import { ReactNode } from "react";

export interface Project {
  name: string;
  url: string;
}

export interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: React.ReactNode[];
  projects?: Project[];
  companyUrl?: string;
}

export interface ProjectImage {
  alt: string;
  url: string;
}

export interface ProjectCardProps {
  title: string;
  technologies: ReactNode[];
  /** Public live-demo URL. Omit when the deployment is down — the live-site action is not rendered. */
  link?: string;
  /** Source repository URL (GitHub). Rendered as the source action when present. */
  githubUrl?: string;
  /** Honest availability note shown under the card title (e.g. redeploy status). Optional, data-driven. */
  statusNote?: string;
  images: ProjectImage[];
}
