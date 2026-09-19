"use client";

import {
  FiCheck,
  FiCopy,
  FiDownloadCloud,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { inika } from "@/lib/fonts";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const EMAIL = "ahmad-elshowair.dev@outlook.com";
const COPY_RESET_MS = 2000;
type CopyState = "idle" | "copied" | "failed";

/**
 * Contact destination — direct conversion channels only (email, LinkedIn)
 * plus the resume asset; the strings below are contract-frozen and any change
 * must re-verify against the canonical resume. GitHub deliberately lives in
 * the Projects section and on project cards, not here.
 */
const Contact = () => {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const copyReset = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancel a pending feedback reset if the section unmounts mid-feedback.
  useEffect(
    () => () => {
      if (copyReset.current) clearTimeout(copyReset.current);
    },
    [],
  );

  const copyEmail = async () => {
    let next: CopyState = "failed";
    try {
      await navigator.clipboard.writeText(EMAIL);
      next = "copied";
    } catch {
      // The Clipboard API requires a secure context (HTTPS or localhost —
      // both guaranteed on this site); the visible address above stays
      // selectable as the manual fallback.
    }

    setCopyState(next);
    if (copyReset.current) clearTimeout(copyReset.current);
    copyReset.current = setTimeout(() => setCopyState("idle"), COPY_RESET_MS);
  };

  return (
    <section className="py-16 sm:py-24 backdrop-blur-sm" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Background accent drops */}
        <span
          aria-hidden="true"
          className="absolute w-40 h-40 md:w-56 md:h-56 top-[-5%] left-[-5%] md:top-[-10%] md:-left-[5%] rounded-full bg-mainGreen opacity-20 blur-[25px] -z-10"
        />
        <span
          aria-hidden="true"
          className="absolute w-44 h-44 bottom-[-10%] right-[-5%] rounded-full bg-mainGreen opacity-15 blur-[30px] -z-10"
        />

        <div className="rounded-3xl  bg-bgGreen/40 backdrop-blur-md shadow-lg p-6 sm:p-8 md:p-10">
          <div className="flex items-baseline gap-3 sm:gap-5 mb-4 sm:mb-6">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold text-mainGreen ${inika.className}`}
            >
              contact
            </h2>
            <div
              className="flex items-center gap-1 shrink-0"
              aria-hidden="true"
            >
              <span className="h-2.5 sm:h-3 rounded-lg bg-beige w-[30px] sm:w-[40px]" />
              <span className="h-2.5 sm:h-3 rounded-lg bg-beige w-[18px] sm:w-[25px]" />
              <span className="h-2.5 sm:h-3 rounded-lg bg-mainGreen w-[10px] sm:w-[12px]" />
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-semibold text-beige">
            Let&rsquo;s build something together.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-mainGreen/40 bg-mainGreen/10 px-4 py-1.5 text-sm text-mainGreen font-medium">
              <span
                className="h-2.5 w-2.5 rounded-full bg-mainGreen motion-safe:animate-pulse"
                aria-hidden="true"
              />
              Open to remote full-stack and front-end roles
            </span>
            <span className="text-sm sm:text-base text-beige/80">
              Hanoi, Vietnam · available remote worldwide
            </span>
          </div>

          {/* Email — primary channel: mailto plus one-click copy */}
          <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:flex-row sm:items-center rounded-2xl border border-mainGreen/40 bg-mainGreen/10 p-4 sm:p-5">
            <a
              href={`mailto:${EMAIL}`}
              className="flex min-w-0 items-center gap-3 sm:gap-4 text-mainGreen transition-colors duration-200 hover:text-beige"
            >
              <FiMail
                className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
                aria-hidden="true"
              />
              <span className="text-sm sm:text-base font-medium break-all">
                {EMAIL}
              </span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center justify-center gap-2 rounded-xl bg-mainGreen px-5 py-2.5 text-sm font-semibold text-bgGreen transition-all duration-200 ease-in-out hover:brightness-95 sm:ml-auto sm:shrink-0"
            >
              {copyState === "copied" ? (
                <FiCheck className="w-4 h-4" aria-hidden="true" />
              ) : (
                <FiCopy className="w-4 h-4" aria-hidden="true" />
              )}
              {copyState === "copied"
                ? "Copied!"
                : copyState === "failed"
                  ? "Copy failed"
                  : "Copy Email"}
            </button>
            <span role="status" className="sr-only">
              {copyState === "copied"
                ? "Email address copied to clipboard"
                : copyState === "failed"
                  ? "Copy failed — select the address to copy it manually"
                  : ""}
            </span>
          </div>

          {/* Secondary channels: LinkedIn and the resume asset */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="https://www.linkedin.com/in/ahmad-elshowair"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-3 p-4 sm:p-5 rounded-2xl border border-beige/15 bg-bgGreen/40 text-mainGreen hover:text-beige hover:border-mainGreen/60 hover:bg-beige/5 transition-all duration-200 text-base sm:text-lg font-medium"
            >
              <FiLinkedin
                className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
                aria-hidden="true"
              />
              <span>Connect on LinkedIn</span>
            </Link>

            <a
              href="/files/ahmad_elshowair_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-3 p-4 sm:p-5 rounded-2xl border border-beige/15 bg-bgGreen/40 text-mainGreen hover:text-beige hover:border-mainGreen/60 hover:bg-beige/5 transition-all duration-200 text-base sm:text-lg font-medium"
            >
              <FiDownloadCloud
                className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
                aria-hidden="true"
              />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
