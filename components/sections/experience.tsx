"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { experiences } from "@/lib/data";

function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="relative w-10 h-10 rounded-full border-2 border-accent bg-surface-primary flex items-center justify-center z-10"
        >
          <Briefcase className="w-4 h-4 text-accent" />
          {/* Pulse ring */}
          {index === 0 && (
            <div
              className="absolute inset-0 rounded-full border-2 border-accent"
              style={{ animation: "pulse-ring 2.5s ease-out infinite" }}
            />
          )}
        </motion.div>
        {/* Connector line */}
        {index < experiences.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-[2px] flex-1 bg-linear-to-b from-accent/40 to-border origin-top"
          />
        )}
      </div>

      {/* Card content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex-1 pb-10 md:pb-14"
      >
        <div className="p-5 md:p-6 rounded-2xl border border-border bg-surface-elevated card-hover">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
            <h3 className="font-heading font-semibold text-base md:text-lg text-text-primary">
              {exp.role}
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md border border-accent/30 bg-accent-soft text-accent w-fit">
              {exp.type}
            </span>
          </div>

          {/* Company + Period */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3 text-sm text-text-secondary">
            <span className="font-medium">{exp.company}</span>
            <span className="hidden sm:inline text-text-tertiary">·</span>
            <span className="text-text-tertiary">{exp.period}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {exp.description}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-1.5">
            {exp.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md border border-border bg-surface-secondary text-text-tertiary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          label="Experience"
          title="Where I've worked"
          description="A timeline of the roles and projects that shaped my journey as a developer."
        />

        <div className="max-w-full mx-auto lg:mx-0">
          {experiences.map((exp, i) => (
            <TimelineCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
