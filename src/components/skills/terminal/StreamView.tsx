"use client";

import type { CommandGroup, HistoryEntry } from "@/definitions";
import { SKILL_CATEGORIES } from "@/data";
import { usePrefersReducedMotion } from "@/hooks";
import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TelemetryBlock } from "./TelemetryBlock";

/** Identity of a group to surface; the nonce re-triggers repeats. */
export interface RevealSignal {
  groupId: number;
  nonce: number;
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
    case "help":
      return (
        <div className="flex flex-col gap-2 pl-2">
          <p className="text-beige/60">available commands:</p>
          <dl className="flex flex-col gap-1.5 lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-8 lg:gap-y-1">
            {entry.rows.map((row) => (
              <Fragment key={row.command}>
                <dt className="whitespace-nowrap text-beige">{row.command}</dt>
                <dd className="text-beige/60">{row.description}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
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

export function StreamView({
  history,
  reveal,
  fitContainer = false,
}: {
  history: CommandGroup[];
  reveal: RevealSignal | null;
  /** In the mobile dock the stream fills the leftover panel height. */
  fitContainer?: boolean;
}) {
  const streamRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [flashId, setFlashId] = useState<number | null>(null);

  useEffect(() => {
    const stream = streamRef.current;
    if (!stream) return;
    stream.scrollTo({
      top: stream.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [history, reduceMotion]);

  // Surface a group: scroll it into view and pulse it once.
  useEffect(() => {
    if (!reveal) return;
    const stream = streamRef.current;
    const target = stream?.querySelector<HTMLElement>(
      `[data-group-id="${reveal.groupId}"]`,
    );
    if (!stream || !target) return;
    // Rect-relative math — offsetTop would silently break if a positioned
    // ancestor ever sat between the stream and its groups.
    const streamRect = stream.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    stream.scrollTo({
      top: Math.max(0, stream.scrollTop + targetRect.top - streamRect.top - 8),
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setFlashId(reveal.groupId);
    const reset = window.setTimeout(() => setFlashId(null), 700);
    return () => window.clearTimeout(reset);
  }, [reveal, reduceMotion]);

  return (
    <div
      ref={streamRef}
      role="region"
      aria-label="Terminal output"
      aria-live="polite"
      tabIndex={0}
      className={cn(
        "flex flex-col gap-3 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed text-beige/90 sm:text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-beige/20",
        fitContainer ? "min-h-0 flex-1 px-4 py-3 pr-14" : "max-h-96 min-h-[16rem]",
      )}
    >
      {/* Empty state welcome message */}
      {history.length === 0 ? (
        <div className="flex flex-col gap-1 py-1 font-mono text-[11px] text-beige/50 sm:text-xs">
          <p>
            <span className="text-mainGreen">$</span> ahmad.init()
          </p>
          <p className="text-beige/40">
            terminal ready: zsh (interactive)
          </p>
          <p className="text-beige/40">
            hint: tap a skill card above, or type <span className="text-beige/60">&apos;help&apos;</span> below
          </p>
        </div>
      ) : null}

      {/* command history */}
      {history.map((group) => (
        <div
          key={group.id}
          data-group-id={group.id}
          className={cn(
            "flex flex-col gap-1 rounded-lg px-2 -mx-2 transition-colors duration-500",
            !reduceMotion && "animate-in fade-in duration-150",
            flashId === group.id && "bg-mainGreen/15",
          )}
        >
          {group.entries.map((entry) => (
            <EntryView key={entry.id} entry={entry} />
          ))}
        </div>
      ))}
    </div>
  );
}
