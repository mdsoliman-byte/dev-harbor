import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const publicEndpoints = ['home/data/', 'projects/project/', 'projects/projectCategories/'];

        const isPublic = publicEndpoints.some(endpoint => config.url.includes(endpoint));

        if (!isPublic) {
            const adminToken = localStorage.getItem('adminToken');
            const userToken = localStorage.getItem('userToken');
            const token = adminToken || userToken;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export const fetchHeroData = async () => {
    try {
        const response = await api.get('home/data/');
        console.log('Hero data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching hero data:', error);
        return {
            id: 0,
            title: "Default Title",
            heading: "Default Heading",
            shortbio: "Default short bio.",
            skills: ["Default Skill 1", "Default Skill 2"],
            available_for_freelance: false,
            profile_image: "/default-profile.png",
        };
    }
};
export const updateHeroData = async (data) => {
    try {
        const response = await api.put('home/update/', data, {
            headers: data instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : undefined,
        });
        console.log('Hero data updated:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating hero data:', error);
        throw error;
    }
};

export const fetchProjectData = async () => {
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

export const fetchLoginStatus = async () => {
    try {
        const response = await api.get("auth/login/");
        return response.data;
    } catch (error) {
        console.error("Error checking login status:", error);
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await api.post('auth/login/', credentials);
        console.log('Login response:', response.data);

        const { access_token, refresh_token, user } = response.data;

        if (access_token) {
            localStorage.setItem('refreshToken', refresh_token);

            if (user && user.user_type === 'admin') {
                localStorage.setItem('adminToken', access_token);
                localStorage.setItem('adminUser', JSON.stringify(user || { email: credentials.email }));
            } else {
                localStorage.setItem('userToken', access_token);
                localStorage.setItem('userInfo', JSON.stringify(user || { email: credentials.email }));
            }
            return response.data;
        } else {
            console.error('Access token missing in login response:', response.data);
            throw new Error('Authentication failed: Access token missing');
        }
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
};
export const logout = () => {
    const isAdmin = !!localStorage.getItem('adminToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('userInfo');
    window.location.href = isAdmin ? '/auth/login' : '/login';
};

export const isAdminAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    console.log('Admin token found:', !!token);
    return !!token;
};

export const getAdminToken = () => {
    return localStorage.getItem('adminToken');
};

export const getAdminUser = () => {
    const userJson = localStorage.getItem('adminUser');
    if (!userJson) return null;
    try {
        return JSON.parse(userJson);
    } catch (e) {
        console.error('Error parsing admin user:', e);
        return null;
    }
};

// About page API functions
export const fetchAboutData = async () => {
    try {
        const response = await api.get('about/data/');
        console.log('About data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching about data:', error);
        // Return default data if API fails
        return {
            id: 0,
            fullName: "MD SOLIMAN",
            title: "Data Scientist & Programmer",
            bio: [
                "Hello! I'm MD SOLIMAN, a passionate data scientist with extensive expertise in Python and R programming.",
                "My professional journey began with a strong foundation in statistics and computational methods, which I've since expanded into developing advanced machine learning models and data visualization tools.",
                "I believe that effective data science goes beyond technical implementation—it's about asking the right questions, understanding the domain, and communicating insights in ways that drive meaningful decisions."
            ],
            experience: [
                {
                    id: 1,
                    position: "Senior Data Scientist",
                    company: "DataTech Solutions",
                    period: "Jan 2021 - Present",
                    description: [
                        "Lead a team of data scientists in developing predictive analytics models for financial services",
                        "Designed and implemented machine learning pipelines that improved forecast accuracy by 35%",
                        "Created data visualization dashboards for executive decision-making",
                        "Mentored junior data scientists and conducted code reviews for Python and R projects"
                    ]
                },
                {
                    id: 2,
                    position: "Data Scientist",
                    company: "Analytics Innovations",
                    period: "Mar 2019 - Dec 2020",
                    description: [
                        "Developed statistical models and machine learning algorithms for client projects",
                        "Built ETL pipelines and automated data processing workflows using Python",
                        "Conducted exploratory data analysis and feature engineering on diverse datasets",
                        "Created reproducible research reports using R Markdown and Jupyter Notebooks"
                    ]
                },
                {
                    id: 3,
                    position: "Data Analyst",
                    company: "Research Institute",
                    period: "Jun 2017 - Feb 2019",
                    description: [
                        "Analyzed research data using statistical methods and visualization techniques",
                        "Developed R scripts for data cleaning and preliminary analysis",
                        "Assisted in designing experimental studies and survey methodologies",
                        "Created data visualizations and statistical reports for publication"
                    ]
                }
            ],
            education: [
                {
                    id: 1,
                    degree: "Master of Science in Data Science",
                    institution: "University of Data Analytics",
                    period: "2015 - 2017",
                    description: "Graduated with distinction. Specialized in machine learning algorithms and statistical computing."
                },
                {
                    id: 2,
                    degree: "Bachelor of Science in Computer Science",
                    institution: "Technical University",
                    period: "2011 - 2015",
                    description: "Graduated with honors. Focus on computational methods and programming."
                }
            ],
            skills: [
                {
                    id: 1,
                    title: "Machine Learning & AI",
                    description: "I specialize in developing predictive models, natural language processing, and computer vision solutions using Python frameworks like TensorFlow and PyTorch."
                },
                {
                    id: 2,
                    title: "Statistical Analysis",
                    description: "Expert in statistical methods, hypothesis testing, and experimental design using R, SciPy, and StatsModels."
                },
                {
                    id: 3,
                    title: "Data Visualization",
                    description: "Creating insightful visualizations using tools like Matplotlib, Seaborn, ggplot2, Tableau, and D3.js."
                },
                {
                    id: 4,
                    title: "Big Data Technologies",
                    description: "Experience with Hadoop, Spark, and cloud-based data solutions on AWS and Google Cloud Platform."
                }
            ],
            contact: {
                location: "Khilkhet, Dhaka, Bangladesh",
                email: "contact.mdsoliman@gmail.com",
                availableForFreelance: true
            },
            socialLinks: {
                github: "https://github.com/mdsoliman",
                twitter: "https://twitter.com/mdsoliman",
                linkedin: "https://linkedin.com/in/mdsoliman"
            },
            profileImage: "/lovable-uploads/cdd6811a-1348-4f55-8abd-db74cf1f1ad7.png"
        };
    }
};

export const updateAboutData = async (data) => {
    try {
        const response = await api.put('about/update/', data, {
            headers: data instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : undefined,
        });
        console.log('About data updated:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating about data:', error);
        throw error;
    }
};

export default api;
