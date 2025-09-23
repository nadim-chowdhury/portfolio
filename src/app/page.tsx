"use client";

import MatrixCount from "@/components/MatrixCount";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  const [matrixCount, setMatrixCount] = useState<number>(10);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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
      role: "Full Stack Developer (Freelancer)",
      period: "01 August 2024 - Present",
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

  const typeWriter = (text: string, callback?: () => void): void => {
    setIsTyping(true);
    let i = 0;
    const timer = setInterval(() => {
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
        clearInterval(timer);
        setIsTyping(false);
        if (callback) callback();
      }
    }, 20);
  };

  const scrollToBottom = (): void => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const executeCommand = (cmd: string): void => {
    const command = cmd.toLowerCase().trim();

    setTerminalHistory((prev) => [
      ...prev,
      `visitor@nadim-portfolio:~$ ${cmd}`,
      "",
    ]);

    if (command === "clear") {
      setTimeout(() => {
        setTerminalHistory([]);
      }, 100);
      return;
    }

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

 Email: nadim-chowdhury@outlook.com
 Phone: +880 1971 258803
 Location: Dhaka, Bangladesh
 Portfolio: nadim.vercel.app
 LinkedIn: linkedin.com/in/nadim-chowdhury
 GitHub: github.com/nadim-chowdhury
 YouTube: youtube.com/@nadim-chowdhury`;
      typeWriter(contactText, scrollToBottom);
    } else if (command === "education") {
      const eduText = `Education:

 BSC (Department of Mathematics) - Habibullah Bahar University College (2019 - Dropout)
 HSC (Science Stream) - Kabi Nazrul Govt. College (2017 - 2019)`;
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
      setCurrentCommand(cmd);
      executeCommand(cmd);
    }
  };

  useEffect(() => {
    const welcomeMsg = `
 ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
 ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
 ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
 ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
 ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
 NADIM CHOWDHURY - Software Developer | Cybersecurity Enthusiast
 ===============================================================
 System initialized. Type 'help' to see available commands.
 Type 'about' to learn more about me.
     `;
    setTerminalHistory([welcomeMsg]);
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

  useEffect(() => {
    scrollToBottom();
  }, [terminalHistory]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  return (
    <div className="">
      <div className="min-h-screen max-w-3xl mx-auto p-6 rounded-lg overflow-hidden flex flex-col z-50">
        {/* Terminal Header */}
        <div className="bg-gray-900 border border-gray-700 p-2 sm:p-3 flex items-center space-x-2 flex-shrink-0 rounded-t-lg">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          <span className="ml-2 sm:ml-4 text-gray-300 text-xs sm:text-sm truncate">
            visitor@nadim-portfolio:~
          </span>
        </div>

        {/* Terminal Body */}
        <div className="bg-black border-l border-r border-b border-gray-700 flex-1 flex flex-col min-h-0 rounded-b-lg">
          <ScrollArea className="h-[calc(100vh-306px)]">
            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1"
            >
              {/* <ScrollBar
                // orientation="vertical"
                className="bg-transparent"
              > */}
              {/* Terminal Output */}
              <div className="text-xs sm:text-sm">
                {terminalHistory.map((line, index) => (
                  <div key={index} className="whitespace-pre-wrap break-words">
                    {line.includes("visitor@nadim-portfolio:~$") ? (
                      <div className="text-blue-400 my-4">{line}</div>
                    ) : line.includes("NADIM CHOWDHURY") ? (
                      <div className="text-cyan-400">{line}</div>
                    ) : line.includes("Contact Information:") ||
                      line.includes("Professional Experience:") ||
                      line.includes("Technical Skills:") ||
                      line.includes("Featured Projects:") ||
                      line.includes("Education:") ? (
                      <span className="text-yellow-400 font-bold">{line}</span>
                    ) : line.startsWith("   •") ? (
                      <span className="text-gray-300">{line}</span>
                    ) : line.startsWith("http") ? (
                      <Link
                        href={line.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 underline hover:text-cyan-300 break-all"
                      >
                        {line}
                      </Link>
                    ) : (
                      <span className="text-green-400">{line}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* invisible marker */}
              <div ref={bottomRef} />
              {/* </ScrollBar> */}
            </div>
          </ScrollArea>

          {/* Command Input */}
          <div className="flex-shrink-0 border-t border-gray-800">
            <div className="flex items-center px-2 sm:px-4 pt-4">
              <span className="text-blue-400 mr-2 text-xs sm:text-sm flex-shrink-0">
                visitor@nadim-portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (currentCommand.trim() && !isTyping) {
                      executeCommand(currentCommand);
                      setCurrentCommand("");
                    }
                  }
                }}
                className="flex-1 bg-transparent text-green-400 outline-none border-none text-xs sm:text-sm min-w-0"
                placeholder={isTyping ? "Processing..." : "Type a command..."}
                disabled={isTyping}
                autoComplete="off"
                spellCheck="false"
              />
              <span className="text-green-400 animate-pulse ml-1 text-xs sm:text-sm">
                █
              </span>
            </div>

            {/* Quick Commands */}
            <div className="mt-4 p-3 border border-gray-700 rounded bg-gray-900/20 mx-2 sm:mx-4">
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
            </div>

            {/* Status Bar */}
            <div className="mt-2 sm:mt-4 text-xs text-gray-500 border-t border-gray-700 pt-2">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 mx-2 sm:mx-4">
                <span className="truncate">System: Ubuntu 22.04 LTS</span>
                <span>Status: {isTyping ? "Processing..." : "Ready"}</span>
                <span className="hidden sm:inline">
                  Uptime: {Math.floor(Date.now() / 1000 / 60)} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <MatrixCount matrixCount={999} /> */}
    </div>
  );
};

export default Home;
