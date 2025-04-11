
import { Skill } from './types';

// Default skills data
export const defaultSkillsData: Skill[] = [
  {
    id: 1,
    title: "Frontend Development",
    description: "React, Next.js, Vue.js",
    icon: "Code",
    category: "Development"
  },
  {
    id: 2,
    title: "Backend Development",
    description: "Node.js, Express, Django",
    icon: "Database",
    category: "Development"
  },
  {
    id: 3,
    title: "Data Science",
    description: "Python, R, Machine Learning",
    icon: "BarChart",
    category: "Data"
  },
  {
    id: 4,
    title: "DevOps",
    description: "Docker, Kubernetes, CI/CD",
    icon: "Terminal",
    category: "Infrastructure"
  },
  {
    id: 5,
    title: "UI/UX Design",
    description: "Figma, Adobe XD, User Research",
    icon: "PenTool",
    category: "Design"
  },
  {
    id: 6,
    title: "Mobile Development",
    description: "React Native, Flutter, Swift",
    icon: "Smartphone",
    category: "Development"
  }
];

// Default skill categories
export const defaultSkillCategories: string[] = [
  "Development",
  "Data",
  "Design",
  "Infrastructure",
  "Business",
  "Other"
];
