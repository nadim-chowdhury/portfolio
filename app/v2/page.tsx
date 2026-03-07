"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ReactNode, RefObject } from "react";

const SKILLS_LEFT = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Bootstrap",
];
const SKILLS_RIGHT = [
  "Express.js",
  "Nest.js",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "REST API",
];

interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  desc: string;
}

interface Project {
  idx: string;
  name: string;
  url: string;
  tech: string;
  desc: string;
  year: string;
}

const EXPERIENCE: Experience[] = [
  {
    role: "Full Stack Software Developer",
    company: "Easy Fashion Ltd",
    period: "Jul ~ Nov 2025",
    type: "Full-time",
    desc: "End-to-end feature development across frontend and backend. Modular, scalable codebases in close collaboration with cross-functional teams.",
  },
  {
    role: "Full Stack Web Developer",
    company: "Freelance",
    period: "Aug 2024 ~ Jun 2025",
    type: "Contract",
    desc: "Built airline booking platform (Next.js + NestJS) with role-based auth. Created a full visual editor with real-time style editing, dashboard, and billing.",
  },
  {
    role: "Junior Frontend Developer",
    company: "Mediusware Ltd",
    period: "Mar ~ Jul 2024",
    type: "Full-time",
    desc: "Drag-and-drop website builder with multi-tenancy and subdomain publishing. Connected GraphQL APIs for dynamic rendering.",
  },
  {
    role: "Frontend Trainee",
    company: "Mediusware Ltd",
    period: "Dec 2023 ~ Feb 2024",
    type: "Internship",
    desc: "Profile CRUD with RBAC, task management and customer order modules, and Preferences Page logic.",
  },
  {
    role: "Frontend Developer",
    company: "Freelance",
    period: "Sep 2022 ~ Nov 2023",
    type: "Freelance",
    desc: "Built task managers, auth systems, and CRUD apps. Practiced REST API design, DB modeling, deployment, and version control.",
  },
];

const PROJECTS: Project[] = [
  {
    idx: "01",
    name: "Collabier SaaS",
    url: "collabier-sass-x.vercel.app",
    tech: "Next.js · NestJS · PostgreSQL",
    desc: "Visual editor platform with real-time style editing, reusable components, project dashboard, and integrated billing system.",
    year: "2025",
  },
  {
    idx: "02",
    name: "Flight Booking",
    url: "flight-booking-x.vercel.app",
    tech: "Next.js · NestJS · REST API",
    desc: "Secure airline booking system with role-based access control, CRUD for airlines, airports, planes, and routes.",
    year: "2024",
  },
  {
    idx: "03",
    name: "School Management",
    url: "scl-mgt-sys-client.vercel.app",
    tech: "React.js · Node.js · MongoDB",
    desc: "Comprehensive school management: student records, scheduling, teacher dashboards, and grade management.",
    year: "2024",
  },
  {
    idx: "04",
    name: "Dashboard UI",
    url: "dash-b0ard.netlify.app",
    tech: "React.js · Tailwind CSS",
    desc: "Modern analytics dashboard with charts, data tables, dark mode support, and fully responsive layout.",
    year: "2023",
  },
];

const MARQUEE_ITEMS = [
  "React.js",
  "Next.js",
  "Express.js",
  "Nest.js",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "REST API",
];

function useInView(
  threshold = 0.1,
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

type RevealDir = "up" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  dir?: RevealDir;
}

function Reveal({ children, delay = 0, dir = "up" }: RevealProps) {
  const [ref, inView] = useInView();
  const transforms: Record<RevealDir, string> = {
    up: "translateY(40px)",
    left: "translateX(-30px)",
    right: "translateX(30px)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[dir],
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Marquee() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid #e0d9cf",
        borderBottom: "1px solid #e0d9cf",
        padding: "14px 0",
        background: "#f5f0e8",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "marquee 22s linear infinite",
          gap: 0,
          whiteSpace: "nowrap",
        }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
          (item, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#b5a99a",
                paddingRight: 48,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {item}{" "}
              <span style={{ color: "#d4c9b8", marginRight: 48 }}>·</span>
            </span>
          ),
        )}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}

interface NumberCounterProps {
  target: number;
  label: string;
}

function NumberCounter({ target, label }: NumberCounterProps) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const t = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(t);
      } else setCount(start);
    }, 30);
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(40px,5vw,64px)",
          color: "#1a1410",
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {count}
        <span style={{ color: "#c17f3a", fontSize: "0.6em" }}>+</span>
      </p>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#b5a99a",
          fontFamily: "'Syne', sans-serif",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function PortfolioV2() {
  const router = useRouter();

  const [activeExp, setActiveExp] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setNavSolid(window.scrollY > 60);
      const sections = [
        "home",
        "experience",
        "projects",
        "skills",
        "contact",
        "v2",
        "v3",
        "danger",
      ];
      const found = [...sections].reverse().find((id) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= 100;
      });
      if (found) setActiveSection(found);
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
    }
  };

  return (
    <div
      style={{
        background: "#faf6ef",
        color: "#1a1410",
        fontFamily: "'Syne', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Syne:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #faf6ef; }
        ::-webkit-scrollbar-thumb { background: #d4c9b8; }
        .nav-item { background: none; border: none; font-family: 'Syne', sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #b5a99a; transition: color 0.2s; cursor: pointer; padding: 4px 0; position: relative; }
        .nav-item::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: #c17f3a; transition: width 0.3s; }
        .nav-item:hover { color: #1a1410; }
        .nav-item.active { color: #1a1410; }
        .nav-item:hover::after, .nav-item.active::after { width: 100%; }
        .exp-tab { background: none; border: none; text-align: left; font-family: 'Syne', sans-serif; cursor: pointer; padding: 18px 24px; border-left: 2px solid transparent; transition: all 0.3s; width: 100%; }
        .exp-tab:hover { background: rgba(193,127,58,0.04); }
        .exp-tab.active-tab { border-left-color: #c17f3a; background: rgba(193,127,58,0.06); }
        .proj-row { display: grid; grid-template-columns: 64px 1fr 200px 100px 48px; align-items: center; padding: 24px 0; border-bottom: 1px solid #e8e1d4; cursor: pointer; transition: all 0.3s; gap: 24px; }
        .proj-row:hover { padding-left: 12px; }
        .proj-row:hover .proj-name { color: #c17f3a; }
        .proj-row:hover .proj-arrow { opacity: 1; transform: translate(0,0); }
        .proj-arrow { opacity: 0; transform: translate(-6px,0); transition: all 0.3s; color: #c17f3a; }
        .contact-link { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid #e8e1d4; text-decoration: none; color: inherit; transition: all 0.2s; }
        .contact-link:hover { padding-left: 12px; }
        .contact-link:hover .cl-label { color: #c17f3a; }
        @media (max-width: 768px) {
          .proj-row { grid-template-columns: 48px 1fr 48px; }
          .proj-tech, .proj-year { display: none; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .exp-layout { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          nav .nav-links { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 48px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navSolid ? "rgba(250,246,239,0.95)" : "transparent",
          backdropFilter: navSolid ? "blur(16px)" : "none",
          borderBottom: navSolid
            ? "1px solid #e8e1d4"
            : "1px solid transparent",
          transition: "all 0.5s",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 32,
            fontWeight: 500,
            // letterSpacing: "-0.02em",
            color: "#1a1410",
            fontStyle: "italic",
          }}
        >
          Nadim<span style={{ color: "#c17f3a", fontStyle: "normal" }}>.</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 40 }}>
          {[
            "home",
            "about",
            "experience",
            "projects",
            "contact",
            "v2",
            "v3",
            "danger",
          ].map((s) => (
            <button
              key={s}
              className={`nav-item ${activeSection === s ? "active" : ""}`}
              onClick={() => scrollTo(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <a
          href="https://github.com/nadim-chowdhury"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#1a1410",
            textDecoration: "none",
            border: "1px solid #d4c9b8",
            padding: "8px 20px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#1a1410";
            (e.currentTarget as HTMLAnchorElement).style.color = "#faf6ef";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#1a1410";
          }}
        >
          GitHub ↗
        </a>
      </nav>

      {/* HERO */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          padding: "0 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(80px,14vw,200px)",
            color: "rgba(193,127,58,0.04)",
            letterSpacing: "-0.05em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Developer
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #d4c9b8 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />

        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
            maxWidth: 1100,
            width: "100%",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div>
            <div
              style={{
                opacity: 0,
                animation:
                  "slideIn 1s cubic-bezier(0.16,1,0.3,1) 0.1s forwards",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 32,
                }}
              >
                <div style={{ width: 32, height: 1, background: "#c17f3a" }} />
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#c17f3a",
                  }}
                >
                  Full Stack Developer
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(56px,6.5vw,96px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  color: "#1a1410",
                  marginBottom: 32,
                }}
              >
                Nadim
                <br />
                <em style={{ color: "#c17f3a" }}>Chowdhury</em>
              </h1>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: "#8a7f72",
                  maxWidth: 380,
                  marginBottom: 48,
                  fontWeight: 300,
                }}
              >
                Self-taught full stack developer from Dhaka, Bangladesh.
                Building scalable SaaS platforms, ERP systems, and interactive
                business apps since 2022.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button
                  onClick={() => scrollTo("projects")}
                  style={{
                    background: "#1a1410",
                    color: "#faf6ef",
                    border: "none",
                    padding: "14px 32px",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#c17f3a")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#1a1410")
                  }
                >
                  View Projects
                </button>
                <a
                  href="mailto:nadim-chowdhury@outlook.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#8a7f72",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderBottom: "1px solid #d4c9b8",
                    paddingBottom: 2,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#c17f3a";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "#c17f3a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#8a7f72";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "#d4c9b8";
                  }}
                >
                  Send Email ↗
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              opacity: 0,
              animation: "slideIn 1s cubic-bezier(0.16,1,0.3,1) 0.35s forwards",
            }}
          >
            <div
              style={{
                background: "#f0ebe0",
                border: "1px solid #e0d9cf",
                padding: "40px",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                {(["#e8a0a0", "#e8d4a0", "#a0d4a0"] as string[]).map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
                <span
                  style={{
                    fontSize: 10,
                    color: "#b5a99a",
                    letterSpacing: "0.1em",
                    marginLeft: 8,
                    fontFamily: "monospace",
                  }}
                >
                  nadim.config.ts
                </span>
              </div>
              <pre
                style={{
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  fontSize: 12,
                  lineHeight: 1.8,
                  color: "#6b6058",
                  overflowX: "auto",
                }}
              >
                {`const developer = {
  name: "Nadim Chowdhury",
  role: "Full Stack Developer",
  location: "Dhaka, Bangladesh",
  experience: "3+ years",
  
  stack: {
    frontend: ["React", "Next.js", "Angular"],
    backend: ["NestJS", "Node.js", "Express"],
    db: ["PostgreSQL", "MongoDB"],
    mobile: ["React Native", "Flutter"],
  },
  
  status: `}
                <span style={{ color: "#c17f3a" }}>"Open to work 🟢"</span>
                {`,
  email: "nadim-chowdhury@outlook.com"
}`}
              </pre>
            </div>
          </div>
        </div>
        <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </section>

      <Marquee />

      {/* ABOUT / STATS */}
      <section id="about" style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
            className="hero-grid"
          >
            <Reveal>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c17f3a",
                  marginBottom: 24,
                }}
              >
                About Me
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px,3.5vw,48px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: 32,
                  color: "#1a1410",
                }}
              >
                Crafting digital
                <br />
                <em>experiences</em> that
                <br />
                actually work.
              </h2>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#8a7f72",
                  marginBottom: 20,
                  fontWeight: 300,
                }}
              >
                I'm a self-taught developer with a passion for clean
                architecture and scalable design. My journey started in 2022
                with freelance projects, and I've since worked at product
                companies building everything from drag-and-drop builders to
                full ERP systems.
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#8a7f72",
                  fontWeight: 300,
                }}
              >
                I dropped out of my Mathematics degree to pursue software
                development full-time — a decision I've never regretted. I
                thrive in agile environments and love the intersection of
                elegant UI and robust backend logic.
              </p>
            </Reveal>
            <div>
              <div
                className="stats-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  gap: 1,
                  marginBottom: 40,
                }}
              >
                {(
                  [
                    { n: 3, l: "Years Exp." },
                    { n: 20, l: "Projects" },
                    { n: 15, l: "Technologies" },
                    { n: 5, l: "Roles Held" },
                  ] as { n: number; l: string }[]
                ).map(({ n, l }) => (
                  <div
                    key={l}
                    style={{
                      background: "#f0ebe0",
                      padding: "32px 24px",
                      textAlign: "center",
                    }}
                  >
                    <NumberCounter target={n} label={l} />
                  </div>
                ))}
              </div>
              <Reveal delay={0.2}>
                <div
                  style={{
                    background: "#f0ebe0",
                    padding: "24px",
                    borderLeft: "3px solid #c17f3a",
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.8,
                      color: "#8a7f72",
                      fontStyle: "italic",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    "I believe great software is 20% code and 80% understanding
                    the problem. I spend as much time thinking as I do typing."
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        style={{
          padding: "120px 48px",
          background: "#f0ebe0",
          borderTop: "1px solid #e0d9cf",
          borderBottom: "1px solid #e0d9cf",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 64,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#c17f3a",
                    marginBottom: 12,
                  }}
                >
                  Career Path
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(28px,3.5vw,48px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Experience
                </h2>
              </div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(60px,8vw,120px)",
                  color: "rgba(193,127,58,0.08)",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                }}
              >
                02
              </span>
            </div>
          </Reveal>
          <div
            className="exp-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: 0,
              background: "#faf6ef",
              border: "1px solid #e0d9cf",
            }}
          >
            <div style={{ borderRight: "1px solid #e0d9cf" }}>
              {EXPERIENCE.map((exp, i) => (
                <button
                  key={i}
                  className={`exp-tab ${activeExp === i ? "active-tab" : ""}`}
                  onClick={() => setActiveExp(i)}
                >
                  <p
                    style={{
                      fontSize: 13,
                      color: activeExp === i ? "#1a1410" : "#8a7f72",
                      marginBottom: 4,
                      fontWeight: activeExp === i ? 500 : 400,
                    }}
                  >
                    {exp.company}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: activeExp === i ? "#c17f3a" : "#b5a99a",
                    }}
                  >
                    {exp.period}
                  </p>
                </button>
              ))}
            </div>
            <div style={{ padding: "40px 48px" }}>
              <div
                key={activeExp}
                style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards" }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(193,127,58,0.1)",
                    color: "#c17f3a",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    marginBottom: 16,
                  }}
                >
                  {EXPERIENCE[activeExp].type}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 28,
                    letterSpacing: "-0.02em",
                    marginBottom: 8,
                    color: "#1a1410",
                  }}
                >
                  {EXPERIENCE[activeExp].role}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#c17f3a",
                    letterSpacing: "0.05em",
                    marginBottom: 24,
                  }}
                >
                  {EXPERIENCE[activeExp].company}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.85,
                    color: "#8a7f72",
                    fontWeight: 300,
                  }}
                >
                  {EXPERIENCE[activeExp].desc}
                </p>
              </div>
            </div>
          </div>
          <style>{`@keyframes fadeIn { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }`}</style>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 64,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#c17f3a",
                    marginBottom: 12,
                  }}
                >
                  Selected Work
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(28px,3.5vw,48px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Projects
                </h2>
              </div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(60px,8vw,120px)",
                  color: "rgba(193,127,58,0.08)",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                }}
              >
                03
              </span>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "64px 1fr 200px 100px 48px",
              gap: 24,
              paddingBottom: 12,
              borderBottom: "1px solid #1a1410",
              marginBottom: 4,
            }}
          >
            {(["No.", "Project", "Tech Stack", "Year", ""] as string[]).map(
              (h, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#b5a99a",
                  }}
                  className={i === 2 ? "proj-tech" : i === 3 ? "proj-year" : ""}
                >
                  {h}
                </span>
              ),
            )}
          </div>
          {PROJECTS.map((proj, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <a
                href={`https://${proj.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-row"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 13,
                    color: "#c17f3a",
                    fontStyle: "italic",
                  }}
                >
                  {proj.idx}
                </span>
                <div>
                  <p
                    className="proj-name"
                    style={{
                      fontSize: 18,
                      fontFamily: "'Playfair Display', serif",
                      letterSpacing: "-0.01em",
                      color: "#1a1410",
                      marginBottom: 4,
                      transition: "color 0.3s",
                    }}
                  >
                    {proj.name}
                  </p>
                  <p
                    style={{ fontSize: 12, color: "#b5a99a", lineHeight: 1.5 }}
                  >
                    {proj.desc}
                  </p>
                </div>
                <span
                  className="proj-tech"
                  style={{
                    fontSize: 11,
                    color: "#8a7f72",
                    letterSpacing: "0.05em",
                  }}
                >
                  {proj.tech}
                </span>
                <span
                  className="proj-year"
                  style={{
                    fontSize: 11,
                    color: "#b5a99a",
                    letterSpacing: "0.1em",
                  }}
                >
                  {proj.year}
                </span>
                <span
                  className="proj-arrow"
                  style={{ fontSize: 20, color: "#c17f3a" }}
                >
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ padding: "80px 48px", background: "#1a1410" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c17f3a",
                marginBottom: 48,
                textAlign: "center",
              }}
            >
              Technology Stack
            </p>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))",
              gap: 16,
            }}
          >
            {[...SKILLS_LEFT, ...SKILLS_RIGHT].map((skill, i) => (
              <Reveal key={i} delay={i * 0.025}>
                <div
                  style={{
                    padding: "20px 16px",
                    background: "#1e1812",
                    textAlign: "center",
                    border: "1px solid #2a2218",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(193,127,58,0.08)";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(193,127,58,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      "#1e1812";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "#2a2218";
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "#8a7060",
                    }}
                  >
                    {skill}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          padding: "120px 48px",
          background: "#f0ebe0",
          borderTop: "1px solid #e0d9cf",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 80 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c17f3a",
                  marginBottom: 20,
                }}
              >
                Get In Touch
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(40px,6vw,88px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  color: "#1a1410",
                }}
              >
                Let's build
                <br />
                <em>something great.</em>
              </h2>
            </div>
          </Reveal>
          <div
            className="contact-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}
          >
            <Reveal delay={0.1}>
              <div>
                {(
                  [
                    {
                      label: "Email",
                      value: "nadim-chowdhury@outlook.com",
                      href: "mailto:nadim-chowdhury@outlook.com",
                    },
                    {
                      label: "Phone",
                      value: "+880 1971 258803",
                      href: "tel:+8801971258803",
                    },
                    {
                      label: "GitHub",
                      value: "github.com/nadim-chowdhury",
                      href: "https://github.com/nadim-chowdhury",
                    },
                    {
                      label: "LinkedIn",
                      value: "linkedin.com/in/nadim-chowdhury",
                      href: "https://linkedin.com/in/nadim-chowdhury",
                    },
                    {
                      label: "Portfolio",
                      value: "nadim.vercel.app",
                      href: "https://nadim.vercel.app",
                    },
                  ] as { label: string; value: string; href: string }[]
                ).map(({ label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#b5a99a",
                          marginBottom: 4,
                        }}
                      >
                        {label}
                      </p>
                      <p
                        className="cl-label"
                        style={{
                          fontSize: 14,
                          color: "#1a1410",
                          transition: "color 0.2s",
                        }}
                      >
                        {value}
                      </p>
                    </div>
                    <span style={{ color: "#d4c9b8", fontSize: 18 }}>↗</span>
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  //   justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    background: "#faf6ef",
                    border: "1px solid #e0d9cf",
                    padding: "40px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 22,
                      lineHeight: 1.5,
                      color: "#1a1410",
                      marginBottom: 24,
                      fontStyle: "italic",
                    }}
                  >
                    "Currently open to full-time roles and interesting freelance
                    projects."
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#6cb26c",
                        animation: "pulse 2s ease infinite",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#8a7f72",
                      }}
                    >
                      Available for work
                    </span>
                  </div>
                </div>
                <a
                  href="mailto:nadim-chowdhury@outlook.com"
                  style={{
                    display: "block",
                    background: "#1a1410",
                    color: "#faf6ef",
                    textAlign: "center",
                    padding: "20px",
                    fontSize: 12,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    marginTop: 16,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "#c17f3a")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "#1a1410")
                  }
                >
                  Start a Conversation →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }`}</style>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#1a1410",
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            color: "#faf6ef",
            fontStyle: "italic",
          }}
        >
          Nadim<span style={{ color: "#c17f3a", fontStyle: "normal" }}>.</span>
        </div>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#ada194",
          }}
        >
          © 2025 Nadim Chowdhury · Dhaka, BD
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {(
            [
              ["GH", "https://github.com/nadim-chowdhury"],
              ["LI", "https://linkedin.com/in/nadim-chowdhury"],
              ["WWW", "https://nadim.vercel.app"],
            ] as [string, string][]
          ).map(([l, u]) => (
            <a
              key={l}
              href={u}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                color: "#ada194",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#c17f3a")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#6b5f52")
              }
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
