"use client";

import ProjectCard from "./ProjectCard";
import { inika } from "@/lib/fonts";
import Link from "next/link";
import Iconify from "@/components/iconify";
import { projects } from "@/data";

export const Projects = () => {
  return (
    <section
      className="py-20 backdrop-blur-sm relative has-[[data-covering]]:z-[60]"
      id="projects"
    >
      <div className="max-w-5xl mx-auto relative">
        <div className="flex items-baseline gap-5 mb-32">
          <h2
            className={`relative isolate text-4xl md:text-6xl font-bold text-mainGreen ${inika.className}`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-44 w-44 rounded-full bg-mainGreen opacity-20 blur-[28px] md:h-52 md:w-52"
            />
            projects
          </h2>
          <div className="flex items-center gap-1">
            <span className="h-3 rounded-lg bg-beige w-[40px]" />
            <span className="h-3 rounded-lg bg-beige w-[25px]" />
            <span className="h-3 rounded-lg bg-mainGreen w-[12px]" />
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              data-slot={project.featured ? "featured" : "grid"}
              className={
                project.featured
                  ? "h-[300px] md:col-span-2 md:h-[380px]"
                  : "h-[300px]"
              }
            >
              <ProjectCard {...project} />
            </div>
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
            <Iconify
              icon="akar-icons:github-fill"
              className="text-3xl group-hover:rotate-12 transition-transform"
              aria-hidden="true"
            />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
