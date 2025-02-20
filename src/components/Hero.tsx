"use client";
import { inika } from "@/lib/fonts";
import Link from "next/link";
import { FiDownloadCloud } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section
      id="me"
      className={`flex flex-col justify-center max-w-5xl mx-auto min-h-[calc(100vh-112px)] space-y-4 ${inika.className} backdrop-blur`}
    >
      {/* BACKGROUND DROP NAME*/}
      <span className="absolute left-0 top-10 md:top-[6%] md:-left-[5%] h-40 w-40 md:w-[300px] md:h-[300px] rounded-full bg-mainGreen opacity-20 blur-[20px] -z-10" />

      {/* BACKGROUND DROP BUTTON*/}
      <span className="absolute bottom-0 right-0 h-40 w-40 md:bottom-[10%] md:right-[10%] md:w-[200px] md:h-[200px] rounded-full bg-mainGreen opacity-20 blur-[20px] -z-10" />

      <article className="flex flex-col self-start mb-18">
        <h1 className="text-base md:text-3xl font-bold text-beige">
          Hi There !
        </h1>
        <div className="text-4xl md:text-5xl font-bold">
          <span className="text-beige">I&apos;m </span>
          <TypeAnimation
            sequence={[
              "Ahmad Elshowair",
              2000,
              "font-end developer",
              2000,
              "back-end developer",
              2000,
              "full stack developer",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-green-500"
          />
        </div>
      </article>

      <article className="flex flex-col">
        <p className="text-sm md:text-xl text-mainGreen mt-12 self-start  tracking-wide z-10">
          A Developer specializing in{" "}
          <span className="zigzag-border px-1">Next.js</span>,{" "}
          <span className="zigzag-border px-1">React</span>, and{" "}
          <span className="zigzag-border px-1">TypeScript</span>, with expertise
          in <span className="zigzag-border px-1">JavaScript</span>,{" "}
          <span className="zigzag-border px-1">Node.js</span>,{" "}
          <span className="zigzag-border px-1">PostgreSQL</span>, and modern web
          architectures. Certified through{" "}
          <span className="zigzag-border px-1">Harvard&apos;s CS50</span> and
          Udacity&apos;s Advanced Full Stack/Front-End Nanodegrees, with
          hands-on experience building scalable applications.
        </p>
        <Link
          href="https://ioytezgkjmzpfcwaxqcj.supabase.co/storage/v1/object/public/portfolio/files/ahmad_elshowair_resume_pic.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center self-end bg-green-500 text-beige px-8 py-3 rounded-2xl  font-semibold mt-20 hover:text-bgGreen hover:bg-green-600 hover:scale-90 transition-all duration-300 ease-in-out gap-2"
        >
          resume
          <FiDownloadCloud />
        </Link>
      </article>
    </section>
  );
};

export default Hero;
