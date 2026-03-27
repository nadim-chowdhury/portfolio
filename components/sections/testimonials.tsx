"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          label="Testimonials"
          title="What people say"
          description="Feedback from colleagues and clients I've had the pleasure of working with."
          align="center"
        />

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            {/* Card */}
            <div className="relative p-8 md:p-10 rounded-2xl border border-border bg-surface-elevated overflow-hidden min-h-[260px] flex flex-col items-center justify-center">
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-accent/20 mb-4" />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="flex flex-col items-center text-center"
                >
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-soft border border-accent/20 flex items-center justify-center font-heading font-bold text-sm text-accent">
                      {t.avatar}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-text-primary">
                        {t.name}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {t.role} at {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-border bg-surface-elevated flex items-center justify-center text-text-tertiary hover:text-accent hover:border-accent transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 bg-accent"
                        : "w-1.5 bg-border hover:bg-text-tertiary"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-border bg-surface-elevated flex items-center justify-center text-text-tertiary hover:text-accent hover:border-accent transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
