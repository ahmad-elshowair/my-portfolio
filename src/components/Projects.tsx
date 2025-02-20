import ProjectCard from "@/components/ProjectCard";
import { inika } from "@/lib/fonts";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const Projects = () => {
  const projects = [
    {
      title: "ClearCargo",
      technologies: [
        <SiReact key="react" />,
        <SiNextdotjs key="next" />,
        <SiTypescript key="ts" />,
        <SiTailwindcss key="tailwind" />,
      ],
      link: "#",
      githubUrl: "#",
      images: [
        {
          url: "/images/clearcargo-1.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-2.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-3.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-4.png",
          alt: "ClearCargo ",
        },
      ],
    },
    {
      title: "Project Two",
      technologies: [
        <SiReact key="react" />,
        <SiNextdotjs key="next" />,
        <SiTypescript key="ts" />,
        <SiTailwindcss key="tailwind" />,
      ],
      link: "#",
      githubUrl: "#",
      images: [
        {
          url: "/images/clearcargo-1.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-2.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-3.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-4.png",
          alt: "ClearCargo ",
        },
      ],
    },
    {
      title: "Project Three",
      technologies: [
        <SiReact key="react" />,
        <SiNextdotjs key="next" />,
        <SiTypescript key="ts" />,
        <SiTailwindcss key="tailwind" />,
      ],
      link: "#",
      githubUrl: "#",
      images: [
        {
          url: "/images/clearcargo-1.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-2.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-3.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-4.png",
          alt: "ClearCargo ",
        },
      ],
    },
    {
      title: "Project Four",
      technologies: [
        <SiReact key="react" />,
        <SiNextdotjs key="next" />,
        <SiTypescript key="ts" />,
        <SiTailwindcss key="tailwind" />,
      ],
      link: "#",
      githubUrl: "#",
      images: [
        {
          url: "/images/clearcargo-1.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-2.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-3.png",
          alt: "ClearCargo ",
        },
        {
          url: "/images/clearcargo-4.png",
          alt: "ClearCargo ",
        },
      ],
    },
  ];

  return (
    <section className="py-20 backdrop-blur-sm" id="projects">
      <div className="max-w-5xl mx-auto relative">
        {/* BACKGROUND DROP NAME*/}
        <span className="absolute top-[-5%] left-[-5%] md:top-[-6%] md:-left-[5%] w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-mainGreen opacity-20 blur-[20px] -z-10" />
        <div className="flex items-baseline gap-5 mb-32">
          <h2
            className={`text-4xl md:text-6xl font-bold text-mainGreen ${inika.className}`}
          >
            projects
          </h2>
          <div className="flex items-center gap-1">
            <span className="h-3 rounded-lg bg-beige w-[40px]" />
            <span className="h-3 rounded-lg bg-beige w-[25px]" />
            <span className="h-3 rounded-lg bg-mainGreen w-[12px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="https://github.com/ahmad-elshowair"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-beige hover:text-mainGreen transition-colors group"
          >
            <span className="text-2xl font-medium">more on</span>
            <FaGithub className="text-3xl group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
