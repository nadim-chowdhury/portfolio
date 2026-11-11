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
    "I'm a self-taught Software Developer with 4 years of experience building applications using React, Node.js, and React Native. Experienced in developing ERP, POS, and business applications, along with SaaS and booking platforms. Mainly focused on frontend development while also working with backend APIs, databases, authentication, business logic, and mobile applications.",
  paragraphTwo:
    "Comfortable working with existing codebases, learning new technologies, and collaborating with cross-functional teams to build and improve real-world applications. Experienced across enterprise ERP modules (Procurement, Accounts, financial workflows, multi-level approvals), POS and warehouse systems, IoT integrations, and full-stack SaaS architectures.",
};

export const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "3", label: "Professional Roles" },
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
    ],
  },
  {
    name: "Backend",
    icon: "server",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "GraphQL",
      "REST API",
    ],
  },
  {
    name: "Mobile",
    icon: "smartphone",
    skills: ["React Native"],
  },
  {
    name: "Database",
    icon: "database",
    skills: ["PostgreSQL", "MongoDB"],
  },
  {
    name: "DevOps",
    icon: "cloud",
    skills: ["Docker", "Git", "GitHub"],
  },
  {
    name: "Tools",
    icon: "wrench",
    skills: ["Postman", "Swagger"],
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
    period: "Apr 2026 – Nov 2026",
    type: "Full-time",
    stack: [
      "React.js",
      "Node.js",
      "PostgreSQL",
      "REST API",
      "Ant Design",
      "Quartz",
      "ZKTeco",
    ],
    description:
      "Engineered enterprise ERP modules (Procurement, Accounts, financial operations, multi-level approvals), ZKTeco turnstile-integrated Visitor Management System, and automated Standard Chartered Bank statement collection pipelines.",
    bullets: [
      "Worked on ERP modules including Procurement, Purchase Request, and Purchase Order, building and improving features used in day-to-day business operations.",
      "Developed features for Accounts and financial operations, authorization, and multi-level approval workflows across ERP modules.",
      "Developed a Visitor Management System integrated with ZKTeco turnstile gates, implementing visitor registration, host approval, QR-based access, automated device synchronization, and time-based access expiration.",
      "Refactored Standard Chartered Bank's Statement Collection system, automating CAMT XML processing, database mapping, duplicate handling, batch processing, and scheduled SFTP retrieval using Quartz, successfully processing 7,051 transactions in testing.",
    ],
  },
  {
    id: "02",
    role: "Frontend Developer",
    company: "Mediusware Ltd.",
    period: "Dec 2023 – Jan 2026",
    type: "Full-time",
    stack: [
      "React.js",
      "Next.js",
      "NestJS",
      "TypeScript",
      "GraphQL",
      "Tailwind CSS",
      "Amadeus API",
    ],
    description:
      "Engineered POS and warehouse management systems, multi-tenant website builders, eCommerce modules, event management apps, and flight booking systems.",
    bullets: [
      "Worked on POS and warehouse management systems, developing sales and sales return pages, inventory and stock management features, and integrating frontend and backend APIs. Added keyboard shortcuts and keyboard-friendly interactions to make the POS workflow faster and easier to use.",
      "Worked on a drag-and-drop website builder with multi-tenancy, reusable components, and subdomain-based website publishing.",
      "Integrated GraphQL APIs and handled dynamic data rendering across different pages and modules.",
      "Built frontend features including profile management, task management, customer orders, and user preferences, with role-based access control on eCommerce projects.",
      "Worked on an event management application, developing new features and connecting frontend components with backend services.",
      "Built a flight booking system using Next.js and NestJS, with user authentication, role-based access, and CRUD features for airlines, airports, aircraft, and routes.",
      "Integrated the Amadeus API for flight search and booking-related data, and developed the frontend booking flow with responsive UI and API integration.",
    ],
  },
  {
    id: "03",
    role: "Web Developer",
    company: "Freelance & Personal Projects",
    period: "Sep 2022 – Nov 2023",
    type: "Freelance",
    stack: ["React.js", "JavaScript", "Node.js", "Express.js", "MongoDB", "REST API", "Git"],
    description:
      "Built web applications with React.js focusing on reusable components, responsive layouts, and full-stack fundamentals.",
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
  // {
  //   id: "schoolsys",
  //   name: "School Management",
  //   category: "ERP Platform",
  //   url: "https://scl-mgt-sys-client.vercel.app",
  //   year: "2024",
  //   stack: ["React.js", "Node.js", "MongoDB", "Express.js"],
  //   description:
  //     "Comprehensive school ERP with student records, scheduling, teacher dashboards, and grade management.",
  //   color: "var(--accent)",
  //   image: "/super-erp.png",
  // },
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
  // {
  //   id: "super-erp",
  //   name: "Super ERP",
  //   category: "Enterprise Resource Planning",
  //   url: "https://super-erp-xi.vercel.app",
  //   year: "2026",
  //   stack: [
  //     "Next.js",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "Shadcn UI",
  //     "Redux Toolkit",
  //   ],
  //   description:
  //     "A modern, production-ready ERP system with real-time analytics, inventory management, sales tracking, and comprehensive business reporting.",
  //   color: "var(--accent)",
  //   image: "/super-erp.png",
  // },
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
  company?: string;
  project?: string;
  text: string;
  avatar: string;
  linkedin?: string;
  date?: string;
  relationship?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Shafayet Hossain",
    role: "Frontend Web Developer",
    company: "MediusWare",
    text: "I had the pleasure of working closely with Nadim during his time as a frontend developer at MediusWare, and I cannot recommend him highly enough. Nadim consistently impressed me with his dedication to learning and improving his skills. Throughout his tenure, Nadim demonstrated a strong understanding of frontend development principles and techniques. He tackled every task with enthusiasm and a keen eye for detail, producing high-quality work that exceeded expectations. What truly sets Nadim apart is his proactive approach to problem-solving. He doesn't shy away from challenges but instead embraces them as opportunities to grow. His ability to think creatively and find innovative solutions was invaluable to our team. Moreover, Nadim is a fantastic team player. He communicates effectively, collaborates seamlessly with colleagues, and always brings a positive attitude to the table. His contributions were instrumental in the success of several projects at MediusWare. In summary, Nadim is a talented frontend developer with a passion for his craft and a strong work ethic. Any team would be fortunate to have him onboard, and I am confident that he will continue to thrive and excel in his future endeavors.",
    avatar: "SH",
    linkedin: "https://www.linkedin.com/in/shafayet-hossain-2357311b9/",
    date: "April 2024",
    relationship: "Senior colleague at MediusWare",
  },
  {
    id: 2,
    name: "Sabbir Hosen",
    role: "Software Engineer",
    company: "MediusWare",
    text: "Nadim is a skilled JavaScript React developer with experience in GraphQL. He excels at building user-friendly interfaces and optimizing data management. With a positive attitude and eagerness to learn, Nadim is a valuable asset to any team. I highly recommend him for JavaScript and React development roles.",
    avatar: "SH",
    linkedin: "https://www.linkedin.com/in/sabbirhosen00/",
    date: "April 2024",
    relationship: "Managed Nadim directly at MediusWare",
  },
  {
    id: 3,
    name: "Md Fozle Rabbi",
    role: "Full Stack Developer",
    project: "ganaGroup",
    text: "I had the pleasure of working closely with Nadim on the ganaGroup project, where we were tasked with building a drag and drop website builder. Nadim took charge of the frontend development while I handled the backend aspects. Nadim's expertise in frontend technologies, particularly React JS and grapesJS, played a pivotal role in the success of our project. His ability to seamlessly integrate these tools and technologies resulted in a user-friendly and visually appealing interface for our website builder. Beyond his technical skills, Nadim demonstrated a deep understanding of website architecture and APIs, which greatly contributed to the efficiency and effectiveness of our collaboration. He consistently showcased a strong work ethic, attention to detail, and a proactive approach to problem-solving. It was a pleasure working with Nadim, and I have no hesitation in recommending him for any frontend development projects. His dedication, skills, and professionalism make him a valuable asset to any team.",
    avatar: "FR",
    linkedin: "https://www.linkedin.com/in/fozle-rabbi-python-developer/",
    date: "April 2024",
    relationship: "Collaborated on ganaGroup project",
  },
  {
    id: 4,
    name: "Yeamin Mahmud",
    role: "Engineering Lead",
    company: "MediusWare",
    text: "Nadim is a very talented and professional individual. His etiquette and punctuality are exemplary. The will to learn and the capabilities to understand as well as their adaptability make him a good teammate to have in a team.",
    avatar: "YM",
    linkedin: "https://www.linkedin.com/in/yeamin21/",
    date: "April 2024",
    relationship: "Managed Nadim directly at MediusWare",
  },
  {
    id: 5,
    name: "Md Fatin Ishmam",
    role: "Software Engineer",
    company: "MediusWare",
    text: "Nadim is an exceptional JavaScript frontend developer with a strong technical skill set and a collaborative approach to teamwork. His expertise, professionalism, and dedication make him a valuable asset to any project. I highly recommend Nadim for his outstanding contributions and positive attitude.",
    avatar: "FI",
    linkedin: "https://www.linkedin.com/in/md-fatin-ishmam/",
    date: "April 2024",
    relationship: "Managed Nadim directly at MediusWare",
  },
  {
    id: 6,
    name: "Salman Kabir",
    role: "Enterprise Solution Architect",
    company: "MediusWare",
    text: "Nadim is a very talented Front-end developer. I worked with him and he never back down from taking new challenges. This is most impressive thing about him. He learns very quickly and tries to implement them as soon as possible. I really recommend him and wish him a very good future software engineer of Bangladesh.",
    avatar: "SK",
    linkedin: "https://www.linkedin.com/in/sksshouvo/",
    date: "April 2024",
    relationship: "Managed Nadim directly at MediusWare",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
