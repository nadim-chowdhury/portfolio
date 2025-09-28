"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef, ReactNode, useMemo } from "react";

// Types
interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface WindowData {
  id: number;
  type: string;
  title: string;
  position: Position;
  size: Size;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface Command {
  id: string;
  name: string;
  description: string;
}

// Notification System
interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
}

function NotificationSystem({
  notifications,
  onDismiss,
}: {
  notifications: Notification[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 max-w-xs sm:max-w-sm">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`p-3 rounded-lg border backdrop-blur-sm transition-all transform hover:scale-105 cursor-pointer ${
            notif.type === "success"
              ? "bg-green-900 border-green-500 text-green-100"
              : notif.type === "warning"
              ? "bg-yellow-900 border-yellow-500 text-yellow-100"
              : notif.type === "error"
              ? "bg-red-900 border-red-500 text-red-100"
              : "bg-blue-900 border-blue-500 text-blue-100"
          }`}
          onClick={() => onDismiss(notif.id)}
        >
          <div className="flex items-center space-x-2">
            <span>
              {notif.type === "success"
                ? "✅"
                : notif.type === "warning"
                ? "⚠️"
                : notif.type === "error"
                ? "❌"
                : "ℹ️"}
            </span>
            <span className="text-xs sm:text-sm break-words">
              {notif.message}
            </span>
          </div>
          <div className="text-xs opacity-70 mt-1">
            {notif.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
}

// Matrix Rain Effect
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const chars =
      "01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}[]<>?";
    const fontSize = Math.max(10, window.innerWidth < 768 ? 10 : 14);
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
    />
  );
}

// Window Component Props
interface WindowProps {
  id: number;
  title: string;
  children: ReactNode;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  onMaximize: (id: number) => void;
  position: Position;
  size: Size;
  onDrag: (id: number, position: Position) => void;
  onResize: (id: number, size: Size) => void;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onFocus: (id: number) => void;
}

// Window Component
function Window({
  id,
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  position,
  size,
  onDrag,
  onResize,
  isMinimized,
  isMaximized,
  zIndex,
  onFocus,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    if ((e.target as HTMLElement).closest(".resize-handle")) return;

    onFocus(id);
    if (!isMobile) {
      setIsDragging(true);
      const rect = windowRef.current!.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    if ((e.target as HTMLElement).closest(".resize-handle")) return;

    onFocus(id);
    if (isMobile && e.touches.length === 1) {
      setIsDragging(true);
      const rect = windowRef.current!.getBoundingClientRect();
      setDragOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMobile) {
      setIsResizing(true);
      onFocus(id);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const maxX = Math.max(0, window.innerWidth - size.width);
        const maxY = Math.max(0, window.innerHeight - size.height - 60);
        onDrag(id, {
          x: Math.max(0, Math.min(e.clientX - dragOffset.x, maxX)),
          y: Math.max(0, Math.min(e.clientY - dragOffset.y, maxY)),
        });
      } else if (isResizing && !isMaximized && !isMobile) {
        const minWidth = isMobile ? 280 : 300;
        const minHeight = isMobile ? 180 : 200;
        const maxWidth = window.innerWidth - position.x;
        const maxHeight = window.innerHeight - position.y - 60;

        const newWidth = Math.max(
          minWidth,
          Math.min(e.clientX - position.x, maxWidth)
        );
        const newHeight = Math.max(
          minHeight,
          Math.min(e.clientY - position.y, maxHeight)
        );
        onResize(id, { width: newWidth, height: newHeight });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && !isMaximized && e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        const maxX = Math.max(0, window.innerWidth - size.width);
        const maxY = Math.max(0, window.innerHeight - size.height - 60);
        onDrag(id, {
          x: Math.max(0, Math.min(touch.clientX - dragOffset.x, maxX)),
          y: Math.max(0, Math.min(touch.clientY - dragOffset.y, maxY)),
        });
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [
    isDragging,
    isResizing,
    dragOffset,
    onDrag,
    onResize,
    id,
    position,
    size,
    isMaximized,
    isMobile,
  ]);

  if (isMinimized) return null;

  // Mobile windows take full screen by default
  const windowStyle =
    isMaximized || isMobile
      ? {
          left: 0,
          top: 0,
          width: "100vw",
          height: isMobile ? "100vh" : "calc(100vh - 60px)",
          zIndex,
        }
      : {
          left: Math.max(
            0,
            Math.min(position.x, window.innerWidth - size.width)
          ),
          top: Math.max(
            0,
            Math.min(position.y, window.innerHeight - size.height - 60)
          ),
          width: Math.min(size.width, window.innerWidth),
          height: Math.min(size.height, window.innerHeight - 60),
          zIndex,
        };

  return (
    <div
      ref={windowRef}
      className="absolute bg-gray-900 border border-green-500 rounded-lg shadow-2xl backdrop-blur-sm"
      style={windowStyle}
    >
      {/* Window Header */}
      <div
        className="bg-gray-900 p-2 rounded-t-lg cursor-move flex justify-between items-center border-b border-green-500 touch-manipulation"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span className="text-green-400 text-xs sm:text-sm font-semibold flex items-center truncate">
          <span className="mr-1 sm:mr-2">▲</span>
          <span className="truncate">{title}</span>
        </span>
        <div className="window-controls flex space-x-1 sm:space-x-2">
          {!isMobile && (
            <button
              onClick={() => onMinimize(id)}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"
            />
          )}
          <button
            onClick={() => onMaximize(id)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"
          />
          <button
            onClick={() => onClose(id)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
          />
        </div>
      </div>

      {/* Window Content */}
      <ScrollArea
        className="h-full overflow-auto bg-black text-green-400"
        style={{ height: "calc(100% - 40px)" }}
      >
        {children}
      </ScrollArea>

      {/* Resize Handle - Hide on mobile */}
      {!isMaximized && !isMobile && (
        <div
          className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize rounded-full bg-green-500 opacity-50 hover:opacity-100"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}

// Terminal Component
function Terminal() {
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<string[]>([
    "╔══════════════════════════════════════════════════════════════╗",
    "║              NADIM CHOWDHURY - SECURE TERMINAL              ║",
    "║                   MERN/Full Stack Developer                 ║",
    "╚══════════════════════════════════════════════════════════════╝",
    "",
    "root@nadim-dev:~$ whoami",
    "nadim-chowdhury",
    "root@nadim-dev:~$ id",
    "uid=0(root) gid=0(root) groups=0(root),100(users)",
    "root@nadim-dev:~$ location",
    "Dhaka, Bangladesh",
    "root@nadim-dev:~$ ls -la /skills/",
    "total 42",
    "drwxr-xr-x  2 nadim nadim   4096 Sep 28 2024 .",
    "drwxr-xr-x  3 nadim nadim   4096 Sep 28 2024 ..",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 html.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 css.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 javascript.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 typescript.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 react.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 nextjs.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 nodejs.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 expressjs.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 nestjs.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 mongodb.exe",
    "-rwxr-xr-x  1 nadim nadim     42 Sep 28 2024 postgresql.exe",
    "root@nadim-dev:~$ uptime",
    "System online since: June 2023 | Experience: 2+ years active development",
    "",
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, `root@nadim-dev:~$ ${cmd}`];
    const [command, ...args] = cmd.toLowerCase().split(" ");

    switch (command) {
      case "help":
        newHistory.push("Available commands:");
        newHistory.push("  help         - Show this help message");
        newHistory.push("  about        - Display personal information");
        newHistory.push("  skills       - List technical skills");
        newHistory.push("  experience   - Show work experience");
        newHistory.push("  projects     - Display recent projects");
        newHistory.push("  education    - Show educational background");
        newHistory.push("  contact      - Display contact information");
        newHistory.push("  languages    - Show spoken languages");
        newHistory.push("  hack         - Initialize hacking sequence");
        newHistory.push("  matrix       - Enter the matrix");
        newHistory.push("  clear        - Clear terminal");
        break;

      case "about":
        newHistory.push(
          "╔══════════════════════════════════════════════════════╗"
        );
        newHistory.push(
          "║                   NADIM CHOWDHURY                   ║"
        );
        newHistory.push(
          "╠══════════════════════════════════════════════════════╣"
        );
        newHistory.push(
          "║ Role: MERN/Full Stack Developer                     ║"
        );
        newHistory.push(
          "║ Age: 25 years old (Born: September 4, 2000)        ║"
        );
        newHistory.push(
          "║ Location: Dhaka, Bangladesh                         ║"
        );
        newHistory.push(
          "║ Status: Self-learned creative programmer            ║"
        );
        newHistory.push(
          "║ Passion: Building software for any platform        ║"
        );
        newHistory.push(
          "║ Hobbies: Learning, problem-solving, adapting       ║"
        );
        newHistory.push(
          "╚══════════════════════════════════════════════════════╝"
        );
        break;

      case "skills":
        newHistory.push("Technical Arsenal:");
        newHistory.push("├── Frontend: HTML, CSS, JavaScript, TypeScript");
        newHistory.push("├── Frameworks: React JS, Next JS, Angular");
        newHistory.push("├── Backend: Node JS, Express JS, Nest JS");
        newHistory.push("├── Databases: MongoDB, PostgreSQL");
        newHistory.push("├── Styling: Tailwind CSS, Bootstrap, Sass");
        newHistory.push("├── Mobile: React Native");
        newHistory.push("├── Tools: Git, Docker");
        newHistory.push("└── Version Control: Git, GitHub");
        break;

      case "experience":
        newHistory.push("Work Experience Timeline:");
        newHistory.push("");
        newHistory.push("█ Full Stack Developer (Freelancer)");
        newHistory.push("  ├─ Period: August 2024 - Present");
        newHistory.push(
          "  ├─ Project: Flight booking system with Amadeus GDS API"
        );
        newHistory.push(
          "  ├─ Tech: Real-time data, Stripe payments, Interactive maps"
        );
        newHistory.push(
          "  └─ Achievement: Seamless airport selection integration"
        );
        newHistory.push("");
        newHistory.push("█ Jr. Frontend Developer (Mediusware Ltd)");
        newHistory.push("  ├─ Period: March 2024 - July 2024");
        newHistory.push(
          "  ├─ Project: Drag-and-drop website builder (Wix-like)"
        );
        newHistory.push(
          "  ├─ Project: Multi-tenancy event management platform"
        );
        newHistory.push("  └─ Focus: UI design and API integrations");
        newHistory.push("");
        newHistory.push("█ Frontend Trainee (Mediusware Ltd)");
        newHistory.push("  ├─ Period: December 2023 - February 2024");
        newHistory.push("  ├─ Tasks: CRUD operations with role-based access");
        newHistory.push(
          "  └─ Features: Task management, Order management systems"
        );
        break;

      case "projects":
        newHistory.push("Recent Projects:");
        newHistory.push("┌─ Flight Booking System");
        newHistory.push("│  └─ URL: flight-booking-frontend-liart.vercel.app");
        newHistory.push("├─ School Management System");
        newHistory.push("│  └─ URL: scl-mgt-sys-client.vercel.app");
        newHistory.push("├─ Dashboard Application");
        newHistory.push("│  └─ URL: dash-b0ard.netlify.app");
        newHistory.push("├─ Car Showroom Platform");
        newHistory.push("│  └─ URL: cars-showroom.vercel.app");
        newHistory.push("└─ Cryptocurrency Exchange");
        newHistory.push("   └─ URL: coiinbase.netlify.app");
        break;

      case "education":
        newHistory.push("Educational Background:");
        newHistory.push(
          "├── BSc Mathematics - Habibullah Bahar University (2019 - Dropout)"
        );
        newHistory.push(
          "├── HSC Science Stream - Kabi Nazrul Govt. College (2017-2019)"
        );
        newHistory.push("└── Self-taught Programming Journey (2023 - Present)");
        break;

      case "contact":
        newHistory.push("Contact Information:");
        newHistory.push("├── Email: nadim-chowdhury@outlook.com");
        newHistory.push("├── Phone: +880 1971 258803");
        newHistory.push("├── Portfolio: nadim.vercel.app");
        newHistory.push("├── LinkedIn: linkedin.com/in/nadim-chowdhury");
        newHistory.push("├── GitHub: github.com/nadim-chowdhury");
        newHistory.push("└── YouTube: youtube.com/@nadim-chowdhury");
        break;

      case "languages":
        newHistory.push("Language Skills:");
        newHistory.push("├── Bengali (Native) ████████████████████ 100%");
        newHistory.push("├── English (Professional) ████████████████░░░░ 80%");
        newHistory.push("├── German (Learning) ██████░░░░░░░░░░░░░░░░ 30%");
        newHistory.push("├── Dutch (Learning) █████░░░░░░░░░░░░░░░░░ 25%");
        newHistory.push("└── Spanish (Learning) ████░░░░░░░░░░░░░░░░░░ 20%");
        break;

      case "hack":
        newHistory.push("Initializing hacking sequence...");
        newHistory.push("[████████████████████████████████] 100%");
        newHistory.push("Access granted to Nadim's portfolio system.");
        newHistory.push("Welcome to the developer matrix.");
        newHistory.push("Type 'matrix' to enter the code realm.");
        break;

      case "matrix":
        newHistory.push("Entering the matrix...");
        newHistory.push("01001000 01100101 01101100 01101100 01101111");
        newHistory.push("Reality.exe has stopped working");
        newHistory.push("Loading developer consciousness...");
        newHistory.push("You are now in the code matrix.");
        break;

      case "clear":
        setHistory([""]);
        return;

      default:
        newHistory.push(`bash: ${command}: command not found`);
        newHistory.push("Type 'help' for available commands.");
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) {
        handleCommand(input.trim());
        setInput("");
      }
    }
  };

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <ScrollArea
      ref={terminalRef}
      className="bg-black text-green-400 font-mono text-xs sm:text-sm h-full p-2 sm:p-4 overflow-y-auto cursor-text"
      onClick={handleTerminalClick}
    >
      <div className="mb-4">
        {history.map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed ${
              line.startsWith("root@nadim-dev:~$")
                ? "text-blue-300 font-bold"
                : line.includes("╔") ||
                  line.includes("║") ||
                  line.includes("╚") ||
                  line.includes("╠") ||
                  line.includes("╣")
                ? "text-cyan-400"
                : ""
            }`}
            style={{ fontSize: window.innerWidth < 640 ? "10px" : "14px" }}
          >
            {line}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap sm:flex-nowrap">
        <span className="text-blue-300 font-bold mr-2 whitespace-nowrap text-xs sm:text-sm">
          root@nadim-dev:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-green-400 outline-none flex-1 min-w-0 text-xs sm:text-sm"
          autoFocus
        />
      </div>
    </ScrollArea>
  );
}

// VS Code Component
function VSCode() {
  const [activeFile, setActiveFile] = useState("portfolio.js");

  const files = {
    "portfolio.js": `// NADIM CHOWDHURY - Full Stack Developer Portfolio
class NadimChowdhuryPortfolio {
  constructor() {
    this.name = "Nadim Chowdhury";
    this.role = "MERN/Full Stack Developer";
    this.location = "Dhaka, Bangladesh";
    this.experience = "2+ years";
    this.skills = [
      'HTML', 'CSS', 'JavaScript', 'TypeScript',
      'React JS', 'Next JS', 'Node JS', 'Express JS',
      'Nest JS', 'MongoDB', 'PostgreSQL', 'React Native',
      'Tailwind CSS', 'Bootstrap', 'Sass', 'Git', 'Docker'
    ];
    this.passion = "Building software for any platform";
  }

  getCurrentRole() {
    return {
      position: 'Full Stack Developer',
      type: 'Freelancer',
      period: 'August 2024 - Present',
      achievements: [
        'Flight booking system with Amadeus GDS API',
        'Stripe payment integration',
        'Interactive maps for airport selection',
        'Real-time data processing'
      ]
    };
  }

  getPreviousExperience() {
    return [
      {
        company: 'Mediusware Ltd',
        position: 'Jr. Frontend Developer',
        period: 'March 2024 - July 2024',
        projects: [
          'Drag-and-drop website builder (Wix-like)',
          'Multi-tenancy event management platform',
          'UI design and API integrations'
        ]
      },
      {
        company: 'Mediusware Ltd',
        position: 'Frontend Trainee',
        period: 'December 2023 - February 2024',
        tasks: [
          'CRUD operations with role-based access',
          'Task management systems',
          'Order management features'
        ]
      }
    ];
  }

  getProjects() {
    return [
      {
        name: 'Flight Booking System',
        url: 'flight-booking-frontend-liart.vercel.app',
        tech: ['React', 'Node.js', 'Amadeus API', 'Stripe']
      },
      {
        name: 'School Management System',
        url: 'scl-mgt-sys-client.vercel.app',
        tech: ['Angular', 'Express.js', 'MongoDB']
      },
      {
        name: 'Car Showroom Platform',
        url: 'cars-showroom.vercel.app',
        tech: ['React', 'Tailwind CSS', 'Node.js']
      }
    ];
  }

  getContactInfo() {
    return {
      email: 'nadim-chowdhury@outlook.com',
      phone: '+880 1971 258803',
      portfolio: 'nadim.vercel.app',
      linkedin: 'linkedin.com/in/nadim-chowdhury',
      github: 'github.com/nadim-chowdhury',
      youtube: 'youtube.com/@nadim-chowdhury'
    };
  }
}

const developer = new NadimChowdhuryPortfolio();
console.log('Developer Profile:', developer.getCurrentRole());
console.log('Projects:', developer.getProjects());`,

    "experience.json": `{
  "current": {
    "role": "Full Stack Developer",
    "type": "Freelancer",
    "period": "August 2024 - Present",
    "description": "Developing full-stack solutions with real-time APIs"
  },
  "previous": [
    {
      "company": "Mediusware Ltd",
      "role": "Jr. Frontend Developer",
      "period": "March 2024 - July 2024",
      "achievements": [
        "Drag-and-drop website builder development",
        "Multi-tenancy event management platform",
        "UI design and API integrations"
      ]
    },
    {
      "company": "Mediusware Ltd",
      "role": "Frontend Trainee",
      "period": "December 2023 - February 2024",
      "skills_gained": [
        "CRUD operations",
        "Role-based access control",
        "Task management systems"
      ]
    }
  ]
}`,

    "skills.ts": `interface TechnicalSkills {
  frontend: string[];
  backend: string[];
  databases: string[];
  styling: string[];
  tools: string[];
  mobile: string[];
}

const nadimSkills: TechnicalSkills = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React JS', 'Next JS', 'Angular'],
  backend: ['Node JS', 'Express JS', 'Nest JS'],
  databases: ['MongoDB', 'PostgreSQL'],
  styling: ['Tailwind CSS', 'Bootstrap', 'Sass'],
  tools: ['Git', 'Docker'],
  mobile: ['React Native']
};

export default nadimSkills;`,
  };

  const highlightCode = (code: any, fileType: any) => {
    // Escape HTML first
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (fileType === "json") {
      return (
        escaped
          // Property names (keys)
          .replace(
            /("[\w\s_-]+")(\s*:)/g,
            '<span style="color: #60a5fa;">$1</span>$2'
          )
          // String values
          .replace(/:\s*(".*?")/g, ': <span style="color: #34d399;">$1</span>')
          // Brackets and braces
          .replace(/(\[|\]|\{|\})/g, '<span style="color: #fbbf24;">$1</span>')
      );
    }

    // For JS and TS files
    return (
      escaped
        // Comments
        .replace(/\/\/(.*$)/gm, '<span style="color: #9ca3af;">//$1</span>')
        // Keywords
        .replace(
          /\b(class|constructor|return|const|let|var|function|if|else|for|while|interface|export|import|default|new|this)\b/g,
          '<span style="color: #c084fc;">$1</span>'
        )
        // Types
        .replace(
          /\b(string|number|boolean|Array)\b/g,
          '<span style="color: #60a5fa;">$1</span>'
        )
        // String literals
        .replace(/'([^']*)'/g, "<span style=\"color: #34d399;\">'$1'</span>")
        .replace(/"([^"]*)"/g, '<span style="color: #34d399;">"$1"</span>')
        // Object properties
        .replace(
          /(\w+)(\s*:)(?![^<]*<\/span>)/g,
          '<span style="color: #60a5fa;">$1</span>$2'
        )
        // Numbers
        .replace(
          /\b(\d+)\b(?![^<]*<\/span>)/g,
          '<span style="color: #fb923c;">$1</span>'
        )
        // Brackets and operators
        .replace(
          /(\[|\]|\{|\}|\(|\))/g,
          '<span style="color: #fbbf24;">$1</span>'
        )
        .replace(/(=>)/g, '<span style="color: #c084fc;">$1</span>')
    );
  };

  const getFileType = (fileName: any) => {
    if (fileName.endsWith(".json")) return "json";
    if (fileName.endsWith(".ts")) return "ts";
    if (fileName.endsWith(".js")) return "js";
    return "js";
  };

  return (
    <div className="bg-gray-950 text-gray-300 font-mono text-xs sm:text-sm h-screen flex flex-col">
      {/* VS Code Header */}
      <div className="bg-gray-900 p-2 border-b border-gray-700 flex items-center overflow-x-auto flex-shrink-0">
        <div className="flex space-x-1 sm:space-x-2 flex-nowrap min-w-max">
          {Object.keys(files).map((fileName) => (
            <button
              key={fileName}
              onClick={() => setActiveFile(fileName)}
              className={`px-2 sm:px-3 py-1 rounded-t text-xs border-b-2 transition-colors whitespace-nowrap ${
                activeFile === fileName
                  ? "bg-gray-700 text-green-400 border-green-400"
                  : "bg-gray-600 text-gray-300 border-transparent hover:bg-gray-700"
              }`}
            >
              {fileName}
            </button>
          ))}
        </div>
      </div>

      {/* File Content */}
      <ScrollArea className="p-2 sm:p-4 flex-1 overflow-auto">
        <pre className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
          <code
            dangerouslySetInnerHTML={{
              __html: highlightCode(
                (files as any)[activeFile],
                getFileType(activeFile)
              ),
            }}
          />
        </pre>
      </ScrollArea>
    </div>
  );
}
// Browser Component
function Browser() {
  const [currentUrl, setCurrentUrl] = useState(
    "https://github.com/nadim-chowdhury"
  );

  return (
    <div className="bg-gray-900 text-green-400 h-full">
      {/* Browser Header */}
      <div className="bg-gray-900 p-2 border-b border-gray-700 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        </div>
        <input
          type="text"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          className="bg-gray-700 text-white px-2 sm:px-3 py-1 rounded flex-1 text-xs sm:text-sm"
        />
        <button className="bg-green-600 hover:bg-green-500 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
          Go
        </button>
      </div>

      {/* Browser Content */}
      <div className="p-3 sm:p-6 h-full overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* GitHub Profile Header */}
          <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-900 rounded-lg border border-green-500">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
              <span className="text-xl sm:text-2xl font-bold">NC</span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                Nadim Chowdhury
              </h1>
              <p className="text-gray-300 text-base sm:text-lg">
                MERN/Full Stack Developer
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                📍 Dhaka, Bangladesh
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                <span className="text-xs sm:text-sm bg-green-600 px-2 py-1 rounded">
                  Available for hire
                </span>
                <span className="text-xs sm:text-sm bg-blue-600 px-2 py-1 rounded">
                  Open to collaborate
                </span>
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-green-400">
                🏫 School Management System
              </h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Comprehensive school management platform built with Angular,
                featuring student enrollment, grade management, and
                administrative tools.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-red-600 px-2 py-1 rounded text-xs">
                  Angular
                </span>
                <span className="bg-green-600 px-2 py-1 rounded text-xs">
                  Express.js
                </span>
                <span className="bg-yellow-600 px-2 py-1 rounded text-xs">
                  MongoDB
                </span>
                <span className="bg-indigo-600 px-2 py-1 rounded text-xs">
                  TypeScript
                </span>
              </div>
              <a
                href="#"
                className="text-blue-400 hover:underline text-xs sm:text-sm break-all"
              >
                scl-mgt-sys-client.vercel.app →
              </a>
            </div>

            <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-green-400">
                🚗 Car Showroom Platform
              </h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Modern car showroom website with inventory management, detailed
                vehicle specifications, and interactive browsing experience.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-600 px-2 py-1 rounded text-xs">
                  React
                </span>
                <span className="bg-teal-600 px-2 py-1 rounded text-xs">
                  Tailwind CSS
                </span>
                <span className="bg-green-600 px-2 py-1 rounded text-xs">
                  Node.js
                </span>
                <span className="bg-gray-600 px-2 py-1 rounded text-xs">
                  REST API
                </span>
              </div>
              <a
                href="#"
                className="text-blue-400 hover:underline text-xs sm:text-sm break-all"
              >
                cars-showroom.vercel.app →
              </a>
            </div>

            <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-green-400">
                💰 Cryptocurrency Exchange
              </h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Secure cryptocurrency trading platform with real-time market
                data, wallet management, and advanced trading features.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-orange-600 px-2 py-1 rounded text-xs">
                  React
                </span>
                <span className="bg-purple-600 px-2 py-1 rounded text-xs">
                  Crypto APIs
                </span>
                <span className="bg-blue-600 px-2 py-1 rounded text-xs">
                  WebSocket
                </span>
                <span className="bg-green-600 px-2 py-1 rounded text-xs">
                  Security
                </span>
              </div>
              <a
                href="#"
                className="text-blue-400 hover:underline text-xs sm:text-sm break-all"
              >
                coiinbase.netlify.app →
              </a>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="mb-6 sm:mb-8 bg-gray-900 p-4 sm:p-6 rounded-lg border border-green-500">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-400">
              Professional Experience
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="border-l-4 border-green-500 pl-4 sm:pl-6">
                <h4 className="text-base sm:text-lg font-semibold text-blue-400">
                  Full Stack Developer (Freelancer)
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-2">
                  August 2024 - Present
                </p>
                <ul className="text-gray-300 text-xs sm:text-sm space-y-1">
                  <li>
                    • Developed full-stack flight booking system with Amadeus
                    GDS API
                  </li>
                  <li>
                    • Integrated Stripe payment system for secure transactions
                  </li>
                  <li>
                    • Implemented interactive maps for seamless airport
                    selection
                  </li>
                  <li>
                    • Working with real-time data processing and API
                    integrations
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 sm:pl-6">
                <h4 className="text-base sm:text-lg font-semibold text-blue-400">
                  Jr. Frontend Developer - Mediusware Ltd
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-2">
                  March 2024 - July 2024
                </p>
                <ul className="text-gray-300 text-xs sm:text-sm space-y-1">
                  <li>
                    • Developed drag-and-drop website builder (Wix/Google
                    Sites-like)
                  </li>
                  <li>
                    • Multi-tenancy event management web app with subdomain
                    publishing
                  </li>
                  <li>• UI page design and robust API integrations</li>
                  <li>
                    • Collaborated on in-house projects with enhanced
                    functionality
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4 sm:pl-6">
                <h4 className="text-base sm:text-lg font-semibold text-blue-400">
                  Frontend Trainee - Mediusware Ltd
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-2">
                  December 2023 - February 2024
                </p>
                <ul className="text-gray-300 text-xs sm:text-sm space-y-1">
                  <li>• CRUD operations with role-based access control</li>
                  <li>• Back Office and Task management functionalities</li>
                  <li>• Customer Order management with role-specific access</li>
                  <li>• Delivery and pick-up preference implementations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6 sm:mb-8 bg-gray-900 p-4 sm:p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-400">
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">
                  Frontend
                </h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="bg-gray-700 px-2 py-1 rounded">HTML/CSS</div>
                  <div className="bg-gray-700 px-2 py-1 rounded">
                    JavaScript
                  </div>
                  <div className="bg-gray-700 px-2 py-1 rounded">
                    TypeScript
                  </div>
                  <div className="bg-gray-700 px-2 py-1 rounded">React JS</div>
                  <div className="bg-gray-700 px-2 py-1 rounded">Next JS</div>
                </div>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">
                  Backend
                </h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="bg-gray-700 px-2 py-1 rounded">Node JS</div>
                  <div className="bg-gray-700 px-2 py-1 rounded">
                    Express JS
                  </div>
                  <div className="bg-gray-700 px-2 py-1 rounded">Nest JS</div>
                  <div className="bg-gray-700 px-2 py-1 rounded">REST APIs</div>
                </div>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">
                  Database
                </h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="bg-gray-700 px-2 py-1 rounded">MongoDB</div>
                  <div className="bg-gray-700 px-2 py-1 rounded">
                    PostgreSQL
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">
                  Tools
                </h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="bg-gray-700 px-2 py-1 rounded">Git</div>
                  <div className="bg-gray-700 px-2 py-1 rounded">Docker</div>
                  <div className="bg-gray-700 px-2 py-1 rounded">
                    Tailwind CSS
                  </div>
                  <div className="bg-gray-700 px-2 py-1 rounded">
                    React Native
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-green-500">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-400">
              Get In Touch
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <a
                  href="mailto:nadim-chowdhury@outlook.com"
                  className="flex items-center space-x-2 text-blue-400 hover:underline text-sm sm:text-base"
                >
                  <span>📧</span>
                  <span className="break-all">nadim-chowdhury@outlook.com</span>
                </a>
                <div className="flex items-center space-x-2 text-gray-300 text-sm sm:text-base">
                  <span>📱</span>
                  <span>+880 1971 258803</span>
                </div>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-blue-400 hover:underline text-sm sm:text-base"
                >
                  <span>🌐</span>
                  <span>nadim.vercel.app</span>
                </a>
              </div>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-blue-400 hover:underline text-sm sm:text-base"
                >
                  <span>💼</span>
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-blue-400 hover:underline text-sm sm:text-base"
                >
                  <span>📺</span>
                  <span>YouTube Channel</span>
                </a>
                <div className="flex items-center space-x-2 text-gray-300 text-sm sm:text-base">
                  <span>📍</span>
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// System Monitor Component
function SystemMonitor() {
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memUsage, setMemUsage] = useState(67);
  const [diskUsage, setDiskUsage] = useState(34);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 40) + 30);
      setMemUsage(Math.floor(Math.random() * 30) + 50);
      setDiskUsage(Math.floor(Math.random() * 20) + 25);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-green-400 font-mono text-xs sm:text-sm h-full p-2 sm:p-4">
      <h2 className="text-base sm:text-lg font-bold mb-4 text-cyan-400">
        SYSTEM MONITOR - NADIM DEV MACHINE
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="border border-green-500 p-3 sm:p-4 rounded">
          <h3 className="text-yellow-400 mb-3 text-sm sm:text-base">
            System Resources
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-xs sm:text-sm">
                <span>CPU Usage</span>
                <span>{cpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${cpuUsage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-xs sm:text-sm">
                <span>Memory</span>
                <span>{memUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${memUsage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-xs sm:text-sm">
                <span>Disk I/O</span>
                <span>{diskUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${diskUsage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-green-500 p-3 sm:p-4 rounded">
          <h3 className="text-yellow-400 mb-3 text-sm sm:text-base">
            Network Activity
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>GitHub API:</span>
              <span className="text-green-400">CONNECTED</span>
            </div>
            <div className="flex justify-between">
              <span>Portfolio Server:</span>
              <span className="text-green-400">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span>Database:</span>
              <span className="text-green-400">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span>CDN:</span>
              <span className="text-green-400">SYNCED</span>
            </div>
          </div>
        </div>

        <div className="border border-green-500 p-3 sm:p-4 rounded">
          <h3 className="text-yellow-400 mb-3 text-sm sm:text-base">
            Active Processes
          </h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>react-dev-server</span>
              <span>PID: 1337</span>
            </div>
            <div className="flex justify-between">
              <span>node-backend</span>
              <span>PID: 2024</span>
            </div>
            <div className="flex justify-between">
              <span>mongodb-service</span>
              <span>PID: 3306</span>
            </div>
            <div className="flex justify-between">
              <span>nginx-proxy</span>
              <span>PID: 8080</span>
            </div>
          </div>
        </div>

        <div className="border border-green-500 p-3 sm:p-4 rounded">
          <h3 className="text-yellow-400 mb-3 text-sm sm:text-base">
            Developer Stats
          </h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Lines of Code (Today):</span>
              <span>2,847</span>
            </div>
            <div className="flex justify-between">
              <span>Commits (This Week):</span>
              <span>23</span>
            </div>
            <div className="flex justify-between">
              <span>Coffee Consumed:</span>
              <span>∞</span>
            </div>
            <div className="flex justify-between">
              <span>Bugs Fixed:</span>
              <span>12</span>
            </div>
            <div className="flex justify-between">
              <span>Features Added:</span>
              <span>8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Command Palette Props
interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (commandId: string) => void;
}

// Command Palette
function CommandPalette({ isOpen, onClose, onSelect }: CommandPaletteProps) {
  const [query, setQuery] = useState<string>("");

  const commands: Command[] = [
    {
      id: "terminal",
      name: "Open Terminal",
      description: "Launch terminal application with portfolio commands",
    },
    {
      id: "vscode",
      name: "Open VS Code",
      description: "View source code and project files",
    },
    {
      id: "browser",
      name: "Open Browser",
      description: "Browse GitHub profile and projects",
    },
    {
      id: "monitor",
      name: "System Monitor",
      description: "View system resources and developer stats",
    },
    {
      id: "about",
      name: "About Nadim",
      description: "Learn about Nadim Chowdhury",
    },
    {
      id: "skills",
      name: "Technical Skills",
      description: "View MERN stack expertise",
    },
    {
      id: "contact",
      name: "Contact Info",
      description: "Get in touch for opportunities",
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Enter" && filteredCommands.length > 0) {
        onSelect(filteredCommands[0].id);
        onClose();
        setQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, filteredCommands, onClose, onSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-green-500 rounded-lg shadow-2xl max-w-lg w-full">
        <div className="p-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-900 text-green-400 px-4 py-2 rounded-lg border border-gray-700 focus:border-green-500 outline-none"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
        <div className="max-h-64 overflow-y-auto">
          {filteredCommands.map((cmd, index) => (
            <div
              key={cmd.id}
              onClick={() => {
                onSelect(cmd.id);
                onClose();
                setQuery("");
              }}
              className={`p-3 cursor-pointer hover:bg-gray-900 border-b border-gray-700 ${
                index === 0 ? "bg-gray-900" : ""
              }`}
            >
              <div className="text-green-400 font-semibold text-sm">
                {cmd.name}
              </div>
              <div className="text-gray-400 text-xs">{cmd.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState("Initializing system...");

  const tasks = useMemo(
    () => [
      "Initializing system...",
      "Loading NADIM OS...",
      "Connecting to portfolio servers...",
      "Authenticating developer credentials...",
      "Loading project database...",
      "Initializing development environment...",
      "Starting applications...",
      "System ready!",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        const taskIndex = Math.floor((newProgress / 100) * tasks.length);
        setCurrentTask(tasks[Math.min(taskIndex, tasks.length - 1)]);

        if (newProgress >= 100) {
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete, tasks]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
      <div className="text-center max-w-md w-full">
        <div className="text-2xl sm:text-4xl font-bold text-green-400 mb-6 sm:mb-8">
          ░░░ NADIM OS ░░░
        </div>
        <div className="w-full bg-gray-900 rounded-full h-3 sm:h-4 mb-4">
          <div
            className="bg-green-500 h-3 sm:h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-green-400 text-sm sm:text-base mb-2">
          {Math.floor(progress)}% Complete
        </div>
        <div className="text-gray-400 text-xs sm:text-sm font-mono break-words">
          {currentTask}
        </div>
      </div>
    </div>
  );
}

// Desktop Component
function Desktop() {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const [topZIndex, setTopZIndex] = useState<number>(100);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextNotifId, setNextNotifId] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addNotification = (
    message: string,
    type: "info" | "success" | "warning" | "error" = "info"
  ) => {
    const notification: Notification = {
      id: nextNotifId,
      message,
      type,
      timestamp: new Date(),
    };
    setNotifications((prev) => [...prev, notification]);
    setNextNotifId((prev) => prev + 1);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(notification.id);
    }, 5000);
  };

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const openWindow = (type: string) => {
    // Check if window already exists
    const existingWindow = windows.find(
      (w) => w.type === type && !w.isMinimized
    );
    if (existingWindow) {
      bringToFront(existingWindow.id);
      addNotification(`${existingWindow.title} brought to front`, "info");
      return;
    }

    const titles = {
      terminal: "Terminal - Nadim Dev",
      vscode: "VS Code - Portfolio",
      browser: "GitHub - Nadim Chowdhury",
      monitor: "System Monitor",
    };

    // Adjust window size based on screen size
    const getWindowSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (screenWidth < 768) {
        return { width: screenWidth, height: screenHeight };
      } else if (screenWidth < 1024) {
        return {
          width: Math.min(800, screenWidth - 40),
          height: Math.min(600, screenHeight - 100),
        };
      } else {
        return { width: 900, height: 650 };
      }
    };

    const getWindowPosition = () => {
      if (isMobile) {
        return { x: 0, y: 0 };
      }
      return {
        x: Math.min(100 + nextId * 30, window.innerWidth - 400),
        y: Math.min(50 + nextId * 30, window.innerHeight - 400),
      };
    };

    const newWindow: WindowData = {
      id: nextId,
      type,
      title: titles[type as keyof typeof titles] || type,
      position: getWindowPosition(),
      size: getWindowSize(),
      isMinimized: false,
      isMaximized: isMobile,
      zIndex: topZIndex + 1,
    };

    setWindows((prev) => [...prev, newWindow]);
    setNextId((prev) => prev + 1);
    setTopZIndex((prev) => prev + 1);
    addNotification(`${newWindow.title} opened successfully`, "success");
  };

  const closeWindow = (id: number) => {
    const window = windows.find((w) => w.id === id);
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (window) {
      addNotification(`${window.title} closed`, "warning");
    }
  };

  const minimizeWindow = (id: number) => {
    if (isMobile) return; // Disable minimize on mobile

    const window = windows.find((w) => w.id === id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
    if (window) {
      addNotification(
        `${window.title} ${window.isMinimized ? "restored" : "minimized"}`,
        "info"
      );
    }
  };

  const maximizeWindow = (id: number) => {
    const window = windows.find((w) => w.id === id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    if (window) {
      addNotification(
        `${window.title} ${window.isMaximized ? "restored" : "maximized"}`,
        "info"
      );
    }
  };

  const moveWindow = (id: number, position: Position) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  };

  const resizeWindow = (id: number, size: Size) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)));
  };

  const bringToFront = (id: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: topZIndex + 1 } : w))
    );
    setTopZIndex((prev) => prev + 1);
  };

  const renderWindowContent = (type: string): ReactNode => {
    switch (type) {
      case "terminal":
        return <Terminal />;
      case "vscode":
        return <VSCode />;
      case "browser":
        return <Browser />;
      case "monitor":
        return <SystemMonitor />;
      default:
        return <div className="text-red-400">Unknown application: {type}</div>;
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowPalette(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden">
      {/* Matrix background */}
      <MatrixRain />

      {/* Notifications */}
      <NotificationSystem
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      {/* Desktop Icons - Responsive grid */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`${isMobile ? "grid grid-cols-4 gap-2" : "space-y-4"}`}>
          <div
            className={`flex flex-col items-center cursor-pointer hover:bg-gray-900 hover:bg-opacity-50 p-2 sm:p-3 rounded-lg transition-all group ${
              isMobile ? "" : "mb-4"
            }`}
            onClick={() => openWindow("terminal")}
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black border-2 border-green-400 rounded-lg flex items-center justify-center group-hover:border-green-300 transition-colors">
              <span className="text-green-400 text-sm sm:text-lg font-bold">
                $
              </span>
            </div>
            <span className="text-xs mt-1 sm:mt-2 text-green-400">
              Terminal
            </span>
          </div>

          <div
            className={`flex flex-col items-center cursor-pointer hover:bg-gray-900 hover:bg-opacity-50 p-2 sm:p-3 rounded-lg transition-all group ${
              isMobile ? "" : "mb-4"
            }`}
            onClick={() => openWindow("vscode")}
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <span className="text-white text-sm sm:text-lg font-bold">
                &lt;/&gt;
              </span>
            </div>
            <span className="text-xs mt-1 sm:mt-2 text-green-400">VS Code</span>
          </div>

          <div
            className={`flex flex-col items-center cursor-pointer hover:bg-gray-900 hover:bg-opacity-50 p-2 sm:p-3 rounded-lg transition-all group ${
              isMobile ? "" : "mb-4"
            }`}
            onClick={() => openWindow("browser")}
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center group-hover:bg-orange-400 transition-colors">
              <span className="text-white text-sm sm:text-lg">🌐</span>
            </div>
            <span className="text-xs mt-1 sm:mt-2 text-green-400">Browser</span>
          </div>

          <div
            className={`flex flex-col items-center cursor-pointer hover:bg-gray-900 hover:bg-opacity-50 p-2 sm:p-3 rounded-lg transition-all group ${
              isMobile ? "" : "mb-4"
            }`}
            onClick={() => openWindow("monitor")}
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <span className="text-white text-sm sm:text-lg">📊</span>
            </div>
            <span className="text-xs mt-1 sm:mt-2 text-green-400">Monitor</span>
          </div>
        </div>
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          position={window.position}
          size={window.size}
          isMinimized={window.isMinimized}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onDrag={moveWindow}
          onResize={resizeWindow}
          onFocus={bringToFront}
        >
          {renderWindowContent(window.type)}
        </Window>
      ))}

      {/* Taskbar - Responsive */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gray-950 bg-opacity-95 border-t-2 border-green-500 p-2 backdrop-blur-sm ${
          isMobile
            ? "flex flex-col space-y-2"
            : "flex items-center justify-between"
        }`}
      >
        <div
          className={`flex items-center ${
            isMobile ? "justify-between w-full" : "space-x-4"
          }`}
        >
          <button
            onClick={() => setShowPalette(true)}
            className=" text-xs sm:text-sm font-semibold transition-colors flex items-center space-x-1 sm:space-x-2"
          >
            <span>IP</span>
            <span>127.0.0.1</span>
          </button>
          {!isMobile && (
            <span className="text-xs text-gray-400 hidden md:block">
              Press Ctrl+K for command palette
            </span>
          )}
        </div>

        {/* Open windows */}
        {windows.filter((w) => !w.isMinimized).length > 0 && (
          <div
            className={`flex ${
              isMobile ? "justify-center" : "space-x-2"
            } flex-wrap gap-2`}
          >
            {windows
              .filter((w) => !w.isMinimized)
              .map((window) => (
                <button
                  key={window.id}
                  onClick={() => bringToFront(window.id)}
                  className="bg-gray-700 hover:bg-gray-600 px-2 sm:px-3 py-1 rounded text-xs transition-colors border border-green-500 truncate max-w-24 sm:max-w-none"
                >
                  {window.title.split(" - ")[0]}
                </button>
              ))}
          </div>
        )}

        <div
          className={`text-xs text-green-400 font-mono ${
            isMobile ? "text-center" : ""
          }`}
        >
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={showPalette}
        onClose={() => setShowPalette(false)}
        onSelect={openWindow}
      />
    </div>
  );
}

export default function HackerResume() {
  return <Desktop />;
}
