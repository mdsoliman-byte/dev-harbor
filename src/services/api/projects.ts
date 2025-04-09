
import api from './config';

// Replace this with your actual project type
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
}

export const fetchProjectData = async (): Promise<Project[]> => {
  try {
    const response = await api.get('projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchProjectBySlug = async (slug: string): Promise<Project> => {
  try {
    const response = await api.get(`projects/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    throw error;
  }
};
