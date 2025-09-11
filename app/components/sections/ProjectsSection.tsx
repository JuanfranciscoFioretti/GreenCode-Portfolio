'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import projectsData from '../../lib/data.json';
import DevModeTooltip from '../common/DevModeTooltip';
import { trackProjectClick } from '../../lib/analytics';


interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

interface ProjectsSectionProps {
  devMode: boolean;
}

export default function ProjectsSection({ devMode }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20">
      <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Projects
        </motion.h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {projectsData.map((project: Project, index: number) => (
          <motion.div
            key={index}
            className="glassmorphism p-6 rounded-lg glow-effect"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={300}
              height={200}
              className="rounded-lg"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold mt-4">{project.title}</h3>
            <p className="mt-2">{project.description}</p>
            <p className="mt-2 text-[var(--secondary-color)]">
              Technologies: {project.technologies.join(', ')}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[var(--tertiary-color)] hover:underline"
              onClick={() => trackProjectClick(project.title)}
            >
              Visit Project
            </a>


            {devMode && (
              <DevModeTooltip
                content="Images are optimized using Next.js Image with lazy loading for performance."
                isVisible={devMode}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}