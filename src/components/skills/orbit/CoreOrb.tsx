"use client";

import { AUTHOR } from "@/lib/site";

/** Central gravitational anchor displaying the author's name and role. */
export function CoreOrb() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(141,165,91,0.14)_0%,transparent_70%)] blur-2xl"
      />
      <div className="pointer-events-none select-none absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-beige/15 bg-mainGreen/10 text-center shadow-[0_0_25px_rgba(141,165,91,0.25)] backdrop-blur-md">
        <span className="font-inika text-sm font-bold text-mainGreen leading-tight">
          {AUTHOR.name}
        </span>
        <span className="px-2 text-[9.5px] leading-snug text-beige/80">
          {AUTHOR.role}
        </span>
      </div>
    </>
  );
}
