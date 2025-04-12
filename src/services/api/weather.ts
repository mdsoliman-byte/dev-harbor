import axios from 'axios';

// Weather API types
export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

export const fetchWeatherData = async (city: string = 'London'): Promise<WeatherData> => {
  try {
    // Using OpenWeatherMap API
    const API_KEY = '7d2e24648dbe3146e82294896818496d'; // Ensure this key is valid
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    const response = await axios.get(url);
    const data = response.data;
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      feelsLike: Math.round(data.main.feels_like)
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error('Unauthorized: Invalid API key or insufficient permissions.');
    } else {
      console.error('Error fetching weather data:', error);
    }
    return {
      location: 'Unknown',
      temperature: 0,
      description: 'Failed to fetch weather data',
      icon: '01d',
      humidity: 0,
      windSpeed: 0,
      feelsLike: 0
    };
  }
};
