import type {
  Command,
  EntryDraft,
  FlagCategory,
  HelpRow,
  SkillCategoryId,
  SkillItem,
  TelemetryPayload,
} from "@/definitions";
import { SKILL_CATEGORIES, SKILL_PROJECTS, skills } from "@/data";
import { AUTHOR, SITE_DESCRIPTION, SOCIAL_LINKS } from "@/lib/site";

/** Display order of the catalog groups and the no-flag listing. */
export const GROUPS: SkillCategoryId[] = [
  "frontend",
  "backend",
  "tools",
  "languages",
];

/** Flag-bearing categories — the single source `inspect --*` aliases and the quick-run presets derive from. */
export const FLAG_CATEGORIES: FlagCategory[] = GROUPS.filter(
  (category): category is FlagCategory => category !== "languages",
);

const SKILLS_FLAG: Record<string, FlagCategory> = {
  "--fe": "frontend",
  "--be": "backend",
  "--tools": "tools",
};

/** Help listing, as structured rows — the stream renders them responsively. */
const HELP_ROWS: HelpRow[] = [
  { command: "inspect <skill>", description: "telemetry for a skill (fuzzy match)" },
  {
    command: "inspect --frontend | --backend | --tools",
    description: "list one category",
  },
  { command: "skills [--fe | --be | --tools]", description: "list skills by category" },
  { command: "cat resume", description: "whoami payload" },
  { command: "clear", description: "flush the stream" },
  { command: "Tab", description: "complete skill names" },
];

const normalize = (value: string) => value.toLowerCase();

const byId = new Map(skills.map((s) => [s.id, s]));

function isSubsequence(needle: string, haystack: string): boolean {
  if (!needle) return false;
  let matched = 0;
  for (const char of haystack) {
    if (matched < needle.length && char === needle[matched]) matched += 1;
  }
  return matched === needle.length;
}

/** Classic edit distance — candidate strings are short skill ids/names. */
function editDistance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const curr = [i];
    for (let j = 1; j <= b.length; j += 1) {
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = curr;
  }
  return prev[b.length];
}

/**
 * Relevance score for a fuzzy query; 0 means no match. Exact id/name wins,
 * then prefix, then subsequence, then prefix-anchored typo distance —
 * tighter candidates rank higher within each tier so a single best
 * suggestion is always derivable.
 */
function skillScore(skill: SkillItem, query: string): number {
  const q = normalize(query);
  const id = normalize(skill.id);
  const name = normalize(skill.name);
  if (id === q || name === q) return Number.MAX_SAFE_INTEGER;
  if (id.startsWith(q) || name.startsWith(q)) {
    return 1_000 - Math.min(id.length, name.length);
  }
  const tightest = [id, name]
    .filter((candidate) => isSubsequence(q, candidate))
    .sort((a, b) => a.length - b.length)[0];
  if (tightest) return 500 - tightest.length;
  if (q.length >= 4) {
    const typo = [id, name]
      .map((candidate) => editDistance(q, candidate.slice(0, q.length)))
      .sort((a, b) => a - b)[0];
    if (typo <= 2) return 250 - typo;
  }
  return 0;
}

export function parseCommand(raw: string): Command {
  const tokens = raw.trim().split(/\s+/);
  const [head = "", ...rest] = tokens;
  const arg = rest.join(" ").trim();
  switch (normalize(head)) {
    case "inspect": {
      const alias = FLAG_CATEGORIES.find((category) => arg === `--${category}`);
      if (alias) return { kind: "inspect-category", category: alias };
      return { kind: "inspect", query: arg };
    }
    case "skills": {
      if (!rest.length) return { kind: "skills" };
      const category = SKILLS_FLAG[normalize(rest[0])];
      return category
        ? { kind: "skills", flag: category }
        : { kind: "unknown", name: `${head} ${rest[0]}` };
    }
    case "help":
      return { kind: "help" };
    case "clear":
      return { kind: "clear" };
    case "cat":
      return arg === "resume"
        ? { kind: "cat", target: "resume" }
        : { kind: "unknown", name: arg ? `cat ${arg}` : "cat" };
    default:
      return { kind: "unknown", name: head };
  }
}

export interface ExecutionResult {
  drafts: EntryDraft[];
  /** The skill a successful inspect should select (drives the cross-glow). */
  selectedSkillId: string | null;
}

function skillTelemetry(skill: SkillItem): TelemetryPayload {
  return {
    kind: "skill",
    skill: {
      name: skill.name,
      category: SKILL_CATEGORIES[skill.category],
      context: skill.context,
      projects: skill.projects.map((p) => ({
        name: SKILL_PROJECTS[p].name,
        anchorId: p,
      })),
    },
  };
}

function resumeTelemetry(): TelemetryPayload {
  return {
    kind: "resume",
    resume: {
      name: AUTHOR.name,
      role: AUTHOR.role,
      summary: SITE_DESCRIPTION,
      location: `${AUTHOR.location.city}, ${AUTHOR.location.country}`,
      links: [
        { label: "github", href: SOCIAL_LINKS.github },
        { label: "linkedin", href: SOCIAL_LINKS.linkedin },
      ],
    },
  };
}

function categoryListing(category: SkillCategoryId): EntryDraft[] {
  const names = skills
    .filter((s) => s.category === category)
    .map((s) => s.name);
  return [{ kind: "listing", category, names }];
}

export function executeCommand(command: Command): ExecutionResult {
  switch (command.kind) {
    case "help":
      return { drafts: [{ kind: "help", rows: HELP_ROWS }], selectedSkillId: null };
    case "inspect-category":
      return { drafts: categoryListing(command.category), selectedSkillId: null };
    case "skills":
      if (command.flag) {
        return { drafts: categoryListing(command.flag), selectedSkillId: null };
      }
      return { drafts: GROUPS.flatMap(categoryListing), selectedSkillId: null };
    case "inspect": {
      if (!command.query) {
        return {
          drafts: [
            {
              kind: "error",
              message: "usage: inspect <skill>",
              hint: "run 'skills' to list all",
            },
          ],
          selectedSkillId: null,
        };
      }
      const exact = byId.get(command.query) ?? skills.find(
        (s) => normalize(s.name) === normalize(command.query),
      );
      if (exact) {
        return {
          drafts: [{ kind: "telemetry", payload: skillTelemetry(exact) }],
          selectedSkillId: exact.id,
        };
      }
      const nearest = skills
        .map((s) => ({ skill: s, score: skillScore(s, command.query) }))
        .sort((a, b) => b.score - a.score)[0];
      if (nearest && nearest.score > 0) {
        return {
          drafts: [
            { kind: "hint", message: `did you mean '${nearest.skill.name}'?` },
          ],
          selectedSkillId: null,
        };
      }
      return {
        drafts: [
          {
            kind: "error",
            message: `no skill matches '${command.query}'`,
            hint: "try 'skills'",
          },
        ],
        selectedSkillId: null,
      };
    }
    case "cat":
      return {
        drafts: [{ kind: "telemetry", payload: resumeTelemetry() }],
        selectedSkillId: null,
      };
    case "unknown":
      return {
        drafts: [
          {
            kind: "error",
            message: `command not found: ${command.name}`,
            hint: "type 'help'",
          },
        ],
        selectedSkillId: null,
      };
    case "clear":
      return { drafts: [], selectedSkillId: null };
  }
}

/** Case-insensitive common prefix, cased from the first candidate. */
function commonPrefix(values: string[]): string {
  const first = values[0] ?? "";
  let length = first.length;
  for (const value of values) {
    length = Math.min(length, value.length);
    while (
      length > 0 &&
      normalize(first.slice(0, length)) !== normalize(value.slice(0, length))
    ) {
      length -= 1;
    }
  }
  return first.slice(0, length);
}

/**
 * Tab completion for an `inspect <query>` line: one candidate completes the
 * token; several fill the longest common prefix and report the candidate set
 * so a repeated Tab can list them in-stream.
 */
export function completeInspectToken(
  input: string,
): { next: string; candidates: string[] } {
  const parts = input.split(/\s+/);
  const head = parts[0] ?? "";
  if (normalize(head) !== "inspect" || parts.length < 2) {
    return { next: input, candidates: [] };
  }
  const query = normalize(parts[parts.length - 1] ?? "");
  const candidates = skills
    .filter(
      (s) =>
        normalize(s.name).startsWith(query) ||
        normalize(s.id).startsWith(query),
    )
    .map((s) => s.name);
  if (candidates.length === 0) return { next: input, candidates: [] };
  if (candidates.length === 1) {
    return { next: [...parts.slice(0, -1), candidates[0]].join(" "), candidates: [] };
  }
  const prefix = commonPrefix(candidates);
  return { next: [...parts.slice(0, -1), prefix].join(" "), candidates };
}

/** Lookup for the carried-over selection's first render. */
export function findSkillById(id: string): SkillItem | undefined {
  return byId.get(id);
}
