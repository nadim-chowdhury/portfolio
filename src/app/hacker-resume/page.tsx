"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

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
  zIndex: number;
}

interface Command {
  id: string;
  name: string;
  description: string;
}

// Window Component Props
interface WindowProps {
  id: number;
  title: string;
  children: ReactNode;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  position: Position;
  size: Size;
  onDrag: (id: number, position: Position) => void;
  isMinimized: boolean;
  zIndex: number;
}

// Window Component
function Window({
  id,
  title,
  children,
  onClose,
  onMinimize,
  position,
  size,
  onDrag,
  isMinimized,
  zIndex,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    setIsDragging(true);
    const rect = windowRef.current!.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onDrag(id, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, onDrag, id]);

  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className="absolute bg-window-bg border border-window-border rounded-lg shadow-2xl"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: zIndex,
      }}
    >
      {/* Window Header */}
      <div
        className="bg-window-header p-2 rounded-t-lg cursor-move flex justify-between items-center"
        onMouseDown={handleMouseDown}
      >
        <span className="text-green-400 text-sm font-semibold">{title}</span>
        <div className="window-controls flex space-x-2">
          <button
            onClick={() => onMinimize(id)}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400"
          />
          <button
            onClick={() => onClose(id)}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400"
          />
        </div>
      </div>

      {/* Window Content */}
      <div className="p-4 h-full overflow-auto">{children}</div>
    </div>
  );
}

// Terminal Component
function Terminal() {
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<string[]>([
    "> whoami",
    "elite_hacker",
    "> ls -la /skills",
    "drwxr-xr-x  2 root root   4096 Dec 01 2024 .",
    "drwxr-xr-x  3 root root   4096 Dec 01 2024 ..",
    "-rw-r--r--  1 root root     42 Dec 01 2024 javascript.txt",
    "-rw-r--r--  1 root root     42 Dec 01 2024 react.txt",
    "-rw-r--r--  1 root root     42 Dec 01 2024 nodejs.txt",
    "-rw-r--r--  1 root root     42 Dec 01 2024 python.txt",
    "> cat /etc/motd",
    "Welcome to HackerOS v2.0",
    "Last login: Sun Dec 01 15:30:45 2024",
    "",
  ]);

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, `> ${cmd}`];

    switch (cmd.toLowerCase()) {
      case "help":
        newHistory.push(
          "Available commands: help, about, skills, projects, contact, clear, hack"
        );
        break;
      case "about":
        newHistory.push("Full Stack Developer with 5+ years experience");
        newHistory.push("Specialized in React, Node.js, and cybersecurity");
        break;
      case "skills":
        newHistory.push("Languages: JavaScript, Python, Go, Rust");
        newHistory.push("Frameworks: React, Next.js, Express, Django");
        newHistory.push("Security: Penetration Testing, OWASP, Cryptography");
        break;
      case "projects":
        newHistory.push("1. SecureChat - End-to-end encrypted messaging");
        newHistory.push("2. VulnScanner - Automated vulnerability assessment");
        newHistory.push(
          "3. CryptoWallet - Multi-currency cryptocurrency wallet"
        );
        break;
      case "contact":
        newHistory.push("Email: hacker@example.com");
        newHistory.push("GitHub: github.com/elitehacker");
        newHistory.push("LinkedIn: linkedin.com/in/elitehacker");
        break;
      case "clear":
        setHistory([""]);
        return;
      case "hack":
        newHistory.push("Initiating hack sequence...");
        newHistory.push("[████████████████████████████████] 100%");
        newHistory.push("Access granted. Welcome to the matrix.");
        break;
      default:
        newHistory.push(`Command not found: ${cmd}`);
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput("");
    }
  };

  return (
    <div className="bg-black text-terminal-text font-mono text-sm h-full p-4 overflow-y-auto">
      <div className="mb-4">
        {history.map((line, i) => (
          <div
            key={i}
            className={line.startsWith(">") ? "text-terminal-prompt" : ""}
          >
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-terminal-prompt mr-2">{">"}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent text-terminal-text outline-none flex-1 terminal-cursor"
          autoFocus
        />
      </form>
    </div>
  );
}

// VS Code Component
function VSCode() {
  const code = `// portfolio.js
class HackerPortfolio {
  constructor() {
    this.skills = [
      'JavaScript', 'React', 'Node.js',
      'Python', 'Cybersecurity', 'Blockchain'
    ];
    this.experience = '5+ years';
    this.passion = 'Building secure applications';
  }

  getCurrentProject() {
    return {
      name: 'SecureChat',
      description: 'End-to-end encrypted messaging app',
      tech: ['React', 'Node.js', 'WebRTC', 'Crypto'],
      status: 'Production'
    };
  }

  getAchievements() {
    return [
      'Led security audit for Fortune 500 company',
      'Discovered critical vulnerability in popular framework',
      'Open source contributor with 10k+ GitHub stars',
      'Certified Ethical Hacker (CEH)'
    ];
  }
}

const portfolio = new HackerPortfolio();
console.log(portfolio.getCurrentProject());`;

  return (
    <div className="bg-gray-900 text-gray-300 font-mono text-sm h-full">
      <div className="bg-gray-800 p-2 border-b border-gray-700">
        <span className="text-green-400">portfolio.js</span>
      </div>
      <div className="p-4 h-full overflow-auto">
        <pre className="whitespace-pre-wrap">
          <code
            dangerouslySetInnerHTML={{
              __html: code
                .replace(/\/\/(.*)/g, '<span class="text-gray-500">//$1</span>')
                .replace(
                  /(class|constructor|return|const|console|this)/g,
                  '<span class="text-purple-400">$1</span>'
                )
                .replace(
                  /'([^']*)'/g,
                  "<span class=\"text-green-300\">'$1'</span>"
                )
                .replace(/(\w+):/g, '<span class="text-blue-400">$1</span>:'),
            }}
          />
        </pre>
      </div>
    </div>
  );
}

// Browser Component
function Browser() {
  return (
    <div className="bg-gray-900 text-green-400 h-full">
      <div className="bg-gray-800 p-2 border-b border-gray-700 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <input
          type="text"
          value="https://github.com/elitehacker"
          readOnly
          className="bg-gray-700 text-white px-3 py-1 rounded flex-1 text-sm"
        />
      </div>
      <div className="p-6 h-full overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-green-400">
            GitHub Profile
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">🔐 SecureChat</h3>
              <p className="text-gray-300 mb-2">
                End-to-end encrypted messaging application with perfect forward
                secrecy.
              </p>
              <div className="flex space-x-2 text-xs">
                <span className="bg-blue-600 px-2 py-1 rounded">React</span>
                <span className="bg-green-600 px-2 py-1 rounded">Node.js</span>
                <span className="bg-yellow-600 px-2 py-1 rounded">WebRTC</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">🛡️ VulnScanner</h3>
              <p className="text-gray-300 mb-2">
                Automated vulnerability assessment tool for web applications.
              </p>
              <div className="flex space-x-2 text-xs">
                <span className="bg-purple-600 px-2 py-1 rounded">Python</span>
                <span className="bg-red-600 px-2 py-1 rounded">Security</span>
                <span className="bg-gray-600 px-2 py-1 rounded">OWASP</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">💰 CryptoWallet</h3>
              <p className="text-gray-300 mb-2">
                Multi-currency cryptocurrency wallet with hardware security
                module integration.
              </p>
              <div className="flex space-x-2 text-xs">
                <span className="bg-orange-600 px-2 py-1 rounded">Rust</span>
                <span className="bg-blue-600 px-2 py-1 rounded">
                  Blockchain
                </span>
                <span className="bg-green-600 px-2 py-1 rounded">Crypto</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">
                🌐 Neural Network Framework
              </h3>
              <p className="text-gray-300 mb-2">
                Lightweight neural network framework for edge computing devices.
              </p>
              <div className="flex space-x-2 text-xs">
                <span className="bg-indigo-600 px-2 py-1 rounded">Go</span>
                <span className="bg-pink-600 px-2 py-1 rounded">AI</span>
                <span className="bg-teal-600 px-2 py-1 rounded">Edge</span>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-800 p-4 rounded border border-gray-700">
            <h3 className="text-lg font-semibold mb-3">
              📊 Contribution Graph
            </h3>
            <div className="grid grid-cols-52 gap-1">
              {Array.from({ length: 364 }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-sm ${
                    Math.random() > 0.7
                      ? "bg-green-600"
                      : Math.random() > 0.5
                      ? "bg-green-700"
                      : Math.random() > 0.3
                      ? "bg-green-800"
                      : "bg-gray-700"
                  }`}
                />
              ))}
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
      description: "Launch terminal application",
    },
    {
      id: "vscode",
      name: "Open VS Code",
      description: "View source code and projects",
    },
    {
      id: "browser",
      name: "Open Browser",
      description: "Browse GitHub profile and projects",
    },
    { id: "about", name: "About Me", description: "Learn about my background" },
    {
      id: "skills",
      name: "Technical Skills",
      description: "View my technical expertise",
    },
    {
      id: "contact",
      name: "Contact Info",
      description: "Get in touch with me",
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
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, filteredCommands, onClose, onSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 w-96">
        <input
          type="text"
          placeholder="Type a command..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 outline-none"
          autoFocus
        />
        <div className="mt-4 max-h-64 overflow-y-auto">
          {filteredCommands.map((cmd, i) => (
            <div
              key={cmd.id}
              className="p-3 hover:bg-gray-800 cursor-pointer rounded"
              onClick={() => {
                onSelect(cmd.id);
                onClose();
              }}
            >
              <div className="text-green-400 font-semibold">{cmd.name}</div>
              <div className="text-gray-400 text-sm">{cmd.description}</div>
            </div>
          ))}
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

  const openWindow = (type: string) => {
    const newWindow: WindowData = {
      id: nextId,
      type,
      title:
        type === "terminal"
          ? "Terminal"
          : type === "vscode"
          ? "VS Code"
          : "Browser",
      position: { x: 100 + nextId * 30, y: 50 + nextId * 30 },
      size: { width: 800, height: 600 },
      isMinimized: false,
      zIndex: topZIndex + 1,
    };

    setWindows((prev) => [...prev, newWindow]);
    setNextId((prev) => prev + 1);
    setTopZIndex((prev) => prev + 1);
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  };

  const moveWindow = (id: number, position: Position) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
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
      default:
        return <div>Unknown window type</div>;
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

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 matrix-bg"></div>

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-4 z-10">
        <div
          className="flex flex-col items-center cursor-pointer hover:bg-gray-800 p-2 rounded"
          onClick={() => openWindow("terminal")}
        >
          <div className="w-12 h-12 bg-black border border-green-400 rounded flex items-center justify-center">
            <span className="text-green-400 text-xs">$</span>
          </div>
          <span className="text-xs mt-1">Terminal</span>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer hover:bg-gray-800 p-2 rounded"
          onClick={() => openWindow("vscode")}
        >
          <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs">VS</span>
          </div>
          <span className="text-xs mt-1">VS Code</span>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer hover:bg-gray-800 p-2 rounded"
          onClick={() => openWindow("browser")}
        >
          <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">🌐</span>
          </div>
          <span className="text-xs mt-1">Browser</span>
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
          zIndex={window.zIndex}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onDrag={moveWindow}
        >
          {renderWindowContent(window.type)}
        </Window>
      ))}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPalette(true)}
            className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm"
          >
            Menu
          </button>
          <span className="text-xs text-gray-400">
            Press Ctrl+K for command palette
          </span>
        </div>

        <div className="flex space-x-2">
          {windows
            .filter((w) => !w.isMinimized)
            .map((window) => (
              <button
                key={window.id}
                onClick={() => bringToFront(window.id)}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs"
              >
                {window.title}
              </button>
            ))}
        </div>

        <div className="text-xs text-gray-400">
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
