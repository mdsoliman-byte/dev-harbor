
import api from './config';
import { AboutData } from '@/types/about';

// Skills types
export interface Skill {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
}

// Fetch skills data
export const fetchSkillsData = async (): Promise<Skill[]> => {
  try {
    const response = await api.get('skills/data/');
    console.log('Skills data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching skills data:', error);
    return defaultSkillsData;
  }
};

// Update skills data
export const updateSkillsData = async (data: Skill[]): Promise<Skill[]> => {
  try {
    const response = await api.put('skills/update/', data);
    console.log('Skills data updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating skills data:', error);
    throw error;
  }
};

// Create single skill
export const createSkill = async (data: Omit<Skill, 'id'>): Promise<Skill> => {
  try {
    const response = await api.post('skills/create/', data);
    console.log('Skill created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating skill:', error);
    throw error;
  }
};

// Update single skill
export const updateSkill = async (id: number, data: Partial<Skill>): Promise<Skill> => {
  try {
    const response = await api.put(`skills/${id}/update/`, data);
    console.log('Skill updated:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating skill with id ${id}:`, error);
    throw error;
  }
};

// Delete single skill
export const deleteSkill = async (id: number): Promise<void> => {
  try {
    await api.delete(`skills/${id}/delete/`);
    console.log('Skill deleted:', id);
  } catch (error) {
    console.error(`Error deleting skill with id ${id}:`, error);
    throw error;
  }
};

// Fetch skill categories
export const fetchSkillCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get('skills/categories/');
    console.log('Skill categories:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    return defaultSkillCategories;
  }
};

// Default skills data
const defaultSkillsData: Skill[] = [
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
const defaultSkillCategories: string[] = [
  "Development",
  "Data",
  "Design",
  "Infrastructure",
  "Business",
  "Other"
];
