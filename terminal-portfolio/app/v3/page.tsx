"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ReactNode, RefObject } from "react";

interface Skill {
  name: string;
  lvl: number;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  color: string;
  points: string[];
}

interface Project {
  id: string;
  name: string;
  url: string;
  status: string;
  tech: string[];
  desc: string;
  year: string;
}

const SKILLS: Skill[] = [
  { name: "JavaScript", lvl: 95 },
  { name: "TypeScript", lvl: 90 },
  { name: "React.js", lvl: 95 },
  { name: "Next.js", lvl: 92 },
  { name: "NestJS", lvl: 85 },
  { name: "Node.js", lvl: 88 },
  { name: "PostgreSQL", lvl: 80 },
  { name: "MongoDB", lvl: 82 },
  { name: "Angular", lvl: 75 },
  { name: "Docker", lvl: 72 },
  { name: "GraphQL", lvl: 78 },
  { name: "React Native", lvl: 70 },
];

const EXPERIENCE: Experience[] = [
  {
    role: "Full Stack Software Developer",
    company: "Easy Fashion Ltd",
    period: "JUL~NOV 2025",
    type: "FULL-TIME",
    color: "#00fff5",
    points: [
      "End-to-end feature development across frontend & backend",
      "Cross-functional team collaboration with devs, QA, PMs",
      "Modular scalable codebase architecture",
    ],
  },
  {
    role: "Full Stack Web Developer",
    company: "Freelance",
    period: "AUG 2024~JUN 2025",
    type: "CONTRACT",
    color: "#ff2d78",
    points: [
      "Airline booking platform with Next.js + NestJS",
      "Visual editor with real-time style editing & billing",
      "Role-based access control & authentication systems",
    ],
  },
  {
    role: "Junior Frontend Developer",
    company: "Mediusware Ltd",
    period: "MAR~JUL 2024",
    type: "FULL-TIME",
    color: "#00fff5",
    points: [
      "Drag-and-drop website builder with multi-tenancy",
      "GraphQL API integration for dynamic rendering",
      "Event management software collaboration",
    ],
  },
  {
    role: "Frontend Trainee",
    company: "Mediusware Ltd",
    period: "DEC 2023~FEB 2024",
    type: "INTERNSHIP",
    color: "#ffe600",
    points: [
      "Profile CRUD with role-based access control",
      "Task management and customer order modules",
      "Preferences page logic implementation",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Freelance",
    period: "SEP 2022~NOV 2023",
    type: "FREELANCE",
    color: "#ff2d78",
    points: [
      "Full-stack apps: task managers, auth systems, CRUD",
      "REST API design, DB modeling, deployment",
      "Version control & debugging mastery",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    id: "PRJ-001",
    name: "COLLABIER SAAS",
    url: "collabier-sass-x.vercel.app",
    status: "LIVE",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Stripe"],
    desc: "Full-featured visual editor platform. Real-time style editing, reusable components, project dashboard, and integrated billing/subscription system.",
    year: "2025",
  },
  {
    id: "PRJ-002",
    name: "FLIGHT BOOKING SYS",
    url: "flight-booking-x.vercel.app",
    status: "LIVE",
    tech: ["Next.js", "NestJS", "REST API", "JWT"],
    desc: "Secure airline booking platform with RBAC, CRUD for airlines/airports/planes/routes, and smooth user authentication for booking flows.",
    year: "2024",
  },
  {
    id: "PRJ-003",
    name: "SCHOOL MGMT SYS",
    url: "scl-mgt-sys-client.vercel.app",
    status: "LIVE",
    tech: ["React.js", "Node.js", "MongoDB"],
    desc: "Comprehensive school ERP system with student records, scheduling, teacher dashboards, grade management, and admin controls.",
    year: "2024",
  },
  {
    id: "PRJ-004",
    name: "DASHBOARD UI",
    url: "dash-b0ard.netlify.app",
    status: "LIVE",
    tech: ["React.js", "Tailwind CSS", "Recharts"],
    desc: "Modern analytics dashboard with data visualizations, dark mode, responsive layout, and real-time data table components.",
    year: "2023",
  },
];

const NAV_SECTIONS = ["home", "experience", "projects", "skills", "contact"];

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

interface RevealProps {
  children: ReactNode;
  delay?: number;
}
function Reveal({ children, delay = 0 }: RevealProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

interface TypeWriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
}
function TypeWriter({ text, speed = 40, startDelay = 0 }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);
  return (
    <span>
      {displayed}
      <span
        style={{ animation: "blink 1s step-end infinite", color: "#00fff5" }}
      >
        █
      </span>
    </span>
  );
}

interface SkillBarProps {
  name: string;
  lvl: number;
  delay: number;
}
function SkillBar({ name, lvl, delay }: SkillBarProps) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{ fontSize: 10, letterSpacing: "0.15em", color: "#5a8a8a" }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "#00fff5",
            fontFamily: "monospace",
          }}
        >
          {inView ? lvl : 0}%
        </span>
      </div>
      <div
        style={{
          height: 2,
          background: "#0a1a1a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            background: "linear-gradient(90deg, #00fff5, #ff2d78)",
            width: inView ? `${lvl}%` : "0%",
            transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            boxShadow: "0 0 8px #00fff5",
          }}
        />
      </div>
    </div>
  );
}

function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      },
      4000 + Math.random() * 3000,
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {text}
      {glitch && (
        <>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 2,
              color: "#ff2d78",
              clipPath: "inset(30% 0 50% 0)",
              animation: "glitch1 0.15s steps(1) forwards",
              pointerEvents: "none",
            }}
          >
            {text}
          </span>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: -2,
              color: "#00fff5",
              clipPath: "inset(60% 0 20% 0)",
              animation: "glitch2 0.15s steps(1) forwards",
              pointerEvents: "none",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

function ScanlineOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,245,0.015) 2px, rgba(0,255,245,0.015) 4px)",
        pointerEvents: "none",
        zIndex: 999,
      }}
    />
  );
}

function GridBg() {
  return (
    <div
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,245,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0,255,245,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,45,120,0.04) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

interface PanelHeaderProps {
  id: string;
  title: string;
  sub?: string;
}
function PanelHeader({ id, title, sub }: PanelHeaderProps) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 3,
            height: 32,
            background: "linear-gradient(180deg, #00fff5, #ff2d78)",
            flexShrink: 0,
          }}
        />
        <div>
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.25em",
              color: "#ff2d78",
              textTransform: "uppercase",
              marginBottom: 4,
              fontFamily: "monospace",
            }}
          >
            {id}
          </p>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(20px,3vw,36px)",
              letterSpacing: "0.05em",
              color: "#e0f8f8",
              textTransform: "uppercase",
            }}
          >
            {title}
          </h2>
        </div>
      </div>
      {sub && (
        <p
          style={{
            fontSize: 11,
            color: "#3a6060",
            letterSpacing: "0.1em",
            paddingLeft: 19,
            borderLeft: "1px solid #0a2a2a",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default function PortfolioV3() {
  const router = useRouter();

  const [activeProject, setActiveProject] = useState(0);
  const [navActive, setNavActive] = useState("home");
  const [time, setTime] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expOpen, setExpOpen] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const found = [...NAV_SECTIONS].reverse().find((id) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= 120;
      });
      if (found) setNavActive(found);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (id === "v2") router.push("/v2");
    else if (id === "v3") router.push("/v3");
    else if (id === "danger") router.push("/terminal");
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const expColor = (c: string) =>
    c === "#00fff5"
      ? "0,255,245"
      : c === "#ff2d78"
        ? "255,45,120"
        : "255,230,0";

  return (
    <div
      style={{
        background: "#020d0d",
        color: "#a0c8c8",
        fontFamily: "'Share Tech Mono', monospace",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #020d0d; }
        ::-webkit-scrollbar-thumb { background: #00fff5; }

        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes glitch1 { 0% { transform:translate(0); } 50% { transform:translate(3px,-2px); } 100% { transform:translate(0); } }
        @keyframes glitch2 { 0% { transform:translate(0); } 50% { transform:translate(-3px,2px); } 100% { transform:translate(0); } }
        @keyframes flicker { 0%,100% { opacity:1; } 92% { opacity:1; } 93% { opacity:0.7; } 94% { opacity:1; } 96% { opacity:0.8; } 97% { opacity:1; } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes accordionOpen { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

        .nav-btn { background:none; border:none; font-family:'Share Tech Mono',monospace; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:#3a6060; cursor:pointer; padding:8px 16px; border:1px solid transparent; transition:all 0.2s; }
        .nav-btn:hover, .nav-btn.active { color:#00fff5; border-color:rgba(0,255,245,0.2); background:rgba(0,255,245,0.04); text-shadow:0 0 8px #00fff5; }

        .proj-tab { background:#030f0f; border:1px solid #0a2020; padding:16px 20px; cursor:pointer; transition:all 0.3s; text-align:left; width:100%; font-family:'Share Tech Mono',monospace; }
        .proj-tab:hover { border-color:#00fff5; background:rgba(0,255,245,0.04); }
        .proj-tab.ptactive { border-color:#00fff5; background:rgba(0,255,245,0.06); border-left:2px solid #00fff5; }

        .cta-btn { font-family:'Orbitron',sans-serif; font-size:10px; letter-spacing:0.15em; cursor:pointer; transition:all 0.3s; text-transform:uppercase; border:none; }
        .cta-primary { background:transparent; color:#00fff5; border:1px solid #00fff5; padding:14px 32px; }
        .cta-primary:hover { background:#00fff5; color:#020d0d; box-shadow:0 0 30px rgba(0,255,245,0.4); }
        .cta-ghost { background:transparent; color:#ff2d78; border:1px solid rgba(255,45,120,0.3); padding:14px 32px; }
        .cta-ghost:hover { border-color:#ff2d78; background:rgba(255,45,120,0.06); box-shadow:0 0 20px rgba(255,45,120,0.2); }

        .skill-col { background:#030f0f; border:1px solid #0a2020; padding:28px; }

        .contact-field { background:#030f0f; border:1px solid #0a2020; padding:14px 18px; font-family:'Share Tech Mono',monospace; font-size:12px; color:#a0c8c8; width:100%; outline:none; transition:border-color 0.2s; }
        .contact-field:focus { border-color:#00fff5; box-shadow:0 0 12px rgba(0,255,245,0.1); }
        .contact-field::placeholder { color:#1a3a3a; }

        .corner { position:absolute; width:12px; height:12px; }
        .corner-tl { top:0; left:0; border-top:1px solid #00fff5; border-left:1px solid #00fff5; }
        .corner-tr { top:0; right:0; border-top:1px solid #00fff5; border-right:1px solid #00fff5; }
        .corner-bl { bottom:0; left:0; border-bottom:1px solid #00fff5; border-left:1px solid #00fff5; }
        .corner-br { bottom:0; right:0; border-bottom:1px solid #00fff5; border-right:1px solid #00fff5; }

        /* Hamburger */
        .hamburger { display:none; background:none; border:none; cursor:pointer; padding:4px; flex-direction:column; gap:5px; align-items:flex-end; }
        .hamburger span { display:block; height:1.5px; background:#00fff5; transition:all 0.3s; box-shadow:0 0 4px #00fff5; }
        .hamburger span:nth-child(1) { width:22px; }
        .hamburger span:nth-child(2) { width:16px; }
        .hamburger span:nth-child(3) { width:22px; }
        .hamburger.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); width:22px; }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); width:22px; }

        /* Mobile menu */
        .mobile-menu {
          position:fixed; inset:0; z-index:300;
          background:rgba(2,13,13,0.98); backdrop-filter:blur(20px);
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px;
          transform:translateX(100%); transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-menu.open { transform:translateX(0); }
        .mobile-menu-btn {
          background:none; border:1px solid transparent; cursor:pointer;
          font-family:'Orbitron',sans-serif; font-size:clamp(16px,5vw,24px);
          letter-spacing:0.15em; text-transform:uppercase; color:#3a6060;
          padding:10px 24px; transition:all 0.2s;
        }
        .mobile-menu-btn:hover { color:#00fff5; border-color:rgba(0,255,245,0.3); text-shadow:0 0 12px #00fff5; }

        /* Accordion for exp on mobile */
        .exp-accordion-btn {
          background:rgba(0,255,245,0.01); border:1px solid #061616; border-left:none;
          padding:20px 24px; width:100%; text-align:left; font-family:'Share Tech Mono',monospace;
          cursor:pointer; display:flex; justify-content:space-between; align-items:center;
          transition:all 0.3s;
        }
        .exp-accordion-btn.open { border-color:#00fff5; background:rgba(0,255,245,0.03); }

        /* ── TABLET (768–1023px) ── */
        @media (min-width:768px) and (max-width:1023px) {
          .hamburger { display:flex !important; }
          .desktop-nav-links { display:none !important; }
          .status-cursor { display:none !important; }
          .nav-location { display:none !important; }

          .hero-grid { grid-template-columns:1fr !important; gap:40px !important; }
          .hero-hud { max-width:500px !important; }

          .exp-row { grid-template-columns:1fr !important; }
          .exp-period-col { display:none !important; }

          .proj-layout { grid-template-columns:200px 1fr !important; }

          .skills-grid { grid-template-columns:1fr !important; }
          .contact-grid { grid-template-columns:1fr !important; gap:4px !important; }

          .section-pad { padding:80px 32px !important; }
          .hero-section { padding:108px 32px 64px !important; }
          nav { padding:0 32px !important; }
          .status-bar { padding:0 24px !important; }
          footer { padding:20px 32px !important; }
        }

        /* ── MOBILE (<768px) ── */
        @media (max-width:767px) {
          .hamburger { display:flex !important; }
          .desktop-nav-links { display:none !important; }
          .status-cursor { display:none !important; }
          .nav-location { display:none !important; }
          .status-build { display:none !important; }

          .status-bar { padding:0 16px !important; height:32px !important; }
          nav { padding:0 16px !important; height:46px !important; top:32px !important; }
          .nav-logo-text { font-size:11px !important; }

          .hero-section { padding:96px 16px 56px !important; min-height:100svh !important; }
          .hero-grid { grid-template-columns:1fr !important; gap:36px !important; }
          .hero-hud { width:100% !important; }
          .hero-cta { flex-direction:column !important; }
          .hero-cta .cta-btn { width:100% !important; text-align:center !important; }

          .section-pad { padding:56px 16px !important; }

          /* Experience: accordion on mobile */
          .exp-tab-layout { display:none !important; }
          .exp-accordion-layout { display:block !important; }

          /* Projects: tabs become select-style stack */
          .proj-layout { grid-template-columns:1fr !important; }
          .proj-tab-list { display:flex !important; flex-direction:row !important; overflow-x:auto !important; gap:2px !important; padding-bottom:4px !important; scrollbar-width:none !important; }
          .proj-tab-list::-webkit-scrollbar { display:none !important; }
          .proj-tab { padding:10px 14px !important; white-space:nowrap !important; flex-shrink:0 !important; }

          .skills-grid { grid-template-columns:1fr !important; }
          .contact-grid { grid-template-columns:1fr !important; gap:4px !important; }

          .bg-text { display:none !important; }

          footer { padding:16px 16px !important; flex-direction:column !important; align-items:flex-start !important; gap:8px !important; }
          .footer-mid { display:none !important; }
        }
      `}</style>

      <ScanlineOverlay />
      <GridBg />

      {/* Cursor glow — desktop only */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,255,245,0.04) 0%, transparent 70%)",
            transform: "translate(-50%,-50%)",
            left: mousePos.x,
            top: mousePos.y,
            pointerEvents: "none",
            zIndex: 1,
            transition: "left 0.1s, top 0.1s",
          }}
        />
      )}

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: 16,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#3a6060",
            lineHeight: 1,
            fontFamily: "monospace",
          }}
        >
          ✕
        </button>
        {NAV_SECTIONS.map((s) => (
          <button
            key={s}
            className="mobile-menu-btn"
            onClick={() => scrollTo(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* TOP STATUS BAR */}
      <div
        className="status-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "rgba(2,13,13,0.98)",
          borderBottom: "1px solid #0a2020",
          padding: "0 24px",
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{ fontSize: 9, letterSpacing: "0.2em", color: "#00fff5" }}
            >
              SYS ONLINE
            </span>
          </div>
          <span
            className="status-build"
            style={{ fontSize: 9, color: "#1a4040", letterSpacing: "0.1em" }}
          >
            NODE: DHK-BD-001
          </span>
          <span
            className="status-build"
            style={{ fontSize: 9, color: "#1a4040", letterSpacing: "0.1em" }}
          >
            BUILD: v3.2.1
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span
            className="status-cursor"
            style={{
              fontSize: 9,
              color: "#3a6060",
              letterSpacing: "0.1em",
              fontFamily: "monospace",
            }}
          >
            CURSOR: {mousePos.x.toString().padStart(4, "0")},
            {mousePos.y.toString().padStart(4, "0")}
          </span>
          <span
            style={{
              fontSize: 9,
              color: "#00fff5",
              letterSpacing: "0.15em",
              fontFamily: "monospace",
              animation: "flicker 8s ease infinite",
            }}
          >
            {time}
          </span>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav
        style={{
          position: "fixed",
          top: 36,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "rgba(2,13,13,0.95)",
          borderBottom: "1px solid #0a1a1a",
          padding: "0 32px",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              border: "1px solid #00fff5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "spin 12s linear infinite",
              flexShrink: 0,
            }}
          >
            <div style={{ width: 8, height: 8, background: "#00fff5" }} />
          </div>
          <span
            className="nav-logo-text"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 13,
              letterSpacing: "0.15em",
              color: "#00fff5",
              textShadow: "0 0 12px #00fff5",
            }}
          >
            NC<span style={{ color: "#ff2d78" }}>::</span>DEV
          </span>
        </div>

        {/* Desktop links */}
        <div
          className="desktop-nav-links"
          style={{ display: "flex", gap: 4, flexWrap: "nowrap" }}
        >
          {NAV_SECTIONS.map((s) => (
            <button
              key={s}
              className={`nav-btn ${navActive === s ? "active" : ""}`}
              onClick={() => scrollTo(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div
          className="nav-location"
          style={{ fontSize: 9, letterSpacing: "0.1em", color: "#1a4040" }}
        >
          DHAKA, BD · AVAILABLE
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        id="home"
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "120px 48px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="bg-text"
          style={{
            position: "absolute",
            right: -40,
            top: "50%",
            transform: "translateY(-60%) rotate(90deg)",
            fontFamily: "'Orbitron',sans-serif",
            fontSize: "clamp(60px,12vw,160px)",
            letterSpacing: "0.1em",
            color: "rgba(0,255,245,0.025)",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          FULL_STACK
        </div>

        <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto" }}>
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  color: "#ff2d78",
                  textTransform: "uppercase",
                  marginBottom: 20,
                  opacity: 0,
                  animation: "fadeUp 0.8s ease 0.2s forwards",
                }}
              >
                // INITIALIZING PORTFOLIO . . .
              </p>
              <h1
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(30px,5vw,68px)",
                  lineHeight: 1.1,
                  letterSpacing: "0.05em",
                  color: "#e0f8f8",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  opacity: 0,
                  animation: "fadeUp 0.8s ease 0.4s forwards",
                  textShadow: "0 0 40px rgba(0,255,245,0.2)",
                }}
              >
                <GlitchText text="NADIM" />
              </h1>
              <h1
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(30px,5vw,68px)",
                  lineHeight: 1.1,
                  letterSpacing: "0.05em",
                  color: "#ff2d78",
                  textTransform: "uppercase",
                  marginBottom: 32,
                  opacity: 0,
                  animation: "fadeUp 0.8s ease 0.5s forwards",
                  textShadow: "0 0 30px rgba(255,45,120,0.3)",
                }}
              >
                CHOWDHURY
              </h1>
              <div
                style={{
                  fontSize: 13,
                  color: "#3a8080",
                  marginBottom: 40,
                  lineHeight: 1.9,
                  opacity: 0,
                  animation: "fadeUp 0.8s ease 0.7s forwards",
                }}
              >
                <TypeWriter
                  text="> Full Stack Developer. 3+ yrs. Dhaka, BD."
                  speed={45}
                  startDelay={800}
                />
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "#4a7070",
                  lineHeight: 1.8,
                  maxWidth: 400,
                  marginBottom: 48,
                  opacity: 0,
                  animation: "fadeUp 0.8s ease 0.9s forwards",
                }}
              >
                Building large-scale ERP systems, SaaS platforms, and
                interactive business applications with clean architecture and
                scalable design patterns.
              </p>
              <div
                className="hero-cta"
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  opacity: 0,
                  animation: "fadeUp 0.8s ease 1.1s forwards",
                }}
              >
                <button
                  className="cta-btn cta-primary"
                  onClick={() => scrollTo("projects")}
                >
                  [ EXPLORE WORK ]
                </button>
                <button
                  className="cta-btn cta-ghost"
                  onClick={() => scrollTo("contact")}
                >
                  [ INITIATE CONTACT ]
                </button>
              </div>
            </div>

            {/* Right: HUD */}
            <div
              className="hero-hud"
              style={{
                opacity: 0,
                animation: "fadeUp 0.8s ease 0.6s forwards",
              }}
            >
              <div
                style={{
                  background: "rgba(0,255,245,0.02)",
                  border: "1px solid #0a2020",
                  padding: "32px",
                  position: "relative",
                }}
              >
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "#00fff5",
                    marginBottom: 24,
                    borderBottom: "1px solid #0a2020",
                    paddingBottom: 12,
                  }}
                >
                  // OPERATOR PROFILE ═══════════
                </p>
                {(
                  [
                    { label: "DESIGNATION", value: "Full Stack Developer" },
                    { label: "CLEARANCE", value: "React · Next.js · NestJS" },
                    { label: "NODE", value: "Dhaka, Bangladesh" },
                    { label: "UPTIME", value: "3+ Years Active" },
                    { label: "PROJECTS", value: "20+ Deployed" },
                    { label: "STATUS", value: "AVAILABLE FOR HIRE" },
                  ] as { label: string; value: string }[]
                ).map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #061616",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.15em",
                        color: "#2a5050",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: label === "STATUS" ? "#00fff5" : "#6a9898",
                        letterSpacing: "0.05em",
                        textShadow:
                          label === "STATUS" ? "0 0 8px #00fff5" : "none",
                        textAlign: "right",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  {(
                    [
                      {
                        label: "GH",
                        url: "https://github.com/nadim-chowdhury",
                      },
                      {
                        label: "LI",
                        url: "https://linkedin.com/in/nadim-chowdhury",
                      },
                      { label: "WEB", url: "https://nadim.vercel.app" },
                    ] as { label: string; url: string }[]
                  ).map(({ label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        color: "#2a5050",
                        textDecoration: "none",
                        border: "1px solid #0a1a1a",
                        padding: "6px 14px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#00fff5";
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.borderColor = "#00fff5";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                          "0 0 12px rgba(0,255,245,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#2a5050";
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.borderColor = "#0a1a1a";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                          "none";
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section
        id="experience"
        className="section-pad"
        style={{
          padding: "100px 48px",
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid #061616",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <PanelHeader
              id="// MODULE_02"
              title="Experience"
              sub="CAREER HISTORY · SORTED BY DATE DESC"
            />
          </Reveal>

          {/* Desktop/Tablet: normal rows */}
          <div
            className="exp-tab-layout"
            style={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            {EXPERIENCE.map((exp, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="exp-row"
                  style={{
                    background: "rgba(0,255,245,0.01)",
                    border: "1px solid #061616",
                    padding: "28px 32px",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 32,
                    alignItems: "start",
                    transition: "all 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      exp.color;
                    (e.currentTarget as HTMLDivElement).style.background =
                      `rgba(${expColor(exp.color)},0.03)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "#061616";
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(0,255,245,0.01)";
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          background: exp.color,
                          boxShadow: `0 0 8px ${exp.color}`,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.2em",
                          color: exp.color,
                        }}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Orbitron',sans-serif",
                        fontSize: "clamp(11px,1.3vw,14px)",
                        letterSpacing: "0.05em",
                        color: "#c0e8e8",
                        marginBottom: 4,
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#3a7070",
                        letterSpacing: "0.1em",
                        marginBottom: 16,
                      }}
                    >
                      {exp.company}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {exp.points.map((pt, j) => (
                        <p
                          key={j}
                          style={{
                            fontSize: 11,
                            color: "#3a6060",
                            lineHeight: 1.6,
                          }}
                        >
                          <span style={{ color: exp.color, marginRight: 8 }}>
                            ›
                          </span>
                          {pt}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div
                    className="exp-period-col"
                    style={{ textAlign: "right" }}
                  >
                    <p
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        color: "#1a3a3a",
                        whiteSpace: "nowrap",
                        fontFamily: "monospace",
                      }}
                    >
                      {exp.period}
                    </p>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 2,
                      height: "100%",
                      background: exp.color,
                      opacity: 0.3,
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile: accordion */}
          <div
            className="exp-accordion-layout"
            style={{ display: "none", border: "1px solid #061616" }}
          >
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                style={{
                  borderLeft: `2px solid ${expOpen === i ? exp.color : "#061616"}`,
                  transition: "border-color 0.3s",
                }}
              >
                <button
                  className={`exp-accordion-btn ${expOpen === i ? "open" : ""}`}
                  onClick={() => setExpOpen(expOpen === i ? null : i)}
                  style={{
                    borderLeftColor: expOpen === i ? exp.color : "transparent",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          background: exp.color,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.2em",
                          color: exp.color,
                        }}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Orbitron',sans-serif",
                        fontSize: 11,
                        color: "#c0e8e8",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {exp.role}
                    </p>
                    <p style={{ fontSize: 10, color: "#3a7070", marginTop: 2 }}>
                      {exp.company} · {exp.period}
                    </p>
                  </div>
                  <span
                    style={{
                      color: exp.color,
                      fontSize: 16,
                      transition: "transform 0.3s",
                      transform: expOpen === i ? "rotate(45deg)" : "none",
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  >
                    +
                  </span>
                </button>
                {expOpen === i && (
                  <div
                    style={{
                      padding: "20px 24px",
                      background: `rgba(${expColor(exp.color)},0.02)`,
                      borderBottom: "1px solid #061616",
                      animation: "accordionOpen 0.3s ease forwards",
                    }}
                  >
                    {exp.points.map((pt, j) => (
                      <p
                        key={j}
                        style={{
                          fontSize: 11,
                          color: "#3a6060",
                          lineHeight: 1.8,
                          marginBottom: 6,
                        }}
                      >
                        <span style={{ color: exp.color, marginRight: 8 }}>
                          ›
                        </span>
                        {pt}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section
        id="projects"
        className="section-pad"
        style={{
          padding: "100px 48px",
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid #061616",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <PanelHeader
              id="// MODULE_03"
              title="Projects"
              sub="DEPLOYED SYSTEMS · ALL LIVE"
            />
          </Reveal>
          <div
            className="proj-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: 1,
            }}
          >
            {/* Tab list */}
            <div
              className="proj-tab-list"
              style={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {PROJECTS.map((proj, i) => (
                <button
                  key={i}
                  className={`proj-tab ${activeProject === i ? "ptactive" : ""}`}
                  onClick={() => setActiveProject(i)}
                >
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      color: "#2a5050",
                      marginBottom: 6,
                    }}
                  >
                    {proj.id}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: activeProject === i ? "#00fff5" : "#5a8888",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {proj.name}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#00ff88",
                        boxShadow: "0 0 4px #00ff88",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 9,
                        color: "#1a5040",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {proj.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div
              key={activeProject}
              style={{
                background: "rgba(0,255,245,0.02)",
                border: "1px solid #0a2020",
                padding: "clamp(20px,3vw,40px)",
                position: "relative",
                opacity: 0,
                animation: "fadeUp 0.4s ease forwards",
                minWidth: 0,
              }}
            >
              <div className="corner corner-tl" />
              <div className="corner corner-tr" />
              <div className="corner corner-bl" />
              <div className="corner corner-br" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 24,
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      color: "#2a5050",
                      marginBottom: 8,
                    }}
                  >
                    {PROJECTS[activeProject].id} ·{" "}
                    {PROJECTS[activeProject].year}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Orbitron',sans-serif",
                      fontSize: "clamp(14px,2vw,20px)",
                      letterSpacing: "0.08em",
                      color: "#00fff5",
                      textShadow: "0 0 20px rgba(0,255,245,0.3)",
                      textTransform: "uppercase",
                    }}
                  >
                    {PROJECTS[activeProject].name}
                  </h3>
                </div>
                <a
                  href={`https://${PROJECTS[activeProject].url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    color: "#ff2d78",
                    border: "1px solid rgba(255,45,120,0.3)",
                    padding: "8px 16px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,45,120,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "transparent";
                  }}
                >
                  LAUNCH ↗
                </a>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "#4a7070",
                  lineHeight: 1.85,
                  marginBottom: 32,
                }}
              >
                {PROJECTS[activeProject].desc}
              </p>
              <div>
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "#2a5050",
                    marginBottom: 12,
                  }}
                >
                  // TECH STACK
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {PROJECTS[activeProject].tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.12em",
                        color: "#00fff5",
                        border: "1px solid rgba(0,255,245,0.15)",
                        padding: "4px 12px",
                        background: "rgba(0,255,245,0.04)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    color: "#1a3a3a",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  URL:{" "}
                  <span style={{ color: "#2a5050" }}>
                    {PROJECTS[activeProject].url}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section
        id="skills"
        className="section-pad"
        style={{
          padding: "100px 48px",
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid #061616",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <PanelHeader
              id="// MODULE_04"
              title="Skills"
              sub="CAPABILITY MATRIX · PROFICIENCY INDEXED"
            />
          </Reveal>
          <div
            className="skills-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}
          >
            <div className="skill-col">
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "#00fff5",
                  marginBottom: 24,
                  borderBottom: "1px solid #061616",
                  paddingBottom: 10,
                }}
              >
                // FRONTEND_CORE
              </p>
              {SKILLS.slice(0, 6).map((s, i) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  lvl={s.lvl}
                  delay={i * 0.08}
                />
              ))}
            </div>
            <div className="skill-col">
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "#ff2d78",
                  marginBottom: 24,
                  borderBottom: "1px solid #061616",
                  paddingBottom: 10,
                }}
              >
                // BACKEND_INFRA
              </p>
              {SKILLS.slice(6).map((s, i) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  lvl={s.lvl}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
          <Reveal delay={0.2}>
            <div
              style={{
                marginTop: 1,
                background: "#030f0f",
                border: "1px solid #061616",
                padding: "24px 32px",
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              {[
                "React Native",
                "Flutter",
                "Bootstrap",
                "Sass",
                "Ant Design",
                "Postman",
                "Swagger",
                "GitHub",
                "Vercel",
                "Netlify",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    color: "#2a5050",
                  }}
                >
                  <span style={{ color: "#1a4040", marginRight: 6 }}>›</span>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section
        id="contact"
        className="section-pad"
        style={{
          padding: "100px 48px 60px",
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid #061616",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <PanelHeader
              id="// MODULE_05"
              title="Contact"
              sub="OPEN CHANNEL · RESPONSE TIME < 24H"
            />
          </Reveal>
          <div
            className="contact-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}
          >
            <Reveal>
              <div
                style={{
                  background: "rgba(0,255,245,0.02)",
                  border: "1px solid #0a2020",
                  padding: "clamp(24px,3vw,40px)",
                  position: "relative",
                }}
              >
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "#00fff5",
                    marginBottom: 24,
                  }}
                >
                  // DIRECT_CHANNELS
                </p>
                {(
                  [
                    {
                      label: "EMAIL",
                      value: "nadim-chowdhury@outlook.com",
                      href: "mailto:nadim-chowdhury@outlook.com",
                      color: "#00fff5",
                    },
                    {
                      label: "PHONE",
                      value: "+880 1971 258803",
                      href: "tel:+8801971258803",
                      color: "#00fff5",
                    },
                    {
                      label: "GITHUB",
                      value: "github.com/nadim-chowdhury",
                      href: "https://github.com/nadim-chowdhury",
                      color: "#ff2d78",
                    },
                    {
                      label: "LINKEDIN",
                      value: "linkedin.com/in/nadim-chowdhury",
                      href: "https://linkedin.com/in/nadim-chowdhury",
                      color: "#ff2d78",
                    },
                    {
                      label: "PORTFOLIO",
                      value: "nadim.vercel.app",
                      href: "https://nadim.vercel.app",
                      color: "#ffe600",
                    },
                  ] as {
                    label: string;
                    value: string;
                    href: string;
                    color: string;
                  }[]
                ).map(({ label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "14px 0",
                      borderBottom: "1px solid #061616",
                      textDecoration: "none",
                      transition: "padding-left 0.2s",
                      gap: 12,
                    }}
                    onMouseEnter={(e) =>
                      ((
                        e.currentTarget as HTMLAnchorElement
                      ).style.paddingLeft = "8px")
                    }
                    onMouseLeave={(e) =>
                      ((
                        e.currentTarget as HTMLAnchorElement
                      ).style.paddingLeft = "0")
                    }
                  >
                    <span
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.2em",
                        color: "#1a4040",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#3a7070",
                        transition: "color 0.2s",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "right",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLSpanElement).style.color =
                          color)
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLSpanElement).style.color =
                          "#3a7070")
                      }
                    >
                      {value}
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div
                style={{
                  background: "#030f0f",
                  border: "1px solid #0a2020",
                  padding: "clamp(24px,3vw,40px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "#ff2d78",
                    marginBottom: 8,
                  }}
                >
                  // SEND_MESSAGE
                </p>
                <input className="contact-field" placeholder="// YOUR_NAME" />
                <input className="contact-field" placeholder="// YOUR_EMAIL" />
                <textarea
                  className="contact-field"
                  placeholder="// YOUR_MESSAGE . . ."
                  rows={4}
                  style={{ resize: "none" }}
                />
                <button
                  className="cta-btn cta-primary"
                  style={{ width: "100%", marginTop: 8 }}
                >
                  [ TRANSMIT MESSAGE ]
                </button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      color: "#1a5040",
                    }}
                  >
                    SYSTEM READY · OPEN FOR OPPORTUNITIES
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "24px 48px",
          borderTop: "1px solid #061616",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'Orbitron',sans-serif",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "#a2d2d2",
          }}
        >
          NC::DEV © 2025
        </span>
        <span
          className="footer-mid"
          style={{ fontSize: 9, letterSpacing: "0.1em", color: "#0a2020" }}
        >
          FULL STACK DEVELOPER · DHAKA, BD · ALL SYSTEMS NOMINAL
        </span>
        <span
          style={{ fontSize: 9, letterSpacing: "0.15em", color: "#00fff5" }}
        >
          ONLINE
        </span>
      </footer>
    </div>
  );
}
