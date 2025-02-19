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
        <SiTypescript />,
        <SiNextdotjs />,
        <SiTailwindcss />,
        <SiNodedotjs />,
        <SiExpress />,
        <SiPostgresql />,
        <SiSupabase />,
      ],
    },
    {
      title: "front-end developer",
      company: "coins for change vietnam",
      companyUrl: "https://www.catalystforchangevietnam.com/",
      period: "sep 2019 - Mar 2020",
      description:
        "I was a member of the volunteers. developing the organization's website through CMS WIX. redesigning the layout of the website.",
      technologies: [<SiHtml5 />, <SiJavascript />, <SiCss3 />],
    },
  ];

  return (
    <section
      id="experiences"
      className={`flex flex-col justify-start text-white py-20 ${inika.className} backdrop-blur`}
    >
      {/* Background circles */}
      <div className="absolute top-[0%] left-[15%] w-[200px] h-[200px] rounded-full bg-[#8DA55B] opacity-20 blur-[20px] -z-10" />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold text-[#8DA55B] mb-32">Experiences</h2>
        <div className="ml-4">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
