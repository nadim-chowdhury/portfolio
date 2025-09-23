"use client";

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

import React, { useState, useEffect } from "react";

const Home = () => {
  // const [currentSection, setCurrentSection] = useState("about");
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const commands = {
    help: "Available commands: about, skills, experience, education, projects, contact, clear",
    about:
      "As a self-learned creative and passionate programmer/developer I like to build and develop software for any platform. My hobbies are learning, improving skills, solving problems, and adapting to new technologies.",
    clear: "CLEAR_TERMINAL",
  };

  const skills = [
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

  const experience = [
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
      period: "04 December, 2024 - 29 February, 2024",
      tasks: [
        "Implemented CRUD operations for the Profile Page with role-based access control.",
        "Developed Back Office and Task management functionalities.",
        "Designed Customer Order management features with role-specific access.",
      ],
    },
  ];

  const projects = [
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

  const typeWriter = (text: any, callback: any) => {
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

  const executeCommand = (cmd: any) => {
    const command = cmd.toLowerCase().trim();

    setTerminalHistory((prev: any) => [
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
        typeWriter(commands[command]);
      } else {
        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = commands[command];
          return newHistory;
        });
      }
    } else if (command === "skills") {
      const skillsText = skills.join(", ");
      typeWriter(`Technical Skills:\n${skillsText}`);
    } else if (command === "experience") {
      let expText = "Professional Experience:\n\n";
      experience.forEach((exp, index) => {
        expText += `${index + 1}. ${exp.role}\n   ${exp.period}\n`;
        exp.tasks.forEach((task) => {
          expText += `   • ${task}\n`;
        });
        expText += "\n";
      });
      typeWriter(expText);
    } else if (command === "projects") {
      let projectText = "Featured Projects:\n\n";
      projects.forEach((project, index) => {
        projectText += `${index + 1}. ${project.name}\n   ${project.url}\n\n`;
      });
      typeWriter(projectText);
    } else if (command === "contact") {
      const contactText = `Contact Information:
      
Email: nadim-chowdhury@outlook.com
Phone: +880 1971 258803
Location: Dhaka, Bangladesh
Portfolio: nadim.vercel.app
LinkedIn: linkedin.com/in/nadim-chowdhury
GitHub: github.com/nadim-chowdhury
YouTube: youtube.com/@nadim-chowdhury`;
      typeWriter(contactText);
    } else if (command === "education") {
      const eduText = `Education:
      
BSC (Department of Mathematics) - Habibullah Bahar University College (2019 - Dropout)
HSC (Science Stream) - Kabi Nazrul Govt. College (2017 - 2019)`;
      typeWriter(eduText);
    } else {
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[
          newHistory.length - 1
        ] = `Command not found: ${cmd}. Type 'help' for available commands.`;
        return newHistory;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCommand.trim() && !isTyping) {
      executeCommand(currentCommand);
      setCurrentCommand("");
    }
  };

  useEffect(() => {
    // Initial welcome message
    const welcomeMsg = `
██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝

NADIM CHOWDHURY - Software Developer | Cybersecurity Enthusiast
============================================

System initialized. Type 'help' to see available commands.
Type 'about' to learn more about me.
    `;
    setTerminalHistory([welcomeMsg]);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-900 rounded-t-lg border border-gray-700 p-2 flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-4 text-gray-300 text-sm">
          visitor@nadim-portfolio:~
        </span>
      </div>

      {/* Terminal Body */}
      <div className="bg-black rounded-b-lg border-l border-r border-b border-gray-700 p-4 h-[calc(100vh-70px)] overflow-y-auto relative">
        {/* Terminal Output */}
        <div className="space-y-1 text-sm">
          {terminalHistory.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line.includes("visitor@nadim-portfolio:~$") ? (
                <span className="text-blue-400">{line}</span>
              ) : line.includes("NADIM CHOWDHURY") ? (
                <span className="text-cyan-400">{line}</span>
              ) : line.includes("Contact Information:") ||
                line.includes("Professional Experience:") ||
                line.includes("Technical Skills:") ||
                line.includes("Featured Projects:") ||
                line.includes("Education:") ? (
                <span className="text-yellow-400 font-bold">{line}</span>
              ) : line.startsWith("   •") ? (
                <span className="text-gray-300">{line}</span>
              ) : line.startsWith("http") ? (
                <a
                  href={line}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  {line}
                </a>
              ) : (
                <span className="text-green-400">{line}</span>
              )}
            </div>
          ))}
        </div>

        {/* Command Input */}
        <div className="flex items-center mt-4">
          <span className="text-blue-400 mr-2">visitor@nadim-portfolio:~$</span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            className="flex-1 bg-transparent text-green-400 outline-none border-none"
            placeholder={isTyping ? "Processing..." : "Type a command..."}
            disabled={isTyping}
            autoFocus
          />
          <span className="text-green-400 animate-pulse ml-1">█</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Quick Commands */}
          <div className="mt-8 p-4 border border-gray-700 rounded bg-gray-900/20">
            <div className="text-yellow-400 mb-2 text-xs font-bold">
              QUICK COMMANDS:
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
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
                  onClick={() => {
                    if (!isTyping) {
                      setCurrentCommand(cmd);
                      executeCommand(cmd);
                    }
                  }}
                  className="text-cyan-400 hover:text-cyan-300 bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded border border-gray-600 transition-colors"
                  disabled={isTyping}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-4 text-xs text-gray-500 border-t border-gray-700 pt-2">
            <div className="flex justify-between">
              <span>System: Ubuntu 22.04 LTS</span>
              <span>Status: {isTyping ? "Processing..." : "Ready"}</span>
              <span>Uptime: {Math.floor(Date.now() / 1000 / 60)} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Matrix Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10 overflow-hidden -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {Math.random().toString(36).substring(7)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
