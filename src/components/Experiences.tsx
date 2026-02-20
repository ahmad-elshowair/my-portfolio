import ExperienceItem from "@/components/ExperienceItem";
import { inika } from "@/lib/fonts";
import React from "react";
import { experiences } from "@/data/portfolioData";

const Experiences: React.FC = () => {
  return (
    <section
      id="experience"
      className={`flex flex-col justify-start text-white py-20 ${inika.className} backdrop-blur`}
    >
      <article className="max-w-5xl mx-auto relative">
        {/* Background DROP CIRCLE */}
        <span className="absolute w-40 h-40 md:w-52 md:h-52 top-[-5%] left-[-5%] md:top-[-12%] md:-left-[5%] lg:left-[-5%] lg:top-[-12%] xl:left-[-5%] xl:top-[-12%] rounded-full bg-mainGreen opacity-20 blur-[20px] -z-10" />
        <div className="flex items-baseline gap-5 mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-mainGreen">
            experience
          </h2>
          <div className="flex items-center gap-1">
            <span className="h-3 rounded-lg bg-beige w-[40px]" />
            <span className="h-3 rounded-lg bg-beige w-[25px]" />
            <span className="h-3 rounded-lg bg-mainGreen w-[12px]" />
          </div>
        </div>
        <div className="ml-4">
          {experiences.map((exp, index) => (
            <ExperienceItem key={`exp-${index}`} {...exp} />
          ))}
        </div>
      </article>
    </section>
  );
};

export default Experiences;
