"use client";
import HighLightText from "@/components/HighLightText";
import { inika } from "@/lib/fonts";
import Link from "next/link";
import { FiDownloadCloud } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section
      className={`flex flex-col justify-center max-w-5xl mx-auto min-h-[calc(100vh-112px)] space-y-4 ${inika.className}`}
    >
      <article className="flex flex-col self-start mb-14">
        <h1 className="text-4xl md:text-3xl font-bold mb-4">Hi There !</h1>
        <div className="text-3xl md:text-5xl font-bold">
          <span>I'm </span>
          <TypeAnimation
            sequence={[
              "Ahmad Elshowair",
              2000,
              "Font-End Developer",
              2000,
              "Back-End Developer",
              2000,
              "a Full Stack Developer",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-[#3AA037]"
          />
        </div>
      </article>

      <article className="flex flex-col">
        <p className="text-lg md:text-xl text-[#8DA55B] mt-12 self-start leading-6 tracking-wide z-10">
          A Developer specializing in <HighLightText>Next.js</HighLightText>,{" "}
          <HighLightText>React</HighLightText>, and{" "}
          <HighLightText>TypeScript</HighLightText>, with expertise in{" "}
          <HighLightText>JavaScript</HighLightText>,{" "}
          <HighLightText>Node.js</HighLightText>,{" "}
          <HighLightText>PostgreSQL</HighLightText>, and modern web
          architectures. Certified through{" "}
          <HighLightText>Harvard's CS50</HighLightText> and Udacity's Advanced
          Full Stack/Front-End Nanodegrees, with hands-on experience building
          scalable applications.
        </p>
        <Link
          href="https://ioytezgkjmzpfcwaxqcj.supabase.co/storage/v1/object/public/portfolio/files/ahmad_elshowair_resume_pic.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#8DA55B]/80 text-white px-8 py-3 rounded-lg mt-6 hover:bg-[#8DA55B] hover:scale-125 transition-all duration-300 ease-in-out self-end flex items-center gap-1"
        >
          <FiDownloadCloud />
          Resume
        </Link>
      </article>
    </section>
  );
};

export default Hero;
