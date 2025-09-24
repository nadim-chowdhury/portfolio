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
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    return Math.floor(Math.random() * 1000) + 100;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);

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
    "fortune",
    "sudo",
    "exit",
    "chatbot",
    "simulate",
    "time-travel",
    "quiz",
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

  // Fortune quotes for the fortune command
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
    "Make it work, make it right, make it fast.",
    "Code never lies, comments sometimes do.",
    "The best way to get a project done faster is to start sooner.",
    "If you can't explain it simply, you don't understand it well enough.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Debugging is twice as hard as writing the code in the first place.",
    "There is no such thing as a free lunch.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Simplicity is the ultimate sophistication.",
    "Perfect is the enemy of good.",
    "Talk is cheap. Show me the code.",
    "I'm not a great programmer; I'm just a good programmer with great habits.",
    "The best error message is the one that never shows up.",
    "Code is poetry written in logic.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only impossible journey is the one you never begin.",
    "Innovation distinguishes between a leader and a follower.",
    "The way to get started is to quit talking and begin doing.",
    "Life is what happens to you while you're busy making other plans.",
  ];

  // Chatbot responses for AI assistant simulation
  const chatbotResponses: string[] = [
    "Hello! I'm Nadim's AI clone. How can I help you today?",
    "I'm a self-taught developer passionate about creating amazing software!",
    "My favorite technologies are React, Node.js, and TypeScript.",
    "I love solving complex problems and building scalable applications.",
    "Currently working on full-stack projects and learning new technologies daily.",
    "I believe in clean code, best practices, and continuous learning.",
    "My goal is to create software that makes people's lives easier.",
    "I'm always excited to work on challenging projects and learn from them.",
    "Feel free to ask me about my projects, skills, or development philosophy!",
    "I'm here to help you understand what makes Nadim a great developer.",
    "Want to know about my latest projects? Just ask!",
    "I can tell you about my journey from self-taught to professional developer.",
    "My passion for coding started with curiosity and never stopped growing.",
    "I believe every problem has an elegant solution waiting to be discovered.",
    "Ready to discuss technology, projects, or anything development-related!",
  ];

  // Hack simulation steps
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
    "Hiring Nadim successfully! 🎉",
  ];

  // Quiz questions for the quiz command
  const quizQuestions = [
    {
      question: "What is Nadim's primary programming language?",
      options: ["Python", "JavaScript", "Java", "C++"],
      correct: 1,
      explanation:
        "JavaScript is Nadim's primary language, used in React, Node.js, and full-stack development.",
    },
    {
      question: "Which framework does Nadim use for frontend development?",
      options: ["Vue.js", "Angular", "React", "Svelte"],
      correct: 2,
      explanation:
        "React is Nadim's go-to frontend framework, along with Next.js for full-stack applications.",
    },
    {
      question: "What type of database does Nadim work with?",
      options: ["Only SQL", "Only NoSQL", "Both SQL and NoSQL", "None"],
      correct: 2,
      explanation:
        "Nadim works with both SQL (PostgreSQL) and NoSQL (MongoDB) databases.",
    },
    {
      question: "What is Nadim's current role?",
      options: [
        "Junior Developer",
        "Senior Developer",
        "Tech Lead",
        "Freelancer",
      ],
      correct: 1,
      explanation:
        "Nadim is currently a Full Stack Software Developer at Easy Fashion Ltd.",
    },
    {
      question: "Which technology stack does Nadim specialize in?",
      options: ["LAMP", "MERN", "MEAN", "Django"],
      correct: 1,
      explanation:
        "Nadim specializes in the MERN stack: MongoDB, Express.js, React, and Node.js.",
    },
  ];

  // Coffee quotes for coffee/chai commands
  const coffeeQuotes = [
    "Coffee: Because adulting is hard.",
    "Code without coffee is like a day without sunshine.",
    "I have a coffee problem. The problem is I don't have enough coffee.",
    "Coffee first, then code. Always in that order.",
    "The best debugging happens with a cup of coffee in hand.",
    "Coffee is the fuel that powers the coding machine.",
    "Error: Coffee not found. Please insert coffee and try again.",
    "Coffee: The solution to all programming problems.",
    "I don't have a coffee addiction. I have a coffee dependency.",
    "Coffee makes everything better, especially debugging.",
  ];

  const chaiQuotes = [
    "Chai: The traditional fuel for Indian developers.",
    "Masala chai and code - the perfect combination.",
    "Chai breaks are sacred in the coding world.",
    "A cup of chai can solve any algorithm problem.",
    "Chai: Because sometimes you need spice in your life.",
    "The best code is written with chai in hand.",
    "Chai time is debugging time.",
    "Masala chai: The secret ingredient to great code.",
    "Chai and JavaScript - both are sweet and powerful.",
    "A developer without chai is like a function without parameters.",
  ];

  // Evolution versions
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
        contributions: Math.floor(Math.random() * 1000) + 500, // Mock data
        followers: userData.followers || 0,
      };
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      // Return mock data as fallback
      return {
        repos: 25,
        stars: 150,
        contributions: 850,
        followers: 45,
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
      const helpText = `Available commands:\n\n- ls, cd, pwd, cat, echo, help, clear\n- about, skills, experience, education, projects, contact\n- github, weather <city>, stats, alias <name>='<command>'\n- fortune, sudo hire nadim, exit\n- chatbot, simulate hack, time-travel, skills --tree`;
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
    } else if (command === "fortune") {
      const randomQuote =
        fortuneQuotes[Math.floor(Math.random() * fortuneQuotes.length)];
      const fortuneText = `Fortune Cookie:

"${randomQuote}"

— Random Developer Wisdom`;
      typeWriter(fortuneText, scrollToBottom);
    } else if (command === "sudo") {
      if (
        resolvedArgs.length >= 2 &&
        resolvedArgs[0] === "hire" &&
        resolvedArgs[1] === "nadim"
      ) {
        const offerLetter = `OFFER LETTER

=====================================================================

Dear Nadim Chowdhury,

We are pleased to offer you the position of Senior Software Developer 
at our prestigious company!

SALARY: $150,000 - $200,000 USD
BENEFITS: 
  • Unlimited coffee
  • Flexible working hours
  • Remote work options
  • Stock options
  • Health insurance
  • Gym membership
  • Free snacks

START DATE: Immediately
LOCATION: Your choice (Remote/Hybrid/On-site)

We are excited to have you join our team and contribute to our 
innovative projects. Your skills in React, Node.js, and full-stack 
development make you the perfect candidate for this role.

Please respond within 24 hours to accept this amazing opportunity!

Best regards,
The Hiring Team
HR Department

P.S. This is a fake offer letter, but the skills are real!
=====================================================================`;
        typeWriter(offerLetter, scrollToBottom);
      } else {
        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = `sudo: ${resolvedArgs.join(
            " "
          )}: command not found
Try: sudo hire nadim`;
          return newHistory;
        });
      }
    } else if (command === "exit") {
      const exitMessage = `Exit Confirmation:

Are you sure you want to leave? The world needs more Nadim!

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
    } else if (command === "simulate") {
      if (resolvedArgs.length >= 1 && resolvedArgs[0] === "hack") {
        setIsLoading(true);
        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = "Starting hack simulation...";
          return newHistory;
        });

        // Simulate scrolling hack logs
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
      } else {
        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = `simulate: ${resolvedArgs.join(
            " "
          )}: command not found
Try: simulate hack`;
          return newHistory;
        });
      }
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
    } else if (command === "skills" && resolvedArgs.includes("--tree")) {
      const skillsTreeText = `Skills Tree Visualization

Frontend Development
  ├── HTML5
  ├── CSS3
  │   ├── Tailwind CSS
  │   ├── Bootstrap
  │   └── Sass
  ├── JavaScript
  │   ├── ES6+
  │   ├── TypeScript
  │   └── React JS
  │       └── Next JS
  └── Mobile Development
      └── React Native

Backend Development
  ├── Node JS
  │   ├── Express JS
  │   └── Nest JS
  ├── Databases
  │   ├── MongoDB
  │   └── PostgreSQL
  └── DevOps
      └── Docker

Tools & Version Control
  ├── Git
  └── Development Tools
      ├── VS Code
      ├── Terminal
      └── Package Managers

Specializations
  ├── Full-Stack Development
  ├── API Development
  ├── Database Design
  ├── UI/UX Implementation
  └── Performance Optimization

Growing Skills
  ├── Cloud Technologies
  ├── Microservices
  ├── AI/ML Integration
  └── Advanced DevOps`;
      typeWriter(skillsTreeText, scrollToBottom);
    } else if (command === "quiz") {
      if (resolvedArgs[0] === "start" || !isQuizActive) {
        const quizIntro = `Tech Quiz: Test Your Knowledge About Nadim!
    
    Welcome to the interactive quiz! Answer questions about Nadim's skills and experience.
    
    Commands:
    • quiz start - Begin the quiz
    • quiz <answer_number> - Answer current question (1-4)
    • quiz skip - Skip current question
    • quiz stop - End quiz
    
    Let's start with question 1 of ${quizQuestions.length}:
    
    ${quizQuestions[0].question}
    
    1. ${quizQuestions[0].options[0]}
    2. ${quizQuestions[0].options[1]}
    3. ${quizQuestions[0].options[2]}
    4. ${quizQuestions[0].options[3]}
    
    Type 'quiz 1', 'quiz 2', 'quiz 3', or 'quiz 4' to answer!`;

        typeWriter(quizIntro, scrollToBottom);
        // You'll need to implement quiz state management
      } else if (resolvedArgs[0] && !isNaN(parseInt(resolvedArgs[0]))) {
        // Handle quiz answers - implement quiz logic here
        const answer = parseInt(resolvedArgs[0]) - 1;
        // Process answer and show next question
      }
    }

    // Coffee command implementation
    else if (command === "coffee") {
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
    }

    // Chai command implementation
    else if (command === "chai") {
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
    }

    // Roll dice command
    else if (command === "roll-dice") {
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
    }

    // Flip coin command
    else if (command === "flip-coin") {
      const result = Math.random() < 0.5 ? "heads" : "tails";
      const coinArt = `
       Flipping coin... 
    
           ___
          /   \\
         |  ${result === "heads" ? "Yo" : "Oops"}  |
          \\___/
    
    Result: ${result.toUpperCase()}!
    
    ${
      result === "heads"
        ? "Heads! Time to tackle that challenging feature!"
        : "Tails! Perfect time for debugging and code review!"
    }
    
    Coding Decision: ${
      result === "heads" ? "Start with the frontend" : "Begin with the backend"
    }`;

      typeWriter(coinArt, scrollToBottom);
    }

    // Evolution command implementation
    else if (command === "evolution") {
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

  const handleQuizAnswer = (answerIndex: number) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correct;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const resultText = `${isCorrect ? "Correct!" : "Incorrect"}
    
  ${currentQuestion.explanation}
  
  Score: ${isCorrect ? score + 1 : score}/${quizQuestions.length}`;

    typeWriter(resultText, () => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        // Show next question
      } else {
        setIsQuizActive(false);
        setCurrentQuestionIndex(0);
        setScore(0);
      }
    });
  };

  const simulateHack = () => {
    setIsLoading(true);
    let stepIndex = 0;
    let hackInterval: NodeJS.Timeout;

    const runHackStep = () => {
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
        const finalMessage = "Hack simulation complete!";
        typeWriter(finalMessage, scrollToBottom);
      }
    };

    hackInterval = setInterval(runHackStep, 800);

    // Store interval reference for cleanup if needed
    return hackInterval;
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
                              className: "text-teal-300",
                            },
                            {
                              check: (l) => l.includes("Contact Information:"),
                              className: "text-amber-300",
                            },
                            {
                              check: (l) =>
                                l.includes("Professional Experience:"),
                              className: "text-stone-300",
                            },
                            {
                              check: (l) => l.includes("Technical Skills:"),
                              className: "text-red-300",
                            },
                            {
                              check: (l) => l.includes("Featured Projects:"),
                              className: "text-orange-300",
                            },
                            {
                              check: (l) => l.includes("Education:"),
                              className: "text-cyan-300",
                            },
                            {
                              check: (l) => l.includes("GitHub Statistics:"),
                              className: "text-purple-300",
                            },
                            {
                              check: (l) => l.includes("Weather in"),
                              className: "text-zinc-300",
                            },
                            {
                              check: (l) => l.includes("Portfolio Statistics:"),
                              className: "text-lime-500",
                            },
                            {
                              check: (l) => l.includes("Custom Aliases:"),
                              className: "text-yellow-300",
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
                              className: "text-blue-300",
                            },
                            {
                              check: (l) =>
                                l.includes("Thank you for visiting!"),
                              className: "text-emerald-300",
                            },
                            {
                              check: (l) => l.includes("Fortune Cookie:"),
                              className: "text-indigo-400",
                            },
                            {
                              check: (l) =>
                                l.includes("Random Developer Wisdom"),
                              className: "text-indigo-300",
                            },
                            {
                              check: (l) => l.includes("OFFER LETTER"),
                              className: "text-green-400",
                            },
                            {
                              check: (l) =>
                                l.includes("SALARY:") ||
                                l.includes("BENEFITS:") ||
                                l.includes("START DATE:") ||
                                l.includes("LOCATION:"),
                              className: "text-green-300",
                            },
                            {
                              check: (l) => l.includes("Exit Confirmation:"),
                              className: "text-red-400",
                            },
                            {
                              check: (l) =>
                                l.includes("Options:") ||
                                l.includes("Remember:"),
                              className: "text-red-300",
                            },
                            {
                              check: (l) =>
                                l.includes("Nadim's AI Clone Activated:"),
                              className: "text-blue-400",
                            },
                            {
                              check: (l) =>
                                l.includes("Starting hack simulation..."),
                              className: "text-orange-400",
                            },
                            {
                              check: (l) =>
                                l.includes("Hack Simulation Complete!"),
                              className: "text-green-400",
                            },
                            {
                              check: (l) =>
                                l.includes("Time Travel: Nadim's Journey"),
                              className: "text-purple-400",
                            },
                            {
                              check: (l) =>
                                l.includes("Skills Tree Visualization"),
                              className: "text-teal-400",
                            },
                            {
                              check: (l) =>
                                l.includes("Frontend Development") ||
                                l.includes("Backend Development") ||
                                l.includes("Tools & Version Control") ||
                                l.includes("Specializations") ||
                                l.includes("Growing Skills"),
                              className: "text-teal-300",
                            },
                            {
                              check: (l) => l.startsWith("   •"),
                              className: "text-stone-300",
                            },
                            {
                              check: (l) => l.startsWith("http"),
                              className:
                                "text-cyan-300 underline hover:text-cyan-200 break-all",
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
