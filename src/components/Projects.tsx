import ProjectCard from "@/components/ProjectCard";
import { inika } from "@/lib/fonts";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/portfolioData";

export const Projects = () => {
  return (
    <section className="py-20 backdrop-blur-sm" id="projects">
      <div className="max-w-5xl mx-auto relative">
        {/* BACKGROUND DROP NAME*/}
        <span className="absolute w-40 h-40 md:w-52 md:h-52 top-[-5%] left-[-5%] md:top-[-12%] md:-left-[5%] lg:left-[-5%] lg:top-[-12%] xl:left-[-5%] xl:top-[-12%] rounded-full bg-mainGreen opacity-20 blur-[20px] -z-10" />
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
