"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Square, X } from "lucide-react";
import Link from "next/link";
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

interface GitHubStats {
  repos: number;
  stars: number;
  contributions: number;
  followers: number;
}

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

interface Alias {
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
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    string[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [aliases, setAliases] = useState<Alias>({});
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // Available commands for autocomplete
  const availableCommands = [
    "help",
    "about",
    "skills",
    "experience",
    "education",
    "projects",
    "contact",
    "clear",
    "ls",
    "cd",
    "pwd",
    "cat",
    "echo",
    "github",
    "weather",
    "stats",
    "alias",
  ];

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
    return `v1s1t0r@nadims-portfolio:${tilde(currentPath)}$`;
  };

  // ---------------- API Functions ----------------
  const fetchGitHubStats = async (): Promise<GitHubStats> => {
    try {
      // Fetch user data
      const userResponse = await fetch(
        "https://api.github.com/users/nadim-chowdhury"
      );
      const userData = await userResponse.json();

      // Fetch repos data
      const reposResponse = await fetch(
        "https://api.github.com/users/nadim-chowdhury/repos?per_page=100"
      );
      const reposData = await reposResponse.json();

      // Calculate total stars
      const totalStars = reposData.reduce(
        (sum: number, repo: any) => sum + repo.stargazers_count,
        0
      );

      return {
        repos: userData.public_repos,
        stars: totalStars,
        contributions: 0, // This would require GitHub GraphQL API for accurate data
        followers: userData.followers,
      };
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      return {
        repos: 0,
        stars: 0,
        contributions: 0,
        followers: 0,
      };
    }
  };

  const fetchWeatherData = async (
    city: string
  ): Promise<WeatherData | null> => {
    try {
      // Using a free weather API (no key required)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=demo&units=metric`
      );

      if (!response.ok) {
        // Fallback to mock data for demo purposes
        return {
          location: city.charAt(0).toUpperCase() + city.slice(1),
          temperature: Math.floor(Math.random() * 30) + 10,
          description: "Partly cloudy",
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 10) + 2,
        };
      }

      const data = await response.json();

      return {
        location: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Return mock data as fallback
      return {
        location: city.charAt(0).toUpperCase() + city.slice(1),
        temperature: Math.floor(Math.random() * 30) + 10,
        description: "Partly cloudy",
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 10) + 2,
      };
    }
  };

  const incrementVisitorCount = (): void => {
    const currentCount = parseInt(localStorage.getItem("visitorCount") || "0");
    const newCount = currentCount + 1;
    localStorage.setItem("visitorCount", newCount.toString());
    setVisitorCount(newCount);
  };

  const getVisitorCount = (): number => {
    return parseInt(localStorage.getItem("visitorCount") || "0");
  };

  // ---------------- Autocomplete Functions ----------------
  const getAutocompleteSuggestions = (input: string): string[] => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return [];

    const parts = trimmedInput.split(/\s+/);
    const command = parts[0];
    const arg = parts[1] || "";

    // If we're completing the first word (command)
    if (parts.length === 1) {
      // Include both regular commands and aliases
      const allCommands = [...availableCommands, ...Object.keys(aliases)];
      return allCommands.filter((cmd) =>
        cmd.toLowerCase().startsWith(command.toLowerCase())
      );
    }

    // If we're completing arguments for specific commands
    if (command === "cd" || command === "cat" || command === "ls") {
      const node = getNode(currentPath);
      if (node && node.type === "dir") {
        const files = Object.keys(node.children);
        return files.filter((file) =>
          file.toLowerCase().startsWith(arg.toLowerCase())
        );
      }
    }

    // Weather command city suggestions
    if (command === "weather") {
      const cities = [
        "dhaka",
        "chittagong",
        "sylhet",
        "rajshahi",
        "khulna",
        "barisal",
        "london",
        "new york",
        "tokyo",
        "paris",
      ];
      return cities.filter((city) =>
        city.toLowerCase().startsWith(arg.toLowerCase())
      );
    }

    return [];
  };

  const handleTabCompletion = (): void => {
    const suggestions = getAutocompleteSuggestions(currentCommand);

    if (suggestions.length === 1) {
      // Single match - complete it
      const parts = currentCommand.trim().split(/\s+/);
      if (parts.length === 1) {
        // Completing command
        setCurrentCommand(suggestions[0] + " ");
      } else {
        // Completing argument
        const command = parts[0];
        const newCommand = command + " " + suggestions[0];
        setCurrentCommand(newCommand + " ");
      }
      setShowSuggestions(false);
    } else if (suggestions.length > 1) {
      // Multiple matches - show suggestions
      setAutocompleteSuggestions(suggestions);
      setShowSuggestions(true);
    }
  };

  // ---------------- Command History Functions ----------------
  const addToCommandHistory = (command: string): void => {
    const trimmedCommand = command.trim();
    if (
      trimmedCommand &&
      (!commandHistory.length ||
        commandHistory[commandHistory.length - 1] !== trimmedCommand)
    ) {
      setCommandHistory((prev) => [...prev, trimmedCommand]);
    }
    setHistoryIndex(-1);
  };

  const navigateHistory = (direction: "up" | "down"): void => {
    if (commandHistory.length === 0) return;

    let newIndex = historyIndex;

    if (direction === "up") {
      if (historyIndex === -1) {
        newIndex = commandHistory.length - 1;
      } else if (historyIndex > 0) {
        newIndex = historyIndex - 1;
      }
    } else {
      if (historyIndex < commandHistory.length - 1) {
        newIndex = historyIndex + 1;
      } else {
        newIndex = -1;
        setCurrentCommand("");
        setHistoryIndex(newIndex);
        return;
      }
    }

    setHistoryIndex(newIndex);
    setCurrentCommand(commandHistory[newIndex]);
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
    }, 5);
    typingTimerRef.current = timer;
  };

  const scrollToBottom = (): void => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const executeCommand = async (cmd: string): Promise<void> => {
    const original = cmd.trim();
    const args = original.split(/\s+/);
    const name = (args.shift() || "").toLowerCase();

    // Check for aliases first
    const resolvedCommand = aliases[name] || original;
    const resolvedArgs = resolvedCommand.split(/\s+/);
    const resolvedName = (resolvedArgs.shift() || "").toLowerCase();

    // Add to command history
    addToCommandHistory(original);

    setTerminalHistory((prev) => [...prev, `${getPrompt()} ${original}`, ""]);

    if (resolvedName === "clear") {
      setTimeout(() => {
        setTerminalHistory([]);
      }, 100);
      return;
    }

    // Shell commands
    if (resolvedName === "pwd") {
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = tilde(currentPath);
        return newHistory;
      });
      return;
    }

    if (resolvedName === "ls") {
      const target = resolvedArgs[0]
        ? normalizePath(currentPath, resolvedArgs[0])
        : currentPath;
      const out = listPath(target);
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] =
          out ??
          `ls: cannot access '${
            resolvedArgs[0] || ""
          }': No such file or directory`;
        return newHistory;
      });
      return;
    }

    if (resolvedName === "cd") {
      const nextPath = normalizePath(currentPath, resolvedArgs[0] || "~");
      const node = getNode(nextPath);
      let message = "";
      if (!node) {
        message = `cd: ${resolvedArgs[0] || ""}: No such file or directory`;
      } else if (node.type !== "dir") {
        message = `cd: ${resolvedArgs[0] || ""}: Not a directory`;
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

    if (resolvedName === "cat") {
      const target = resolvedArgs[0]
        ? normalizePath(currentPath, resolvedArgs[0])
        : "";
      const out = target ? readFile(target) : null;
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] =
          out ?? `cat: ${resolvedArgs[0] || ""}: No such file`;
        return newHistory;
      });
      return;
    }

    if (resolvedName === "echo") {
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = resolvedArgs.join(" ");
        return newHistory;
      });
      return;
    }

    if (resolvedName === "help") {
      const helpText = `Available commands:\n\n- ls, cd, pwd, cat, echo, help, clear\n- about, skills, experience, education, projects, contact\n- github, weather <city>, stats, alias <name>='<command>'`;
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = helpText;
        return newHistory;
      });
      return;
    }

    // Portfolio commands (typewriter-enabled)
    const command = resolvedName;
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
    } else if (command === "github") {
      setIsLoading(true);
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = "Fetching GitHub statistics...";
        return newHistory;
      });

      try {
        const stats = await fetchGitHubStats();
        const githubText = `GitHub Statistics:

- Public Repositories: ${stats.repos}
- Total Stars: ${stats.stars}
- Followers: ${stats.followers}
- Contributions: ${stats.contributions} (estimated)

Profile: https://github.com/nadim-chowdhury`;
        typeWriter(githubText, scrollToBottom);
      } catch (error) {
        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] =
            "Error fetching GitHub data. Please try again later.";
          return newHistory;
        });
      } finally {
        setIsLoading(false);
      }
    } else if (command === "weather") {
      const city = resolvedArgs[0] || "dhaka";
      setIsLoading(true);
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = `Fetching weather for ${city}...`;
        return newHistory;
      });

      try {
        const weatherData = await fetchWeatherData(city);
        if (weatherData) {
          const weatherText = `Weather in ${weatherData.location}:

- Temperature: ${weatherData.temperature}°C
- Description: ${weatherData.description}
- Humidity: ${weatherData.humidity}%
- Wind Speed: ${weatherData.windSpeed} m/s

Last updated: ${new Date().toLocaleTimeString()}`;
          typeWriter(weatherText, scrollToBottom);
        } else {
          setTerminalHistory((prev) => {
            const newHistory = [...prev];
            newHistory[
              newHistory.length - 1
            ] = `Weather data not found for ${city}. Please check the city name.`;
            return newHistory;
          });
        }
      } catch (error) {
        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] =
            "Error fetching weather data. Please try again later.";
          return newHistory;
        });
      } finally {
        setIsLoading(false);
      }
    } else if (command === "stats") {
      incrementVisitorCount();
      const currentCount = getVisitorCount();
      const statsText = `Portfolio Statistics:

- Total Visitors: ${currentCount}
- Session Started: ${new Date().toLocaleString()}
- User Agent: ${navigator.userAgent.split(" ")[0]}
- Platform: ${navigator.platform}
- Language: ${navigator.language}

Thank you for visiting!`;
      typeWriter(statsText, scrollToBottom);
    } else if (command === "alias") {
      if (resolvedArgs.length === 0) {
        // Show all aliases
        const aliasList =
          Object.keys(aliases).length > 0
            ? Object.entries(aliases)
                .map(([key, value]) => `${key}='${value}'`)
                .join("\n")
            : "No aliases defined";
        const aliasText = `Custom Aliases:

${aliasList}

Usage: alias <name>='<command>'
Example: alias ll='ls -la'`;
        typeWriter(aliasText, scrollToBottom);
      } else if (resolvedArgs.length === 1) {
        // Show specific alias
        const aliasName = resolvedArgs[0];
        if (aliases[aliasName]) {
          setTerminalHistory((prev) => {
            const newHistory = [...prev];
            newHistory[
              newHistory.length - 1
            ] = `${aliasName}='${aliases[aliasName]}'`;
            return newHistory;
          });
        } else {
          setTerminalHistory((prev) => {
            const newHistory = [...prev];
            newHistory[
              newHistory.length - 1
            ] = `Alias '${aliasName}' not found.`;
            return newHistory;
          });
        }
      } else if (resolvedArgs.length >= 2) {
        // Create new alias
        const aliasName = resolvedArgs[0];
        const aliasCommand = resolvedArgs
          .slice(1)
          .join(" ")
          .replace(/^['"]|['"]$/g, ""); // Remove quotes

        setAliases((prev) => ({
          ...prev,
          [aliasName]: aliasCommand,
        }));

        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          newHistory[
            newHistory.length - 1
          ] = `Alias '${aliasName}' created: '${aliasCommand}'`;
          return newHistory;
        });
      }
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

  const handleCommandClick = async (cmd: string): Promise<void> => {
    if (!isTyping) {
      // setCurrentCommand(cmd);
      await executeCommand(cmd);
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
 ===============================================================
 NADIM CHOWDHURY - Software Developer | Cybersecurity Enthusiast
 System initialized. Type 'help' to see commands.
 Type 'about' to learn more about me.
 ===============================================================`;
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

  // Initialize visitor count and default aliases
  useEffect(() => {
    // Load visitor count from localStorage
    const savedCount = localStorage.getItem("visitorCount");
    if (savedCount) {
      setVisitorCount(parseInt(savedCount));
    }

    // Set up default aliases
    setAliases({
      ll: "ls",
      "..": "cd ..",
      "~": "cd ~",
      home: "cd ~",
      clear: "clear",
      h: "help",
      q: "clear",
    });
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
                {`v1s1t0r@nadims-portfolio:${tilde(currentPath)}`}
              </span>
            </div>

            {/* Terminal Body */}
            <div
              className={`bg-gray-950 ${
                !isMinimized && "border-l border-r border-b"
              } border-gray-700 flex flex-col rounded-b-lg`}
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
                                l.includes("v1s1t0r@nadims-portfolio:"),
                              className: "text-blue-400",
                            },
                            {
                              check: (l) => l.includes("NADIM CHOWDHURY"),
                              className: "text-teal-400",
                            },
                            {
                              check: (l) => l.includes("Contact Information:"),
                              className: "text-amber-400",
                            },
                            {
                              check: (l) =>
                                l.includes("Professional Experience:"),
                              className: "text-stone-300",
                            },
                            {
                              check: (l) => l.includes("Technical Skills:"),
                              className: "text-red-400",
                            },
                            {
                              check: (l) => l.includes("Featured Projects:"),
                              className: "text-orange-400",
                            },
                            {
                              check: (l) => l.includes("Education:"),
                              className: "text-cyan-400",
                            },
                            {
                              check: (l) => l.includes("GitHub Statistics:"),
                              className: "text-purple-400",
                            },
                            {
                              check: (l) => l.includes("Weather in"),
                              className: "text-zinc-400",
                            },
                            {
                              check: (l) => l.includes("Portfolio Statistics:"),
                              className: "text-emerald-400",
                            },
                            {
                              check: (l) => l.includes("Custom Aliases:"),
                              className: "text-yellow-400",
                            },
                            {
                              check: (l) =>
                                l.includes("Public Repositories:") ||
                                l.includes("Total Stars:") ||
                                l.includes("Followers:") ||
                                l.includes("Contributions:"),
                              className: "text-purple-300",
                            },
                            {
                              check: (l) =>
                                l.includes("Temperature:") ||
                                l.includes("Description:") ||
                                l.includes("Humidity:") ||
                                l.includes("Wind Speed:"),
                              className: "text-blue-300",
                            },
                            {
                              check: (l) =>
                                l.includes("Total Visitors:") ||
                                l.includes("Session Started:") ||
                                l.includes("User Agent:") ||
                                l.includes("Platform:") ||
                                l.includes("Language:"),
                              className: "text-emerald-300",
                            },
                            {
                              check: (l) =>
                                l.includes("Usage:") || l.includes("Example:"),
                              className: "text-yellow-300",
                            },
                            {
                              check: (l) => l.includes("Last updated:"),
                              className: "text-blue-200",
                            },
                            {
                              check: (l) =>
                                l.includes("Thank you for visiting!"),
                              className: "text-emerald-200",
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
                                  className={
                                    rule?.className || "text-green-400"
                                  }
                                >
                                  {line}
                                </Link>
                              ) : (
                                <span
                                  className={
                                    rule?.className || "text-green-400"
                                  }
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
                        v1s1t0r@nadims-portfolio:~$
                      </span>
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={currentCommand}
                          onChange={(e) => {
                            setCurrentCommand(e.target.value);
                            setShowSuggestions(false);
                          }}
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

                            // Tab completion
                            if (e.key === "Tab") {
                              e.preventDefault();
                              handleTabCompletion();
                            }

                            // Command history navigation
                            if (e.key === "ArrowUp") {
                              e.preventDefault();
                              navigateHistory("up");
                            }

                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              navigateHistory("down");
                            }

                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (currentCommand.trim() && !isTyping) {
                                executeCommand(currentCommand).then(() => {
                                  setCurrentCommand("");
                                  setShowSuggestions(false);
                                });
                              }
                            }
                          }}
                          className="w-full bg-transparent text-green-400 outline-none border-none text-xs sm:text-sm min-w-0"
                          placeholder={
                            isTyping ? "Ctrl + C to stop" : "Type a command..."
                          }
                          autoComplete="off"
                          spellCheck="false"
                        />

                        {/* Autocomplete Suggestions */}
                        {showSuggestions &&
                          autocompleteSuggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded-b-md shadow-lg z-10 max-h-32 overflow-y-auto">
                              {autocompleteSuggestions.map(
                                (suggestion, index) => (
                                  <div
                                    key={index}
                                    className="px-3 py-1 text-xs text-gray-300 hover:bg-gray-800 cursor-pointer"
                                    onClick={() => {
                                      const parts = currentCommand
                                        .trim()
                                        .split(/\s+/);
                                      if (parts.length === 1) {
                                        setCurrentCommand(suggestion + " ");
                                      } else {
                                        const command = parts[0];
                                        setCurrentCommand(
                                          command + " " + suggestion + " "
                                        );
                                      }
                                      setShowSuggestions(false);
                                    }}
                                  >
                                    {suggestion}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </div>
                      <span className="text-green-400 animate-pulse ml-1 text-[10px] sm:text-xs">
                        █
                      </span>
                    </div>

                    {/* Status Bar */}
                    <div className="mt-2 sm:mt-4 text-xs text-gray-300 border-t border-gray-700 py-2">
                      <div className="flex items-center justify-between gap-2 sm:gap-0 mx-2 sm:mx-4">
                        <span className="">System: Ubuntu 22.04</span>
                        <span>
                          Status:{" "}
                          {isTyping
                            ? "Processing..."
                            : isLoading
                            ? "Loading..."
                            : "Ready"}
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
    </div>
  );
};

export default Home;
