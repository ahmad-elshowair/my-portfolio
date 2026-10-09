"use client";

import { ProjectCardProps } from "@/definitions";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Iconify from "@/components/iconify";
import { usePrefersReducedMotion, useProjectHighlight } from "@/hooks";
import { inika } from "@/lib/fonts";

const ProjectCard: FC<ProjectCardProps> = ({
  anchorId,
  title,
  description,
  technologies,
  link,
  githubUrl,
  statusNote,
  featured,
  images,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [rotationStopped, setRotationStopped] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const highlighted = useProjectHighlight(anchorId);
  const hasImages = images.length > 0;

  useEffect(() => {
    // Screenshot-free cards have nothing to rotate; reduced motion stays static.
    if (!hasImages || prefersReducedMotion || isPaused || rotationStopped)
      return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [
    hasImages,
    prefersReducedMotion,
    isPaused,
    rotationStopped,
    images.length,
  ]);

  const showImage = (index: number) => {
    setCurrentImageIndex(index);
    setRotationStopped(true);
  };

  return (
    <motion.div
      id={anchorId ? `project-${anchorId}` : undefined}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={`relative bg-mainGreen/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg group cursor-pointer h-[300px] transition-shadow duration-300 ${
        featured ? "md:col-span-2 md:h-[380px]" : ""
      } ${
        highlighted
          ? "ring-2 ring-mainGreen/70 shadow-[0_0_25px_rgba(141,165,91,0.35)]"
          : ""
      }`}
    >
      <div className="absolute inset-0 w-full h-full">
        {hasImages && !prefersReducedMotion && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Uncropped slide: blurred cover stage behind the sharp contained screenshot */}
              <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-105">
                <Image
                  src={images[currentImageIndex].url}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover blur-lg scale-110"
                />
                <Image
                  src={images[currentImageIndex].url}
                  alt={images[currentImageIndex].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {hasImages && prefersReducedMotion && (
          <div key={currentImageIndex} className="absolute inset-0">
            <Image
              src={images[currentImageIndex].url}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover blur-lg scale-110"
            />
            <Image
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        )}

        {/* Slide indicators — indicate the number of pictures */}
        {hasImages && (
          <div className="absolute bottom-[0.1rem] left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showImage(index);
                }}
                aria-label={`Show screenshot ${index + 1} of ${images.length}`}
                aria-current={index === currentImageIndex}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-mainGreen w-4"
                      : "bg-gray-300 w-1.5"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Project links */}
      <div className="absolute top-4 right-4 flex items-center gap-3 lg:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 z-20">
        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live website for ${title}`}
            className="p-2 bg-mainGreen/20 backdrop-blur-sm rounded-full hover:bg-mainGreen/80 transition-colors ease-in-out duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Iconify
              icon="lucide:external-link"
              className="text-beige text-lg hover:scale-105 transition-transform duration-200 ease-in-out"
              aria-hidden="true"
            />
          </Link>
        )}
        {githubUrl && (
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${title} on GitHub`}
            className="p-2 bg-mainGreen/20 backdrop-blur-sm rounded-full hover:bg-mainGreen/80 transition-colors ease-in-out duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Iconify
              icon="akar-icons:github-fill"
              className="text-beige text-lg hover:scale-105 transition-transform duration-200 ease-in-out"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-beige z-10">
        <h3
          className={`text-base font-semibold mb-1 group-hover:text-mainGreen transition-colors ${inika.className}`}
        >
          {title}
        </h3>
        {statusNote && (
          <p className="text-xs text-gray-300 mb-1">{statusNote}</p>
        )}
        <p className="text-xs md:text-sm leading-relaxed text-beige/90 line-clamp-3 mb-2">
          {description}
        </p>

        {/* Technologies section */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="text-xs hover:text-mainGreen transition-colors"
            >
              <Iconify name={tech.name} icon={tech.icon} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
