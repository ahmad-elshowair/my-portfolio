"use client";

import { ProjectCardProps } from "@/definitions";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  technologies,
  link,
  githubUrl,
  images,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative bg-mainGreen/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg group cursor-pointer h-[300px]"
    >
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex].url}
            alt={images[currentImageIndex].alt}
            className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-90"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Slide indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-mainGreen w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Project links */}
      <div className="absolute top-4 right-4 flex items-center gap-3 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-mainGreen/20 backdrop-blur-sm rounded-full hover:bg-mainGreen/80 transition-colors ease-in-out duration-500"
          onClick={(e) => e.stopPropagation()}
        >
          <FaExternalLinkAlt className="text-beige text-lg hover:scale-90  transition-transform duration-300" />
        </Link>
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-mainGreen/20 backdrop-blur-sm rounded-full hover:bg-mainGreen/80 transition-colors ease-in-out duration-500"
          onClick={(e) => e.stopPropagation()}
        >
          <FaGithub className="text-beige text-lg hover:scale-125 hover:rotate-12 transition-transform duration-300" />
        </Link>
      </div>
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-beige z-10">
        <h3 className="text-base font-semibold mb-2">{title}</h3>

        {/* Technologies section */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="text-xs hover:text-mainGreen transition-colors"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
