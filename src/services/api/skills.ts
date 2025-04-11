
import api from './config';
import { AboutData } from '@/types/about';

// Skills types
export interface Skill {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  isEditing?: boolean; // UI state field for admin dashboard
}

// Parameters for filtering skills
export interface SkillParams {
  category?: string;
  search?: string;
  sortBy?: 'title' | 'category' | 'id';
  sortOrder?: 'asc' | 'desc';
}

// Fetch skills data with optional filters
export const fetchSkillsData = async (params?: SkillParams): Promise<Skill[]> => {
  try {
    // In a real API, these would be query params
    // For this mock API, we'll filter on the client side
    const response = await api.get('skills/data/');
    console.log('Skills data:', response.data);
    
    let skills = response.data;
    
    // Apply filters if needed
    if (params) {
      // Filter by category
      if (params.category) {
        skills = skills.filter((skill: Skill) => 
          skill.category === params.category
        );
      }
      
      // Search by title or description
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        skills = skills.filter((skill: Skill) => 
          skill.title.toLowerCase().includes(searchTerm) || 
          skill.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // Sort results
      if (params.sortBy) {
        skills.sort((a: Skill, b: Skill) => {
          const aValue = a[params.sortBy as keyof Skill];
          const bValue = b[params.sortBy as keyof Skill];
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return params.sortOrder === 'desc' 
              ? bValue.localeCompare(aValue) 
              : aValue.localeCompare(bValue);
          }
          
          // Default for non-string values
          return params.sortOrder === 'desc' 
            ? Number(bValue) - Number(aValue) 
            : Number(aValue) - Number(bValue);
        });
      }
    }
    
    return skills;
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
    // Remove isEditing from data before sending to API
    const { isEditing, ...apiData } = data;
    
    const response = await api.put(`skills/${id}/update/`, apiData);
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

// Fetch skill by ID
export const fetchSkillById = async (id: number): Promise<Skill> => {
  try {
    const response = await api.get(`skills/${id}/`);
    console.log('Skill details:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching skill with id ${id}:`, error);
    // Return a placeholder skill for error case
    const placeholder = defaultSkillsData.find(skill => skill.id === id);
    if (placeholder) return placeholder;
    throw error;
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
