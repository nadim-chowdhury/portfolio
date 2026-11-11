"use client";

import { useState } from "react";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteConfig } from "@/lib/data";

export function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface-secondary">
      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Let's build something together"
          description="Have a project in mind or looking for a talented developer? Drop me a line and let's start a conversation."
          align="center"
        />

        <div className="max-w-2xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="group flex items-center justify-between p-5 rounded-2xl border border-border bg-surface-elevated hover:border-accent/40 transition-colors card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary mb-0.5 font-medium">Phone</p>
                      <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {siteConfig.phone}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) =>
                      handleCopy(siteConfig.phone.replace(/\s/g, ""), "phone", e)
                    }
                    className="p-2 rounded-lg border border-border bg-surface-primary text-text-tertiary hover:text-accent hover:border-accent/50 transition-colors shrink-0"
                    title={copiedField === "phone" ? "Copied!" : "Copy phone number"}
                    aria-label="Copy phone number"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center justify-between p-5 rounded-2xl border border-border bg-surface-elevated hover:border-accent/40 transition-colors card-hover"
                >
                  <div className="flex items-start gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-text-tertiary mb-0.5 font-medium">Email</p>
                      <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors truncate">
                        {siteConfig.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleCopy(siteConfig.email, "email", e)}
                    className="p-2 rounded-lg border border-border bg-surface-primary text-text-tertiary hover:text-accent hover:border-accent/50 transition-colors shrink-0 ml-2"
                    title={copiedField === "email" ? "Copied!" : "Copy email address"}
                    aria-label="Copy email address"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-surface-elevated text-text-secondary text-sm font-medium hover:text-accent hover:border-accent/40 transition-colors card-hover"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-surface-elevated text-text-secondary text-sm font-medium hover:text-accent hover:border-accent/40 transition-colors card-hover"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
