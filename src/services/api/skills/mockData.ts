
import { Skill } from './types';

// Default skills data
export const defaultSkillsData: Skill[] = [
  {
    id: 1,
    name: "Frontend Development",
    description: "React, Next.js, Vue.js",
    icon: "Code",
    category: "Development",
    progress: "80",
  },
  {
    id: 2,
    name: "Backend Development",
    description: "Node.js, Express, Django",
    icon: "Database",
    category: "Development",
    progress: "80",
  },
  {
    id: 3,
    name: "Data Science",
    description: "Python, R, Machine Learning",
    icon: "BarChart",
    category: "Data",
    progress: "80",
  },
  {
    id: 4,
    name: "DevOps",
    description: "Docker, Kubernetes, CI/CD",
    icon: "Terminal",
    category: "Infrastructure",
    progress: "80",
  },
  {
    id: 5,
    name: "UI/UX Design",
    description: "Figma, Adobe XD, User Research",
    icon: "PenTool",
    category: "Design",
    progress: "80",
  },
  {
    id: 6,
    name: "Mobile Development",
    description: "React Native, Flutter, Swift",
    icon: "Smartphone",
    category: "Development",
    progress: "80",
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
