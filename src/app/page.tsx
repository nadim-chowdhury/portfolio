"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Square, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

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
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const commands: Commands = {
    help: "Available commands: about, skills, experience, education, projects, contact, clear",
    about:
      "As a self-learned creative and passionate programmer/developer I like to build and develop software for any platform. My hobbies are learning, improving skills, solving problems, and adapting to new technologies.",
    clear: "CLEAR_TERMINAL",
  };

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
    "fortune",
    "sudo",
    "exit",
    "chatbot",
    "simulate",
    "time-travel",
    "coffee",
    "chai",
    "roll-dice",
    "flip-coin",
    "evolution",
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

  const fortuneQuotes: string[] = [
    "Code is like humor. When you have to explain it, it's bad.",
    "There are only two kinds of programming languages: those people always bitch about and those nobody uses.",
    "The best error message is the one that never shows up.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes.",
    "The only way to go fast is to go well.",
    "Clean code always looks like it was written by someone who cares.",
    "It's not a bug; it's an undocumented feature.",
    "The best code is no code at all.",
    "Premature optimization is the root of all evil.",
  ];

  const chatbotResponses: string[] = [
    "Hello! I'm Nadim's AI clone. How can I help you today?",
    "I'm a self-taught developer passionate about creating amazing software!",
    "My favorite technologies are React, Node.js, and TypeScript.",
    "I love solving complex problems and building scalable applications.",
    "Currently working on full-stack projects and learning new technologies daily.",
    "I believe in clean code, best practices, and continuous learning.",
    "My goal is to create software that makes people's lives easier.",
  ];

  const hackSteps: string[] = [
    "Initializing hack sequence...",
    "Scanning target systems...",
    "Bypassing security protocols...",
    "Accessing LinkedIn profile...",
    "Injecting resume data...",
    "Modifying hiring algorithms...",
    "Sending fake recommendations...",
    "Creating positive reviews...",
    "Hacking HR systems...",
    "Generating offer letters...",
    "Updating company databases...",
    "Scheduling interviews...",
    "Manipulating salary calculations...",
    "Finalizing employment records...",
    "Hiring Nadim successfully!",
  ];

  const coffeeQuotes = [
    "Coffee: Because adulting is hard.",
    "Code without coffee is like a day without sunshine.",
    "I have a coffee problem. The problem is I don't have enough coffee.",
    "Coffee first, then code. Always in that order.",
    "The best debugging happens with a cup of coffee in hand.",
  ];

  const chaiQuotes = [
    "Chai: The traditional fuel for Indian developers.",
    "Masala chai and code - the perfect combination.",
    "Chai breaks are sacred in the coding world.",
    "A cup of chai can solve any algorithm problem.",
    "Chai: Because sometimes you need spice in your life.",
  ];

  const evolutionStages = [
    {
      version: "v1.0",
      title: "HTML Guy",
      period: "Early Days",
      description:
        "Started with basic HTML, CSS, and JavaScript. Building simple static websites and learning the fundamentals.",
    },
    {
      version: "v2.0",
      title: "React Developer",
      period: "Growth Phase",
      description:
        "Mastered React.js, started building dynamic SPAs, learned state management and component architecture.",
    },
    {
      version: "v3.0",
      title: "MERN Stack Developer",
      period: "Full-Stack Era",
      description:
        "Expanded to backend with Node.js, Express, and MongoDB. Building complete full-stack applications.",
    },
    {
      version: "v4.0",
      title: "Enterprise Developer",
      period: "Professional Level",
      description:
        "Working on large-scale ERP systems, microservices, and enterprise-grade solutions with advanced architectures.",
    },
    {
      version: "v5.0",
      title: "Solution Architect",
      period: "Current & Future",
      description:
        "Leading technical decisions, mentoring teams, and architecting scalable solutions for complex business problems.",
    },
  ];

  // Virtual Filesystem
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
                    content: `${skills.join(", ")}`,
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  // Utility functions
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
    if (full === "/") return vfs;
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

  // API functions
  const fetchGitHubStats = async (): Promise<GitHubStats> => {
    try {
      const userResponse = await fetch(
        "https://api.github.com/users/nadim-chowdhury"
      );
      if (!userResponse.ok) throw new Error("GitHub API error");

      const userData = await userResponse.json();
      const reposResponse = await fetch(
        "https://api.github.com/users/nadim-chowdhury/repos?per_page=100"
      );

      if (!reposResponse.ok) throw new Error("Repos API error");
      const reposData = await reposResponse.json();
      const totalStars = reposData.reduce(
        (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
        0
      );

      return {
        repos: userData.public_repos || 0,
        stars: totalStars,
        contributions: Math.floor(Math.random() * 1000) + 500,
        followers: userData.followers || 0,
      };
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      return { repos: 25, stars: 150, contributions: 850, followers: 45 };
    }
  };

  const fetchWeatherData = async (
    city: string
  ): Promise<WeatherData | null> => {
    try {
      // Get API key from environment variables
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

      if (!API_KEY) {
        console.error("OpenWeather API key not found in environment variables");
        // Fallback to mock data if no API key
        return {
          location: city.charAt(0).toUpperCase() + city.slice(1),
          temperature: Math.floor(Math.random() * 30) + 10,
          description: "API key not configured",
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 10) + 2,
        };
      }

      // OpenWeather API endpoint
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${city}" not found`);
        } else if (response.status === 401) {
          throw new Error("Invalid API key");
        } else {
          throw new Error(`Weather API error: ${response.status}`);
        }
      }

      const data = await response.json();

      return {
        location: `${data.name}, ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        description:
          data.weather[0].description.charAt(0).toUpperCase() +
          data.weather[0].description.slice(1),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10, // Round to 1 decimal place
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);

      // Return null to indicate failure, which will be handled in the command execution
      return null;
    }
  };

  // Autocomplete functions
  const getAutocompleteSuggestions = (input: string): string[] => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return [];

    const parts = trimmedInput.split(/\s+/);
    const command = parts[0];
    const arg = parts[1] || "";

    if (parts.length === 1) {
      const allCommands = [...availableCommands, ...Object.keys(aliases)];
      return allCommands.filter((cmd) =>
        cmd.toLowerCase().startsWith(command.toLowerCase())
      );
    }

    if (command === "cd" || command === "cat" || command === "ls") {
      const node = getNode(currentPath);
      if (node && node.type === "dir") {
        const files = Object.keys(node.children);
        return files.filter((file) =>
          file.toLowerCase().startsWith(arg.toLowerCase())
        );
      }
    }

    if (command === "weather") {
      const cities = [
        "dhaka",
        "chittagong",
        "sylhet",
        "rajshahi",
        "khulna",
        "london",
        "new york",
        "tokyo",
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
      const parts = currentCommand.trim().split(/\s+/);
      if (parts.length === 1) {
        setCurrentCommand(suggestions[0] + " ");
      } else {
        const command = parts[0];
        const newCommand = command + " " + suggestions[0];
        setCurrentCommand(newCommand + " ");
      }
      setShowSuggestions(false);
    } else if (suggestions.length > 1) {
      setAutocompleteSuggestions(suggestions);
      setShowSuggestions(true);
    }
  };

  // Command history functions
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
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
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

    const resolvedCommand = aliases[name] || original;
    const resolvedArgs = resolvedCommand.split(/\s+/);
    const resolvedName = (resolvedArgs.shift() || "").toLowerCase();

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
      const helpText = `Available commands:

- ls, cd, pwd, cat, echo, help, clear
- about, skills, experience, education, projects, contact
- github, weather <city>, stats, alias <name>='<command>'
- fortune, sudo hire nadim, exit
- chatbot, simulate hack, time-travel, coffee, chai, roll-dice, flip-coin, evolution`;
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = helpText;
        return newHistory;
      });
      return;
    }

    // Portfolio commands
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
    
Data source: OpenWeatherMap
Last updated: ${new Date().toLocaleTimeString()}`;
          typeWriter(weatherText, scrollToBottom);
        } else {
          setTerminalHistory((prev) => {
            const newHistory = [...prev];
            newHistory[
              newHistory.length - 1
            ] = `Weather data not available for "${city}". Please check the city name and try again.`;
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
      const currentCount = visitorCount + 1;
      setVisitorCount(currentCount);
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
      } else if (resolvedArgs.length >= 2) {
        const aliasName = resolvedArgs[0];
        const aliasCommand = resolvedArgs
          .slice(1)
          .join(" ")
          .replace(/^['"]|['"]$/g, "");

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
    } else if (command === "fortune") {
      const randomQuote =
        fortuneQuotes[Math.floor(Math.random() * fortuneQuotes.length)];
      const fortuneText = `Fortune Cookie:

"${randomQuote}"

— Random Developer Wisdom`;
      typeWriter(fortuneText, scrollToBottom);
    } else if (
      command === "sudo" &&
      resolvedArgs.length >= 2 &&
      resolvedArgs[0] === "hire" &&
      resolvedArgs[1] === "nadim"
    ) {
      const offerLetter = `OFFER LETTER

=================================================================

Dear Nadim Chowdhury,

We are pleased to offer you the position of
Software Developer at our prestigious company!

SALARY: $150,000 - $200,000 USD
BENEFITS: 
  • Unlimited coffee
  • Flexible working hours
  • Remote work options
  • Stock options
  • Health insurance

START DATE: Immediately
LOCATION: Your choice (Remote/Hybrid/On-site)

We are excited to have you join our team and contribute
to our innovative projects. Your skills in React, Node.js, 
and full-stack development make you the perfect candidate
for this role.

Please respond within 24 hours to accept this amazing opportunity!

Best regards,
The Hiring Team

P.S. This is a demonstration offer letter!
=================================================================`;
      typeWriter(offerLetter, scrollToBottom);
    } else if (command === "exit") {
      const exitMessage = `Exit Confirmation:

Are you sure you want to leave?

Your session has been amazing, and we'd love to have you back.

Options:
• Type 'clear' to continue exploring
• Type 'help' to see more commands
• Type 'about' to learn more about Nadim
• Close the browser tab if you really must go

Remember: Great developers never truly exit, they just minimize!

Thank you for visiting Nadim's portfolio terminal!`;
      typeWriter(exitMessage, scrollToBottom);
    } else if (command === "chatbot") {
      const randomResponse =
        chatbotResponses[Math.floor(Math.random() * chatbotResponses.length)];
      const chatbotText = `Nadim's AI Clone Activated:

${randomResponse}

Type 'chatbot' again for another response!
Type 'help' to see all available commands.`;
      typeWriter(chatbotText, scrollToBottom);
    } else if (command === "simulate" && resolvedArgs[0] === "hack") {
      setIsLoading(true);
      setTerminalHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = "Starting hack simulation...";
        return newHistory;
      });

      let stepIndex = 0;
      const hackInterval = setInterval(() => {
        if (stepIndex < hackSteps.length) {
          setTerminalHistory((prev) => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = `[${stepIndex + 1}/${
              hackSteps.length
            }] ${hackSteps[stepIndex]}`;
            return newHistory;
          });
          stepIndex++;
        } else {
          clearInterval(hackInterval);
          setIsLoading(false);
          const finalMessage = `Hack Simulation Complete!

Mission accomplished! Nadim has been successfully "hired" through 
our advanced hacking simulation.

Disclaimer: This is just a fun simulation! 
Real hiring should be based on merit and skills.`;
          typeWriter(finalMessage, scrollToBottom);
        }
      }, 800);
    } else if (command === "time-travel") {
      const timelineText = `Time Travel: Nadim's Journey

=======================================================

2017-2019: HSC (Science Stream)
└─ Kabi Nazrul Govt. College
└─ Foundation years in science and mathematics

2019: BSC (Mathematics) - Dropout
└─ Habibullah Bahar University College
└─ Realized passion for programming over pure math

2023-2024: Self-Taught Developer Era
├─ Frontend Trainee (Mediusware Ltd)
│  └─ Dec 2023 - Feb 2024
│  └─ Learned CRUD operations, role-based access
└─ Jr. Frontend Developer (Mediusware Ltd)
   └─ Mar 2024 - Jul 2024
   └─ Website builder, event management apps

2024-2025: Full-Stack Evolution
├─ Full Stack Web Developer (Freelancer)
│  └─ Aug 2024 - Jun 2025
│  └─ Flight booking system, Amadeus API integration
└─ Full Stack Software Developer (Easy Fashion Ltd)
   └─ Jul 2025 - Present
   └─ ERP systems, POS, Inventory, Production modules

Current Status: Senior Developer
└─ Leading enterprise-grade solutions
└─ Mentoring junior developers
└─ Continuous learning and innovation

=======================================================

Timeline shows the evolution from student to professional developer!`;
      typeWriter(timelineText, scrollToBottom);
    } else if (command === "coffee") {
      const randomQuote =
        coffeeQuotes[Math.floor(Math.random() * coffeeQuotes.length)];
      const coffeeArt = `
        (  (
         )  )
      ........
      |      |]
      \\      /
       \`----'

Coffee Break Time!

"${randomQuote}"

Fun Fact: The average developer consumes 3.2 cups of coffee per day!
Studies show 73% of bugs are fixed after a coffee break.`;
      typeWriter(coffeeArt, scrollToBottom);
    } else if (command === "chai") {
      const randomQuote =
        chaiQuotes[Math.floor(Math.random() * chaiQuotes.length)];
      const chaiArt = `
        ~  ~
       (  O  )
      /-------\\
     |  CHAI   |
     |    ♨    |
     \\---------/
        |   |
        |___|

      Chai Time!

"${randomQuote}"

Did you know? Chai contains natural antioxidants that boost brain function!
Perfect for those late-night coding sessions.`;
      typeWriter(chaiArt, scrollToBottom);
    } else if (command === "roll-dice") {
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      const total = dice1 + dice2;

      const diceArt = `
Rolling dice...

┌─────┐   ┌─────┐
│  ${dice1}  │   │  ${dice2}  │
└─────┘   └─────┘

Total: ${total}

${
  total === 12
    ? "JACKPOT! Double sixes!"
    : total >= 10
    ? "Great roll!"
    : total >= 7
    ? "Not bad!"
    : "Better luck next time!"
}

Fun dev fact: The probability of rolling ${total} is ${
        total === 7
          ? "16.67%"
          : total === 6 || total === 8
          ? "13.89%"
          : total === 5 || total === 9
          ? "11.11%"
          : total === 4 || total === 10
          ? "8.33%"
          : total === 3 || total === 11
          ? "5.56%"
          : "2.78%"
      }`;
      typeWriter(diceArt, scrollToBottom);
    } else if (command === "flip-coin") {
      const result = Math.random() < 0.5 ? "heads" : "tails";
      const coinArt = `
Flipping coin... 

       ___
      /   \\
     |  ${result === "heads" ? "H" : "T"}  |
      \\___/

Result: ${result.toUpperCase()}!

${
  result === "heads"
    ? "Heads! Time to tackle that challenging feature!"
    : "Tails! Perfect time for debugging and code review!"
}

Coding Decision: ${
        result === "heads"
          ? "Start with the frontend"
          : "Begin with the backend"
      }`;
      typeWriter(coinArt, scrollToBottom);
    } else if (command === "evolution") {
      let evolutionText = `Developer Evolution: The Journey of Nadim

=========================================================================

Version History & Growth Timeline:

`;
      evolutionStages.forEach((stage, index) => {
        evolutionText += `${stage.version} - ${stage.title} (${stage.period})
├─ ${stage.description}
${
  index < evolutionStages.length - 1
    ? "├─  UPGRADE ↓\n"
    : "└─  Current Status: Continuously evolving!\n"
}
`;
      });

      evolutionText += `
Continuous Integration & Deployment:
├─ Daily commits to personal growth repository
├─ Regular refactoring of skills and knowledge
├─ Automated testing of new technologies
└─ Deployment to production-ready solutions

Performance Metrics:
├─ Bug Resolution Rate: Increasing
├─ Code Quality Score: Improving  
├─ Learning Velocity: Accelerating
├─ Problem-Solving Efficiency: Optimizing
└─ Team Collaboration: Enhancing

Upcoming Features (Roadmap):
├─ v6.0: Cloud Architecture Specialist
├─ v7.0: AI/ML Integration Expert
├─ v8.0: Technical Leadership & Mentoring
└─ v9.0: Innovation & Product Strategy

The evolution never stops!`;
      typeWriter(evolutionText, scrollToBottom);
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

  const getWelcomeMessage = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1024;

    if (width > 1024) {
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
      return `
===============================================================
NADIM CHOWDHURY - Software Developer | Cybersecurity Enthusiast
System initialized. Type 'help' to see commands.
Type 'about' to learn more about me.
===============================================================`;
    } else {
      return `
=============================================
NADIM CHOWDHURY
Software Developer | Cybersecurity Enthusiast
Type 'help' for commands.
=============================================`;
    }
  };

  useEffect(() => {
    setTerminalHistory([getWelcomeMessage()]);
    setVisitorCount(Math.floor(Math.random() * 1000) + 100);
    setAliases({
      ll: "ls",
      "..": "cd ..",
      "~": "cd ~",
      home: "cd ~",
      h: "help",
      q: "clear",
    });
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [terminalHistory]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
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
          // <motion.div
          //   key="terminal"
          //   initial={{ opacity: 0 }} // fade in from transparent
          //   animate={{
          //     opacity: 1,
          //     width: isFullscreen ? "100%" : "48rem", // fullscreen vs normal
          //     height: "100%",
          //     padding: isFullscreen ? "1.5rem" : "1rem", // smooth padding change
          //   }}
          //   exit={{ opacity: 0 }}
          //   transition={{ duration: 0.3, ease: "linear" }} // linear for all
          //   className="rounded-lg overflow-hidden z-50 bg-transparent"
          // >
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
                          const rules = [
                            {
                              check: (l: string) =>
                                l.includes("v1s1t0r@nadims-portfolio:"),
                              className: "text-blue-400",
                            },
                            {
                              check: (l: string) =>
                                l.includes("NADIM CHOWDHURY"),
                              className: "text-teal-400",
                            },
                            {
                              check: (l: string) =>
                                l.includes("Contact Information:"),
                              className: "text-amber-300",
                            },
                            {
                              check: (l: string) => l.includes("OFFER LETTER"),
                              className: "text-sky-300",
                            },
                            {
                              check: (l: string) => l.includes("Time Travel"),
                              className: "text-indigo-300",
                            },
                            {
                              check: (l: string) =>
                                l.includes("Developer Evolution"),
                              className: "text-violet-300",
                            },
                            {
                              check: (l: string) =>
                                l.includes("Professional Experience:"),
                              className: "text-stone-300",
                            },
                            {
                              check: (l: string) =>
                                l.includes("Technical Skills:"),
                              className: "text-red-300",
                            },
                            {
                              check: (l: string) =>
                                l.includes("Featured Projects:"),
                              className: "text-orange-300",
                            },
                            {
                              check: (l: string) => l.includes("Education:"),
                              className: "text-cyan-300",
                            },
                            {
                              check: (l: string) =>
                                l.includes("GitHub Statistics:"),
                              className: "text-purple-300",
                            },
                            {
                              check: (l: string) => l.includes("Weather in"),
                              className: "text-zinc-300",
                            },
                            {
                              check: (l: string) =>
                                l.includes("Portfolio Statistics:"),
                              className: "text-lime-500",
                            },
                            {
                              check: (l: string) =>
                                l.includes("Fortune Cookie"),
                              className: "text-lime-500",
                            },
                            {
                              check: (l: string) =>
                                l.includes("Custom Aliases:"),
                              className: "text-yellow-300",
                            },
                            {
                              check: (l: string) => l.startsWith("   •"),
                              className: "text-stone-300",
                            },
                            {
                              check: (l: string) => l.startsWith("http"),
                              className:
                                "text-cyan-300 underline hover:text-cyan-200 break-all",
                            },
                          ];

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

                            if (e.key === "Tab") {
                              e.preventDefault();
                              handleTabCompletion();
                            }

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
                        <span>System: Ubuntu 22.04</span>
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
                        <span className="sm:inline">IP: 127.0.0.1</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          // </motion.div>
        )}
        {isClosed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} // start hidden
            animate={{ opacity: 1, y: 0 }} // fade in + slide up
            exit={{ opacity: 0, y: 20 }} // fade out + slide down
            transition={{ duration: 0.3, ease: "linear" }}
            className="fixed bottom-4 w-full z-50 flex items-center justify-center"
          >
            <button
              onClick={() => {
                setIsClosed(false);
                setIsMinimized(false);
              }}
              className="px-4 py-2 rounded-md bg-gray-900 text-teal-400 border border-gray-600 hover:bg-gray-800 text-sm shadow transition-all duration-300"
            >
              Reopen Terminal
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
