"use client";

import type { CommandGroup, HistoryEntry } from "@/definitions";
import { SKILL_CATEGORIES } from "@/data";
import { usePrefersReducedMotion } from "@/hooks";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { TelemetryBlock } from "./TelemetryBlock";

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

export function StreamView({ history }: { history: CommandGroup[] }) {
  const streamRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const stream = streamRef.current;
    if (!stream) return;
    stream.scrollTo({
      top: stream.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [history, reduceMotion]);

  return (
    <div
      ref={streamRef}
      role="region"
      aria-label="Terminal output"
      aria-live="polite"
      tabIndex={0}
      className="flex max-h-96 min-h-[16rem] flex-col gap-3 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-beige/90 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-beige/20"
    >
      <p>
        <span className="text-mainGreen">$</span>{" "}
        ahmad.inspectStack() --role=&quot;Full-Stack Developer&quot;
      </p>
      {history.map((group) => (
        <div
          key={group.id}
          className={cn(
            "flex flex-col gap-1",
            !reduceMotion && "animate-in fade-in duration-150",
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
