import { ExperienceItemProps } from "@/definitions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  company,
  period,
  description,
  technologies,
  projects,
  companyUrl,
}) => {
  const renderDescription = () => {
    if (!projects?.length)
      return <p className="text-gray-300 mt-2 text-sm">{description}</p>;

    const parts: (string | ReactNode)[] = [];
    let lastIndex = 0;

    projects.forEach((project) => {
      const index = description.indexOf(project.name, lastIndex);
      if (index !== -1) {
        // Add text before the project name
        parts.push(description.slice(lastIndex, index));

        // Add the link component
        parts.push(
          <Link
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-mainGreen px-1 py-[2px] rounded-3xl rounded-tr-none hover:underline transition-all duration-300 ease-in-out"
          >
            {project.name}
          </Link>
        );

        lastIndex = index + project.name.length;
      }
    });

    // Add remaining text
    parts.push(description.slice(lastIndex));

    return <p className="text-gray-300 mt-2 text-base md:text-md">{parts}</p>;
  };

  return (
    <div className="relative pl-6 pb-12">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-3 h-3 bg-mainGreen rounded-full" />
      {/* Vertical line */}
      <div className="absolute left-[5px] -top-5 w-[2px] h-full bg-mainGreen/30" />

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-semibold text-beige">{title}</h3>
          <span className="text-gray-500 text-sm">{period}</span>
        </div>
        <Link
          href={companyUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-mainGreen text-xs bg-mainGreen/10 px-3 py-1 rounded-md hover:scale-110 hover:text-beige transition-all duration-300 ease-in-out w-fit",
            !companyUrl && "pointer-events-none cursor-default"
          )}
        >
          {company}
        </Link>
        {renderDescription()}
        <div className="flex gap-3 mt-3">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="text-xl text-gray-400 hover:text-mainGreen transition-colors"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;
