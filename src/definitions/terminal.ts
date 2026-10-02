import type { SkillCategoryId, SkillProjectId } from "./index";

/** Stream capacity: the newest N command groups are kept; older scroll out. */
export const HISTORY_LIMIT = 8;

/** Categories that carry a `--*` flag; languages is list-only. */
export type FlagCategory = Exclude<SkillCategoryId, "languages">;

/** Every raw input parses to exactly one command variant (total function). */
export type Command =
  | { kind: "inspect"; query: string }
  | { kind: "inspect-category"; category: FlagCategory }
  | { kind: "skills"; flag?: FlagCategory }
  | { kind: "help" }
  | { kind: "clear" }
  | { kind: "cat"; target: "resume" }
  | { kind: "unknown"; name: string };

/** In-stream evidence badge — the project card anchor a click scrolls to. */
export interface TelemetryProjectBadge {
  name: string;
  anchorId: SkillProjectId;
}

export interface SkillTelemetry {
  name: string;
  category: string;
  context: string;
  projects: TelemetryProjectBadge[];
}

export interface ResumeTelemetry {
  name: string;
  role: string;
  summary: string;
  location: string;
  links: { label: string; href: string }[];
}

/** One inspection payload — exactly one branch is populated. */
export interface TelemetryPayload {
  skill?: SkillTelemetry;
  resume?: ResumeTelemetry;
}

/** One row of the help listing — a command form plus what it does. */
export interface HelpRow {
  command: string;
  description: string;
}

export type HistoryEntry =
  | { id: number; kind: "echo"; text: string }
  | { id: number; kind: "telemetry"; payload: TelemetryPayload }
  | { id: number; kind: "listing"; category: SkillCategoryId; names: string[] }
  | { id: number; kind: "help"; rows: HelpRow[] }
  | { id: number; kind: "error"; message: string; hint?: string }
  | { id: number; kind: "hint"; message: string };

/**
 * A command group: the echoed command plus everything it produced, kept
 * atomic so the bounded history can never orphan an output from its echo.
 */
export interface CommandGroup {
  id: number;
  entries: HistoryEntry[];
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

/** Draft entries before the stream stamps identity onto them. */
export type EntryDraft = DistributiveOmit<HistoryEntry, "id">;
