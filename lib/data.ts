export const siteConfig = {
  name: "Nadim Chowdhury",
  role: "Software Developer",
  location: "Dhaka, Bangladesh",
  email: "nadim-chowdhury@outlook.com",
  phone: "+880 1971 258803",
  github: "https://github.com/nadim-chowdhury",
  linkedin: "https://www.linkedin.com/in/nadim-chowdhury",
  website: "https://nadim.vercel.app",
  resumePdf: "/nadim-chowdhury-resume.pdf",
  coverLetterPdf: "/nadim-chowdhury-cover-letter.pdf",
  avatar: "/nadim_profile.jpg",
  workingPhoto: "/nadim_chowdhury.jpg",
  logo: "/programming_logo_profile.png",
  logoDark: "/programming_logo_profile.png",
} as const;

export const aboutText = {
  headline: "Building digital products that matter",
  paragraph:
    "I'm a software developer based in Dhaka with 3+ years of experience building web applications using React, Next.js, Node.js, and NestJS. I dropped out of a Mathematics program to pursue software engineering full-time - a decision that led me through five professional roles, from enterprise ERP and POS platforms to SaaS and booking systems.",
  paragraphTwo:
    "Currently working as a Software Developer at Akij iBos, building enterprise ERP modules across Procurement, Accounts, financial operations, and multi-level approval workflows. I'm mainly focused on frontend development while actively working with backend APIs, databases, authentication, and business logic.",
};

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "5", label: "Professional Roles" },
  { value: "15+", label: "Technologies" },
] as const;

export interface Education {
  degree: string;
  period: string;
  institution: string;
}

export const education: Education[] = [
  {
    degree: "BSc in Mathematics (Dropout)",
    period: "2019",
    institution: "Habibullah Bahar University College (National University)",
  },
  {
    degree: "HSC in Science",
    period: "2017 – 2019",
    institution: "Kabi Nazrul Govt. College (Science Stream)",
  },
];

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
    skills: ["Docker", "Git", "GitHub", "Vercel", "Netlify", "CI/CD", "Linux"],
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
  bullets?: string[];
}

export const experiences: Experience[] = [
  {
    id: "01",
    role: "Software Developer",
    company: "Akij iBos",
    period: "May 2026 – Present",
    type: "Full-time",
    stack: ["React.js", "C#", "MSSQL", "REST API", "Ant Design"],
    description:
      "Contributed to enterprise ERP modules including Procurement, Accounts, and financial operations, developing business-critical features and multi-level approval workflows.",
    bullets: [
      "Worked on ERP modules including Procurement, Purchase Request, and Purchase Order, building and improving features used in day-to-day business operations.",
      "Developed features for Accounts and financial operations, including Account Journal, Bank Journal, Bank Payment, and Adjustment Journal.",
      "Implemented authorization and multi-level approval workflows, supporting different roles and approval stages across ERP modules.",
    ],
  },
  {
    id: "02",
    role: "Full Stack Software Developer",
    company: "Easy Fashion Ltd",
    period: "Jul 2025 – Nov 2025",
    type: "Full-time",
    stack: ["React.js", "NestJS", "PostgreSQL", "Docker", "PWA"],
    description:
      "Developed POS and warehouse management systems with sales, inventory tracking, keyboard-friendly interactions, and PWA cross-module functionality.",
    bullets: [
      "Worked on POS and warehouse management systems, developing sales and sales return pages, inventory and stock management features, and integrating frontend and backend APIs. Added keyboard shortcuts and keyboard-friendly interactions to make the POS workflow faster and easier to use.",
      "Worked on PWA features and cross-module functionality, handling API integration, business logic, bug fixes, and improvements while collaborating with developers, testers, and project managers.",
    ],
  },
  {
    id: "03",
    role: "Full Stack Web Developer",
    company: "Freelance",
    period: "Apr 2025 – Jun 2025",
    type: "Contract",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Amadeus API", "REST API"],
    description:
      "Built a full-stack flight booking system with user authentication, role-based access, and Amadeus API flight search integration.",
    bullets: [
      "Built a flight booking system using Next.js and NestJS, with user authentication, role-based access, and CRUD features for airlines, airports, aircraft, and routes.",
      "Integrated the Amadeus API for flight search and booking-related data, and developed the frontend booking flow with responsive UI and API integration.",
    ],
  },
  {
    id: "04",
    role: "Junior Frontend Developer",
    company: "Mediusware Ltd.",
    period: "Dec 2023 – Mar 2025",
    type: "Full-time",
    stack: ["React.js", "GraphQL", "TypeScript", "Tailwind CSS", "Ant Design"],
    description:
      "Developed dynamic web applications including a drag-and-drop website builder with multi-tenancy, GraphQL APIs, and role-based eCommerce features.",
    bullets: [
      "Worked on a drag-and-drop website builder with multi-tenancy, reusable components, and subdomain-based website publishing.",
      "Integrated GraphQL APIs and handled dynamic data rendering across different pages and modules.",
      "Built frontend features including profile management, task management, customer orders, and user preferences, with role-based access control on eCommerce projects.",
      "Worked on an event management application, developing new features and connecting frontend components with backend services.",
      "Fixed bugs, optimized performance, improved existing features, and worked closely with developers and testers to keep the applications stable and easy to use.",
    ],
  },
  {
    id: "05",
    role: "Frontend Developer",
    company: "Freelance & Personal Projects",
    period: "Sep 2022 – Nov 2023",
    type: "Freelance",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    description:
      "Built responsive web applications and strengthened full-stack development foundations with React.js, REST APIs, authentication, and CRUD operations.",
    bullets: [
      "Built web applications with React.js while strengthening my frontend development skills, including reusable components, responsive layouts, and user interactions.",
      "Worked on the frontend of a School Management System and Flight Booking App building pages and features and integrating them with backend APIs.",
      "Built several practice projects to strengthen my skills in JavaScript, REST APIs, authentication, CRUD operations, Git, and frontend debugging.",
    ],
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
    stack: ["Next.js", "NestJS", "Amadeus API", "PostgreSQL", "REST API"],
    description:
      "Full-stack airline booking platform integrated with Amadeus API for flight search, featuring role-based access, routes, planes, and booking management.",
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
