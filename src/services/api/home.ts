
import api from './config';

export interface HeroData {
    id: number;
    title: string;
    heading: string;
    shortbio: string;
    skills: string[];
    available_for_freelance: boolean;
    profile_image: string;
}

export const fetchHeroData = async (): Promise<HeroData> => {
    try {
        const response = await api.get('home/data/');
        console.log('Hero data:', response.data);
        if (!response.data) {
            console.error('Invalid hero data:', response.data);
            throw new Error('Invalid hero data');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching hero data:', error);
        throw error;
    }
};

export const updateHeroData = async (data: any) => {
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
        console.error('Error updating hero data:', error.response ? error.response.data : error.message);
        throw error;
    }
};
