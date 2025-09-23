"use client";

import LightRays from "@/components/LightRays";
import MatrixCount from "@/components/MatrixCount";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Minus, Square, X } from "lucide-react";
import Link from "next/link";
// import AdditionalProjects from "@/components/AdditionalProjects";
// import Banner from "@/components/Banner";
// import Education from "@/components/Education";
// import Experiences from "@/components/Experiences";
// import Heading from "@/components/Heading";
// import MobileAppProjects from "@/components/MobileAppProjects";
// import Projects from "@/components/Projects";
// import Skills from "@/components/Skills";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AnimatePresence } from "framer-motion";

// export default function Home() {
//   return (
//     <main className="container mx-auto">
//       <Banner />
//       <Skills />

//       <div className="pt-16">
//         <Heading title="Top Projects" />
//         <AnimatePresence>
//           <Tabs defaultValue="full-stack" className="">
//             <div className="w-full flex items-center justify-center">
//               <TabsList className="bg-gradient-to-r from-cyan-100 to-teal-100 h-11 px-2">
//                 <TabsTrigger value="full-stack" className="">
//                   Full Stack Projects
//                 </TabsTrigger>
//                 <TabsTrigger value="mobile-app">
//                   Mobile App Projects
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <TabsContent value="full-stack">
//               <Projects />
//             </TabsContent>
//             <TabsContent value="mobile-app">
//               <MobileAppProjects />
//             </TabsContent>
//           </Tabs>
//         </AnimatePresence>
//       </div>

//       <Experiences />
//       <AdditionalProjects />
//       <Education />
//     </main>
//   );
// }

import React, { useState, useEffect, useRef } from "react";

interface ExperienceItem {
  role: string;
  period: string;
  tasks: string[];
}

interface ProjectItem {
  name: string;
  url: string;
}

interface Commands {
  [key: string]: string;
}

const Home: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>("/home/visitor");
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [matrixCount, setMatrixCount] = useState<number>(10);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<number | null>(null);

  const commands: Commands = {
    help: "Available commands: about, skills, experience, education, projects, contact, clear",
    about:
      "As a self-learned creative and passionate programmer/developer I like to build and develop software for any platform. My hobbies are learning, improving skills, solving problems, and adapting to new technologies.",
    clear: "CLEAR_TERMINAL",
  };

  const skills: string[] = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React JS",
    "Next JS",
    "Node JS",
    "Express JS",
    "Nest JS",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Bootstrap",
    "Sass",
    "Git",
    "React Native",
    "Docker",
  ];

  const experience: ExperienceItem[] = [
    {
      role: "Full Stack Software Developer (Easy Fashion Ltd)",
      period: "01 July 2025 - Present",
      tasks: [
        "Designed and developed features across frontend and backend for a large-scale ERP system, integrating modules like POS, Inventory, Production, and HRM.",
        "Implemented and consumed REST APIs for secure and efficient data communication across modules.",
        "Optimized performance, scalability, and security of ERP modules following best practices and clean architecture.",
        "Collaborated with a cross-functional team to deliver enterprise-grade solutions that meet business needs.",
        "Maintained modular and scalable code for easier updates and long-term system sustainability.",
      ],
    },
    {
      role: "Full Stack Web Developer (Freelancer)",
      period: "01 August 2024 - 30 June 2025",
      tasks: [
        "Developed a full-stack flight booking system utilizing real-time data from the Amadeus GDS API.",
        "Integrated a Stripe payment system and implemented interactive maps for seamless airport selection.",
      ],
    },
    {
      role: "Jr. Frontend Developer (Mediusware Ltd)",
      period: "01 March, 2024 - 31 July, 2024",
      tasks: [
        "Developing a drag-and-drop website builder with features similar to Wix and Google Sites.",
        "Contributed to a multi-tenancy event management web app builder with subdomain publishing.",
        "Collaborated on in-house projects, focusing on designing UI pages and API integrations.",
      ],
    },
    {
      role: "Frontend Trainee (Mediusware Ltd)",
      period: "04 December, 2023 - 29 February, 2024",
      tasks: [
        "Implemented CRUD operations for the Profile Page with role-based access control.",
        "Developed Back Office and Task management functionalities.",
        "Designed Customer Order management features with role-specific access.",
      ],
    },
  ];

  const projects: ProjectItem[] = [
    {
      name: "Flight Booking System",
      url: "https://flight-booking-frontend-liart.vercel.app",
    },
    {
      name: "School Management System",
      url: "https://scl-mgt-sys-client.vercel.app",
    },
    { name: "Dashboard", url: "https://dash-b0ard.netlify.app" },
    { name: "Cars Showroom", url: "https://cars-showroom.vercel.app" },
    { name: "Coinbase Clone", url: "https://coiinbase.netlify.app" },
    { name: "Booking System", url: "https://b0oking.netlify.app" },
  ];

  // ---------------- Virtual Filesystem & Shell ----------------
  type FsFile = { type: "file"; content: string };
  type FsDir = { type: "dir"; children: Record<string, FsNode> };
  type FsNode = FsFile | FsDir;

  const vfs: FsDir = {
    type: "dir",
    children: {
      home: {
        type: "dir",
        children: {
          visitor: {
            type: "dir",
            children: {
              "readme.txt": {
                type: "file",
                content:
                  "Welcome to Nadim's portfolio terminal. Type 'help' for commands.",
              },
              projects: {
                type: "dir",
                children: {
                  "flight-booking.txt": {
                    type: "file",
                    content:
                      "Flight Booking System - see: https://flight-booking-frontend-liart.vercel.app",
                  },
                  "school-mgmt.txt": {
                    type: "file",
                    content:
                      "School Management System - see: https://scl-mgt-sys-client.vercel.app",
                  },
                  "dashboard.txt": {
                    type: "file",
                    content: "Dashboard - see: https://dash-b0ard.netlify.app",
                  },
                },
              },
              contact: {
                type: "dir",
                children: {
                  "info.txt": {
                    type: "file",
                    content:
                      "Email: nadim-chowdhury@outlook.com\nLinkedIn: linkedin.com/in/nadim-chowdhury\nGitHub: github.com/nadim-chowdhury",
                  },
                },
              },
              skills: {
                type: "dir",
                children: {
                  "all.txt": {
                    type: "file",
                    content: `${[...skills].join(", ")}`,
                  },
                },
              },
            },
          },
        },
      },
      etc: { type: "dir", children: {} },
      var: { type: "dir", children: {} },
      tmp: { type: "dir", children: {} },
    },
  };

  const tilde = (path: string): string =>
    path.startsWith("/home/visitor")
      ? path === "/home/visitor"
        ? "~"
        : path.replace("/home/visitor", "~")
      : path;

  const unTilde = (path: string): string =>
    path.startsWith("~") ? path.replace("~", "/home/visitor") : path;

  const normalizePath = (basePath: string, target: string): string => {
    const raw = target.trim() === "" ? basePath : target.trim();
    const absolute = raw.startsWith("/")
      ? raw
      : raw.startsWith("~")
      ? unTilde(raw)
      : `${basePath}/${raw}`;
    const parts = absolute.split("/");
    const stack: string[] = [];
    for (const part of parts) {
      if (!part || part === ".") continue;
      if (part === "..") {
        if (stack.length > 0) stack.pop();
      } else {
        stack.push(part);
      }
    }
    return "/" + stack.join("/");
  };

  const getNode = (path: string): FsNode | null => {
    const full = path === "/" ? "/" : path.replace(/^\/+/, "/");
    if (full === "/") return vfs; // root
    const parts = full.split("/").filter(Boolean);
    let node: FsNode = vfs;
    for (const part of parts) {
      if (node.type !== "dir") return null;
      const nextNode: FsNode | undefined = node.children[part];
      if (!nextNode) return null;
      node = nextNode;
    }
    return node;
  };

  const listPath = (path: string): string | null => {
    const node = getNode(path);
    if (!node) return null;
    if (node.type === "dir") {
      return Object.keys(node.children).sort().join("  ");
    }
    return path.split("/").pop() || "";
  };

  const readFile = (path: string): string | null => {
    const node = getNode(path);
    if (!node || node.type !== "file") return null;
    return node.content;
  };

  const getPrompt = (): string => {
    return `visitor@nadim-portfolio:${tilde(currentPath)}$`;
  };

  const typeWriter = (text: string, callback?: () => void): void => {
    // If a previous typing interval is running, clear it first
    if (typingTimerRef.current !== null) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setIsTyping(true);
    let i = 0;
    const timer = window.setInterval(() => {
      if (i < text.length) {
        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          if (newHistory.length > 0) {
            newHistory[newHistory.length - 1] = text.substring(0, i + 1);
          }
          return newHistory;
        });
        i++;
      } else {
        window.clearInterval(timer);
        typingTimerRef.current = null;
        setIsTyping(false);
        if (callback) callback();
      }
    }, 10);
    typingTimerRef.current = timer;
  };

  const scrollToBottom = (): void => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const executeCommand = (cmd: string): void => {
    const original = cmd.trim();
    const args = original.split(/\s+/);
    const name = (args.shift() || "").toLowerCase();

    setTerminalHistory((prev) => [...prev, `${getPrompt()} ${original}`, ""]);

    if (name === "clear") {
      setTimeout(() => {
        setTerminalHistory([]);
      }, 100);
      return;
    }

    // Shell commands
    if (name === "pwd") {
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = tilde(currentPath);
        return newHistory;
      });
      return;
    }

    if (name === "ls") {
      const target = args[0]
        ? normalizePath(currentPath, args[0])
        : currentPath;
      const out = listPath(target);
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] =
          out ??
          `ls: cannot access '${args[0] || ""}': No such file or directory`;
        return newHistory;
      });
      return;
    }

    if (name === "cd") {
      const nextPath = normalizePath(currentPath, args[0] || "~");
      const node = getNode(nextPath);
      let message = "";
      if (!node) {
        message = `cd: ${args[0] || ""}: No such file or directory`;
      } else if (node.type !== "dir") {
        message = `cd: ${args[0] || ""}: Not a directory`;
      } else {
        setCurrentPath(nextPath);
        message = "";
      }
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = message;
        return newHistory;
      });
      return;
    }

    if (name === "cat") {
      const target = args[0] ? normalizePath(currentPath, args[0]) : "";
      const out = target ? readFile(target) : null;
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] =
          out ?? `cat: ${args[0] || ""}: No such file`;
        return newHistory;
      });
      return;
    }

    if (name === "echo") {
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = args.join(" ");
        return newHistory;
      });
      return;
    }

    if (name === "help") {
      const helpText = `Available commands:\n\n- ls, cd, pwd, cat, echo, help, clear\n- about, skills, experience, education, projects, contact`;
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = helpText;
        return newHistory;
      });
      return;
    }

    // Portfolio commands (typewriter-enabled)
    const command = name;
    if (commands[command]) {
      if (command === "about") {
        typeWriter(commands[command], scrollToBottom);
      } else {
        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = commands[command];
          return newHistory;
        });
      }
    } else if (command === "skills") {
      const skillsText = skills.join(", ");
      typeWriter(`Technical Skills:\n\n${skillsText}`, scrollToBottom);
    } else if (command === "experience") {
      let expText = "Professional Experience:\n\n";
      experience.forEach((exp, index) => {
        expText += `${index + 1}. ${exp.role}\n   ${exp.period}\n`;
        exp.tasks.forEach((task) => {
          expText += `   • ${task}\n`;
        });
        expText += "\n";
      });
      typeWriter(expText, scrollToBottom);
    } else if (command === "projects") {
      let projectText = "Featured Projects:\n\n";
      projects.forEach((project, index) => {
        projectText += `${index + 1}. ${project.name}\n   ${project.url}\n\n`;
      });
      typeWriter(projectText, scrollToBottom);
    } else if (command === "contact") {
      const contactText = `Contact Information:

- Email: nadim-chowdhury@outlook.com
- Phone: +880 1971 258803
- Location: Dhaka, Bangladesh
- Portfolio: nadim.vercel.app
- LinkedIn: linkedin.com/in/nadim-chowdhury
- GitHub: github.com/nadim-chowdhury
- YouTube: youtube.com/@nadim-chowdhury`;
      typeWriter(contactText, scrollToBottom);
    } else if (command === "education") {
      const eduText = `Education:

- BSC (Department of Mathematics) - Habibullah Bahar University College (2019 - Dropout)
- HSC (Science Stream) - Kabi Nazrul Govt. College (2017 - 2019)`;
      typeWriter(eduText, scrollToBottom);
    } else {
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[
          newHistory.length - 1
        ] = `Command not found: ${cmd}. Type 'help' for available commands.`;
        return newHistory;
      });
    }

    setTimeout(scrollToBottom, 50);
  };

  const handleCommandClick = (cmd: string): void => {
    if (!isTyping) {
      // setCurrentCommand(cmd);
      executeCommand(cmd);
    }
  };

  useEffect(() => {
    const getWelcomeMsg = () => {
      const width = window.innerWidth;

      if (width > 1024) {
        // large screen
        return `
 ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
 ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
 ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
 ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
 ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
 ===============================================================
 NADIM CHOWDHURY - Software Developer | Cybersecurity Enthusiast
 ===============================================================
 System initialized. Type 'help' to see available commands.
 Type 'about' to learn more about me.
        `;
      } else if (width > 640) {
        // medium screen - remove some ASCII lines
        return `
 NADIM CHOWDHURY - Software Developer | Cybersecurity Enthusiast
 System initialized. Type 'help' to see commands.
 Type 'about' to learn more about me.
        `;
      } else {
        // small screen - very compact
        return `
 =============================================
 NADIM CHOWDHURY
 Software Developer | Cybersecurity Enthusiast
 Type 'help' for commands.
 =============================================`;
      }
    };

    setTerminalHistory([getWelcomeMsg()]);
  }, []);

  useEffect(() => {
    // Set matrix count based on window size after component mounts
    const updateMatrixCount = () => {
      if (typeof window !== "undefined") {
        setMatrixCount(window.innerWidth > 768 ? 20 : 10);
      }
    };

    updateMatrixCount();
    window.addEventListener("resize", updateMatrixCount);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateMatrixCount);
      }
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [terminalHistory]);

  // Cleanup any running typewriter interval on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current !== null) {
        window.clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [terminalHistory]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  return (
    <div className="bg-gradient-to-r from-white/5 via-transparent to-white/5">
      <div className="min-h-screen flex items-center justify-center">
        {!isClosed && (
          <div
            className={`${
              isFullscreen
                ? "w-full h-full max-w-none p-4 sm:p-6"
                : "h-full flex-1 max-w-3xl p-4 sm:p-6"
            } rounded-lg overflow-hidden z-50`}
          >
            {/* Terminal Header */}
            <div
              className={`bg-gray-900 border border-gray-700 p-2 sm:p-3 flex items-center space-x-2 flex-shrink-0 ${
                isMinimized ? "rounded-lg" : "rounded-t-lg"
              } transition-all duration-300`}
            >
              <button
                onClick={() => setIsClosed(true)}
                aria-label="Close terminal"
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 group"
              >
                <X className="hidden group-hover:block h-full w-full p-[2px] text-black" />
              </button>
              <button
                onClick={() => setIsMinimized((v) => !v)}
                aria-label="Minimize terminal"
                className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 group"
              >
                <Minus className="hidden group-hover:block h-full w-full p-[2px] text-black" />
              </button>
              <button
                onClick={() => setIsFullscreen((v) => !v)}
                aria-label="Toggle fullscreen"
                className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 group"
              >
                <Square className="hidden group-hover:block h-full w-full p-[2px] text-black" />
              </button>
              <span className="ml-2 sm:ml-4 text-gray-300 text-xs sm:text-sm truncate">
                {`visitor@nadim-portfolio:${tilde(currentPath)}`}
              </span>
            </div>

            {/* Terminal Body */}
            <div
              className={`bg-gray-950 ${
                !isMinimized && "border-l border-r"
              } border-gray-700 flex flex-col border rounded-b-lg`}
            >
              {!isMinimized && (
                <div className="bg-graph flex flex-col justify-between">
                  <ScrollArea className="h-[calc(100vh-14rem)] sm:h-[calc(100vh-12rem)]">
                    <div
                      ref={terminalRef}
                      className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1"
                    >
                      {/* Terminal Output */}
                      <div className="text-xs sm:text-sm">
                        {terminalHistory.map((line, index) => {
                          // Define matching rules
                          const rules: {
                            check: (line: string) => boolean;
                            className: string;
                            isBold?: boolean;
                          }[] = [
                            {
                              check: (l) =>
                                l.includes("visitor@nadim-portfolio:"),
                              className: "text-blue-400 my-4",
                            },
                            {
                              check: (l) => l.includes("NADIM CHOWDHURY"),
                              className: "text-green-400",
                            },
                            {
                              check: (l) => l.includes("Contact Information:"),
                              className: "text-amber-400 font-bold",
                            },
                            {
                              check: (l) =>
                                l.includes("Professional Experience:"),
                              className: "text-stone-300 font-bold",
                            },
                            {
                              check: (l) => l.includes("Technical Skills:"),
                              className: "text-red-400 font-bold",
                            },
                            {
                              check: (l) => l.includes("Featured Projects:"),
                              className: "text-orange-400 font-bold",
                            },
                            {
                              check: (l) => l.includes("Education:"),
                              className: "text-zinc-400 font-bold",
                            },
                            {
                              check: (l) => l.startsWith("   •"),
                              className: "text-stone-300",
                            },
                            {
                              check: (l) => l.startsWith("http"),
                              className:
                                "text-cyan-400 underline hover:text-cyan-300 break-all",
                            },
                          ];

                          // Find matching rule
                          const rule = rules.find((r) => r.check(line));

                          return (
                            <div
                              key={index}
                              className="whitespace-pre-wrap break-words my-4"
                            >
                              {line.startsWith("http") ? (
                                <Link
                                  href={line.trim()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={rule?.className || "text-lime-400"}
                                >
                                  {line}
                                </Link>
                              ) : (
                                <span
                                  className={rule?.className || "text-lime-400"}
                                >
                                  {line}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* invisible marker */}
                      <div ref={bottomRef} />
                    </div>
                  </ScrollArea>

                  {/* Command Input */}
                  <div className="flex-shrink-0 h-full border-t border-gray-800">
                    <div className="flex items-center px-2 sm:px-4 pt-4">
                      <span className="text-blue-400 mr-2 text-xs sm:text-sm flex-shrink-0">
                        visitor@nadim-portfolio:~$
                      </span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
                            e.preventDefault();
                            if (isTyping) {
                              if (typingTimerRef.current !== null) {
                                window.clearInterval(typingTimerRef.current);
                                typingTimerRef.current = null;
                              }
                              setIsTyping(false);
                            }
                          }
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (currentCommand.trim() && !isTyping) {
                              executeCommand(currentCommand);
                              setCurrentCommand("");
                            }
                          }
                        }}
                        className="flex-1 bg-transparent text-green-400 outline-none border-none text-xs sm:text-sm min-w-0"
                        placeholder={
                          isTyping ? "Ctrl + C to stop" : "Type a command..."
                        }
                        autoComplete="off"
                        spellCheck="false"
                      />
                      <span className="text-green-400 animate-pulse ml-1 text-xs sm:text-sm">
                        █
                      </span>
                    </div>

                    {/* Quick Commands */}
                    {/* <div className="mt-4 p-3 border border-gray-700 rounded bg-gray-900/20 mx-2 sm:mx-4">
                  <div className="text-yellow-400 mb-2 text-xs font-bold">
                    QUICK COMMANDS:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 text-xs">
                    {[
                      "about",
                      "skills",
                      "experience",
                      "projects",
                      "education",
                      "contact",
                      "help",
                      "clear",
                    ].map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => handleCommandClick(cmd)}
                        className="text-cyan-400 hover:text-cyan-300 bg-gray-800 hover:bg-gray-700 px-1 sm:px-2 py-1 rounded border border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed truncate"
                        disabled={isTyping}
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div> */}

                    {/* Status Bar */}
                    <div className="mt-2 sm:mt-4 text-xs text-gray-300 border-t border-gray-700 py-2">
                      <div className="flex items-center justify-between gap-2 sm:gap-0 mx-2 sm:mx-4">
                        <span className="">System: Ubuntu 22.04</span>
                        <span>
                          Status: {isTyping ? "Processing..." : "Ready"}
                        </span>
                        <span className="sm:inline">
                          Uptime: {Math.floor(Date.now() / 1000 / 60)} min
                        </span>
                        <span className="sm:inline">Ip: 127.0.0.1</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {isClosed && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={() => {
                setIsClosed(false);
                setIsMinimized(false);
              }}
              className="px-4 py-2 rounded-md bg-gray-900 text-teal-400 border border-gray-600 hover:bg-gray-800 text-sm shadow transition-all duration-300"
            >
              Reopen Terminal
            </button>
          </div>
        )}
      </div>

      {/* <MatrixCount matrixCount={999} /> */}

      {/* <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      /> */}
    </div>
  );
};

export default Home;
