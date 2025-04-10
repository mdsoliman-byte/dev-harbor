
import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, CloudSun, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { fetchWeatherData, WeatherData } from '@/services/api/weather';

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('London');
  const [inputCity, setInputCity] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherData(city);
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [city]);

  const handleCityChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-4 w-4" />;
    
    const iconCode = weather.icon;
    if (iconCode.includes('01')) return <Sun className="h-4 w-4" />;
    if (iconCode.includes('02') || iconCode.includes('03')) return <CloudSun className="h-4 w-4" />;
    if (iconCode.includes('04')) return <Cloud className="h-4 w-4" />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="h-4 w-4" />;
    if (iconCode.includes('13')) return <CloudSnow className="h-4 w-4" />;
    
    return <Cloud className="h-4 w-4" />;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full glass-morphism relative overflow-hidden mr-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : getWeatherIcon()}
          <span className="sr-only">Check weather</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-medium">Weather Update</h3>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : weather ? (
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="text-2xl font-bold">{weather.temperature}°C</div>
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                    alt={weather.description}
                    className="w-12 h-12"
                  />
                </div>
                <div className="text-sm opacity-90 capitalize">{weather.description}</div>
                <div className="text-sm font-medium">{weather.location}</div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                  <div>Feels like: {weather.feelsLike}°C</div>
                  <div>Humidity: {weather.humidity}%</div>
                  <div>Wind: {weather.windSpeed} m/s</div>
                </div>
              </div>
            ) : (
              <div className="py-2">Unable to fetch weather data</div>
            )}
          </div>
          
          <form onSubmit={handleCityChange} className="flex gap-2">
            <Input
              placeholder="Enter city name"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
            />
            <Button type="submit" size="sm">Update</Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WeatherWidget;
