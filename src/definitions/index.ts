import { ReactNode } from "react";

export interface HighlightTextProps {
  children: ReactNode;
}
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
