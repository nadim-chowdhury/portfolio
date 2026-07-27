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
    "I'm a full stack developer based in Dhaka with 3+ years of experience shipping production-grade web applications. I dropped out of a Mathematics program to pursue software engineering full-time — a decision that led me through six professional roles, from internships at established firms to leading freelance projects end-to-end.",
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
  bullets?: string[];
}

export const experiences: Experience[] = [
  {
    id: "01",
    role: "Software Engineer",
    company: "AKIJ iBOS",
    period: "May 2026 – Present",
    type: "Full-time",
    stack: [
      "React.js",
      "JavaScript",
      "Redux Toolkit",
      "Vite",
      "Material UI",
      "Bootstrap",
      "Formik",
      "Yup",
      "REST API",
    ],
    description:
      "Contributed to the development and maintenance of large-scale enterprise ERP and HRMS/Payroll platforms, building business-critical modules and workflows using React.js, JavaScript, Redux Toolkit, Vite, and modern UI technologies. My responsibilities focused on developing scalable frontend solutions, integrating REST APIs, optimizing application performance, and maintaining clean and maintainable enterprise codebases.",
    bullets: [
      "Designed and implemented complex, end-to-end features across ERP and HRMS modules, including employee management, profit center allocation, service requests, recruitment workflows, and dynamic reporting.",
      "Built responsive and user-friendly interfaces using React.js, Redux Toolkit, Vite, Material UI, and Bootstrap.",
      "Developed complex forms and multi-step workflows with robust client-side validation using Formik and Yup.",
      "Integrated and consumed REST APIs while optimizing state management, data flow, and application performance.",
      "Collaborated with cross-functional teams to translate business requirements into scalable and maintainable technical solutions.",
      "Maintained clean, modular, and reusable code following modern frontend architecture, coding standards, and enterprise development best practices.",
    ],
  },
  {
    id: "02",
    role: "Professional Development",
    company: "Career Break",
    period: "Dec 2025 – Apr 2026",
    type: "Career break",
    stack: ["React.js", "Next.js", "NestJS", "TypeScript", "React Native"],
    description:
      "Focused on professional development and strengthening my full-stack software engineering skills during a planned career transition.",
    bullets: [
      "Deepened expertise in React.js, Next.js, NestJS, TypeScript, React Native and modern frontend and backend architecture.",
      "Worked on personal projects to improve experience with scalable application design, REST APIs, authentication, and database integration.",
      "Strengthened understanding of clean code, system design, performance optimization, and maintainable software architecture.",
      "Continued learning and building practical projects to prepare for my next professional opportunity.",
    ],
  },
  {
    id: "03",
    role: "Full Stack Software Developer",
    company: "Easy Fashion Ltd",
    period: "Jul 2025 – Nov 2025",
    type: "Full-time",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
    description:
      "Contributed to the development of a large-scale ERP platform that integrates business-critical modules including POS, Inventory, Procurement, Production, Finance, and HRM. My responsibilities covered both frontend and backend development, focusing on scalable architecture, performance, and maintainability.",
    bullets: [
      "Designed and implemented end-to-end features using Next.js and NestJS, delivering seamless user experiences across multiple ERP modules.",
      "Developed and maintained secure REST APIs, ensuring reliable communication between frontend applications and backend services.",
      "Optimized application performance through efficient database queries, code splitting, caching strategies, and reusable architecture.",
      "Collaborated closely with cross-functional teams to translate business requirements into scalable technical solutions.",
      "Maintained clean, modular, and well-tested codebases following enterprise development standards and best practices.",
    ],
  },
  {
    id: "04",
    role: "Full Stack Web Developer",
    company: "Freelance",
    period: "Feb 2025 – Jun 2025",
    type: "Freelance",
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Stripe"],
    description:
      "Worked with clients to design and develop modern full-stack web applications, focusing on scalable architecture, intuitive user experiences, and maintainable codebases.",
    bullets: [
      "Built a complete Flight Booking System using Next.js and NestJS, including authentication, role-based authorization, airline management, airport management, aircraft management, route management, and booking workflows.",
      "Developed a drag-and-drop Website Builder SaaS, featuring reusable components, template management, responsive editing, project dashboards, and subscription-based billing.",
      "Designed scalable frontend and backend architectures with reusable modules, component registries, and optimized rendering pipelines.",
    ],
  },
  {
    id: "05",
    role: "Jr. Frontend Developer",
    company: "Mediusware Ltd",
    period: "Mar 2024 – Jan 2025",
    type: "Full-time",
    stack: ["React.js", "TypeScript", "GraphQL", "Ant Design", "Bootstrap", "React Router DOM"],
    description:
      "Contributed to the development of enterprise web applications by building scalable frontend solutions, integrating backend services, and improving overall application usability and performance.",
    bullets: [
      "Developed a multi-tenant drag-and-drop website builder with dynamic component rendering and subdomain publishing functionality.",
      "Built features for an event management platform, integrating frontend components with backend APIs.",
      "Implemented multiple modules for internal products, transforming UI designs into responsive, production-ready interfaces.",
      "Designed responsive and user-friendly interfaces with React.js, Ant Design, and Bootstrap, while managing state and routing using React Router DOM.",
      "Consumed GraphQL APIs and optimized client-side data fetching for improved application performance.",
    ],
  },
  {
    id: "06",
    role: "Frontend Trainee",
    company: "Mediusware Ltd",
    period: "Dec 2023 – Feb 2024",
    type: "Internship",
    stack: ["React.js", "JavaScript", "Ant Design", "REST API"],
    description:
      "Completed a frontend development internship by contributing to a large-scale e-commerce platform while strengthening practical experience in modern React development.",
    bullets: [
      "Developed Profile Management CRUD functionality with role-based access control.",
      "Implemented Back Office and Task Management modules for administrators, employees, and delivery personnel.",
      "Built Customer Order Management features with dynamic workflows based on delivery and pickup options.",
      "Developed interactive UI logic for the Preferences module without backend dependency.",
      "Independently built an e-commerce application from scratch, including responsive layouts, reusable components, and optimized project architecture.",
    ],
  },
  {
    id: "07",
    role: "Frontend Developer",
    company: "Freelance",
    period: "Jul 2023 – Nov 2023",
    type: "Freelance",
    stack: ["Angular", "React.js", "JavaScript", "REST API"],
    description:
      "Delivered frontend solutions for client projects by developing responsive interfaces, integrating APIs, and translating business requirements into user-friendly applications.",
    bullets: [
      "Built a School Management System using Angular with modules for students, teachers, and administrative users.",
      "Developed a responsive Flight Ticket Booking application with complete booking workflows and API integration.",
      "Designed reusable UI components and responsive layouts to improve maintainability and consistency.",
      "Worked directly with clients to gather requirements, provide technical solutions, and deliver projects on schedule.",
    ],
  },
  {
    id: "08",
    role: "Web Developer",
    company: "Self-employed",
    period: "Sep 2022 – Jun 2023",
    type: "Self-employed",
    stack: ["HTML", "CSS", "JavaScript", "React.js", "MongoDB", "Express.js", "Node.js"],
    description:
      "Focused on mastering full-stack web development through hands-on projects while building a strong foundation in modern JavaScript technologies and software engineering practices.",
    bullets: [
      "Learned and applied the MERN stack by building full-stack applications from concept to deployment.",
      "Created practice projects such as task management apps, authentication systems, and CRUD-based solutions.",
      "Developed authentication systems, task management applications, dashboards, and CRUD-based projects.",
      "Practiced REST API development, database design, state management, and responsive UI development.",
      "Strengthened debugging, problem-solving, version control, and deployment skills through continuous project-based learning.",
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
