import AnimatedRole from "@/components/AnimatedRole";
import { FiDownloadCloud } from "react-icons/fi";
import { geistSans, inika } from "@/lib/fonts";

/**
 * Identity section (#me) — name, role line, positioning copy, and the
 * resume CTAs. A Server Component by design the animated role line is the
 * section's only client island.
 */
const Hero = () => {
  return (
    <section
      id="me"
      tabIndex={-1}
      className={`relative mx-auto flex w-full max-w-5xl flex-col gap-8 py-16 md:py-24 ${inika.className}`}
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

      <h1 className="flex flex-col gap-2">
        <span className="text-3xl font-bold text-beige md:text-5xl">
          Ahmad Elshowair
        </span>
        <span className="min-h-[1.875rem] text-xl font-semibold text-mainGreen md:min-h-[2.625rem] md:text-3xl">
          <AnimatedRole />
        </span>
      </h1>

      <div className={`flex flex-col gap-6 ${geistSans.className}`}>
        <p className="w-full text-sm tracking-wide text-beige/90 md:text-base lg:text-lg">
          Full-stack developer with{" "}
          <span className="zigzag-border px-1">
            3+ years of remote experience
          </span>{" "}
          building billing, POS, and PWA products — bilingual English/Arabic
          interfaces, at home in async remote-first teams. Harvard CS50 and
          Udacity Nanodegree certified.
        </p>
        <div className="flex flex-wrap gap-2 text-sm text-mainGreen">
          {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
            <span key={tech} className="zigzag-border px-1">
              {tech}
            </span>
          ))}
        </div>
        <p className="text-sm text-beige/80 md:text-base">
          Hanoi, Vietnam · available remote worldwide
        </p>

        <div className="flex flex-wrap items-center justify-end gap-4">
          <a
            href="/files/ahmad_elshowair_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-mainGreen px-8 py-3 font-semibold text-bgGreen transition-all duration-200 ease-in-out hover:brightness-95"
          >
            Resume
            <FiDownloadCloud aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
