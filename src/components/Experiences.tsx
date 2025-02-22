import ExperienceItem from "@/components/ExperienceItem";
import { inika } from "@/lib/fonts";
import React from "react";
import {
  SiCss3,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const Experiences: React.FC = () => {
  const experiences = [
    {
      title: "full-stack developer",
      company: "remotely",
      period: "april 2020 - present",
      description:
        "I work with different clients across freelancing platforms or offline to implement projects, according to my experience as a full-stack | front-end | back-end developer, Developed Kun Mim Aldhaakirin, A PWA for Islamic daily remembrance. Built a full-stack customs clearance platform ClearCarGo with secure-auth and role-based access and payment gateway Stripe. Built Task, a full-stack task management system including secure-auth and role-based access.",
      projects: [
        {
          name: "Kun Mim Aldhaakirin",
          url: "https://kun-min-aldhaakirin.vercel.app",
        },
        {
          name: "ClearCarGo",
          url: "https://clearcargo.vercel.app/",
        },
        {
          name: "Task",
          url: "https://github.com/ahmad-elshowair/next-tasks",
        },
      ],
      technologies: [
        <SiTypescript key="typescript" />,
        <SiNextdotjs key="nextjs" />,
        <SiTailwindcss key="tailwind" />,
        <SiNodedotjs key="nodejs" />,
        <SiExpress key="express" />,
        <SiPostgresql key="postgresql" />,
        <SiSupabase key="supabase" />,
      ],
    },
    {
      title: "web developer",
      company: "coins for change vietnam",
      companyUrl: "https://www.catalystforchangevietnam.com/",
      period: "sep 2019 - Mar 2020",
      description:
        "I was a member of the volunteers. developing the organization's website through CMS WIX. redesigning the layout of the website.",
      technologies: [
        <SiHtml5 key="html5" />,
        <SiJavascript key="javascript" />,
        <SiCss3 key="css3" />,
      ],
    },
  ];

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
