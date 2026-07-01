export const siteConfig = {
  name: "Nadim Chowdhury",
  role: "Full Stack Developer",
  location: "Dhaka, Bangladesh",
  email: "nadim-chowdhury@outlook.com",
  phone: "+880 1971 258803",
  github: "https://github.com/nadim-chowdhury",
  linkedin: "https://www.linkedin.com/in/nadim-chowdhury",
  website: "https://nadim.vercel.app",
  resumePdf: "/nadim-chowdhury-resume.pdf",
  avatar: "/nadim_profile.jpg",
  workingPhoto: "/nadim_chowdhury.jpg",
  logo: "/programming_logo_profile.png",
  logoDark: "/programming_logo_profile.png",
} as const;

export const aboutText = {
  headline: "Building digital products that matter",
  paragraph:
    "I'm a full stack developer based in Dhaka with 3+ years of experience shipping production-grade web applications. I dropped out of a Mathematics program to pursue software engineering full-time — a decision that led me through five professional roles, from internships at established firms to leading freelance projects end-to-end.",
  paragraphTwo:
    "My work spans SaaS platforms, ERP systems, booking engines, and visual editors. I care deeply about clean architecture, intuitive user experiences, and writing code that other developers actually enjoy reading.",
};

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "5+", label: "Companies Worked" },
  { value: "10+", label: "Technologies" },
] as const;

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "layout",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Bootstrap",
      "Ant Design",
      "Framer Motion",
    ],
  },
  {
    name: "Backend",
    icon: "server",
    skills: [
      "Node.js",
      "NestJS",
      "Express.js",
      "GraphQL",
      "REST API",
      "WebSockets",
    ],
  },
  {
    name: "Mobile",
    icon: "smartphone",
    skills: ["React Native", "Flutter", "Expo"],
  },
  {
    name: "Database",
    icon: "database",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "TypeORM", "Redis", "Supabase"],
  },
  {
    name: "DevOps",
    icon: "cloud",
    skills: ["Docker", "Git", "Vercel", "Netlify", "CI/CD", "Linux"],
  },
  {
    name: "Tools",
    icon: "wrench",
    skills: ["Postman", "Swagger", "Figma", "Jira", "Notion", "Trello"],
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  stack: string[];
  description: string;
}

export const experiences: Experience[] = [
  {
    id: "01",
    role: "Full Stack Software Developer",
    company: "Easy Fashion Ltd",
    period: "Jul 2025 – Nov 2025",
    type: "Full-time",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
    description:
      "Contributed to the development of a large-scale ERP platform integrating business-critical modules (POS, Inventory, Procurement, Production, Finance, and HRM). Designed and implemented end-to-end features using Next.js and NestJS, built and maintained secure REST APIs, optimized application performance via database queries, code splitting, and caching strategies, and maintained modular, well-tested codebases.",
  },
  {
    id: "02",
    role: "Full Stack Web Developer",
    company: "Freelance",
    period: "Feb 2025 – Jun 2025",
    type: "Freelance",
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Stripe"],
    description:
      "Worked with clients to design and develop modern full-stack web applications. Built a complete Flight Booking System using Next.js and NestJS featuring role-based authorization, aircraft/airport/route management, and booking workflows. Developed a drag-and-drop Website Builder SaaS with reusable components, template management, and subscription-based billing.",
  },
  {
    id: "03",
    role: "Jr. Frontend Developer",
    company: "Mediusware Ltd",
    period: "Mar 2024 – Jan 2025",
    type: "Full-time",
    stack: ["React.js", "TypeScript", "GraphQL", "Ant Design", "Bootstrap"],
    description:
      "Contributed to enterprise web applications by building scalable frontend solutions and integrating backend services. Developed a multi-tenant drag-and-drop website builder with dynamic component rendering and subdomain publishing, built features for an event management platform, and designed responsive interfaces consuming GraphQL APIs.",
  },
  {
    id: "04",
    role: "Frontend Trainee",
    company: "Mediusware Ltd",
    period: "Dec 2023 – Feb 2024",
    type: "Internship",
    stack: ["React.js", "JavaScript", "Ant Design", "REST API"],
    description:
      "Completed a frontend development internship by contributing to a large-scale e-commerce platform. Developed Profile Management CRUD with role-based access control, built Back Office and Task Management modules for administrators/employees, and independently built an e-commerce application from scratch.",
  },
  {
    id: "05",
    role: "Frontend Developer",
    company: "Freelance",
    period: "Jul 2023 – Nov 2023",
    type: "Freelance",
    stack: ["Angular", "React.js", "JavaScript", "REST API"],
    description:
      "Delivered frontend solutions for client projects. Built a School Management System using Angular with student, teacher, and administrative modules, developed a responsive Flight Ticket Booking application with complete booking workflows, and designed reusable UI components and responsive layouts.",
  },
  {
    id: "06",
    role: "Web Developer",
    company: "Self-employed",
    period: "Sep 2022 – Jun 2023",
    type: "Self-employed",
    stack: ["HTML", "CSS", "JavaScript", "React.js", "MongoDB", "Express.js", "Node.js"],
    description:
      "Focused on mastering full-stack web development through hands-on projects. Learned and applied the MERN stack by building full-stack applications from concept to deployment, practicing REST API development, database design, state management, and responsive UI development.",
  },
];

export interface Project {
  id: string;
  name: string;
  category: string;
  url: string;
  year: string;
  stack: string[];
  description: string;
  color: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "purepath-booking",
    name: "PurePath Booking",
    category: "Booking System",
    url: "https://purepath-booking.vercel.app",
    year: "2026",
    stack: ["Next.js", "React", "Redux Toolkit", "Shadcn UI", "Tailwind CSS"],
    description:
      "A modern, high-performance booking system built with the robust React ecosystem to streamline reservations, appointments, and user management.",
    color: "var(--accent)",
    image: "/purepath-booking.png",
  },
  {
    id: "collabier",
    name: "Collabier SaaS",
    category: "SaaS Platform",
    url: "https://collabier-sass-x.vercel.app",
    year: "2025",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Stripe"],
    description:
      "Visual editor platform with real-time style editing, reusable components, project dashboard, and integrated billing system.",
    color: "var(--accent)",
    image: "/collabier.png",
  },
  {
    id: "3d-ecommerce",
    name: "3D E-Commerce Platform",
    category: "E-Commerce",
    url: "https://3d-ecommerce-pink.vercel.app",
    year: "2026",
    stack: ["Next.js", "React Three Fiber", "Tailwind CSS", "Redux Toolkit"],
    description:
      "A modern, immersive e-commerce experience leveraging interactive 3D product visualizations with smooth Framer Motion animations to enhance the user shopping journey.",
    color: "var(--accent)",
    image: "/3d-ecom.png",
  },
  {
    id: "flightbook",
    name: "Flight Booking",
    category: "Booking System",
    url: "https://flight-booking-x.vercel.app",
    year: "2024",
    stack: ["Next.js", "NestJS", "JWT", "REST API"],
    description:
      "Secure airline booking system with role-based access, CRUD operations for airlines, airports, planes, and routes.",
    color: "var(--accent)",
    image: "/flightbook.png",
  },
  {
    id: "super-hrms",
    name: "Super HRMS",
    category: "HR Management",
    url: "https://super-hrms.vercel.app",
    year: "2026",
    stack: [
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux Toolkit",
      "Recharts",
    ],
    description:
      "A comprehensive Human Resource Management System built for modern workforce operations, featuring employee tracking, real-time analytics dashboards, and interactive UI components.",
    color: "var(--accent)",
    image: "/super-hrms.png",
  },
  // {
  //   id: "schoolsys",
  //   name: "School Management",
  //   category: "ERP Platform",
  //   url: "https://scl-mgt-sys-client.vercel.app",
  //   year: "2024",
  //   stack: ["React.js", "Node.js", "MongoDB"],
  //   description:
  //     "Comprehensive school ERP with student records, scheduling, teacher dashboards, and grade management.",
  //   color: "var(--accent)",
  //   image: "/schoolsys.webp",
  // },
  // {
  //   id: "dashboard",
  //   name: "Analytics Dashboard",
  //   category: "Analytics",
  //   url: "https://dash-b0ard.netlify.app",
  //   year: "2023",
  //   stack: ["React.js", "Tailwind CSS", "Recharts"],
  //   description:
  //     "Modern analytics dashboard with interactive charts, dark mode toggle, and fully responsive layout.",
  //   color: "var(--accent)",
  //   image: "/dashboard.webp",
  // },
  {
    id: "nexboard",
    name: "NexBoard Admin Dashboard",
    category: "Admin Dashboard",
    url: "https://nexboard-react-admin-dashboard.vercel.app",
    year: "2026",
    stack: ["Next.js", "React", "Redux Toolkit", "Shadcn UI", "Tailwind CSS"],
    description:
      "A modern, high-performance, and scalable admin dashboard built with the latest React ecosystem, providing a robust foundation for building data-rich web applications.",
    color: "var(--accent)",
    image: "/nexboard.png",
  },
  {
    id: "fieldvault",
    name: "FieldVault",
    category: "B2B SaaS Platform",
    url: "https://fieldvault-project-web.vercel.app",
    year: "2026",
    stack: ["Next.js", "NestJS", "React Native", "PostgreSQL", "Expo"],
    description:
      "A production-ready Multi-Tenant B2B SaaS platform for construction firms to track equipment via QR codes, manage maintenance schedules, and generate audit compliance reports.",
    color: "var(--accent)",
    image: "/fieldvault.png",
  },
  {
    id: "super-erp",
    name: "Super ERP",
    category: "Enterprise Resource Planning",
    url: "https://super-erp-xi.vercel.app",
    year: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux Toolkit",
    ],
    description:
      "A modern, production-ready ERP system with real-time analytics, inventory management, sales tracking, and comprehensive business reporting.",
    color: "var(--accent)",
    image: "/super-erp.png",
  },
  // {
  //   id: "ai-dashboard-template",
  //   name: "AI Dashboard Template",
  //   category: "AI Dashboard",
  //   url: "https://ai-dashboard-template-seven.vercel.app",
  //   year: "2026",
  //   stack: ["Next.js", "React", "Tailwind CSS", "Shadcn UI", "AI SDK"],
  //   description:
  //     "A modern, high-performance AI dashboard template built with the robust React ecosystem to streamline AI-powered applications and user management.",
  //   color: "var(--accent)",
  //   image: "/ai-dashboard-template.webp",
  // },
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Product Manager",
    company: "Easy Fashion Ltd",
    text: "Nadim consistently delivered clean, maintainable code ahead of schedule. His ability to translate complex requirements into intuitive interfaces was impressive.",
    avatar: "SM",
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "CTO",
    company: "TechStart Inc",
    text: "Working with Nadim on the booking platform was a great experience. He took ownership of the entire stack and delivered a production-ready product.",
    avatar: "JR",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Lead Designer",
    company: "Mediusware Ltd",
    text: "Nadim bridged the gap between design and engineering better than most developers I've worked with. Pixel-perfect implementations every time.",
    avatar: "EC",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
