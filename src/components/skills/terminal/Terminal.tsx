"use client";

import type {
  CommandGroup,
  EntryDraft,
  HistoryEntry,
  SkillCategoryId,
  TelemetryPayload,
} from "@/definitions";
import { HISTORY_LIMIT } from "@/definitions";
import { useSelectSkill, useSelectedSkillId } from "@/stores/skillsLabStore";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  completeInspectToken,
  executeCommand,
  findSkillById,
  parseCommand,
} from "./cli";
import { PresetQuickRun } from "./PresetQuickRun";
import { SkillCatalog } from "./SkillCatalog";
import { StreamView, type RevealSignal } from "./StreamView";
import { TerminalHeader } from "./TerminalHeader";

/** Developer terminal — dual pane with a live in-memory CLI. */
export default function Concept012() {
  const selectedSkillId = useSelectedSkillId();
  const selectSkill = useSelectSkill();
  // A carried-over selection is inspected once, at first render.
  const [initialRun] = useState(() => {
    const skill = selectedSkillId ? findSkillById(selectedSkillId) : undefined;
    if (!skill) {
      return {
        history: [] as CommandGroup[],
        telemetry: null as TelemetryPayload | null,
      };
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
  const [reveal, setReveal] = useState<RevealSignal | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const revealNonceRef = useRef(0);
  const groupIdRef = useRef(0);
  const entryIdRef = useRef(0);
  const copyResetRef = useRef<number | undefined>(undefined);
  const tabCandidatesRef = useRef<{
    input: string;
    candidates: string[];
  } | null>(null);

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

  const revealGroup = (groupId: number) => {
    revealNonceRef.current += 1;
    setReveal({ groupId, nonce: revealNonceRef.current });
  };

  const echoTextOf = (group: CommandGroup | undefined) => {
    const first = group?.entries[0];
    return first?.kind === "echo" ? first.text : null;
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
    // Output already in the stream? Surface it instead of stacking a copy.
    const existing = history.find((group) => echoTextOf(group) === text);
    if (existing) {
      revealGroup(existing.id);
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
      copyResetRef.current = window.setTimeout(
        () => setCopyState("idle"),
        1500,
      );
    }
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.2fr]">
      <SkillCatalog
        selectedSkillId={selectedSkillId}
        onInspect={(id) => runInput(`inspect ${id}`)}
      />

      <div className="flex flex-col gap-3 lg:sticky lg:top-28">
        <div
          onMouseDown={steerFocus}
          className="overflow-hidden rounded-xl border border-beige/20 bg-bgGreen/85 shadow-[0_8px_32px_rgba(22,26,25,0.5)] backdrop-blur-md"
        >
          <TerminalHeader
            copyLabel={copyState === "copied" ? "copied ✓" : "Copy JSON"}
            onCopy={copyLatestJson}
          />
          <StreamView history={history} reveal={reveal} />
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
              className="w-full min-h-[44px] bg-transparent font-mono text-xs text-beige caret-beige outline-none focus:outline-none placeholder:text-beige/40 selection:bg-mainGreen/30 selection:text-beige motion-reduce:[caret-blink:0]"
            />
          </form>
        </div>

        <PresetQuickRun onRun={runPreset} />
      </div>
    </div>
  );
}
