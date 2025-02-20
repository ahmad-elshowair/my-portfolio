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
  link: string;
  githubUrl: string;
  images: ProjectImage[];
}
