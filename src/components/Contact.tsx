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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading, Invitation & Availability */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-baseline gap-3 sm:gap-5 mb-6 sm:mb-8">
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-mainGreen ${inika.className}`}
              >
                contact
              </h2>
              <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
                <span className="h-2.5 sm:h-3 rounded-lg bg-beige w-[30px] sm:w-[40px]" />
                <span className="h-2.5 sm:h-3 rounded-lg bg-beige w-[18px] sm:w-[25px]" />
                <span className="h-2.5 sm:h-3 rounded-lg bg-mainGreen w-[10px] sm:w-[12px]" />
              </div>
            </div>

            <p className="text-base sm:text-lg text-beige/90 leading-relaxed">
              Open to remote full-stack and front-end roles — say hello.
            </p>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-beige/80">
              Hanoi, Vietnam · available remote worldwide
            </p>
          </div>

          {/* Right Column: Contact Channels */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <a
              href="mailto:ahmad-elshowair.dev@outlook.com"
              className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-beige/15 bg-bgGreen/40 text-mainGreen hover:text-beige hover:border-mainGreen/60 hover:bg-beige/5 transition-all duration-200"
            >
              <FiMail className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" aria-hidden="true" />
              <span className="text-sm sm:text-base font-medium break-all">
                ahmad-elshowair.dev@outlook.com
              </span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="https://github.com/ahmad-elshowair"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-3 p-4 sm:p-5 rounded-2xl border border-beige/15 bg-bgGreen/40 text-mainGreen hover:text-beige hover:border-mainGreen/60 hover:bg-beige/5 transition-all duration-200 text-base sm:text-lg font-medium"
              >
                <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" aria-hidden="true" />
                <span>GitHub</span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/ahmad-elshowair"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-3 p-4 sm:p-5 rounded-2xl border border-beige/15 bg-bgGreen/40 text-mainGreen hover:text-beige hover:border-mainGreen/60 hover:bg-beige/5 transition-all duration-200 text-base sm:text-lg font-medium"
              >
                <FiLinkedin className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" aria-hidden="true" />
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
