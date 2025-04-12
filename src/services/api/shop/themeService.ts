
import api from '../config';
import { ThemeSettings } from './types';
import { defaultThemeSettings } from './mockData';

export const fetchThemeSettings = async (): Promise<ThemeSettings> => {
  try {
    const response = await api.get('theme/settings/');
    return response.data;
  } catch (error) {
    console.error('Error fetching theme settings:', error);
    return defaultThemeSettings;
  }
};

export const updateThemeSettings = async (settings: Partial<ThemeSettings>): Promise<ThemeSettings> => {
  try {
    const response = await api.put('theme/settings/update/', settings);
    return response.data;
  } catch (error) {
    console.error('Error updating theme settings:', error);
    throw error;
  }
};
