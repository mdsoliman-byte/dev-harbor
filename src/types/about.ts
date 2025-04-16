
export interface AboutData {
  id: number;
  full_name: string;
  title: string;
  bio: string[];
  experience: Array<{
    id: number;
    position: string;
    company: string;
    period: string;
    description: string[];
  }>;
  education: Array<{
    id: number;
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;
  skills: Array<{
    id: number;
    title: string;
    description: string;
    icon?: string;
    category?: string;
  }>;
  contact: {
    location: string;
    email: string;
    availableForFreelance: boolean;
  };
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
  };
  profileImage: string;
}
