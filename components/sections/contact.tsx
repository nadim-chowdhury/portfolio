"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteConfig } from "@/lib/data";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface-secondary">
      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Let's build something together"
          description="Have a project in mind? I'd love to hear about it. Drop me a message and let's start a conversation."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* Form (3 cols) */}
          {/* <ScrollReveal className="lg:col-span-3" direction="left">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl border border-border bg-surface-elevated"
            >
              <div className="flex flex-col gap-5"> */}
          {/* Name */}
          {/* <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-text-primary"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-primary text-text-primary text-sm placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-colors"
                  />
                </div> */}

          {/* Email */}
          {/* <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-text-primary"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-primary text-text-primary text-sm placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-colors"
                  />
                </div> */}

          {/* Message */}
          {/* <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-text-primary"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-primary text-text-primary text-sm placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-colors resize-none"
                  />
                </div> */}

          {/* Submit */}
          {/* <button
                  type="submit"
                  disabled={submitted}
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-accent text-accent-fg font-medium text-sm hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {submitted ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"
                      />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button> */}
          {/* </div>
            </form>
          </ScrollReveal> */}

          {/* Contact Info (2 cols) */}
          <ScrollReveal className="lg:col-span-5" direction="right" delay={0.1}>
            <div className="flex flex-col gap-5 h-full justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-elevated hover:border-accent/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                      {siteConfig.phone}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-elevated hover:border-accent/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary mb-0.5">Email</p>
                    <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors break-all">
                      {siteConfig.email}
                    </p>
                  </div>
                </a>

                {/* Location */}
                {/* <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-elevated">
                  <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary mb-0.5">
                      Location
                    </p>
                    <p className="text-sm font-medium text-text-primary">
                      {siteConfig.location}
                    </p>
                  </div>
                </div> */}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-surface-elevated text-text-secondary text-sm hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-surface-elevated text-text-secondary text-sm hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <GithubIcon className="w-5 h-5" />
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
