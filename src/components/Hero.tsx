import AnimatedRole from "@/components/AnimatedRole";
import { FiDownloadCloud } from "react-icons/fi";
import { geistSans, inika } from "@/lib/fonts";
import { AUTHOR } from "@/lib/site";
/**
 * Identity section (#me) — name, role line, positioning copy, PointCraft proof
 * card, tech stack, and primary CTAs.
 *
 * A Server Component by design; the animated role line is the section's only
 * client island. The min-height leaves the heading block of the experience
 * section peeking into the first viewport (a content-driven scroll hint).
 */
const Hero = () => {
  return (
    <section
      id="me"
      tabIndex={-1}
      className={`relative mx-auto flex w-full max-w-5xl flex-col justify-center gap-8 py-10 md:py-16 min-h-[calc(100svh_-_14.5rem)] ${inika.className}`}
    >
      {/* Blurred accent drops — existing identity, repositioned */}
      <span
        aria-hidden="true"
        className="absolute left-[-20%] top-[10%] -z-10 h-48 w-48 rounded-full bg-mainGreen opacity-20 blur-[20px] md:-left-[5%] md:h-[300px] md:w-[300px]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-[10%] right-[-5%] -z-10 h-44 w-52 rounded-full bg-mainGreen opacity-20 blur-[20px]"
      />

      {/* Group 1: Identity & Availability */}
      <div className="flex flex-col gap-3">
        <h1 className="flex flex-col gap-1.5">
          <span className="text-3xl font-bold text-beige sm:text-4xl md:text-5xl">
            {AUTHOR.name}
          </span>
          <span className="min-h-[1.875rem] text-xl font-semibold text-mainGreen sm:text-2xl md:min-h-[2.625rem] md:text-3xl">
            <AnimatedRole />
          </span>
        </h1>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-mainGreen/40 bg-mainGreen/10 px-3.5 py-1 text-xs sm:text-sm font-medium text-mainGreen backdrop-blur-md">
            <span
              className="h-2 w-2 rounded-full bg-mainGreen motion-safe:animate-pulse"
              aria-hidden="true"
            />
            Open to remote roles
          </span>
          <span className="text-xs sm:text-sm text-beige/80">
            {AUTHOR.location.city} , {AUTHOR.location.country} · available
            remote worldwide
          </span>
        </div>
      </div>

      {/* Group 2: Value Narrative & PointCraft Impact Micro-Card */}
      <div className={`flex flex-col gap-4 ${geistSans.className}`}>
        <p className="w-full text-sm leading-relaxed tracking-wide text-beige/90 sm:text-base md:text-lg">
          Full-stack developer with{" "}
          <span className="zigzag-border px-1">
            3+ years of remote experience
          </span>{" "}
          shipping billing, POS, and payments platforms — accessible React front
          ends, security-hardened Node back ends, and bilingual English/Arabic
          PWAs for international clients. Harvard CS50 and Udacity certified.
        </p>

        {/* Proof Micro-Card: PointCraft & Merchants Metric */}
        <div className="flex items-center gap-3 rounded-2xl  bg-bgGreen/50 p-3.5 sm:p-4 backdrop-blur-3xl shadow shadow-black/40">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mainGreen opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mainGreen" />
          </span>
          <p className="text-xs sm:text-sm text-beige/90 leading-snug">
            <span className="font-semibold text-beige">
              Currently at PointCraft
            </span>{" "}
            — shipping POS and invoice tools used daily by{" "}
            <span className="font-semibold text-mainGreen">30+ merchants</span>.
          </p>
        </div>

        {/* Group 3: Core Stack & Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-1 text-sm text-mainGreen">
          {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
            <span
              key={tech}
              className="zigzag-border px-1.5 py-0.5 text-xs sm:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-end pt-3">
          <a
            href="/files/ahmad_elshowair_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-mainGreen px-8 py-3.5 font-semibold text-bgGreen transition-all duration-200 ease-in-out hover:brightness-95 active:scale-95 w-full sm:w-auto shadow-md"
          >
            <span>Resume</span>
            <FiDownloadCloud className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
