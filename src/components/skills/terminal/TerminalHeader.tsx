"use client";

import { CopyAction, type CopyActionProps } from "./CopyAction";

export function TerminalHeader({
  copyState,
  onCopy,
}: {
  copyState: CopyActionProps["copyState"];
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-beige/10 px-4 py-2.5">
      <span
        className="h-2.5 w-2.5 rounded-full bg-beige/30 sm:h-3 sm:w-3"
        aria-hidden="true"
      />
      <span
        className="hidden h-3 w-3 rounded-full bg-beige/30 lg:block"
        aria-hidden="true"
      />
      <span
        className="hidden h-3 w-3 rounded-full bg-beige/30 lg:block"
        aria-hidden="true"
      />
      <span className="ml-2 min-w-0 flex-1 truncate font-mono text-[10px] text-beige/70 sm:text-xs">
        ahmad@stack:~ (zsh - 80x24)
      </span>
      <div className="ml-auto">
        <CopyAction copyState={copyState} onCopy={onCopy} />
      </div>
    </div>
  );
}
