import { ComponentType } from "react";
import type { IconifyProps } from "@/components/iconify";

export interface Project {
  name: string;
  url: string;
}

/** Resume CORE SKILLS taxonomy — the four categories every skills concept groups by. */
export type SkillCategoryId = "frontend" | "backend" | "tools" | "languages";

/** The four production projects a skill can cite as evidence (anchor targets in #projects). */
export type SkillProjectId =
  | "pointcraft"
  | "clearcargo"
  | "post-it"
  | "kun-min-aldhaakirin";

/** One of the eight switchable skills-section concepts. */
export type ConceptId =
  | "009"
  | "010"
  | "011"
  | "012"
  | "013"
  | "014"
  | "015"
  | "016";

/**
 * A single resume skill. `name` and `context` are resume-verbatim;
 * `projects` mirrors project card `technologies` arrays, extended only by resume-bullet
 * evidence. `icon` omitted → the skill renders as a text badge.
 */
export interface SkillItem {
  /** Stable slug used as key and selection id. */
  id: string;
  name: string;
  icon?: IconifyProps;
  category: SkillCategoryId;
  context: string;
  projects: SkillProjectId[];
}

/**
 * Homogeneous props every concept variant accepts — the registry contract.
 * Variants consume the shared lab store rather than props; this "no known
 * props" type keeps all eight interchangeable so adding a concept never
 * touches the host (React's key still passes through).
 */
export type SkillConceptProps = object;

/** Registry entry mounting one concept behind the switcher. */
export interface SkillConceptDescriptor {
  id: ConceptId;
  /** Short switcher label, e.g. "shelves". */
  label: string;
  /** One-line description of what the evaluator sees. */
  blurb: string;
  component: ComponentType<SkillConceptProps>;
}

export interface TechItem {
  name: string;
  icon: IconifyProps;
}

export interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: TechItem[];
  projects?: Project[];
  companyUrl?: string;
}

export interface ProjectImage {
  alt: string;
  url: string;
}

export interface ProjectCardProps {
  /** Stable anchor id — rendered as #project-<anchorId>; targeted by skill evidence pills and cross-glow. */
  anchorId?: string;
  title: string;
  /** description of the project */
  description: string;
  technologies: TechItem[];
  /** Public live-demo URL. Omit when the deployment is down — the live-site action is not rendered. */
  link?: string;
  /** Source repository URL (GitHub). Rendered as the source action when present. */
  githubUrl?: string;
  /** Honest availability note shown under the card title (e.g. redeploy status). Optional, data-driven. */
  statusNote?: string;
  images: ProjectImage[];
}
