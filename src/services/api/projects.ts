
import api from './config';

export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    github_url: string | null;
    live_demo_url: string | null;
    key_features: string;
    image: string;
    created_at: string;
}

export const fetchProjectData = async (): Promise<Project[]> => {
    try {
        const response = await api.get('projects/project/');
        console.log('Project data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching project data:', error);
        return [
            {
                id: 0,
                title: "Default Project",
                description: "This is a default project description.",
                technologies: ["Default Tech 1", "Default Tech 2"],
                github_url: null,
                live_demo_url: null,
                key_features: "Default key features.",
                image: "/default-project-image.png",
                created_at: new Date().toISOString(),
            },
        ];
    }
};

export const fetchProjectCategories = async () => {
    try {
        const response = await api.get('projects/projectCategories/');
        console.log('Project categories:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching project categories:', error);
        return [];
    }
};
