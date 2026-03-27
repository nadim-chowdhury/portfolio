"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal, CountUp } from "@/components/ui/scroll-reveal";
import { siteConfig, aboutText, stats } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          label="About"
          title="A bit about myself"
          description={aboutText.headline}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Image (2 cols) */}
          <ScrollReveal className="lg:col-span-2" direction="left">
            <div className="relative group">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-border">
                <Image
                  src={siteConfig.workingPhoto}
                  alt={`${siteConfig.name} working`}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-3 left-3 w-8 h-[2px] bg-accent" />
                  <div className="absolute top-3 left-3 w-[2px] h-8 bg-accent" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-3 right-3 w-8 h-[2px] bg-accent" />
                  <div className="absolute bottom-3 right-3 w-[2px] h-8 bg-accent" />
                </div>
              </div>
              {/* Offset decoration */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-accent/20 -z-10" />
            </div>
          </ScrollReveal>

          {/* Right: Text Content (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <ScrollReveal delay={0.1}>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                {aboutText.paragraph}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                {aboutText.paragraphTwo}
              </p>
            </ScrollReveal>

            {/* Stats Grid */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {stats.map((stat) => {
                  const numericPart = parseInt(stat.value.replace(/\D/g, ""));
                  const suffix = stat.value.replace(/\d/g, "");
                  return (
                    <div
                      key={stat.label}
                      className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-surface-elevated"
                    >
                      <span className="font-heading text-2xl md:text-3xl font-bold text-accent">
                        <CountUp target={numericPart} suffix={suffix} />
                      </span>
                      <span className="text-xs text-text-tertiary font-medium">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Resume CTA */}
            <ScrollReveal delay={0.25}>
              <a
                href={siteConfig.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-fg text-sm font-medium hover:bg-accent-hover transition-colors w-fit mt-2"
              >
                <Download className="w-4 h-4" />
                Download Full Resume
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
