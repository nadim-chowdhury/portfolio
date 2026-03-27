import { ScrollReveal } from "./scroll-reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 mb-12 md:mb-16 ${alignClass}`}>
      <ScrollReveal>
        <span className="inline-block font-mono text-xs tracking-[0.2em] uppercase text-accent">
          {label}
        </span>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight text-text-primary">
          {title}
        </h2>
      </ScrollReveal>
      {description && (
        <ScrollReveal delay={0.1}>
          <p className="max-w-xl text-base md:text-lg text-text-secondary leading-relaxed">
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
