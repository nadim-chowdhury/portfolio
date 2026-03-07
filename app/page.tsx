"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ReactNode, RefObject } from "react";

const NAV_ITEMS = [
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
  "v2",
  "v3",
  "danger",
];

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Nest.js",
  "PostgreSQL",
  "MongoDB",
  "React Native",
  "Flutter",
  "Tailwind CSS",
  "Bootstrap",
  "GraphQL",
  "REST API",
  "Git",
  "Docker",
];

interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

interface Project {
  name: string;
  tech: string[];
  url: string;
  desc: string;
}

const EXPERIENCE: Experience[] = [
  {
    role: "Full Stack Software Developer",
    company: "Easy Fashion Ltd",
    period: "Jul 2025 ~ Nov 2025",
    points: [
      "Designed and developed end-to-end features across frontend and backend",
      "Collaborated with cross-functional teams including devs, testers, PMs",
      "Maintained modular, scalable codebases for long-term sustainability",
    ],
  },
  {
    role: "Full Stack Web Developer",
    company: "Freelance",
    period: "Aug 2024 ~ Jun 2025",
    points: [
      "Built airline booking system with Next.js + NestJS and role-based auth",
      "Created full-featured visual editor with real-time style editing",
      "Integrated billing/subscription system with project dashboard",
    ],
  },
  {
    role: "Junior Frontend Developer",
    company: "Mediusware Ltd",
    period: "Mar 2024 ~ Jul 2024",
    points: [
      "Built drag-and-drop website builder with multi-tenancy & subdomain publishing",
      "Connected pages with GraphQL APIs for dynamic data rendering",
      "Collaborated on event management software integration",
    ],
  },
  {
    role: "Frontend Trainee",
    company: "Mediusware Ltd",
    period: "Dec 2023 ~ Feb 2024",
    points: [
      "Developed Profile Page CRUD with role-based access control",
      "Built task management and customer order modules",
      "Implemented Preferences Page logic for seamless UX",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Freelance",
    period: "Sep 2022 ~ Nov 2023",
    points: [
      "Built full-stack apps: task managers, auth systems, CRUD solutions",
      "Practiced REST API design, database modeling, and deployment",
      "Enhanced debugging, optimization, and version control skills",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    name: "Collabier SaaS",
    tech: ["Next.js", "NestJS", "PostgreSQL"],
    url: "collabier-sass-x.vercel.app",
    desc: "Full-featured visual editor with reusable components, responsive design, real-time style editing and integrated billing.",
  },
  {
    name: "Flight Booking",
    tech: ["Next.js", "NestJS", "REST API"],
    url: "flight-booking-x.vercel.app",
    desc: "Secure role-based booking platform with CRUD for airlines, airports, planes, routes, and user authentication.",
  },
  {
    name: "School Mgmt System",
    tech: ["React.js", "Node.js", "MongoDB"],
    url: "scl-mgt-sys-client.vercel.app",
    desc: "Comprehensive school management with student records, scheduling, and administrative dashboards.",
  },
  {
    name: "Dashboard UI",
    tech: ["React.js", "Tailwind CSS"],
    url: "dash-b0ard.netlify.app",
    desc: "Modern analytics dashboard with charts, data tables, dark mode, and responsive layout.",
  },
];

function useInView(
  threshold = 0.15,
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);
    const animate = () => {
      if (dot.current) {
        dot.current.style.left = pos.current.x + "px";
        dot.current.style.top = pos.current.y + "px";
      }
      if (ring.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ring.current.style.left = ringPos.current.x + "px";
        ring.current.style.top = ringPos.current.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", move);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#00d4aa",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(0,212,170,0.5)",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
    </>
  );
}

export default function Home() {
  const router = useRouter();

  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map((id) => document.getElementById(id));
      const current = [...sections]
        .reverse()
        .find((s) => s && s.getBoundingClientRect().top <= 120);
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "v2") {
      router.push("/v2");
    } else if (id === "v3") {
      router.push("/v3");
    } else if (id === "danger") {
      router.push("/terminal");
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("nadim-chowdhury@outlook.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // suppress unused warning for menuOpen
  void menuOpen;

  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "#e8e8e8",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        minHeight: "100vh",
        cursor: "none",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        a { cursor: none !important; }
        button { cursor: none !important; }
        .nav-link { position: relative; font-size: 13px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; color: #666; background: none; border: none; padding: 4px 0; transition: color 0.2s; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: #00d4aa; transition: width 0.3s ease; }
        .nav-link:hover, .nav-link.active { color: #e8e8e8; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .skill-tag { background: #141414; border: 1px solid #222; padding: 6px 14px; border-radius: 2px; font-size: 12px; letter-spacing: 0.05em; color: #888; transition: all 0.2s; }
        .skill-tag:hover { border-color: #00d4aa; color: #00d4aa; background: rgba(0,212,170,0.04); }
        .exp-card { border-left: 1px solid #1e1e1e; padding-left: 24px; position: relative; transition: border-color 0.3s; }
        .exp-card::before { content: ''; position: absolute; left: -4px; top: 6px; width: 7px; height: 7px; border-radius: 50%; background: #1e1e1e; border: 1px solid #333; transition: all 0.3s; }
        .exp-card:hover { border-color: #00d4aa; }
        .exp-card:hover::before { background: #00d4aa; border-color: #00d4aa; }
        .proj-card { background: #0e0e0e; border: 1px solid #1a1a1a; padding: 28px; transition: all 0.3s; position: relative; overflow: hidden; }
        .proj-card::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 1px; background: #00d4aa; transition: width 0.4s ease; }
        .proj-card:hover { border-color: #2a2a2a; transform: translateY(-2px); }
        .proj-card:hover::before { width: 100%; }
        .btn-primary { background: #00d4aa; color: #0a0a0a; padding: 12px 28px; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; border: none; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary:hover { background: #fff; }
        .btn-outline { background: transparent; color: #888; padding: 12px 28px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid #2a2a2a; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-outline:hover { border-color: #00d4aa; color: #00d4aa; }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }
      `}</style>

      <Cursor />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 48px",
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid #1a1a1a"
            : "1px solid transparent",
          transition: "all 0.4s",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 32,
            // letterSpacing: "-0.02em",
            color: "#e8e8e8",
          }}
        >
          Nadim<span style={{ color: "#00d4aa" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className={`nav-link ${active === item ? "active" : ""}`}
              onClick={() => scrollTo(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <a
          href="mailto:nadim-chowdhury@outlook.com"
          className="btn-primary"
          style={{ textDecoration: "none", fontSize: 11 }}
        >
          Hire Me ↗
        </a>
      </nav>

      {/* HERO */}
      <section
        id="about"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "120px 48px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  opacity: 0,
                  animation: "fadeUp 0.8s ease 0.1s forwards",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#00d4aa",
                    marginBottom: 20,
                  }}
                >
                  Available for work
                </p>
                <h1
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(52px, 6vw, 80px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    color: "#e8e8e8",
                    marginBottom: 24,
                  }}
                >
                  Nadim
                  <br />
                  <span style={{ fontStyle: "italic", color: "#555" }}>
                    Chowdhury
                  </span>
                </h1>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "#666",
                    maxWidth: 420,
                    marginBottom: 40,
                  }}
                >
                  Full Stack Developer specializing in building large-scale ERP
                  systems, SaaS platforms, and interactive business applications
                  with clean, scalable architecture.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button
                    className="btn-primary"
                    onClick={() => scrollTo("projects")}
                  >
                    View Work ↓
                  </button>
                  <button className="btn-outline" onClick={copyEmail}>
                    {copiedEmail ? "Copied!" : "Copy Email"}
                  </button>
                </div>
              </div>
            </div>
            <div
              style={{
                opacity: 0,
                animation: "fadeUp 0.8s ease 0.3s forwards",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {(
                  [
                    { label: "Experience", value: "3+ Years" },
                    { label: "Projects", value: "20+ Built" },
                    { label: "Stack", value: "Full Stack" },
                    { label: "Location", value: "Bangladesh" },
                  ] as { label: string; value: string }[]
                ).map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 0",
                      borderBottom: "1px solid #151515",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#444",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: "#e8e8e8",
                        fontWeight: 300,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
                  {(
                    [
                      {
                        name: "GitHub",
                        url: "https://github.com/nadim-chowdhury",
                      },
                      {
                        name: "LinkedIn",
                        url: "https://linkedin.com/in/nadim-chowdhury",
                      },
                      { name: "Portfolio", url: "https://nadim.vercel.app" },
                    ] as { name: string; url: string }[]
                  ).map(({ name, url }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#555",
                        textDecoration: "none",
                        borderBottom: "1px solid #222",
                        paddingBottom: 2,
                        transition: "color 0.2s, border-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#00d4aa";
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.borderColor = "#00d4aa";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#555";
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.borderColor = "#222";
                      }}
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        style={{ padding: "100px 48px", borderTop: "1px solid #111" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                marginBottom: 64,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#00d4aa",
                }}
              >
                02
              </span>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Experience
              </h2>
            </div>
          </AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {EXPERIENCE.map((exp, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="exp-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 400,
                          color: "#e8e8e8",
                          marginBottom: 4,
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#00d4aa",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#444",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    {exp.points.map((p, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: 13,
                          color: "#666",
                          lineHeight: 1.7,
                          display: "flex",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{ color: "#333", flexShrink: 0, marginTop: 2 }}
                        >
                          —
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{ padding: "100px 48px", borderTop: "1px solid #111" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                marginBottom: 64,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#00d4aa",
                }}
              >
                03
              </span>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Projects
              </h2>
            </div>
          </AnimatedSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 8,
            }}
          >
            {PROJECTS.map((proj, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="proj-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 16,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: "#e8e8e8",
                      }}
                    >
                      {proj.name}
                    </h3>
                    <a
                      href={`https://${proj.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 18,
                        color: "#333",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "#00d4aa")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "#333")
                      }
                    >
                      ↗
                    </a>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#555",
                      lineHeight: 1.7,
                      marginBottom: 20,
                    }}
                  >
                    {proj.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#444",
                          background: "#111",
                          padding: "4px 10px",
                          borderRadius: 1,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: 10,
                      color: "#333",
                      marginTop: 16,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {proj.url}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        style={{ padding: "100px 48px", borderTop: "1px solid #111" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                marginBottom: 64,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#00d4aa",
                }}
              >
                04
              </span>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Skills
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SKILLS.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div
              style={{
                marginTop: 60,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {(
                [
                  {
                    area: "Frontend",
                    items:
                      "React.js · Next.js · Angular · Tailwind · Framer Motion",
                  },
                  {
                    area: "Backend",
                    items: "Node.js · Express.js · NestJS · REST API · GraphQL",
                  },
                  {
                    area: "Database",
                    items: "PostgreSQL · MongoDB · Prisma · TypeORM",
                  },
                  { area: "Mobile", items: "React Native · Flutter" },
                  {
                    area: "DevOps",
                    items: "Docker · Git · GitHub · Vercel · Netlify",
                  },
                  {
                    area: "Tools",
                    items: "Postman · Swagger · Figma · VS Code",
                  },
                ] as { area: string; items: string }[]
              ).map(({ area, items }) => (
                <div
                  key={area}
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid #151515",
                    padding: "24px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#00d4aa",
                      marginBottom: 10,
                    }}
                  >
                    {area}
                  </p>
                  <p style={{ fontSize: 12, color: "#555", lineHeight: 1.8 }}>
                    {items}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{ padding: "100px 48px 60px", borderTop: "1px solid #111" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                marginBottom: 64,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#00d4aa",
                }}
              >
                05
              </span>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Let's Talk
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 80,
                alignItems: "start",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 15,
                    color: "#555",
                    lineHeight: 1.9,
                    marginBottom: 40,
                    maxWidth: 380,
                  }}
                >
                  Open to full-time roles, freelance projects, and interesting
                  collaborations. Let's build something great together.
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {(
                    [
                      {
                        label: "Email",
                        value: "nadim-chowdhury@outlook.com",
                        action: copyEmail as (() => void) | null,
                      },
                      {
                        label: "Phone",
                        value: "+880 1971 258803",
                        action: null,
                      },
                    ] as {
                      label: string;
                      value: string;
                      action: (() => void) | null;
                    }[]
                  ).map(({ label, value, action }) => (
                    <div key={label}>
                      <p
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#444",
                          marginBottom: 4,
                        }}
                      >
                        {label}
                      </p>
                      {action ? (
                        <button
                          onClick={action}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#888",
                            fontSize: 14,
                            fontFamily: "'DM Sans', sans-serif",
                            borderBottom: "1px solid #222",
                            paddingBottom: 2,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color =
                              "#00d4aa";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "#00d4aa";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color =
                              "#888";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "#222";
                          }}
                        >
                          {value}
                        </button>
                      ) : (
                        <button
                          style={{
                            background: "none",
                            // border: "none",
                            color: "#888",
                            fontSize: 14,
                            borderBottom: "1px solid #222",
                            paddingBottom: 2,
                          }}
                        >
                          {value}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {(
                  [
                    {
                      label: "GitHub",
                      sub: "github.com/nadim-chowdhury",
                      url: "https://github.com/nadim-chowdhury",
                    },
                    {
                      label: "LinkedIn",
                      sub: "linkedin.com/in/nadim-chowdhury",
                      url: "https://linkedin.com/in/nadim-chowdhury",
                    },
                    {
                      label: "Portfolio",
                      sub: "nadim.vercel.app",
                      url: "https://nadim.vercel.app",
                    },
                  ] as { label: string; sub: string; url: string }[]
                ).map(({ label, sub, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 24px",
                      background: "#0d0d0d",
                      border: "1px solid #181818",
                      textDecoration: "none",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((
                        e.currentTarget as HTMLAnchorElement
                      ).style.borderColor = "#00d4aa")
                    }
                    onMouseLeave={(e) =>
                      ((
                        e.currentTarget as HTMLAnchorElement
                      ).style.borderColor = "#181818")
                    }
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#e8e8e8",
                          marginBottom: 2,
                        }}
                      >
                        {label}
                      </p>
                      <p style={{ fontSize: 11, color: "#444" }}>{sub}</p>
                    </div>
                    <span style={{ color: "#333", fontSize: 18 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "32px 48px",
          borderTop: "1px solid #111",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 11, color: "#777", letterSpacing: "0.1em" }}>
          © 2025 Nadim Chowdhury
        </p>
        <p style={{ fontSize: 11, color: "#777", letterSpacing: "0.1em" }}>
          Full Stack Developer · Dhaka, BD
        </p>
      </footer>
    </div>
  );
}
