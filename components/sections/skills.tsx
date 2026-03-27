"use client";

import {
  Layout,
  Server,
  Database,
  Smartphone,
  Cloud,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
} from "@/components/ui/scroll-reveal";
import { skillCategories } from "@/lib/data";

const iconMap: Record<string, typeof Layout> = {
  layout: Layout,
  server: Server,
  database: Database,
  smartphone: Smartphone,
  cloud: Cloud,
  wrench: Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-surface-secondary">
      <div className="section-container">
        <SectionHeading
          label="Skills"
          title="Technologies I work with"
          description="Tools and frameworks I use to bring ideas to life, from concept through deployment."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {skillCategories.map((category) => {
            const IconComp = iconMap[category.icon] || Layout;
            return (
              <StaggerItem key={category.name}>
                <div className="group p-5 md:p-6 rounded-2xl border border-border bg-surface-elevated card-hover h-full">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-accent-soft flex items-center justify-center">
                      <IconComp className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold text-base text-text-primary">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium rounded-md border border-border bg-surface-primary text-text-secondary transition-colors group-hover:border-accent/30 group-hover:text-text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
