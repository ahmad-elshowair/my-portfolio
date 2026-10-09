import ExperienceItem from "./ExperienceItem";
import { inika } from "@/lib/fonts";
import React from "react";
import { experiences } from "@/data";

const Experiences: React.FC = () => {
  return (
    <section
      id="experience"
      className={`flex flex-col justify-start py-20 ${inika.className} backdrop-blur`}
    >
      <article className="max-w-5xl mx-auto relative">
        <div className="flex items-baseline gap-5 mb-32">
          <h2 className="relative isolate text-4xl md:text-5xl font-bold text-mainGreen">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-44 w-44 rounded-full bg-mainGreen opacity-20 blur-[28px] md:h-52 md:w-52"
            />
            experience
          </h2>
          <div className="flex items-center gap-1">
            <span className="h-3 rounded-lg bg-beige w-[40px]" />
            <span className="h-3 rounded-lg bg-beige w-[25px]" />
            <span className="h-3 rounded-lg bg-mainGreen w-[12px]" />
          </div>
        </div>
        <div className="ml-4">
          {experiences.map((exp) => (
            <ExperienceItem key={`${exp.company}-${exp.period}`} {...exp} />
          ))}
        </div>
      </article>
    </section>
  );
};

export default Experiences;
