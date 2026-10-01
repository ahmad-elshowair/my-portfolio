"use client";

export function TerminalHeader({
  copyLabel,
  onCopy,
}: {
  copyLabel: string;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-beige/10 px-4 py-2.5">
      <span className="h-3 w-3 rounded-full bg-beige/30" aria-hidden="true" />
      <span className="h-3 w-3 rounded-full bg-beige/30" aria-hidden="true" />
      <span className="h-3 w-3 rounded-full bg-beige/30" aria-hidden="true" />
      <span className="ml-2 font-mono text-xs text-beige/70">
        ahmad@stack:~ (zsh - 80x24)
      </span>
      <button
        type="button"
        onClick={onCopy}
        className="ml-auto min-h-[44px] rounded-md border border-beige/20 bg-beige/5 px-3 font-mono text-xs text-beige/80 transition-colors duration-200 hover:bg-beige/10"
      >
        {copyLabel}
      </button>
    </div>
  );
}
