"use client";

import { SkillGlyph } from "@/components/skills/shared";
import { SKILL_CATEGORIES, SKILL_PROJECTS, skills } from "@/data";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import type {
  Command,
  CommandGroup,
  EntryDraft,
  HistoryEntry,
  SkillCategoryId,
  SkillItem,
  TelemetryPayload,
  TelemetryProjectBadge,
} from "@/definitions";
import { HISTORY_LIMIT } from "@/definitions";
import { AUTHOR, SITE_DESCRIPTION, SOCIAL_LINKS } from "@/lib/site";
import { usePrefersReducedMotion } from "@/hooks";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

const GROUPS: SkillCategoryId[] = ["frontend", "backend", "tools", "languages"];

const CATEGORY_ALIASES: Record<string, SkillCategoryId> = {
  "--frontend": "frontend",
  "--backend": "backend",
  "--tools": "tools",
};

type FlagCategory = Exclude<SkillCategoryId, "languages">;

const FLAG_CATEGORY: Record<string, FlagCategory> = {
  "--fe": "frontend",
  "--be": "backend",
  "--tools": "tools",
};

const FLAG_NAME: Record<FlagCategory, "fe" | "be" | "tools"> = {
  frontend: "fe",
  backend: "be",
  tools: "tools",
};

const HELP_LINES = [
  "available commands:",
  "  inspect <skill>                       telemetry for a skill (fuzzy match)",
  "  inspect --frontend | --backend | --tools",
  "                                        list one category",
  "  skills [--fe | --be | --tools]        list skills by category",
  "  cat resume                            whoami payload",
  "  clear                                 flush the stream",
  "  Tab                                   complete skill names",
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

/**
 * Relevance score for a fuzzy query; 0 means no match. Exact id/name wins,
 * then prefix, then subsequence — tighter (shorter) candidates rank higher
 * within each tier so a single best suggestion is always derivable.
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
  return tightest ? 500 - tightest.length : 0;
}

function parseCommand(raw: string): Command {
  const tokens = raw.trim().split(/\s+/);
  const [head = "", ...rest] = tokens;
  const arg = rest.join(" ").trim();
  switch (normalize(head)) {
    case "inspect": {
      const alias = CATEGORY_ALIASES[arg];
      if (alias) return { kind: "inspect-category", category: alias };
      return { kind: "inspect", query: arg };
    }
    case "skills": {
      if (!rest.length) return { kind: "skills" };
      const category = FLAG_CATEGORY[normalize(rest[0])];
      return category
        ? { kind: "skills", flag: FLAG_NAME[category] }
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

interface ExecutionResult {
  drafts: EntryDraft[];
  /** The skill a successful inspect should select (drives the cross-glow). */
  selectedSkillId: string | null;
}

function skillTelemetry(skill: SkillItem): TelemetryPayload {
  return {
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

function executeCommand(command: Command): ExecutionResult {
  switch (command.kind) {
    case "help":
      return { drafts: [{ kind: "info", lines: HELP_LINES }], selectedSkillId: null };
    case "inspect-category":
      return { drafts: categoryListing(command.category), selectedSkillId: null };
    case "skills":
      if (command.flag) {
        const category = FLAG_CATEGORY[`--${command.flag}`];
        return { drafts: categoryListing(category), selectedSkillId: null };
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

function commonPrefix(values: string[]): string {
  let prefix = values[0] ?? "";
  for (const value of values) {
    while (prefix && !value.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

/**
 * Tab completion for an `inspect <query>` line: one candidate completes the
 * token; several fill the longest common prefix and report the candidate set
 * so a repeated Tab can list them in-stream.
 */
function completeInspectToken(
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

function EntryView({ entry }: { entry: HistoryEntry }) {
  switch (entry.kind) {
    case "echo":
      return (
        <p>
          <span className="text-mainGreen">$</span> {entry.text}
        </p>
      );
    case "hint":
      return <p className="pl-2 text-beige/60">{entry.message}</p>;
    case "error":
      return (
        <p className="pl-2 text-beige/70">
          ✗ {entry.message}
          {entry.hint ? (
            <span className="text-beige/50"> — {entry.hint}</span>
          ) : null}
        </p>
      );
    case "info":
      return (
        <pre className="pl-2 whitespace-pre-wrap text-beige/70">
          {entry.lines.join("\n")}
        </pre>
      );
    case "listing":
      return (
        <p className="pl-2 text-beige/85">
          {SKILL_CATEGORIES[entry.category]} ({entry.names.length}):{" "}
          {entry.names.join(", ")}
        </p>
      );
    case "telemetry":
      return <TelemetryBlock payload={entry.payload} />;
  }
}

/** JSON key/value line — keys carry the accent, values the page voice. */
function TelemetryRow({
  name,
  value,
  last,
}: {
  name: string;
  value: string;
  last?: boolean;
}) {
  return (
    <p>
      <span className="text-mainGreen">&quot;{name}&quot;</span>
      <span className="text-beige/50">: </span>
      <span className="text-beige">&quot;{value}&quot;</span>
      {last ? null : <span className="text-beige/50">,</span>}
    </p>
  );
}

/**
 * The click's job is the scroll; the destination card's glow is carried by
 * the selection-derived highlight payload, not by this button.
 */
function ProjectBadge({ project }: { project: TelemetryProjectBadge }) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <button
      type="button"
      onClick={() => {
        document
          .getElementById(`project-${project.anchorId}`)
          ?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
          });
      }}
      className="min-h-[44px] rounded-full border border-mainGreen/40 bg-mainGreen/10 px-3 text-xs text-beige transition-colors duration-200 hover:bg-mainGreen/25"
    >
      [🚀 SHIPPED IN {project.name.toUpperCase()}]
    </button>
  );
}

function StatusPill({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-beige/25 bg-beige/10 px-2.5 py-0.5 text-beige/85">
      {children}
    </span>
  );
}

function TelemetryBlock({ payload }: { payload: TelemetryPayload }) {
  const skill = payload.skill;
  const resume = payload.resume;
  if (skill) {
    return (
      <div className="flex flex-col gap-1 pl-2">
        <span className="text-beige/50">{"{"}</span>
        <div className="flex flex-col gap-1 pl-2">
          <TelemetryRow name="technology" value={skill.name} />
          <TelemetryRow name="category" value={skill.category} />
          <TelemetryRow name="capabilities" value={skill.context} />
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-mainGreen">&quot;production_evidence&quot;</span>
            <span className="text-beige/50">: </span>
            {skill.projects.length > 0 ? (
              skill.projects.map((project) => (
                <ProjectBadge key={project.anchorId} project={project} />
              ))
            ) : (
              <span className="text-beige/50">[]</span>
            )}
            <span className="text-beige/50">,</span>
          </p>
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-mainGreen">&quot;status&quot;</span>
            <span className="text-beige/50">: </span>
            <StatusPill>✔ VERIFIED IN RESUME</StatusPill>
          </p>
        </div>
        <span className="text-beige/50">{"}"}</span>
      </div>
    );
  }
  if (resume) {
    return (
      <div className="flex flex-col gap-1 pl-2">
        <span className="text-beige/50">{"{"}</span>
        <div className="flex flex-col gap-1 pl-2">
          <TelemetryRow name="name" value={resume.name} />
          <TelemetryRow name="role" value={resume.role} />
          <TelemetryRow name="summary" value={resume.summary} />
          <TelemetryRow name="location" value={resume.location} />
          <TelemetryRow
            name="links"
            value={resume.links.map((link) => link.label).join(", ")}
            last
          />
        </div>
        <span className="text-beige/50">{"}"}</span>
      </div>
    );
  }
  return null;
}

/** Developer terminal — dual pane with a live in-memory CLI. */
export default function Concept012() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  // A carried-over selection is inspected once, at first render.
  const [initialRun] = useState(() => {
    const skill = selectedSkillId ? byId.get(selectedSkillId) : undefined;
    if (!skill) {
      return { history: [] as CommandGroup[], telemetry: null as TelemetryPayload | null };
    }
    const { drafts } = executeCommand({ kind: "inspect", query: skill.id });
    const entries: HistoryEntry[] = [
      { id: -1, kind: "echo", text: `inspect ${skill.id}` },
      ...drafts.map((draft, index) => ({ ...draft, id: -2 - index })),
    ];
    return {
      history: [{ id: -1, entries }],
      telemetry:
        drafts.find(
          (draft): draft is Extract<EntryDraft, { kind: "telemetry" }> =>
            draft.kind === "telemetry",
        )?.payload ?? null,
    };
  });
  const [history, setHistory] = useState<CommandGroup[]>(initialRun.history);
  const [lastTelemetry, setLastTelemetry] = useState<TelemetryPayload | null>(
    initialRun.telemetry,
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "unavailable">(
    "idle",
  );
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const groupIdRef = useRef(0);
  const entryIdRef = useRef(0);
  const copyResetRef = useRef<number | undefined>(undefined);
  const tabCandidatesRef = useRef<{ input: string; candidates: string[] } | null>(
    null,
  );

  useEffect(() => {
    const stream = streamRef.current;
    if (stream) stream.scrollTop = stream.scrollHeight;
  }, [history]);

  useEffect(() => () => window.clearTimeout(copyResetRef.current), []);

  const appendGroups = (groups: { entries: EntryDraft[] }[]) => {
    setHistory((prev) => {
      const stamped: CommandGroup[] = groups.map((group) => ({
        id: (groupIdRef.current += 1),
        entries: group.entries.map((entry) => ({
          ...entry,
          id: (entryIdRef.current += 1),
        })),
      }));
      return [...prev, ...stamped].slice(-HISTORY_LIMIT);
    });
  };

  const runInput = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const command = parseCommand(text);
    if (command.kind === "clear") {
      setHistory([]);
      selectSkill(null);
      setInput("");
      return;
    }
    const { drafts, selectedSkillId: inspected } = executeCommand(command);
    if (inspected) selectSkill(inspected);
    const telemetry = drafts.find(
      (draft): draft is Extract<EntryDraft, { kind: "telemetry" }> =>
        draft.kind === "telemetry",
    );
    if (telemetry) setLastTelemetry(telemetry.payload);
    appendGroups([{ entries: [{ kind: "echo", text }, ...drafts] }]);
    setInput("");
  };

  const handleTab = () => {
    const { next, candidates } = completeInspectToken(input);
    const repeated =
      candidates.length > 1 &&
      tabCandidatesRef.current?.input === input &&
      tabCandidatesRef.current.candidates.length === candidates.length;
    tabCandidatesRef.current =
      candidates.length > 1 ? { input: next, candidates } : null;
    setInput(next);
    if (repeated) {
      appendGroups([
        {
          entries: [
            { kind: "hint", message: `candidates: ${candidates.join(", ")}` },
          ],
        },
      ]);
    }
  };

  /** Typing anywhere else in the chrome lands in the prompt, not on a stray node. */
  const steerFocus = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button, a, input")) return;
    event.preventDefault();
    inputRef.current?.focus();
  };

  const runPreset = (preset: SkillCategoryId | "clear") => {
    runInput(preset === "clear" ? "clear" : `inspect --${preset}`);
  };

  /** Copy teaches the command before any payload exists; reports failure in-stream. */
  const copyLatestJson = async () => {
    if (!lastTelemetry) {
      appendGroups([
        {
          entries: [
            {
              kind: "hint",
              message: "nothing to copy — run inspect <skill> first",
            },
          ],
        },
      ]);
      return;
    }
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(lastTelemetry, null, 2),
      );
      setCopyState("copied");
    } catch {
      setCopyState("unavailable");
      appendGroups([
        { entries: [{ kind: "hint", message: "copy unavailable" }] },
      ]);
    } finally {
      window.clearTimeout(copyResetRef.current);
      copyResetRef.current = window.setTimeout(() => setCopyState("idle"), 1500);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-4">
        {GROUPS.map((category) => (
          <section
            key={category}
            className="rounded-2xl border border-beige/15 bg-mainGreen/10 p-4 backdrop-blur-md"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-beige/60">
              {SKILL_CATEGORIES[category]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    aria-pressed={selectedSkillId === skill.id}
                    onClick={() => runInput(`inspect ${skill.id}`)}
                    className={cn(
                      "flex min-h-[44px] items-center gap-1.5 rounded-lg border px-3 py-1 text-sm transition-colors duration-200 [&_svg]:text-lg",
                      selectedSkillId === skill.id
                        ? "border-mainGreen bg-mainGreen/25 text-beige"
                        : "border-beige/15 bg-beige/5 text-beige/90 hover:bg-beige/10",
                    )}
                  >
                    <SkillGlyph skill={skill} />
                    {skill.name}
                  </button>
                ))}
            </div>
          </section>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div
          onMouseDown={steerFocus}
          className="overflow-hidden rounded-xl border border-beige/20 bg-bgGreen/85 shadow-[0_8px_32px_rgba(22,26,25,0.5)] backdrop-blur-md"
        >
          <div className="flex items-center gap-2 border-b border-beige/10 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-beige/30" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-beige/30" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-beige/30" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-beige/70">
              ahmad@stack:~ (zsh - 80x24)
            </span>
            <button
              type="button"
              onClick={copyLatestJson}
              aria-label="Copy the latest inspection JSON"
              className="ml-auto min-h-[44px] rounded-md border border-beige/20 bg-beige/5 px-3 font-mono text-xs text-beige/80 transition-colors duration-200 hover:bg-beige/10"
            >
              {copyState === "copied" ? "copied ✓" : "Copy JSON"}
            </button>
          </div>
          <div
            ref={streamRef}
            aria-live="polite"
            className="flex max-h-96 min-h-[16rem] flex-col gap-3 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-beige/90 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-beige/20"
          >
            <p>
              <span className="text-mainGreen">$</span>{" "}
              ahmad.inspectStack() --role=&quot;Full-Stack Developer&quot;
            </p>
            {history.map((group) => (
              <div key={group.id} className="flex flex-col gap-1">
                {group.entries.map((entry) => (
                  <EntryView key={entry.id} entry={entry} />
                ))}
              </div>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              runInput(input);
            }}
            className="flex items-center gap-2 border-t border-beige/10 px-4 py-3"
          >
            <label
              htmlFor="terminal-command-input"
              className="shrink-0 font-mono text-xs text-mainGreen"
            >
              ahmad@portfolio:~$
            </label>
            <input
              id="terminal-command-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Tab") {
                  event.preventDefault();
                  handleTab();
                }
              }}
              aria-label="Terminal command input"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="type 'help' for commands"
              className="w-full bg-transparent font-mono text-xs text-beige caret-beige outline-none placeholder:text-beige/40 selection:bg-mainGreen/30 selection:text-beige"
            />
          </form>
        </div>

        <div className="flex flex-wrap gap-2">
          {GROUPS.slice(0, 3).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => runPreset(category)}
              className="min-h-[44px] rounded-full border border-beige/20 bg-beige/5 px-3 py-1 font-mono text-xs text-beige/80 transition-colors duration-200 hover:bg-beige/10"
            >
              $ inspect --{category}
            </button>
          ))}
          <button
            type="button"
            onClick={() => runPreset("clear")}
            className="min-h-[44px] rounded-full border border-beige/20 bg-beige/5 px-3 py-1 font-mono text-xs text-beige/80 transition-colors duration-200 hover:bg-beige/10"
          >
            $ clear
          </button>
        </div>
      </div>
    </div>
  );
}
