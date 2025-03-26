import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export default api;