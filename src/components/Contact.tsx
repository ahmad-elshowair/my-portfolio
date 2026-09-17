import { FaGithub } from "react-icons/fa";
import { FiLinkedin, FiMail } from "react-icons/fi";
import { inika } from "@/lib/fonts";
import Link from "next/link";

/**
 * Contact destination — every channel the resume publishes, rendered with
 * its exact published string (the strings below are contract-frozen; any
 * change must re-verify against the canonical resume).
 */
const Contact = () => {
  return (
    <section className="py-20 backdrop-blur-sm" id="contact">
      <div className="max-w-5xl mx-auto relative">
        {/* Background accent drop */}
        <span
          aria-hidden="true"
          className="absolute w-40 h-40 md:w-52 md:h-52 top-[-5%] left-[-5%] md:top-[-12%] md:-left-[5%] rounded-full bg-mainGreen opacity-20 blur-[20px] -z-10"
        />

        <div className="flex items-baseline gap-5 mb-32">
          <h2
            className={`text-4xl md:text-6xl font-bold text-mainGreen ${inika.className}`}
          >
            contact
          </h2>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="h-3 rounded-lg bg-beige w-[40px]" />
            <span className="h-3 rounded-lg bg-beige w-[25px]" />
            <span className="h-3 rounded-lg bg-mainGreen w-[12px]" />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <p className="text-base md:text-lg text-beige/90">
            Open to remote full-stack and front-end roles — say hello.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="mailto:ahmad-elshowair.dev@outlook.com"
              className="flex items-center gap-2 text-lg text-mainGreen hover:text-beige transition-colors duration-200 ease-in-out"
            >
              <FiMail aria-hidden="true" />
              <span className="break-all">ahmad-elshowair.dev@outlook.com</span>
            </a>
            <Link
              href="https://github.com/ahmad-elshowair"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-mainGreen hover:text-beige transition-colors duration-200 ease-in-out"
            >
              <FaGithub aria-hidden="true" />
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/ahmad-elshowair"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-mainGreen hover:text-beige transition-colors duration-200 ease-in-out"
            >
              <FiLinkedin aria-hidden="true" />
              LinkedIn
            </Link>
          </div>

          <p className="text-sm text-beige/80 md:text-base">
            Hanoi, Vietnam · available remote worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
