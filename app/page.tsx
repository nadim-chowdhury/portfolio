"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties } from "react";

interface Theme {
  name: string;
  bg: string;
  surface: string;
  surfaceHigh: string;
  border: string;
  text: string;
  dim: string;
  muted: string;
  accent: string;
  accentSoft: string;
  green: string;
  red: string;
  yellow: string;
  blue: string;
  prompt: string;
  cursor: string;
}

type LineType =
  | "br"
  | "divider"
  | "banner"
  | "tags"
  | "expcard"
  | "projrow"
  | "neofetch"
  | "themerow"
  | "out"
  | "hdr"
  | "dim"
  | "acc"
  | "ok"
  | "err"
  | "warn"
  | "link"
  | "cmd"
  | "code"
  | "clear";

interface ExpEntry {
  n: string;
  role: string;
  co: string;
  period: string;
  type: string;
  stack: string[];
  desc: string;
}

interface ProjectEntry {
  id: string;
  name: string;
  cat: string;
  url: string;
  year: string;
  stack: string[];
  desc: string;
}

interface TagsMeta {
  items: string[];
}
interface NeofetchMeta {
  theme: Theme;
}
interface ThemeRowMeta {
  key: string;
  th: Theme;
  current: boolean;
}

type LineMeta =
  | ExpEntry
  | ProjectEntry
  | TagsMeta
  | NeofetchMeta
  | ThemeRowMeta
  | null;

interface Line {
  id: number;
  text: string;
  type: LineType;
  url: string | null;
  meta: LineMeta;
}

interface BootEntry {
  t: number;
  text: string;
  type: string;
}
interface SequenceEntry {
  t: number;
  text: string;
  type: string;
}

function TerminalBackground({ accent, bg }: { accent: string; bg: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const accentRef = useRef(accent);
  useEffect(() => {
    accentRef.current = accent;
  }, [accent]);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (!canvas) return;
    const ctx: any = canvas.getContext("2d");
    if (!ctx) return;
    const bgHex = bg;

    function hexToRgb(hex: string): [number, number, number] {
      const h = hex.replace("#", "");
      const n = parseInt(
        h.length === 3
          ? h
              .split("")
              .map((c) => c + c)
              .join("")
          : h,
        16,
      );
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    const CELL = 32;
    const FONT_SIZE = 11;
    const BINARY_CHARS: readonly string[] = ["0", "1"];

    type Drop = {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      opacity: number;
      length: number;
    };
    let drops: Drop[] = [];
    let cols = 0;
    let rows = 0;
    let animId = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL);
      rows = Math.ceil(canvas.height / CELL);
      drops = [];
      for (let i = 0; i < cols; i++) {
        if (Math.random() < 0.35) spawnDrop(i, -Math.random() * rows);
      }
    }

    function spawnDrop(col: number, startY?: number) {
      const length = 4 + Math.floor(Math.random() * 10);
      drops.push({
        x: col,
        y: startY ?? -Math.random() * rows,
        speed: 0.04 + Math.random() * 0.08,
        length,
        opacity: 0.15 + Math.random() * 0.35,
        chars: Array.from(
          { length },
          () => BINARY_CHARS[Math.floor(Math.random() * 2)] ?? "0",
        ),
      });
    }

    function drawGrid(accentHex: string) {
      const [r, g, b] = hexToRgb(accentHex);
      ctx.strokeStyle = `rgba(${r},${g},${b},0.055)`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += CELL) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y <= canvas.height; y += CELL) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
      ctx.strokeStyle = `rgba(${r},${g},${b},0.11)`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += CELL * 4) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y <= canvas.height; y += CELL * 4) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
      ctx.fillStyle = `rgba(${r},${g},${b},0.18)`;
      for (let x = 0; x <= canvas.width; x += CELL * 4) {
        for (let y = 0; y <= canvas.height; y += CELL * 4) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawBinary(accentHex: string) {
      const [r, g, b] = hexToRgb(accentHex);
      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const drop of drops) {
        for (let i = 0; i < drop.chars.length; i++) {
          const row = Math.floor(drop.y) - i;
          if (row < 0 || row > rows) continue;
          const headAlpha =
            i === 0 ? drop.opacity : drop.opacity * (1 - i / drop.length);
          if (headAlpha < 0.01) continue;
          ctx.fillStyle = `rgba(${r},${g},${b},${headAlpha.toFixed(3)})`;
          ctx.fillText(
            drop.chars[i] ?? "0",
            drop.x * CELL + CELL / 2,
            row * CELL + CELL / 2,
          );
        }
      }
    }

    let frame = 0;
    function animate() {
      animId = requestAnimationFrame(animate);
      frame++;
      const [br, bg2, bb] = hexToRgb(bgHex);
      ctx.fillStyle = `rgba(${br},${bg2},${bb},1)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid(accentRef.current);
      drawBinary(accentRef.current);
      for (let i = drops.length - 1; i >= 0; i--) {
        drops[i].y += drops[i].speed;
        if (frame % 8 === 0 && Math.random() < 0.3) {
          const ci = Math.floor(Math.random() * drops[i].chars.length);
          drops[i].chars[ci] =
            BINARY_CHARS[Math.floor(Math.random() * 2)] ?? "0";
        }
        if (drops[i].y - drops[i].length > rows) drops.splice(i, 1);
      }
      if (frame % 20 === 0) {
        const col = Math.floor(Math.random() * cols);
        const alreadyActive = drops.some(
          (d) => d.x === col && d.y > 0 && d.y < rows,
        );
        if (!alreadyActive) spawnDrop(col, 0);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bg]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

const THEMES: Record<string, Theme> = {
  ghost: {
    name: "Ghost",
    bg: "#0C0C0F",
    surface: "#111116",
    surfaceHigh: "#16161C",
    border: "#1E1E28",
    text: "#E2E2E8",
    dim: "#2A2A38",
    muted: "#5A5A6A",
    accent: "#7C6AF7",
    accentSoft: "rgba(124,106,247,0.12)",
    green: "#4ADE80",
    red: "#F87171",
    yellow: "#FCD34D",
    blue: "#60A5FA",
    prompt: "#7C6AF7",
    cursor: "#7C6AF7",
  },
  ash: {
    name: "Ash",
    bg: "#101012",
    surface: "#141417",
    surfaceHigh: "#18181C",
    border: "#222228",
    text: "#D4D4DC",
    dim: "#2A2A32",
    muted: "#585868",
    accent: "#38BDF8",
    accentSoft: "rgba(56,189,248,0.1)",
    green: "#34D399",
    red: "#FB7185",
    yellow: "#FDE68A",
    blue: "#818CF8",
    prompt: "#38BDF8",
    cursor: "#38BDF8",
  },
  ember: {
    name: "Ember",
    bg: "#0E0A08",
    surface: "#130F0C",
    surfaceHigh: "#181310",
    border: "#241E18",
    text: "#E8DDD5",
    dim: "#2A2018",
    muted: "#6A5A50",
    accent: "#F97316",
    accentSoft: "rgba(249,115,22,0.1)",
    green: "#86EFAC",
    red: "#FCA5A5",
    yellow: "#FDE68A",
    blue: "#93C5FD",
    prompt: "#F97316",
    cursor: "#F97316",
  },
  mint: {
    name: "Mint",
    bg: "#080E0C",
    surface: "#0C1210",
    surfaceHigh: "#101614",
    border: "#162018",
    text: "#D8EDE5",
    dim: "#162018",
    muted: "#4A7060",
    accent: "#34D399",
    accentSoft: "rgba(52,211,153,0.1)",
    green: "#34D399",
    red: "#F87171",
    yellow: "#FCD34D",
    blue: "#67E8F9",
    prompt: "#34D399",
    cursor: "#34D399",
  },
  rose: {
    name: "Rose",
    bg: "#0F0A0C",
    surface: "#150E10",
    surfaceHigh: "#1A1215",
    border: "#281820",
    text: "#EDD8E0",
    dim: "#281820",
    muted: "#7A4A58",
    accent: "#F472B6",
    accentSoft: "rgba(244,114,182,0.1)",
    green: "#86EFAC",
    red: "#FCA5A5",
    yellow: "#FDE68A",
    blue: "#93C5FD",
    prompt: "#F472B6",
    cursor: "#F472B6",
  },
};

const ME = {
  name: "Nadim Chowdhury",
  role: "Full Stack Developer",
  location: "Dhaka, Bangladesh",
  email: "nadim-chowdhury@outlook.com",
  phone: "+880 1971 258803",
  github: "github.com/nadim-chowdhury",
  linkedin: "linkedin.com/in/nadim-chowdhury",
  web: "nadim.vercel.app",
} as const;

const SKILLS: Record<string, string[]> = {
  frontend: [
    "React.js",
    "Next.js",
    "Angular",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Bootstrap",
    "Sass",
    "Ant Design",
    "Framer Motion",
  ],
  backend: [
    "Node.js",
    "NestJS",
    "Express.js",
    "GraphQL",
    "REST API",
    "WebSockets",
    "tRPC",
  ],
  database: ["PostgreSQL", "MongoDB", "Prisma", "TypeORM", "Redis", "Supabase"],
  mobile: ["React Native", "Flutter", "Expo"],
  devops: [
    "Docker",
    "Git",
    "GitHub Actions",
    "Vercel",
    "Netlify",
    "CI/CD",
    "Linux",
  ],
  tools: ["Postman", "Swagger", "Figma", "VS Code", "Jira", "Notion"],
};

const EXP: ExpEntry[] = [
  {
    n: "01",
    role: "Full Stack Software Developer",
    co: "Easy Fashion Ltd",
    period: "Jul 2025 – Nov 2025",
    type: "Full-time",
    stack: ["React", "NestJS", "PostgreSQL", "Docker"],
    desc: "End-to-end feature development, modular scalable codebases, agile cross-functional collaboration.",
  },
  {
    n: "02",
    role: "Full Stack Web Developer",
    co: "Freelance",
    period: "Aug 2024 – Jun 2025",
    type: "Contract",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Stripe"],
    desc: "Airline booking platform + visual editor with real-time editing, RBAC, billing & subscription.",
  },
  {
    n: "03",
    role: "Junior Frontend Developer",
    co: "Mediusware Ltd",
    period: "Mar 2024 – Jul 2024",
    type: "Full-time",
    stack: ["React", "GraphQL", "TypeScript", "Tailwind"],
    desc: "Drag-and-drop website builder with multi-tenancy, subdomain publishing, GraphQL APIs.",
  },
  {
    n: "04",
    role: "Frontend Trainee",
    co: "Mediusware Ltd",
    period: "Dec 2023 – Feb 2024",
    type: "Internship",
    stack: ["React", "REST API", "Ant Design"],
    desc: "Profile CRUD with RBAC, task management and customer order modules.",
  },
  {
    n: "05",
    role: "Frontend Developer",
    co: "Freelance",
    period: "Sep 2022 – Nov 2023",
    type: "Freelance",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    desc: "Full-stack apps, REST API design, DB modeling, deployment, version control.",
  },
];

const PROJECTS: ProjectEntry[] = [
  {
    id: "collabier",
    name: "Collabier SaaS",
    cat: "SaaS Platform",
    url: "collabier-sass-x.vercel.app",
    year: "2025",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Stripe"],
    desc: "Visual editor platform with real-time style editing, reusable components, project dashboard, and integrated billing.",
  },
  {
    id: "flightbook",
    name: "Flight Booking",
    cat: "Booking System",
    url: "flight-booking-x.vercel.app",
    year: "2024",
    stack: ["Next.js", "NestJS", "JWT", "REST API"],
    desc: "Secure airline booking with RBAC, CRUD for airlines/airports/planes/routes, smooth auth.",
  },
  {
    id: "schoolsys",
    name: "School Mgmt Sys",
    cat: "ERP Platform",
    url: "scl-mgt-sys-client.vercel.app",
    year: "2024",
    stack: ["React.js", "Node.js", "MongoDB"],
    desc: "School ERP with student records, scheduling, teacher dashboards, grade management.",
  },
  {
    id: "dashboard",
    name: "Dashboard UI",
    cat: "Analytics",
    url: "dash-b0ard.netlify.app",
    year: "2023",
    stack: ["React.js", "Tailwind CSS", "Recharts"],
    desc: "Modern analytics dashboard with charts, dark mode, responsive layout.",
  },
];

const CMDS = [
  "help",
  "about",
  "whoami",
  "skills",
  "exp",
  "experience",
  "projects",
  "project",
  "contact",
  "links",
  "open",
  "email",
  "theme",
  "themes",
  "clear",
  "cls",
  "date",
  "ls",
  "pwd",
  "cat",
  "echo",
  "history",
  "neofetch",
  "banner",
  "matrix",
  "hack",
  "joke",
  "quote",
  "weather",
  "calc",
  "ping",
  "curl",
  "sudo",
  "vim",
  "nano",
  "git",
  "npm",
  "node",
  "python",
  "exit",
  "rm",
  "fortune",
  "cowsay",
  "yes",
  "sl",
];

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 🍺",
  "Why do Java developers wear glasses? Because they can't C#. 👓",
  "There are 10 types of people: those who understand binary, and those who don't. 💻",
  "Why did the developer go broke? Because he used up all his cache. 💸",
  "How many programmers does it take to change a light bulb? None — it's a hardware problem.",
  "Programming is 10% writing code and 90% figuring out why it doesn't work. 🤔",
  "The best thing about a Boolean is even if you're wrong, you're only off by a bit.",
];

const QUOTES: { q: string; a: string }[] = [
  {
    q: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    a: "Martin Fowler",
  },
  { q: "First, solve the problem. Then, write the code.", a: "John Johnson" },
  {
    q: "Code is like humor. When you have to explain it, it's bad.",
    a: "Cory House",
  },
  { q: "Make it work, make it right, make it fast.", a: "Kent Beck" },
  {
    q: "Debugging is twice as hard as writing the code in the first place.",
    a: "Brian Kernighan",
  },
];

const RM_RF_SEQUENCE: SequenceEntry[] = [
  {
    t: 0,
    text: "💀 rm: cannot remove './': Permission denied (you wish)",
    type: "err",
  },
  {
    t: 400,
    text: "🚨 WARNING: Initiating self-destruct sequence...",
    type: "warn",
  },
  {
    t: 900,
    text: "💣 Deleting node_modules... (1,247,893 files)",
    type: "err",
  },
  { t: 1400, text: "🔥 Burning your career choices...", type: "err" },
  {
    t: 1900,
    text: "😱 Erasing 3 years of Stack Overflow bookmarks...",
    type: "err",
  },
  {
    t: 2400,
    text: "🗑️  Removing all semicolons from JavaScript files...",
    type: "warn",
  },
  {
    t: 2900,
    text: "💔 Deleting git history... (goodbye, 847 commits)",
    type: "err",
  },
  {
    t: 3400,
    text: "🤡 Removing all TODO comments... (found 2,341)",
    type: "warn",
  },
  { t: 3900, text: "☠️  Killing all localhost:3000 processes...", type: "err" },
  { t: 4400, text: "🌚 Summoning the void...", type: "dim" },
  { t: 4900, text: "", type: "br" },
  { t: 5000, text: "😂 Just kidding. I'm using --dry-run mode.", type: "ok" },
  {
    t: 5400,
    text: "✅ Your portfolio is safe. Your career too. Probably.",
    type: "ok",
  },
  { t: 5800, text: "🍵 Go touch some grass, friend.", type: "acc" },
  { t: 6200, text: "", type: "br" },
];

const HACK_SEQUENCE: SequenceEntry[] = [
  {
    t: 0,
    text: "[>] Initializing Nadim's elite hacking suite...",
    type: "acc",
  },
  {
    t: 300,
    text: "[>] Bypassing firewall........................ DONE ✓",
    type: "ok",
  },
  {
    t: 700,
    text: "[>] Injecting SQL into coffee machine......... DONE ✓",
    type: "ok",
  },
  {
    t: 1100,
    text: "[>] Mining crypto on your GPU................. DONE ✓",
    type: "warn",
  },
  {
    t: 1500,
    text: "[>] Downloading entire internet............... 2% ▓░░░░░░░░░",
    type: "acc",
  },
  {
    t: 1900,
    text: "[>] Stealing your WiFi password............... ********* ✓",
    type: "err",
  },
  {
    t: 2300,
    text: "[>] Installing npm packages................... [████████░░] 82%",
    type: "acc",
  },
  {
    t: 2700,
    text: "[>] Reticulating splines...................... DONE ✓",
    type: "ok",
  },
  {
    t: 3100,
    text: "[>] Reversing polarity........................ DONE ✓",
    type: "ok",
  },
  {
    t: 3500,
    text: "[>] Overclocking the mainframe................ nice try",
    type: "warn",
  },
  { t: 3900, text: "", type: "br" },
  {
    t: 4000,
    text: "ACCESS GRANTED 🎉 — Welcome, fellow developer.",
    type: "ok",
  },
  {
    t: 4400,
    text: "Hack complete. You've successfully deployed a landing page.",
    type: "dim",
  },
  { t: 4800, text: "", type: "br" },
];

let _id = 0;
function mkLine(
  text: string,
  type: LineType = "out",
  url: string | null = null,
  meta: LineMeta = null,
): Line {
  return { text, type, url, meta, id: ++_id };
}
const BR = (): Line => mkLine("", "br");
const DIM = (t: string): Line => mkLine(t, "dim");
const ACC = (t: string): Line => mkLine(t, "acc");
const OK = (t: string): Line => mkLine(t, "ok");
const ERR = (t: string): Line => mkLine(t, "err");
const WARN = (t: string): Line => mkLine(t, "warn");
const LNK = (t: string, u: string): Line => mkLine(t, "link", u);
const OUT = (t: string): Line => mkLine(t, "out");
const TAGS = (items: string[]): Line =>
  mkLine("", "tags", null, { items } as TagsMeta);
const DIV = (label = ""): Line => mkLine(label, "divider");
const CODE = (t: string): Line => mkLine(t, "code");

function safeCalc(expr: string): number | null {
  try {
    const cleaned = expr.replace(/[^0-9+\-*/().,% ]/g, "").trim();
    if (!cleaned) return null;
    // eslint-disable-next-line no-new-func
    const result = new Function(`"use strict"; return (${cleaned})`)();
    return typeof result === "number" && isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

function run(
  raw: string,
  theme: Theme,
  setTheme: (t: Theme) => void,
  hist: string[],
  addLines: (lines: Line[]) => void,
): Line[] {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  if (!cmd) return [];

  if (cmd === "rm") {
    setTimeout(() => {
      RM_RF_SEQUENCE.forEach(({ t, text, type }) => {
        setTimeout(
          () =>
            addLines([type === "br" ? BR() : mkLine(text, type as LineType)]),
          t,
        );
      });
    }, 0);
    return [
      BR(),
      WARN("  ⚠️  Dangerous command detected. Engaging safety protocol..."),
      BR(),
    ];
  }

  switch (cmd) {
    case "help":
      return [
        BR(),
        DIV("COMMANDS"),
        BR(),
        ACC("  PORTFOLIO"),
        OUT("  about · whoami           Developer profile & bio"),
        OUT(
          `  skills [category]        Tech stack  ·  ${Object.keys(SKILLS).join(" | ")}`,
        ),
        OUT("  exp · experience         Full work history"),
        OUT("  projects                 All projects overview"),
        OUT(
          `  project <id>             Project deep-dive  ·  ${PROJECTS.map((p) => p.id).join(" | ")}`,
        ),
        OUT("  contact                  Contact information"),
        OUT("  links                    Social & portfolio links"),
        OUT("  neofetch                 System info card"),
        BR(),
        ACC("  TERMINAL"),
        OUT(
          `  theme [name]             Show or switch theme  ·  ${Object.keys(THEMES).join(" | ")}`,
        ),
        OUT("  themes                   List all themes with preview"),
        OUT("  clear · cls              Clear terminal"),
        OUT("  history                  Command history"),
        OUT("  date                     Current datetime"),
        OUT("  echo <text>              Print text"),
        OUT("  calc <expr>              Calculator  ·  e.g. calc 2+2*10"),
        OUT("  ping <host>              Ping simulation"),
        OUT("  curl <url>               Curl simulation"),
        OUT(
          "  cat <file>               Read file  ·  README.md | package.json",
        ),
        OUT("  ls · pwd                 Filesystem navigation"),
        OUT("  open <url>               Open URL in browser"),
        OUT("  email                    Copy email to clipboard"),
        BR(),
        ACC("  FUN"),
        OUT("  joke · quote · fortune   Random content 😄"),
        OUT("  cowsay <text>            ASCII cow 🐄"),
        OUT("  banner                   Show ASCII banner"),
        OUT("  matrix                   🐇 Follow the white rabbit"),
        OUT("  hack                     Initiate hacking sequence 💻"),
        OUT("  sl                       🚂 Something special..."),
        OUT("  sudo · vim · rm -rf ./   Easter eggs"),
        BR(),
        DIM(
          "  Shortcuts: ↑↓ history · Tab autocomplete · Ctrl+L clear · Ctrl+C cancel",
        ),
        BR(),
      ];

    case "about":
    case "whoami":
      return [
        BR(),
        DIV("PROFILE"),
        BR(),
        mkLine(`  ${ME.name}`, "hdr"),
        DIM(`  ${ME.role}  ·  ${ME.location}`),
        BR(),
        OUT("  Experience   3+ years  ·  2022 to present"),
        OUT("  Projects     20+ deployed across web & mobile"),
        OUT("  Focus        SaaS · ERP · Interactive Business Apps"),
        OUT("  Stack        React · Next.js · NestJS · Node.js · PostgreSQL"),
        BR(),
        OUT("  Dropped out of Mathematics to pursue software full-time."),
        BR(),
        OK("  ● OPEN TO WORK  ·  Full-time · Freelance · Contract"),
        BR(),
      ];

    case "skills": {
      const cat = args[0]?.toLowerCase();
      if (cat) {
        if (!SKILLS[cat])
          return [
            BR(),
            ERR(`  Unknown category '${cat}'`),
            DIM(`  Available: ${Object.keys(SKILLS).join("  ·  ")}`),
            BR(),
          ];
        return [BR(), DIV(cat.toUpperCase()), BR(), TAGS(SKILLS[cat]), BR()];
      }
      const rows: Line[] = [BR(), DIV("TECH STACK"), BR()];
      Object.entries(SKILLS).forEach(([k, v]) => {
        rows.push(ACC(`  ${k.toUpperCase().padEnd(12)}`));
        rows.push(TAGS(v));
        rows.push(BR());
      });
      return rows;
    }

    case "exp":
    case "experience": {
      const rows: Line[] = [BR(), DIV("EXPERIENCE"), BR()];
      EXP.forEach((e) => {
        rows.push(mkLine("", "expcard", null, e));
        rows.push(BR());
      });
      return rows;
    }

    case "projects": {
      const rows: Line[] = [BR(), DIV("PROJECTS"), BR()];
      PROJECTS.forEach((p) => {
        rows.push(mkLine("", "projrow", `https://${p.url}`, p));
        rows.push(BR());
      });
      rows.push(
        DIM(
          `  Run  project <id>  for details  ·  ${PROJECTS.map((p) => p.id).join(" · ")}`,
        ),
        BR(),
      );
      return rows;
    }

    case "project": {
      const id = args[0]?.toLowerCase();
      const p = PROJECTS.find((x) => x.id === id);
      if (!p)
        return [
          BR(),
          ERR(`  project '${id ?? ""}' not found`),
          DIM(`  IDs: ${PROJECTS.map((p) => p.id).join("  ·  ")}`),
          BR(),
        ];
      return [
        BR(),
        DIV(p.name.toUpperCase()),
        BR(),
        OUT(`  ${p.cat}  ·  ${p.year}`),
        BR(),
        DIM("  Description"),
        OUT(`  ${p.desc}`),
        BR(),
        DIM("  Stack"),
        TAGS(p.stack),
        BR(),
        LNK(`  ↗  https://${p.url}`, `https://${p.url}`),
        BR(),
      ];
    }

    case "contact":
      return [
        BR(),
        DIV("CONTACT"),
        BR(),
        OUT(`  Email      ${ME.email}`),
        OUT(`  Phone      ${ME.phone}`),
        LNK(`  GitHub     ${ME.github}`, `https://${ME.github}`),
        LNK(`  LinkedIn   ${ME.linkedin}`, `https://${ME.linkedin}`),
        LNK(`  Web        ${ME.web}`, `https://${ME.web}`),
        BR(),
        DIM("  Run  email  to copy address to clipboard"),
        BR(),
      ];

    case "links":
      return [
        BR(),
        LNK(`  GitHub      ↗  https://${ME.github}`, `https://${ME.github}`),
        LNK(
          `  LinkedIn    ↗  https://${ME.linkedin}`,
          `https://${ME.linkedin}`,
        ),
        LNK(`  Portfolio   ↗  https://${ME.web}`, `https://${ME.web}`),
        BR(),
      ];

    case "email":
      try {
        navigator.clipboard.writeText(ME.email);
        return [BR(), OK(`  ✓  Copied  ${ME.email}`), BR()];
      } catch {
        return [BR(), WARN(`  ${ME.email}  (copy manually)`), BR()];
      }

    case "open": {
      const u = args[0];
      if (!u) return [BR(), ERR("  Usage: open <url>"), BR()];
      const full = u.startsWith("http") ? u : `https://${u}`;
      try {
        window.open(full, "_blank");
      } catch {
        /* noop */
      }
      return [BR(), OK(`  ↗  Opening ${full}`), BR()];
    }

    case "theme": {
      const t = args[0]?.toLowerCase();
      if (!t)
        return [
          BR(),
          OUT(`  Current: ${theme.name}`),
          DIM(`  Available: ${Object.keys(THEMES).join("  ·  ")}`),
          BR(),
        ];
      if (!THEMES[t])
        return [
          BR(),
          ERR(`  Theme '${t}' not found`),
          DIM(`  Available: ${Object.keys(THEMES).join("  ·  ")}`),
          BR(),
        ];
      setTheme(THEMES[t]);
      return [BR(), OK(`  ✓  Switched to ${THEMES[t].name}`), BR()];
    }

    case "themes": {
      const rows: Line[] = [BR(), DIV("THEMES"), BR()];
      Object.entries(THEMES).forEach(([key, th]) => {
        rows.push(
          mkLine("", "themerow", null, {
            key,
            th,
            current: th.name === theme.name,
          } as ThemeRowMeta),
        );
      });
      rows.push(BR(), DIM("  Usage:  theme <n>"), BR());
      return rows;
    }

    case "neofetch":
      return [
        BR(),
        DIV("NEOFETCH"),
        BR(),
        mkLine("", "neofetch", null, { theme } as NeofetchMeta),
        BR(),
      ];

    case "calc": {
      const expr = args.join(" ");
      if (!expr)
        return [
          BR(),
          ERR("  Usage: calc <expression>  ·  e.g. calc 128 * 1024"),
          BR(),
        ];
      const result = safeCalc(expr);
      if (result === null)
        return [BR(), ERR(`  Could not evaluate: ${expr}`), BR()];
      return [BR(), CODE(`  ${expr} = ${result}`), BR()];
    }

    case "ping": {
      const host = args[0] ?? "nadim.vercel.app";
      const rows: Line[] = [BR(), OUT(`  PING ${host}`), BR()];
      [1, 2, 3, 4].forEach((n) =>
        rows.push(
          OUT(
            `  64 bytes from ${host}: icmp_seq=${n} time=${(Math.random() * 20 + 1).toFixed(2)}ms`,
          ),
        ),
      );
      rows.push(
        BR(),
        OK("  4 packets transmitted, 4 received, 0% packet loss"),
        BR(),
      );
      return rows;
    }

    case "curl": {
      const url = args[0] ?? ME.web;
      return [
        BR(),
        OUT(`  > GET ${url}`),
        BR(),
        CODE("  HTTP/2 200"),
        CODE("  content-type: application/json"),
        CODE(`  x-developer: ${ME.name}`),
        CODE(`  x-location: ${ME.location}`),
        CODE("  x-status: available-for-work"),
        BR(),
        CODE(`  { "name": "${ME.name}", "role": "${ME.role}" }`),
        BR(),
      ];
    }

    case "cat": {
      const file = args[0];
      if (!file)
        return [
          BR(),
          ERR("  Usage: cat <file>  ·  README.md | package.json"),
          BR(),
        ];
      if (file === "README.md")
        return [
          BR(),
          DIV("README.md"),
          BR(),
          OUT("  # Nadim Chowdhury — Portfolio Terminal"),
          BR(),
          OUT("  Built with React.js and a lot of coffee. ☕"),
          BR(),
          OUT(`  ${ME.email}`),
          OUT(`  ${ME.web}`),
          BR(),
        ];
      if (file === "package.json")
        return [
          BR(),
          DIV("package.json"),
          BR(),
          CODE("  {"),
          CODE(`    "name": "nadim-portfolio-terminal",`),
          CODE(`    "version": "3.0.0",`),
          CODE(`    "author": "${ME.name}",`),
          CODE('    "dependencies": {'),
          CODE('      "react": "^18.0.0",'),
          CODE('      "next": "^14.0.0"'),
          CODE("    }"),
          CODE("  }"),
          BR(),
        ];
      return [
        BR(),
        ERR(`  ${file}: No such file or directory`),
        DIM("  Available: README.md  package.json"),
        BR(),
      ];
    }

    case "date":
      return [
        BR(),
        OUT(
          `  ${new Date().toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}`,
        ),
        BR(),
      ];
    case "ls":
      return [
        BR(),
        mkLine("  about/  experience/  projects/  skills/  contact/", "acc"),
        OUT("  README.md   package.json   .env.example   .gitignore"),
        BR(),
      ];
    case "pwd":
      return [BR(), OUT("  /home/nadim/portfolio"), BR()];
    case "echo":
      return args.length ? [BR(), OUT("  " + args.join(" ")), BR()] : [BR()];

    case "history": {
      if (!hist.length) return [BR(), DIM("  No history yet."), BR()];
      const rows: Line[] = [BR(), DIV("HISTORY"), BR()];
      hist
        .slice(-40)
        .forEach((h, i) =>
          rows.push(DIM(`  ${String(i + 1).padStart(3)}  ${h}`)),
        );
      rows.push(BR());
      return rows;
    }

    case "banner":
      return [
        BR(),
        mkLine("", "banner"),
        BR(),
        ACC(`  ${ME.name}  ·  ${ME.role}`),
        DIM(`  ${ME.location}  ·  ${ME.web}`),
        BR(),
      ];
    case "joke":
      return [
        BR(),
        OUT(`  ${JOKES[Math.floor(Math.random() * JOKES.length)]}`),
        BR(),
      ];
    case "quote": {
      const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      return [BR(), OUT(`  "${q.q}"`), DIM(`  — ${q.a}`), BR()];
    }

    case "fortune": {
      const fortunes = [
        "🥠 A bug-free code is a myth.",
        "🥠 Your next deploy will succeed. (Probably.)",
        "🥠 The cloud is just someone else's computer.",
        "🥠 It works on my machine. Ship your machine.",
        "🥠 Dark mode saves lives. And battery.",
      ];
      return [
        BR(),
        OUT(`  ${fortunes[Math.floor(Math.random() * fortunes.length)]}`),
        BR(),
      ];
    }

    case "cowsay": {
      const msg = args.join(" ") || "Mooooo! Hire Nadim!";
      const pad = msg.length + 2;
      const border = "─".repeat(pad);
      return [
        BR(),
        CODE(`   ┌${border}┐`),
        CODE(`   │ ${msg} │`),
        CODE(`   └${border}┘`),
        CODE("        \\   ^__^"),
        CODE("         \\  (oo)\\_______"),
        CODE("            (__)\\       )\\/\\"),
        CODE("                ||----w |"),
        CODE("                ||     ||"),
        BR(),
      ];
    }

    case "matrix":
      return [
        BR(),
        ACC("  Wake up, Nadim..."),
        DIM("  The Matrix has you."),
        OUT("  Follow the white rabbit. 🐇"),
        BR(),
        DIM("  (try: theme ghost for maximum immersion)"),
        BR(),
      ];

    case "hack":
      setTimeout(() => {
        HACK_SEQUENCE.forEach(({ t, text, type }) => {
          setTimeout(
            () =>
              addLines([type === "br" ? BR() : mkLine(text, type as LineType)]),
            t,
          );
        });
      }, 0);
      return [BR(), ACC("  Initiating hacking sequence... 💻"), BR()];

    case "sl":
      return [
        BR(),
        CODE("        ====        ________                ___________"),
        CODE("    _D _|  |_______/        \\__I_I_____===__|_________|"),
        CODE("     |(_)---  |   H\\________/ |   |        =|___ ___|  "),
        CODE("     /     |  |   H  |  |     |   |         ||_| |_||  "),
        CODE("    | ________|___H__/__|_____/[][]~\\_____________|      "),
        BR(),
        WARN("  🚂 You tried typing ls but got a train instead."),
        DIM("  (Classic Unix easter egg)"),
        BR(),
      ];

    case "sudo":
      return [
        BR(),
        WARN("  nadim is not in the sudoers file."),
        ERR("  This incident will be reported. 📋"),
        BR(),
      ];
    case "vim":
    case "nano":
      return [
        BR(),
        ACC(`  Opening ${cmd}...`),
        BR(),
        OUT("  ┌──────────────────────────────────────────────────────┐"),
        OUT("  │  You are now inside vim.                            │"),
        OUT("  │  To exit: press Esc, then type  :q!  then Enter     │"),
        OUT("  │  Or just close the browser tab. We won't judge.     │"),
        OUT("  └──────────────────────────────────────────────────────┘"),
        BR(),
        DIM("  Tip: :wq saves and quits. You're welcome."),
        BR(),
      ];

    case "git": {
      const sub = args[0];
      if (sub === "log")
        return [
          BR(),
          OUT("  commit a3f7d2e  (HEAD -> main)"),
          OUT(`  Author: ${ME.name} <${ME.email}>`),
          OUT(`  Date:   ${new Date().toDateString()}`),
          OUT(""),
          OUT("      feat: add interactive terminal portfolio"),
          BR(),
        ];
      if (sub === "status")
        return [
          BR(),
          OUT("  On branch main"),
          OK("  nothing to commit, working tree clean"),
          BR(),
        ];
      if (sub === "blame")
        return [BR(), ERR("  You. It was you. It's always you."), BR()];
      return [
        BR(),
        OUT(`  git: '${sub ?? "?"}' is not a git command.`),
        DIM("  Available: git log | git status | git blame"),
        BR(),
      ];
    }

    case "npm": {
      const sub = args[0];
      if (sub === "install" || sub === "i")
        return [
          BR(),
          OUT("  added 2,847 packages in 47s"),
          WARN("  3 high severity vulnerabilities"),
          BR(),
        ];
      if (sub === "run" && args[1])
        return [BR(), OK(`  > ${args[1]}`), OK("  ✓ ready in 843ms"), BR()];
      return [BR(), DIM("  Usage: npm install | npm run <script>"), BR()];
    }

    case "node":
      return [
        BR(),
        OUT("  Welcome to Node.js v20.0.0."),
        OUT("  > 1 + 1"),
        ACC("  2"),
        BR(),
      ];
    case "python":
      return [
        BR(),
        OUT("  Python 3.12.0"),
        DIM("  >>> print('Hello from Python!')"),
        OUT("  Hello from Python!"),
        BR(),
      ];
    case "yes":
      return [
        BR(),
        ...Array.from({ length: 8 }, () =>
          OUT("  y y y y y y y y y y y y y y y y y y y y"),
        ),
        DIM("  (Ctrl+C to stop)"),
        BR(),
      ];
    case "weather":
      return [
        BR(),
        OUT("  ⛅ Dhaka, Bangladesh"),
        OUT("  28°C · Partly cloudy · Humidity 72%"),
        DIM("  (Simulated — no API key required)"),
        BR(),
      ];

    case "clear":
    case "cls":
      return [{ type: "clear", id: ++_id, text: "", url: null, meta: null }];
    case "exit":
      return [BR(), DIM("  There is no escape from this portfolio. 😈"), BR()];

    default:
      return [
        BR(),
        ERR(`  ${cmd}: command not found`),
        DIM("  Type  help  for available commands"),
        BR(),
      ];
  }
}

interface RenderLineProps {
  line: Line;
  T: Theme;
  isMobile: boolean;
}

function RenderLine({ line, T, isMobile }: RenderLineProps) {
  const px = isMobile ? 12 : 24;
  const fs = isMobile ? 12 : 13;

  const mono: CSSProperties = {
    fontFamily: "inherit",
    fontSize: fs,
    lineHeight: "22px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
  };

  if (line.type === "br") return <div style={{ height: 4 }} />;

  if (line.type === "divider")
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: `6px ${px}px`,
        }}
      >
        <div style={{ height: 1, width: 16, background: T.border }} />
        {line.text && (
          <span
            style={{
              ...mono,
              fontSize: 10,
              letterSpacing: "0.16em",
              color: T.muted,
              userSelect: "none",
            }}
          >
            {line.text}
          </span>
        )}
        <div style={{ flex: 1, height: 1, background: T.border }} />
      </div>
    );

  if (line.type === "banner")
    return (
      <pre
        style={{
          ...mono,
          fontSize: isMobile ? 6 : 10,
          lineHeight: isMobile ? "10px" : "14px",
          color: T.accent,
          padding: `4px ${px}px`,
          userSelect: "none",
          overflowX: "auto",
        }}
      >{`
 ███╗   ██╗ █████╗ ██████╗ ██╗███╗   ███╗
 ████╗  ██║██╔══██╗██╔══██╗██║████╗ ████║
 ██╔██╗ ██║███████║██║  ██║██║██╔████╔██║
 ██║╚██╗██║██╔══██║██║  ██║██║██║╚██╔╝██║
 ██║ ╚████║██║  ██║██████╔╝██║██║ ╚═╝ ██║
 ╚═╝  ╚═══╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝     ╚═╝`}</pre>
    );

  if (line.type === "tags") {
    const meta = line.meta as TagsMeta;
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          padding: `4px ${px}px`,
        }}
      >
        {meta.items.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: 11,
              color: T.accent,
              background: T.accentSoft,
              border: `1px solid ${T.accent}22`,
              padding: "2px 8px",
              borderRadius: 4,
              letterSpacing: "0.04em",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (line.type === "expcard") {
    const e = line.meta as ExpEntry;
    return (
      <div
        style={{
          margin: `2px ${px}px`,
          padding: isMobile ? "12px 14px" : "16px 20px",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          borderLeft: `2px solid ${T.accent}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 6,
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <span
              style={{
                fontSize: 10,
                color: T.accent,
                letterSpacing: "0.12em",
                marginRight: 8,
              }}
            >
              {e.n}
            </span>
            <span
              style={{
                fontSize: isMobile ? 12 : 13,
                color: T.text,
                fontWeight: 500,
                wordBreak: "break-word",
              }}
            >
              {e.role}
            </span>
          </div>
          <span
            style={{
              fontSize: 10,
              color: T.muted,
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {e.period}
          </span>
        </div>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>
          {e.co} · {e.type}
        </div>
        <div
          style={{
            fontSize: 12,
            color: T.muted,
            lineHeight: 1.65,
            marginBottom: 8,
            opacity: 0.75,
          }}
        >
          {e.desc}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {e.stack.map((s, i) => (
            <span
              key={i}
              style={{
                fontSize: 10,
                color: T.accent,
                background: T.accentSoft,
                padding: "2px 7px",
                borderRadius: 3,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (line.type === "projrow") {
    const p = line.meta as ProjectEntry;
    return (
      <div
        style={{
          margin: `2px ${px}px`,
          padding: isMobile ? "12px 14px" : "16px 20px",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          cursor: "pointer",
          transition: "border-color 0.2s,background 0.2s",
        }}
        onClick={() => window.open(`https://${p.url}`, "_blank")}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = T.accent;
          (e.currentTarget as HTMLDivElement).style.background = T.surfaceHigh;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = T.border;
          (e.currentTarget as HTMLDivElement).style.background = T.surface;
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "baseline",
              flexWrap: "wrap",
              minWidth: 0,
              flex: 1,
              marginRight: 8,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: T.accent,
                letterSpacing: "0.08em",
                flexShrink: 0,
              }}
            >
              {p.year}
            </span>
            <span
              style={{
                fontSize: isMobile ? 13 : 14,
                color: T.text,
                fontWeight: 500,
              }}
            >
              {p.name}
            </span>
            <span style={{ fontSize: 11, color: T.muted }}>{p.cat}</span>
          </div>
          <span style={{ fontSize: 14, color: T.accent, flexShrink: 0 }}>
            ↗
          </span>
        </div>
        <div
          style={{
            fontSize: 12,
            color: T.muted,
            lineHeight: 1.65,
            marginBottom: 8,
            opacity: 0.75,
          }}
        >
          {p.desc}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {p.stack.map((s, i) => (
            <span
              key={i}
              style={{
                fontSize: 10,
                color: T.accent,
                background: T.accentSoft,
                padding: "2px 7px",
                borderRadius: 3,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (line.type === "neofetch") {
    const { theme: th } = line.meta as NeofetchMeta;
    return (
      <div
        style={{
          margin: `2px ${px}px`,
          padding: isMobile ? "14px 16px" : "20px 24px",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
          gap: isMobile ? "12px 0" : "0 32px",
        }}
      >
        {!isMobile && (
          <pre
            style={{
              fontSize: 9,
              lineHeight: "12px",
              color: th.accent,
              userSelect: "none",
            }}
          >{`    .---.
   /     \\
  |  N C  |
   \\     /
    '---'`}</pre>
        )}
        <div style={{ fontSize: 12, lineHeight: "22px" }}>
          {(
            [
              ["User", ME.name],
              ["Role", ME.role],
              ["OS", "NADIM-OS 3.0.0"],
              ["Shell", "nadim-sh 1.0.0"],
              ["Theme", th.name],
              ["Uptime", "3 years, 5 months"],
              ["Location", ME.location],
            ] as [string, string][]
          ).map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                gap: 8,
                flexWrap: isMobile ? "wrap" : "nowrap",
              }}
            >
              <span
                style={{
                  color: th.accent,
                  width: isMobile ? "auto" : 80,
                  flexShrink: 0,
                  minWidth: isMobile ? 60 : undefined,
                }}
              >
                {k}
              </span>
              <span style={{ color: T.text }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8 }}>
            <span
              style={{
                color: th.accent,
                width: isMobile ? "auto" : 80,
                flexShrink: 0,
                minWidth: isMobile ? 60 : undefined,
              }}
            >
              Status
            </span>
            <span style={{ color: T.green }}>● Available for work</span>
          </div>
          <div
            style={{ display: "flex", gap: 4, marginTop: 10, flexWrap: "wrap" }}
          >
            {Object.values(THEMES).map((t, i) => (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: t.accent,
                }}
                title={t.name}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (line.type === "themerow") {
    const { key, th, current } = line.meta as ThemeRowMeta;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: `4px ${px}px`,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: th.accent,
            border: current ? `2px solid ${T.text}` : "2px solid transparent",
            flexShrink: 0,
          }}
        />
        <span
          style={{ ...mono, color: current ? T.text : T.muted, fontSize: 12 }}
        >
          {key.padEnd(12)}
          {th.name}
        </span>
        {current && (
          <span style={{ fontSize: 10, color: T.accent }}>← active</span>
        )}
      </div>
    );
  }

  const colorMap: Partial<Record<LineType, string>> = {
    out: T.text,
    hdr: T.text,
    dim: T.muted,
    acc: T.accent,
    ok: T.green,
    err: T.red,
    warn: T.yellow,
    link: T.accent,
    cmd: T.dim,
    code: T.blue || T.accent,
  };
  const color = colorMap[line.type] ?? T.text;
  const isLink = line.type === "link";

  return (
    <div
      style={{
        ...mono,
        color,
        textDecoration: isLink ? "underline" : "none",
        textDecorationColor: `${T.accent}55`,
        cursor: isLink ? "pointer" : "default",
        padding: `0 ${px}px`,
        transition: "opacity 0.15s",
      }}
      onClick={
        isLink && line.url ? () => window.open(line.url!, "_blank") : undefined
      }
      onMouseEnter={
        isLink
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.opacity = "0.7";
            }
          : undefined
      }
      onMouseLeave={
        isLink
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.opacity = "1";
            }
          : undefined
      }
    >
      {line.text}
    </div>
  );
}

const BOOT: BootEntry[] = [
  { t: 0, text: "Booting NADIM-OS v3.0.0 ...", type: "dim" },
  { t: 140, text: "[ ✓ ] Loading kernel modules", type: "dim" },
  { t: 280, text: "[ ✓ ] Mounting filesystem", type: "dim" },
  { t: 420, text: "[ ✓ ] Starting network services", type: "dim" },
  { t: 560, text: "[ ✓ ] Loading developer profile", type: "ok" },
  { t: 680, text: "[ ✓ ] Starting portfolio daemon", type: "ok" },
  { t: 780, text: "", type: "br" },
  { t: 820, text: "_banner", type: "_banner" },
  { t: 940, text: "", type: "br" },
  {
    t: 980,
    text: `  ${ME.name}  ·  ${ME.role}  ·  ${ME.location}`,
    type: "acc",
  },
  { t: 1040, text: `  ${ME.web}  ·  Available for work`, type: "ok" },
  { t: 1100, text: "", type: "br" },
  { t: 1140, text: "  Type  help  to get started.", type: "dim" },
  { t: 1200, text: "", type: "br" },
];

export default function Terminal() {
  const [theme, setTheme] = useState<Theme>(THEMES.ghost);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [ready, setReady] = useState(false);
  const [suggestion, setSug] = useState("");
  const [iw, setIw] = useState(0);
  const [time, setTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const T = theme;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT.forEach((b) => {
      timers.push(
        setTimeout(() => {
          if (b.type === "_banner")
            setLines((prev) => [...prev, mkLine("", "banner")]);
          else if (b.type === "br") setLines((prev) => [...prev, BR()]);
          else
            setLines((prev) => [...prev, mkLine(b.text, b.type as LineType)]);
          if (b.t === 1200)
            setTimeout(() => {
              setReady(true);
              inputRef.current?.focus();
            }, 100);
        }, b.t),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);
  useEffect(() => {
    if (measureRef.current) setIw(measureRef.current.offsetWidth);
  }, [input]);

  useEffect(() => {
    if (!input || input.includes(" ")) {
      setSug("");
      return;
    }
    if (input.toLowerCase() === "rm") {
      setSug(" -rf ./");
      return;
    }
    const m = CMDS.find(
      (c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase(),
    );
    setSug(m ? m.slice(input.length) : "");
  }, [input]);

  const addLines = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const submit = useCallback(() => {
    const cmd = input.trim();
    const echo: Line[] = [mkLine(cmd || "", "cmd")];
    if (cmd) {
      setCmdHist((prev) => [...prev.filter((x) => x !== cmd), cmd].slice(-100));
      setHistIdx(-1);
      const result = run(cmd, theme, setTheme, cmdHist, addLines);
      if (result[0]?.type === "clear") {
        setLines([]);
        setInput("");
        return;
      }
      setLines((prev) => [...prev, ...echo, ...result]);
    } else {
      setLines((prev) => [...prev, ...echo, BR()]);
    }
    setInput("");
    setSug("");
    setHistIdx(-1);
  }, [input, theme, cmdHist, addLines]);

  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        if (input.trim() === "rm") {
          setInput("rm -rf ./");
          setSug("");
          return;
        }
        const parts = input.split(/\s+/);
        const word = parts[parts.length - 1].toLowerCase();
        if (parts.length === 1) {
          const matches = CMDS.filter((c) => c.startsWith(word));
          if (matches.length === 1) {
            setInput(matches[0] + " ");
            setSug("");
          } else if (matches.length > 1)
            setLines((prev) => [
              ...prev,
              mkLine(input, "cmd"),
              mkLine("  " + matches.join("   "), "dim"),
              BR(),
            ]);
        } else {
          const completions: Record<string, string[]> = {
            theme: Object.keys(THEMES),
            project: PROJECTS.map((p) => p.id),
            skills: Object.keys(SKILLS),
            cat: ["README.md", "package.json"],
            open: [ME.web, ME.github, ME.linkedin],
          };
          const base = parts[0];
          const list = completions[base];
          if (list) {
            const m = list.filter((x) => x.startsWith(word));
            if (m.length === 1) {
              setInput(`${base} ${m[0]}`);
              setSug("");
            } else if (m.length > 1)
              setLines((prev) => [
                ...prev,
                mkLine(input, "cmd"),
                mkLine("  " + m.join("   "), "dim"),
                BR(),
              ]);
          }
        }
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!cmdHist.length) return;
        const idx =
          histIdx === -1 ? cmdHist.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(idx);
        setInput(cmdHist[idx]);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histIdx === -1) return;
        const idx = histIdx + 1;
        if (idx >= cmdHist.length) {
          setHistIdx(-1);
          setInput("");
        } else {
          setHistIdx(idx);
          setInput(cmdHist[idx]);
        }
        return;
      }
      if (e.ctrlKey) {
        if (e.key === "l") {
          e.preventDefault();
          setLines([]);
        }
        if (e.key === "c") {
          e.preventDefault();
          setLines((prev) => [...prev, mkLine(`${input}^C`, "dim"), BR()]);
          setInput("");
          setHistIdx(-1);
        }
        if (e.key === "u") {
          e.preventDefault();
          setInput("");
        }
      }
    },
    [input, cmdHist, histIdx, submit],
  );

  const px = isMobile ? 12 : 24;

  return (
    <div
      style={{
        background: "transparent",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'JetBrains Mono','Fira Code',monospace",
        overflow: "hidden",
        position: "relative",
      }}
      onClick={() => {
        inputRef.current?.focus();
        if (isMobile) setShowMobileInput(true);
      }}
    >
      <TerminalBackground accent={T.accent} bg={T.bg} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html, body { height:100%; overflow:hidden; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:2px; }
        @keyframes caretBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes lineIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .tline { animation: lineIn 0.15s ease forwards; }
        .input-hidden { position:absolute; opacity:0; pointer-events:none; background:transparent; border:none; outline:none; color:transparent; font-family:inherit; font-size:13px; caret-color:transparent; width:1px; height:1px; }

        /* Mobile tap-to-type button */
        .mobile-type-btn {
          display: none;
        }
        @media (max-width: 639px) {
          .titlebar-center { display: none !important; }
          .statusbar-shortcuts { display: none !important; }
          .mobile-type-btn { display: flex !important; }
        }
        @media (max-width: 400px) {
          .titlebar-themes { display: none !important; }
        }
      `}</style>

      {/* TITLEBAR */}
      <div
        style={
          {
            height: isMobile ? 40 : 44,
            background: `${T.surface}e8`,
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${isMobile ? 12 : 16}px`,
            flexShrink: 0,
            userSelect: "none",
            position: "relative",
            zIndex: 20,
          } as CSSProperties
        }
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {(
            [
              ["#FF5F57", "#C0392B"],
              ["#FEBC2E", "#D4A017"],
              ["#28C840", "#1E9E30"],
            ] as [string, string][]
          ).map(([c], i) => (
            <div
              key={i}
              style={{
                width: isMobile ? 10 : 12,
                height: isMobile ? 10 : 12,
                borderRadius: "50%",
                background: c,
                cursor: "pointer",
                transition: "filter 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "brightness(0.85)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter = "none";
              }}
              onClick={i === 1 ? () => setLines([]) : undefined}
            />
          ))}
        </div>

        {/* Center title — hidden on mobile */}
        <div
          className="titlebar-center"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 12,
            color: T.muted,
            letterSpacing: "0.06em",
            display: "flex",
            gap: 6,
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: T.accent }}>nadim</span>
          <span style={{ color: T.dim }}>@</span>
          <span style={{ color: T.muted }}>portfolio</span>
          <span style={{ color: T.dim, margin: "0 4px" }}>—</span>
          <span style={{ color: T.dim }}>{T.name}</span>
          <span style={{ color: T.dim, margin: "0 4px" }}>—</span>
          <span style={{ color: T.dim, fontVariantNumeric: "tabular-nums" }}>
            {time}
          </span>
        </div>

        {/* Mobile: show theme name + time */}
        {isMobile && (
          <div
            style={{
              fontSize: 11,
              color: T.muted,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span style={{ color: T.accent }}>{T.name}</span>
            <span style={{ color: T.dim }}>{time}</span>
          </div>
        )}

        {/* Theme dots */}
        <div
          className="titlebar-themes"
          style={{
            display: "flex",
            gap: isMobile ? 4 : 6,
            alignItems: "center",
          }}
        >
          {Object.entries(THEMES).map(([key, th]) => (
            <button
              key={key}
              title={`Theme: ${th.name}`}
              onClick={(e) => {
                e.stopPropagation();
                setTheme(THEMES[key]);
              }}
              style={{
                width: isMobile ? 8 : 10,
                height: isMobile ? 8 : 10,
                borderRadius: "50%",
                border:
                  th.name === T.name
                    ? `1px solid ${T.text}`
                    : "1px solid transparent",
                background: th.accent,
                cursor: "pointer",
                transition: "all 0.2s",
                transform: th.name === T.name ? "scale(1.3)" : "scale(1)",
                outline: "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* OUTPUT */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 0 0",
          cursor: "text",
          minHeight: 0,
          position: "relative",
          zIndex: 10,
          maxWidth: isMobile ? "100%" : 900,
          width: "100%",
          alignSelf: "center",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} className="tline">
            {line.type === "cmd" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 0,
                  padding: `2px ${px}px`,
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? 12 : 13,
                    color: T.accent,
                    marginRight: 8,
                    flexShrink: 0,
                  }}
                >
                  ❯
                </span>
                <span
                  style={{
                    fontSize: isMobile ? 12 : 13,
                    color: T.dim,
                    lineHeight: "22px",
                    fontFamily: "inherit",
                    wordBreak: "break-all",
                  }}
                >
                  {line.text}
                </span>
              </div>
            ) : (
              <RenderLine line={line} T={T} isMobile={isMobile} />
            )}
          </div>
        ))}

        {/* Input row */}
        {ready && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: `4px ${px}px`,
              gap: 0,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: isMobile ? 12 : 13,
                color: T.accent,
                marginRight: 8,
                flexShrink: 0,
                lineHeight: "22px",
              }}
            >
              ❯
            </span>
            <div
              style={{
                position: "relative",
                flex: 1,
                display: "flex",
                alignItems: "center",
                height: 22,
                cursor: "text",
              }}
            >
              {suggestion && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    fontSize: isMobile ? 12 : 13,
                    pointerEvents: "none",
                    userSelect: "none",
                    lineHeight: "22px",
                    fontFamily: "inherit",
                    whiteSpace: "pre",
                  }}
                >
                  <span style={{ color: "transparent" }}>{input}</span>
                  <span style={{ color: T.muted, opacity: 0.4 }}>
                    {suggestion}
                  </span>
                </span>
              )}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  fontSize: isMobile ? 12 : 13,
                  color: T.text,
                  lineHeight: "22px",
                  fontFamily: "inherit",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {input}
              </span>
              <span
                style={{
                  position: "absolute",
                  left: iw,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 2,
                  height: 15,
                  background: T.cursor,
                  borderRadius: 1,
                  animation: "caretBlink 1s step-end infinite",
                }}
              />
              <input
                ref={inputRef}
                className="input-hidden"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setHistIdx(-1);
                }}
                onKeyDown={handleKey}
                autoFocus={!isMobile}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <span
                ref={measureRef}
                style={{
                  position: "absolute",
                  visibility: "hidden",
                  fontSize: isMobile ? 12 : 13,
                  whiteSpace: "pre",
                  fontFamily: "inherit",
                  pointerEvents: "none",
                }}
              >
                {input}
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} style={{ height: 60 }} />
      </div>

      {/* STATUS BAR */}
      <div
        style={
          {
            height: isMobile ? 26 : 28,
            background: `${T.surface}e8`,
            backdropFilter: "blur(12px)",
            borderTop: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${isMobile ? 12 : 16}px`,
            flexShrink: 0,
            userSelect: "none",
            gap: 8,
            position: "relative",
            zIndex: 20,
          } as CSSProperties
        }
      >
        {/* Keyboard shortcuts — hidden on mobile */}
        <div
          className="statusbar-shortcuts"
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {(
            [
              ["help", "?"],
              ["tab", "complete"],
              ["↑↓", "history"],
              ["ctrl+l", "clear"],
              ["ctrl+c", "cancel"],
            ] as [string, string][]
          ).map(([k, v]) => (
            <span
              key={k}
              style={{ fontSize: 10, color: T.dim, whiteSpace: "nowrap" }}
            >
              <span style={{ color: T.muted }}>{k}</span>
              <span style={{ color: T.dim }}> {v}</span>
            </span>
          ))}
        </div>

        {/* Mobile: compact hint */}
        {isMobile && (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: T.muted }}>
              help · tab · ↑↓
            </span>
          </div>
        )}

        {/* Right side stats */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? 10 : 16,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: T.green,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: T.green,
                display: "inline-block",
                animation: "pulse 2s ease infinite",
              }}
            />
            {!isMobile && "available"}
          </span>
          {!isMobile && (
            <span style={{ fontSize: 10, color: T.muted }}>
              hist:{cmdHist.length}
            </span>
          )}
          <span style={{ fontSize: 10, color: T.accent, fontStyle: "italic" }}>
            {T.name}
          </span>
        </div>
      </div>
    </div>
  );
}
