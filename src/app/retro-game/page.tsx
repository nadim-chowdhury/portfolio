"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ExternalLink,
  Github,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Code,
  Briefcase,
  User,
  BookOpen,
  Trophy,
  Star,
  Zap,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
} from "lucide-react";

const RetroGamePortfolio = () => {
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 200 });
  const [currentSection, setCurrentSection] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [nearBuilding, setNearBuilding] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [achievements, setAchievements] = useState(new Set());
  const [visitedBuildings, setVisitedBuildings] = useState(new Set());
  const [playerDirection, setPlayerDirection] = useState("down");
  const [isMoving, setIsMoving] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameTime, setGameTime] = useState(0);
  const [showAchievement, setShowAchievement] = useState(null);
  const [screenSize, setScreenSize] = useState({ width: 800, height: 600 });
  const [touchControls, setTouchControls] = useState({
    x: 0,
    y: 0,
    active: false,
  });
  const [weatherEffect, setWeatherEffect] = useState("sunny");
  const [timeOfDay, setTimeOfDay] = useState("day");

  const gameRef = useRef(null);
  const achievementTimeoutRef = useRef(null);

  // Screen size detection and responsive setup
  useEffect(() => {
    const updateScreenSize = () => {
      const width = Math.min(window.innerWidth, 1200);
      const height = Math.min(window.innerHeight, 800);
      setScreenSize({ width, height });

      // Reset player position based on screen size
      setPlayerPos({
        x: Math.min(playerPos.x, width - 40),
        y: Math.min(playerPos.y, height - 80),
      });
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const isMobile = screenSize.width < 768;
  const scale = Math.min(screenSize.width / 800, screenSize.height / 600);

  // Game timer
  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => setGameTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  // Dynamic time and weather
  useEffect(() => {
    if (gameTime > 30 && gameTime <= 60) setTimeOfDay("evening");
    else if (gameTime > 60) setTimeOfDay("night");
  }, [gameTime]);

  useEffect(() => {
    const weatherTimer = setInterval(() => {
      const weathers = ["sunny", "cloudy", "rainy"];
      setWeatherEffect(weathers[Math.floor(Math.random() * weathers.length)]);
    }, 15000);
    return () => clearInterval(weatherTimer);
  }, []);

  // Responsive building definitions
  const buildings = [
    {
      id: "projects",
      name: "Code Library",
      x: screenSize.width * 0.12,
      y: screenSize.height * 0.25,
      width: screenSize.width * (isMobile ? 0.2 : 0.15),
      height: screenSize.height * (isMobile ? 0.15 : 0.17),
      color: "bg-purple-600",
      icon: <Code className="w-4 h-4 md:w-6 md:h-6" />,
      description: "Explore my coding projects",
    },
    {
      id: "experience",
      name: "Office Building",
      x: screenSize.width * 0.375,
      y: screenSize.height * 0.17,
      width: screenSize.width * (isMobile ? 0.23 : 0.175),
      height: screenSize.height * (isMobile ? 0.17 : 0.2),
      color: "bg-blue-600",
      icon: <Briefcase className="w-4 h-4 md:w-6 md:h-6" />,
      description: "My professional journey",
    },
    {
      id: "about",
      name: "Info Center",
      x: screenSize.width * 0.69,
      y: screenSize.height * 0.3,
      width: screenSize.width * (isMobile ? 0.18 : 0.125),
      height: screenSize.height * (isMobile ? 0.13 : 0.13),
      color: "bg-green-600",
      icon: <User className="w-4 h-4 md:w-6 md:h-6" />,
      description: "Learn about me",
    },
    {
      id: "contact",
      name: "Phone Booth",
      x: screenSize.width * 0.25,
      y: screenSize.height * 0.58,
      width: screenSize.width * (isMobile ? 0.1 : 0.075),
      height: screenSize.height * (isMobile ? 0.13 : 0.13),
      color: "bg-red-600",
      icon: <Phone className="w-3 h-3 md:w-5 md:h-5" />,
      description: "Get in touch",
    },
    {
      id: "education",
      name: "School",
      x: screenSize.width * 0.6,
      y: screenSize.height * 0.53,
      width: screenSize.width * (isMobile ? 0.2 : 0.14),
      height: screenSize.height * (isMobile ? 0.13 : 0.15),
      color: "bg-yellow-600",
      icon: <BookOpen className="w-4 h-4 md:w-6 md:h-6" />,
      description: "My education",
    },
  ];

  // Add door positions to buildings
  const buildingsWithDoors = buildings.map((building) => ({
    ...building,
    doorX: building.x + building.width / 2,
    doorY: building.y + building.height,
  }));

  // Achievement system
  const achievementList = [
    {
      id: "first_visit",
      name: "Explorer",
      description: "Visited first building",
      icon: "🏠",
    },
    {
      id: "all_buildings",
      name: "City Tourist",
      description: "Visited all buildings",
      icon: "🏛️",
    },
    {
      id: "quick_explorer",
      name: "Speed Runner",
      description: "Visited all buildings in under 60 seconds",
      icon: "⚡",
    },
    {
      id: "time_traveler",
      name: "Time Traveler",
      description: "Played for over 2 minutes",
      icon: "⏰",
    },
    {
      id: "social_butterfly",
      name: "Social Butterfly",
      description: "Checked contact information",
      icon: "📱",
    },
    {
      id: "tech_enthusiast",
      name: "Tech Enthusiast",
      description: "Viewed all projects",
      icon: "💻",
    },
  ];

  const unlockAchievement = (achievementId) => {
    if (!achievements.has(achievementId)) {
      setAchievements((prev) => new Set([...prev, achievementId]));
      const achievement = achievementList.find((a) => a.id === achievementId);
      setShowAchievement(achievement);

      if (achievementTimeoutRef.current)
        clearTimeout(achievementTimeoutRef.current);
      achievementTimeoutRef.current = setTimeout(
        () => setShowAchievement(null),
        3000
      );
    }
  };

  // Portfolio data
  const portfolioData = {
    about: {
      title: "About Nadim Chowdhury",
      content: {
        intro:
          "Self-learned creative and passionate MERN/Full Stack Developer from Dhaka, Bangladesh. I love building innovative solutions and learning new technologies.",
        skills: [
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
          "React Native",
          "Docker",
          "Git",
          "AWS",
          "Firebase",
        ],
        languages: [
          "Bengali (Native)",
          "English (Professional)",
          "German (Learning)",
          "Dutch (Learning)",
          "Spanish (Learning)",
        ],
        personal: {
          birthDate: "04 September 2000",
          nationality: "Bangladeshi",
          bloodGroup: "O+",
          status: "Unmarried",
          interests: [
            "Coding",
            "Learning",
            "Problem Solving",
            "Technology",
            "Gaming",
          ],
        },
        stats: {
          projectsCompleted: "15+",
          yearsExperience: "2+",
          technologiesUsed: "17+",
          clientsSatisfied: "10+",
        },
      },
    },
    projects: {
      title: "Projects & Portfolio",
      content: [
        {
          name: "Flight Booking System",
          description:
            "Full-stack flight booking with Amadeus GDS API integration, Stripe payments, and interactive maps",
          tech: ["React", "Node.js", "MongoDB", "Stripe API", "Amadeus API"],
          link: "https://flight-booking-frontend-liart.vercel.app",
          status: "Production",
          featured: true,
        },
        {
          name: "School Management System",
          description:
            "Complete school management solution with Angular frontend and comprehensive admin panel",
          tech: ["Angular", "Node.js", "PostgreSQL", "JWT"],
          link: "https://scl-mgt-sys-client.vercel.app",
          status: "Production",
          featured: true,
        },
        {
          name: "Dashboard Analytics",
          description:
            "Interactive analytics dashboard with real-time data visualization and reporting",
          tech: ["React", "Chart.js", "Tailwind", "Socket.io"],
          link: "https://dash-b0ard.netlify.app",
          status: "Production",
        },
        {
          name: "Cars Showroom",
          description:
            "Modern car dealership website with inventory management and customer portal",
          tech: ["React", "Node.js", "MongoDB", "Cloudinary"],
          link: "https://cars-showroom.vercel.app",
          status: "Production",
        },
        {
          name: "Cryptocurrency Tracker",
          description:
            "Real-time crypto price tracking with portfolio management features",
          tech: ["React", "CoinGecko API", "Chart.js"],
          link: "https://coiinbase.netlify.app",
          status: "Production",
        },
      ],
    },
    experience: {
      title: "Professional Experience",
      content: [
        {
          position: "Full Stack Developer (Freelancer)",
          period: "01 August 2024 - Present",
          company: "Independent",
          tasks: [
            "Developed full-stack flight booking system with Amadeus GDS API",
            "Integrated Stripe payment system with secure transaction handling",
            "Implemented interactive maps for airport selection using Mapbox",
            "Built responsive UI with modern design principles",
          ],
          achievements: [
            "100% client satisfaction",
            "On-time delivery",
            "Scalable architecture",
          ],
        },
        {
          position: "Jr. Frontend Developer",
          period: "01 March 2024 - 31 July 2024",
          company: "Mediusware Ltd",
          tasks: [
            "Developed drag-and-drop website builder similar to Wix and Google Sites",
            "Contributed to multi-tenancy event management web app builder",
            "Designed multiple UI pages with robust API integrations",
            "Implemented subdomain publishing functionality",
          ],
          achievements: [
            "Improved user engagement by 40%",
            "Reduced development time by 30%",
          ],
        },
      ],
    },
    education: {
      title: "Education & Learning",
      content: [
        {
          degree: "BSC (Mathematics)",
          institution: "Habibullah Bahar University College",
          period: "2019 - Dropout",
          note: "Focused on self-learning programming and web development",
          skills: [
            "Mathematical thinking",
            "Problem-solving",
            "Logical reasoning",
          ],
        },
        {
          degree: "Self-Directed Learning",
          institution: "Online Platforms",
          period: "2020 - Present",
          note: "Continuous learning through various online resources",
          skills: [
            "Full-stack development",
            "Modern frameworks",
            "Best practices",
          ],
        },
      ],
    },
    contact: {
      title: "Let's Connect!",
      content: {
        email: "nadim-chowdhury@outlook.com",
        phone: "+880 1971 258803",
        location: "Dhaka, Bangladesh",
        website: "nadim.vercel.app",
        timezone: "GMT+6 (Bangladesh Standard Time)",
        availability:
          "Available for freelance projects and full-time opportunities",
        social: {
          linkedin: "linkedin.com/in/nadim-chowdhury",
          github: "github.com/nadim-chowdhury",
          youtube: "youtube.com/@nadim-chowdhury",
        },
        specialties: [
          "Full-stack web development",
          "React & Next.js applications",
          "API development & integration",
          "Database design & optimization",
          "Mobile-first responsive design",
        ],
      },
    },
  };

  // Enhanced movement with bounds checking
  const handleKeyPress = useCallback(
    (e) => {
      if (!gameStarted || currentSection) return;

      const moveSpeed = Math.max(15, screenSize.width * 0.025);
      const newPos = { ...playerPos };
      const playerSize = isMobile ? 15 : 20;
      let direction = playerDirection;

      setIsMoving(true);
      setTimeout(() => setIsMoving(false), 200);

      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          newPos.y = Math.max(30, newPos.y - moveSpeed);
          direction = "up";
          break;
        case "arrowdown":
        case "s":
          newPos.y = Math.min(screenSize.height - 100, newPos.y + moveSpeed);
          direction = "down";
          break;
        case "arrowleft":
        case "a":
          newPos.x = Math.max(10, newPos.x - moveSpeed);
          direction = "left";
          break;
        case "arrowright":
        case "d":
          newPos.x = Math.min(
            screenSize.width - playerSize - 10,
            newPos.x + moveSpeed
          );
          direction = "right";
          break;
        case "enter":
        case " ":
          if (nearBuilding) {
            setCurrentSection(nearBuilding.id);
            handleBuildingVisit(nearBuilding.id);
          }
          return;
      }

      setPlayerDirection(direction);

      // Collision detection with buildings
      let canMove = true;
      buildingsWithDoors.forEach((building) => {
        if (
          newPos.x < building.x + building.width &&
          newPos.x + playerSize > building.x &&
          newPos.y < building.y + building.height &&
          newPos.y + playerSize > building.y
        ) {
          canMove = false;
        }
      });

      if (canMove) {
        setPlayerPos(newPos);
      }
    },
    [
      gameStarted,
      currentSection,
      playerPos,
      nearBuilding,
      playerDirection,
      screenSize,
      isMobile,
    ]
  );

  // Touch controls
  const handleTouchStart = (e) => {
    if (!gameStarted || currentSection) return;
    e.preventDefault();

    const touch = e.touches[0];
    const rect = gameRef.current.getBoundingClientRect();
    setTouchControls({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      active: true,
    });
  };

  const handleTouchMove = (e) => {
    if (!touchControls.active || !gameStarted || currentSection) return;
    e.preventDefault();

    const touch = e.touches[0];
    const rect = gameRef.current.getBoundingClientRect();
    const newX = touch.clientX - rect.left;
    const newY = touch.clientY - rect.top;

    const deltaX = newX - touchControls.x;
    const deltaY = newY - touchControls.y;
    const threshold = 25;

    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        handleKeyPress({ key: deltaX > 0 ? "d" : "a" });
      } else {
        handleKeyPress({ key: deltaY > 0 ? "s" : "w" });
      }

      setTouchControls({
        x: newX,
        y: newY,
        active: true,
      });
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setTouchControls({ x: 0, y: 0, active: false });
  };

  // Building visit handler
  const handleBuildingVisit = (buildingId) => {
    const newVisited = new Set(visitedBuildings);
    newVisited.add(buildingId);
    setVisitedBuildings(newVisited);

    if (visitedBuildings.size === 0) unlockAchievement("first_visit");
    if (newVisited.size === buildingsWithDoors.length) {
      unlockAchievement("all_buildings");
      if (gameTime < 60) unlockAchievement("quick_explorer");
    }
    if (buildingId === "contact") unlockAchievement("social_butterfly");
    if (buildingId === "projects") unlockAchievement("tech_enthusiast");
  };

  // Achievement check for time
  useEffect(() => {
    if (gameTime >= 120) unlockAchievement("time_traveler");
  }, [gameTime]);

  // Proximity detection
  useEffect(() => {
    let closest = null;
    let minDistance = Infinity;

    buildingsWithDoors.forEach((building) => {
      const distance = Math.sqrt(
        Math.pow(playerPos.x - building.doorX, 2) +
          Math.pow(playerPos.y - building.doorY, 2)
      );

      const proximityThreshold = Math.max(40, screenSize.width * 0.05);
      if (distance < proximityThreshold && distance < minDistance) {
        closest = building;
        minDistance = distance;
      }
    });

    setNearBuilding(closest);
  }, [playerPos, screenSize]);

  // Event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // Time-based styling
  const getTimeOfDayStyle = () => {
    switch (timeOfDay) {
      case "evening":
        return "from-orange-400 via-red-400 to-purple-500";
      case "night":
        return "from-gray-900 via-blue-900 to-black";
      default:
        return "from-blue-400 via-blue-300 to-green-400";
    }
  };

  const StartScreen = () => (
    <div className="fixed inset-0 bg-black text-green-400 flex items-center justify-center font-mono p-4 z-50">
      <div className="text-center p-6 border-2 border-green-400 bg-black max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-4">
          {isMobile ? (
            <Smartphone className="w-8 h-8 mr-2" />
          ) : (
            <Monitor className="w-8 h-8 mr-2" />
          )}
          <h1 className="text-2xl md:text-3xl animate-pulse">NADIM.EXE</h1>
        </div>
        <div className="text-lg mb-4">
          <div className="mb-2">Welcome to Pixel City</div>
          <div className="text-sm text-green-300">
            Interactive Portfolio Experience
          </div>
        </div>
        <div className="text-sm mb-6 space-y-1">
          {isMobile ? (
            <>
              <div>Touch and drag to move around</div>
              <div>Tap ENTER button to enter buildings</div>
              <div>Explore to unlock achievements!</div>
            </>
          ) : (
            <>
              <div>Use ARROW KEYS or WASD to move</div>
              <div>Press ENTER or SPACE to enter buildings</div>
              <div>Explore to unlock achievements!</div>
            </>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => {
              setGameStarted(true);
              setShowInstructions(false);
            }}
            className="px-6 py-3 border-2 border-green-400 bg-green-400 text-black hover:bg-black hover:text-green-400 transition-colors duration-200 font-bold"
          >
            START GAME
          </button>
          <div className="text-xs text-green-300">
            Achievements: {achievementList.length} to unlock
          </div>
        </div>
      </div>
    </div>
  );

  const GameWorld = () => (
    <div
      ref={gameRef}
      className={`relative overflow-hidden bg-gradient-to-b ${getTimeOfDayStyle()}`}
      style={{
        width: screenSize.width,
        height: screenSize.height,
        touchAction: "none",
      }}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      {/* Weather effects */}
      {weatherEffect === "rainy" && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-4 bg-blue-200 opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds */}
      <div
        className={`absolute w-16 h-8 bg-white rounded-full transition-opacity ${
          weatherEffect === "cloudy" ? "opacity-90" : "opacity-60"
        }`}
        style={{ top: screenSize.height * 0.08, left: screenSize.width * 0.15 }}
      ></div>
      <div
        className={`absolute w-12 h-6 bg-white rounded-full transition-opacity ${
          weatherEffect === "cloudy" ? "opacity-90" : "opacity-60"
        }`}
        style={{ top: screenSize.height * 0.06, right: screenSize.width * 0.2 }}
      ></div>

      {/* Ground */}
      <div
        className="absolute bottom-0 w-full bg-green-500"
        style={{ height: screenSize.height * 0.15 }}
      ></div>

      {/* Roads */}
      <div
        className="absolute w-full bg-gray-600"
        style={{
          bottom: screenSize.height * 0.15,
          height: screenSize.height * 0.08,
        }}
      ></div>
      <div
        className="absolute h-full bg-gray-600 left-1/2 transform -translate-x-1/2"
        style={{ width: screenSize.width * 0.08 }}
      ></div>

      {/* Road markings */}
      <div
        className="absolute w-full bg-yellow-300"
        style={{
          bottom: screenSize.height * 0.19,
          height: 2,
        }}
      ></div>
      <div
        className="absolute h-full bg-yellow-300 left-1/2 transform -translate-x-1/2"
        style={{ width: 2 }}
      ></div>

      {/* Buildings */}
      {buildingsWithDoors.map((building) => (
        <div key={building.id}>
          {/* Building structure */}
          <div
            className={`absolute ${
              building.color
            } border-2 border-black transition-all duration-300 ${
              visitedBuildings.has(building.id)
                ? "shadow-lg shadow-yellow-400/50"
                : ""
            }`}
            style={{
              left: building.x,
              top: building.y,
              width: building.width,
              height: building.height,
            }}
          >
            {/* Building icon */}
            <div className="absolute top-2 left-2 text-white">
              {building.icon}
            </div>

            {/* Visited indicator */}
            {visitedBuildings.has(building.id) && (
              <div className="absolute top-1 right-1 text-yellow-400">
                <Star className="w-4 h-4" fill="currentColor" />
              </div>
            )}

            {/* Windows */}
            <div className="absolute top-4 right-4 grid grid-cols-2 gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 border border-black ${
                    timeOfDay === "night" ? "bg-yellow-200" : "bg-yellow-300"
                  }`}
                ></div>
              ))}
            </div>

            {/* Door */}
            <div
              className="absolute bg-yellow-800 border border-black"
              style={{
                bottom: 0,
                left: building.width / 2 - 8,
                width: 16,
                height: 24,
              }}
            ></div>
          </div>

          {/* Building labels */}
          <div
            className="absolute text-xs font-bold text-center bg-black text-white px-2 py-1 rounded whitespace-nowrap"
            style={{
              left: building.x + building.width / 2 - 40,
              top: building.y - 25,
            }}
          >
            {building.name}
          </div>

          {nearBuilding?.id === building.id && (
            <div
              className="absolute text-xs text-center bg-yellow-900 text-yellow-200 px-2 py-1 rounded opacity-90 whitespace-nowrap"
              style={{
                left: building.x + building.width / 2 - 50,
                top: building.y - 45,
              }}
            >
              {building.description}
            </div>
          )}
        </div>
      ))}

      {/* Player */}
      <div
        className={`absolute border-2 border-black transition-all duration-150 z-10 ${
          isMoving ? "animate-bounce" : ""
        }`}
        style={{
          left: playerPos.x,
          top: playerPos.y,
          width: isMobile ? 15 : 20,
          height: isMobile ? 15 : 20,
          backgroundColor: achievements.has("all_buildings")
            ? "#10b981"
            : "#ef4444",
        }}
      >
        {/* Player features */}
        <div className="absolute top-1 left-1 w-1 h-1 bg-black"></div>
        <div className="absolute top-1 right-1 w-1 h-1 bg-black"></div>
        <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-black"></div>

        {/* Direction indicator */}
        {playerDirection === "up" && (
          <div className="absolute -top-1 left-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-black transform -translate-x-1/2"></div>
        )}
        {playerDirection === "down" && (
          <div className="absolute -bottom-1 left-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black transform -translate-x-1/2"></div>
        )}
        {playerDirection === "left" && (
          <div className="absolute -left-1 top-1/2 w-0 h-0 border-t-2 border-b-2 border-r-2 border-transparent border-r-black transform -translate-y-1/2"></div>
        )}
        {playerDirection === "right" && (
          <div className="absolute -right-1 top-1/2 w-0 h-0 border-t-2 border-b-2 border-l-2 border-transparent border-l-black transform -translate-y-1/2"></div>
        )}
      </div>

      {/* HUD */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-green-400 p-2 rounded font-mono text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>
              {achievements.size}/{achievementList.length}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-blue-400" />
            <span>
              {visitedBuildings.size}/{buildingsWithDoors.length}
            </span>
          </div>
          {!isMobile && (
            <div>
              Time: {Math.floor(gameTime / 60)}:
              {(gameTime % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>
      </div>

      {/* Sound toggle */}
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="bg-black bg-opacity-80 text-green-400 p-2 rounded hover:bg-opacity-100 transition-all"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Instructions */}
      {showInstructions && (
        <div className="absolute top-12 right-2 bg-black bg-opacity-90 text-green-400 p-3 border border-green-400 font-mono text-xs max-w-48">
          <div className="mb-2">CONTROLS:</div>
          {isMobile ? (
            <div>
              <div>Touch & drag to move</div>
              <div>Tap ENTER to enter buildings</div>
            </div>
          ) : (
            <div>
              <div>↑↓←→ or WASD: Move</div>
              <div>ENTER/SPACE: Enter</div>
            </div>
          )}
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-2 text-xs text-green-300 hover:text-green-100"
          >
            [Hide]
          </button>
        </div>
      )}

      {/* Mobile controls */}
      {isMobile && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="bg-black bg-opacity-60 text-green-400 p-2 rounded text-xs text-center">
            Touch & Drag
            <br />
            to Move
          </div>
          {nearBuilding && (
            <button
              onClick={() => {
                setCurrentSection(nearBuilding.id);
                handleBuildingVisit(nearBuilding.id);
              }}
              className="bg-yellow-600 text-black px-4 py-2 rounded font-bold text-sm animate-pulse"
            >
              ENTER
            </button>
          )}
        </div>
      )}

      {/* Desktop proximity indicator */}
      {nearBuilding && !isMobile && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-yellow-400 px-4 py-2 border border-yellow-400 font-mono animate-pulse">
          Press ENTER to enter {nearBuilding.name}
        </div>
      )}

      {/* Achievement notification */}
      {showAchievement && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border-2 border-yellow-400 text-yellow-400 p-4 rounded-lg font-mono text-center z-50 animate-pulse">
          <div className="text-2xl mb-2">{showAchievement.icon}</div>
          <div className="text-lg font-bold">{showAchievement.name}</div>
          <div className="text-sm">{showAchievement.description}</div>
        </div>
      )}
    </div>
  );

  const SectionModal = ({ section }) => {
    const data = portfolioData[section];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 text-green-400 border-2 border-green-400 w-full max-w-5xl max-h-[90vh] overflow-y-auto font-mono">
          <div className="flex items-center justify-between p-4 border-b border-green-400 bg-black sticky top-0">
            <h2 className="text-xl flex items-center space-x-2">
              {section === "projects" && <Code className="w-5 h-5" />}
              {section === "experience" && <Briefcase className="w-5 h-5" />}
              {section === "about" && <User className="w-5 h-5" />}
              {section === "education" && <BookOpen className="w-5 h-5" />}
              {section === "contact" && <Phone className="w-5 h-5" />}
              <span>{data.title}</span>
            </h2>
            <button
              onClick={() => setCurrentSection(null)}
              className="text-green-400 hover:text-green-200 p-1"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {section === "about" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-green-300 leading-relaxed">
                    {data.content.intro}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black p-4 rounded">
                  {Object.entries(data.content.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-yellow-400 text-2xl font-bold">
                        {value}
                      </div>
                      <div className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg mb-3 text-yellow-400 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {data.content.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-green-900 px-2 py-1 text-sm rounded hover:bg-green-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-3 text-yellow-400">Languages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {data.content.languages.map((lang, i) => (
                      <div
                        key={i}
                        className="text-green-300 bg-gray-800 px-3 py-2 rounded"
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-3 text-yellow-400">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-800 p-4 rounded">
                    <div>📅 Born: {data.content.personal.birthDate}</div>
                    <div>
                      🏳️ Nationality: {data.content.personal.nationality}
                    </div>
                    <div>
                      🩸 Blood Group: {data.content.personal.bloodGroup}
                    </div>
                    <div>💼 Status: {data.content.personal.status}</div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-md mb-2 text-yellow-400">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.content.personal.interests.map((interest, i) => (
                        <span
                          key={i}
                          className="bg-purple-900 px-3 py-1 text-sm rounded"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {section === "projects" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {data.content.map((project, i) => (
                    <div
                      key={i}
                      className={`border-2 p-4 rounded-lg transition-all hover:scale-105 ${
                        project.featured
                          ? "border-yellow-500 bg-yellow-900 bg-opacity-20"
                          : "border-green-600"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg text-yellow-400 flex items-center">
                            {project.featured && (
                              <Star className="w-4 h-4 mr-1 fill-yellow-400" />
                            )}
                            {project.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              project.status === "Production"
                                ? "bg-green-700"
                                : "bg-orange-700"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-300 hover:text-green-100 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-green-300 mb-3 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, j) => (
                          <span
                            key={j}
                            className="bg-blue-900 px-2 py-1 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "experience" && (
              <div className="space-y-6">
                {data.content.map((exp, i) => (
                  <div
                    key={i}
                    className="border border-green-600 p-6 rounded-lg bg-gray-800 bg-opacity-50"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                      <div>
                        <h3 className="text-xl text-yellow-400">
                          {exp.position}
                        </h3>
                        <div className="text-green-300 font-semibold">
                          {exp.company}
                        </div>
                      </div>
                      <div className="text-green-300 mt-1 lg:mt-0">
                        {exp.period}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-md text-yellow-400 mb-2">
                        Responsibilities:
                      </h4>
                      <ul className="space-y-2">
                        {exp.tasks.map((task, j) => (
                          <li key={j} className="flex items-start text-sm">
                            <span className="text-yellow-400 mr-2 mt-1">▸</span>
                            <span className="leading-relaxed">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {exp.achievements && (
                      <div>
                        <h4 className="text-md text-yellow-400 mb-2">
                          Key Achievements:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.achievements.map((achievement, j) => (
                            <span
                              key={j}
                              className="bg-green-700 px-3 py-1 text-xs rounded-full"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section === "education" && (
              <div className="space-y-6">
                {data.content.map((edu, i) => (
                  <div
                    key={i}
                    className="border border-green-600 p-6 rounded-lg bg-gray-800 bg-opacity-50"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                      <div>
                        <h3 className="text-xl text-yellow-400">
                          {edu.degree}
                        </h3>
                        <div className="text-green-300 font-semibold">
                          {edu.institution}
                        </div>
                      </div>
                      <div className="text-green-300 mt-1 lg:mt-0">
                        {edu.period}
                      </div>
                    </div>

                    {edu.note && (
                      <div className="bg-blue-900 bg-opacity-30 p-3 rounded mb-3">
                        <div className="text-blue-300 text-sm">{edu.note}</div>
                      </div>
                    )}

                    {edu.skills && (
                      <div>
                        <h4 className="text-md text-yellow-400 mb-2">
                          Skills Gained:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.skills.map((skill, j) => (
                            <span
                              key={j}
                              className="bg-purple-700 px-3 py-1 text-xs rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section === "contact" && (
              <div className="space-y-6">
                <div className="text-center bg-gradient-to-r from-green-900 to-blue-900 p-6 rounded-lg">
                  <h3 className="text-xl mb-2">Ready to collaborate?</h3>
                  <p className="text-green-300">{data.content.availability}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg text-yellow-400 mb-4">
                      Contact Information
                    </h3>

                    <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded">
                      <Mail className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <a
                          href={`mailto:${data.content.email}`}
                          className="hover:text-green-300 transition-colors"
                        >
                          {data.content.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded">
                      <Phone className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="text-sm text-gray-400">Phone</div>
                        <a
                          href={`tel:${data.content.phone}`}
                          className="hover:text-green-300 transition-colors"
                        >
                          {data.content.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded">
                      <MapPin className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="text-sm text-gray-400">Location</div>
                        <span>{data.content.location}</span>
                        <div className="text-xs text-gray-500">
                          {data.content.timezone}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded">
                      <ExternalLink className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="text-sm text-gray-400">Website</div>
                        <a
                          href={`https://${data.content.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-green-300 transition-colors"
                        >
                          {data.content.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg text-yellow-400 mb-4">
                      Social Networks
                    </h3>

                    <div className="space-y-3">
                      <a
                        href={`https://${data.content.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 bg-blue-900 bg-opacity-50 p-3 rounded hover:bg-opacity-70 transition-all"
                      >
                        <Linkedin className="w-5 h-5" />
                        <div>
                          <div className="font-semibold">LinkedIn</div>
                          <div className="text-sm text-gray-300">
                            Professional Network
                          </div>
                        </div>
                      </a>

                      <a
                        href={`https://${data.content.social.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 bg-gray-700 bg-opacity-50 p-3 rounded hover:bg-opacity-70 transition-all"
                      >
                        <Github className="w-5 h-5" />
                        <div>
                          <div className="font-semibold">GitHub</div>
                          <div className="text-sm text-gray-300">
                            Code Repository
                          </div>
                        </div>
                      </a>

                      <a
                        href={`https://${data.content.social.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 bg-red-900 bg-opacity-50 p-3 rounded hover:bg-opacity-70 transition-all"
                      >
                        <Youtube className="w-5 h-5" />
                        <div>
                          <div className="font-semibold">YouTube</div>
                          <div className="text-sm text-gray-300">
                            Tech Content
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-yellow-400 mb-4">
                    Specializations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.content.specialties.map((specialty, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-2 bg-green-900 bg-opacity-30 p-3 rounded"
                      >
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-green-400 p-4 bg-black text-center sticky bottom-0">
            <div className="text-xs text-gray-500">
              Press ESC or click the back button to return to the game
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && currentSection) {
        setCurrentSection(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [currentSection]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black p-4">
      <div
        className="relative"
        style={{ width: screenSize.width, height: screenSize.height }}
      >
        {!gameStarted && <StartScreen />}
        {gameStarted && <GameWorld />}
        {currentSection && <SectionModal section={currentSection} />}
      </div>
    </div>
  );
};

export default RetroGamePortfolio;
