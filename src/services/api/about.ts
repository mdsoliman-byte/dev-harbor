
import api from './config';
import { AboutData } from '@/types/about';

// Default about data
const defaultAboutData: AboutData = {
  id: 0,
  full_name: "John Doe",
  title: "Full Stack Developer",
  bio: ["I am a passionate full stack developer with experience in building web applications using modern technologies."],
  experience: [
    {
      id: 1,
      position: "Full Stack Developer",
      company: "Default Company",
      period: "Jan 2020 - Present",
      description: ["Worked on building web applications using React and Node.js"]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "Default University",
      period: "2015 - 2019",
      description: "Studied computer science with focus on software engineering"
    }
  ],
  skills: [
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
  ],
  contact: {
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    availableForFreelance: true
  },
  socialLinks: {
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe"
  },
  profileImage: "/placeholder.svg"
};

export const fetchAboutData = async (): Promise<AboutData> => {
  try {
    const response = await api.get('about/data/');
    console.log('About data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching about data:', error);
    return defaultAboutData;
  }
};

export const updateAboutData = async (data: AboutData): Promise<AboutData> => {
  try {
    const response = await api.put('about/update/', data);
    console.log('About data updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating about data:', error);
    throw error;
  }
};
