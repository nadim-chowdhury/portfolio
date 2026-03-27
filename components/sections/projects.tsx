"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { projects } from "@/lib/data";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="group relative p-6 md:p-8 rounded-2xl border border-border bg-surface-elevated card-hover h-full flex flex-col">
        {/* Number + Category */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-text-tertiary tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border border-accent/30 bg-accent-soft text-accent">
            {project.category}
          </span>
        </div>

        {/* Visual Block — gradient placeholder styled by project */}
        {/* <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-border-subtle bg-surface-secondary">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-linear-to-br from-accent/8 via-surface-secondary to-accent/4 flex items-center justify-center">
              <span className="font-heading text-3xl md:text-4xl font-bold text-accent/15 select-none">
                {project.name.charAt(0)}
              </span>
            </div>
          </div>

          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 flex items-center justify-center">
            <motion.div
              initial={false}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-primary/90 text-text-primary text-xs font-medium backdrop-blur-sm border border-border">
                View Project <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>
          </div>
        </div> */}

        {/* Project Info */}
        <div className="flex flex-col flex-1">
          <h3 className="font-heading font-bold text-lg md:text-xl text-text-primary mb-2 group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md border border-border bg-surface-primary text-text-tertiary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
            <span className="text-xs font-mono text-text-tertiary">
              {project.year}
            </span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Live Demo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-surface-secondary">
      <div className="section-container">
        <SectionHeading
          label="Projects"
          title="Selected work"
          description="A curated collection of projects that demonstrate my approach to building software."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
