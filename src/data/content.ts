/**
 * ============================================================
 *  SITE CONTENT
 * ============================================================
 *  This is the ONLY file you need to touch to update the site:
 *  add a project, tweak a skill, add a new job, etc.
 *  Every section on the page reads from here.
 * ============================================================
 */

export const profile = {
  name: "Ketul Suthar",
  title: "Software Engineer",
  tagline: "Full-stack engineer",
  location: "Ahmedabad, India",
  email: "ketulsuthar1727@gmail.com",
  phone: "+91 87802 21719",
  summary:
    "I build and ship production-grade web applications end to end — from REST APIs and data models to pixel-accurate, animated interfaces. Six months deep in Next.js, TypeScript, Node.js and AWS, with a Computer Science foundation strong enough to back it up: 170+ DSA problems solved, systems thought through before they're coded.",
  resumeUrl: "/Ketul_Suthar_Software_Engineer.pdf",
  social: {
    github: "https://github.com/ketulsuthar",
    linkedin: "https://linkedin.com/in/ketulsuthar",
    leetcode: "https://leetcode.com/ketulsuthar",
    email: "mailto:ketulsuthar1727@gmail.com",
  },
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["C++", "JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Redux Toolkit", "React Router", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "API Integration"],
  },
  {
    label: "Cloud & Deployment",
    items: ["AWS", "Vercel"],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "GitHub", "GitLab", "Linux"],
  },
  {
    label: "Core CS",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Low-Level Design"],
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Seaflux Technologies",
    role: "Software Engineer Intern",
    location: "Ahmedabad · On-site",
    start: "Jan 2026",
    end: "Jul 2026",
    points: [
      "Developed and maintained production-grade web applications using Next.js, TypeScript, JavaScript (ES6+) and Tailwind CSS.",
      "Built and enhanced 10+ customer-facing pages and internal portal modules across the company's production platform.",
      "Developed 20+ reusable UI components, improving consistency and development efficiency across multiple modules.",
      "Resolved a critical content delivery issue by implementing a dynamic content retrieval architecture integrated with AWS S3, eliminating full redeployments for content changes.",
      "Implemented pagination for content-heavy blog and case-study modules, reducing initial payload size and improving load performance.",
      "Integrated REST APIs and contributed to frontend-backend workflows enabling seamless data exchange across business features.",
      "Participated in debugging, performance optimization, code reviews and Agile workflows using Git and GitLab.",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; url: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "SeaBasket",
    description: "A full-stack e-commerce platform with auth, catalog, cart and order tracking.",
    highlights: [
      "Authentication, product catalog, cart management, checkout workflow, order tracking and user profiles.",
      "Secure JWT-based auth with OTP verification, password reset flows and email notifications.",
      "REST APIs built with Express.js, TypeORM and MySQL for products, reviews, ratings, filtering and pagination.",
      "Redux Toolkit for state management with an optimized, scalable component architecture.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "Express.js", "MySQL", "Redux Toolkit"],
    featured: true,
  },
  {
    name: "PowerPlai Sports",
    description: "A fully responsive sports platform, built and shipped solo end to end.",
    highlights: [
      "Designed and developed a fully responsive sports platform from scratch with React and TypeScript.",
      "Managed the complete deployment lifecycle — production deployment on Vercel, custom domain and DNS setup, and release management.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    featured: true,
  },
  {
    name: "House Price Prediction",
    description: "A regression-based ML model for predicting housing prices from real-world data.",
    highlights: [
      "Built a housing price prediction model using regression techniques on real-world datasets.",
      "Data preprocessing, feature engineering and model evaluation using MAE and R² metrics.",
      "Visualized trends and prediction results with Matplotlib to support data-driven insights.",
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
  },
];

export type Achievement = {
  label: string;
  detail: string;
};

export const achievements: Achievement[] = [
  {
    label: "170+ DSA problems solved",
    detail: "LeetCode contest rating of 1560, demonstrating strong problem-solving and algorithmic thinking.",
  },
];

export type EducationItem = {
  school: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  detail?: string;
};

export const education: EducationItem[] = [
  {
    school: "SAL Engineering and Technical Institute",
    degree: "B.Tech, Information Technology",
    location: "Ahmedabad, India",
    start: "Jul 2023",
    end: "Jun 2026",
    detail: "CGPA: 8.59",
  },
];

// Nav sections, in scroll order. Update here if you add/remove a section.
export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
