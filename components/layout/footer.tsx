import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-secondary">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image
                src={siteConfig.logo}
                alt="Logo"
                width={48}
                height={48}
                className="w-8 h-8 rounded-full bg-accent"
              />
              <span className="font-heading font-semibold text-lg text-text-primary">
                Nad!m
              </span>
            </div>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              Building digital products with care, precision, and a deep focus
              on user experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-1">
              Links
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {["About", "Skills", "Experience", "Projects", "Contact"].map(
                (label) => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {label}
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3 items-start md:items-end">
            <span className="text-xs font-mono uppercase tracking-widest text-text-tertiary">
              Connect
            </span>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border bg-surface-elevated flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border bg-surface-elevated flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-9 h-9 rounded-lg border border-border bg-surface-elevated flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider-glow mt-8 mb-6" />
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Nadim Chowdhury. Crafted with
            intention.
          </p>
          <a
            href="#"
            className="w-8 h-8 rounded-full border border-border bg-surface-elevated flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
