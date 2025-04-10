
import api from './config';

// Project type definition
export interface Project {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  image: string;
  project_categories: Array<{
    id: number;
    name: string;
  }>;
  start_date: string;
  end_date: string | null;
  url: string | null;
  github_url?: string | null;
  tags?: string[];
}

// Type for creating/updating a project
export interface ProjectFormData {
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  image: string;
  project_categories: number[];
  start_date: string;
  end_date?: string | null;
  url?: string | null;
  github_url?: string | null;
  tags?: string[];
}

// Fetch all projects
export const fetchProjectData = async (): Promise<Project[]> => {
  try {
    const response = await api.get('projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Fetch a single project by slug
export const fetchProjectBySlug = async (slug: string): Promise<Project> => {
  try {
    const response = await api.get(`projects/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    throw error;
  }
};

// Create a new project
export const createProject = async (projectData: ProjectFormData): Promise<Project> => {
  try {
    const response = await api.post('projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update an existing project
export const updateProject = async (id: number, projectData: ProjectFormData): Promise<Project> => {
  try {
    const response = await api.put(`projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (id: number): Promise<void> => {
  try {
    await api.delete(`projects/${id}`);
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    throw error;
  }
};

// Fetch project categories
export const fetchProjectCategories = async (): Promise<Array<{ id: number; name: string }>> => {
  try {
    const response = await api.get('projects/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching project categories:', error);
    return [];
  }
};
