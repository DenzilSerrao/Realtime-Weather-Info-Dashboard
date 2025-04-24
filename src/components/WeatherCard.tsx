import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer } from 'lucide-react';
import { WeatherData, Location } from '../types/weatherTypes';

interface WeatherCardProps {
  weather: WeatherData;
  location: Location;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, location }) => {
  const getWeatherIcon = () => {
    const condition = weather.condition.toLowerCase();
    
    if (condition.includes('clear') || condition.includes('sunny')) {
      return <Sun className="h-24 w-24 text-yellow-300 weather-icon float" />;
    } else if (condition.includes('cloud') && !condition.includes('rain')) {
      return <Cloud className="h-24 w-24 text-white weather-icon float" />;
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudRain className="h-24 w-24 text-blue-300 weather-icon float" />;
    } else if (condition.includes('snow')) {
      return <CloudSnow className="h-24 w-24 text-white weather-icon float" />;
    } else if (condition.includes('thunder') || condition.includes('storm')) {
      return <CloudLightning className="h-24 w-24 text-yellow-400 weather-icon float" />;
    }
    
    return <Cloud className="h-24 w-24 text-white weather-icon float" />;
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="backdrop-blur-md bg-white/20 rounded-lg shadow-lg overflow-hidden mb-8 slide-up">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              {location.name}, {location.country}
            </h2>
            <p className="text-white/80">{formatDate()}</p>
          </div>
          {getWeatherIcon()}
        </div>
        
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-end">
              <span className="text-6xl font-bold text-white">
                {Math.round(weather.temperature)}°
              </span>
              <span className="text-2xl text-white/80 mb-2 ml-1">C</span>
            </div>
            <p className="text-xl text-white capitalize">{weather.condition}</p>
            <p className="text-white/80">Feels like {Math.round(weather.feelsLike)}°C</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Thermometer className="h-6 w-6 text-red-300 mr-2" />
              <div>
                <p className="text-white/80 text-sm">High / Low</p>
                <p className="text-white">
                  {Math.round(weather.maxTemp)}° / {Math.round(weather.minTemp)}°
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Wind className="h-6 w-6 text-blue-200 mr-2" />
              <div>
                <p className="text-white/80 text-sm">Wind</p>
                <p className="text-white">{weather.windSpeed} km/h</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Droplets className="h-6 w-6 text-blue-300 mr-2" />
              <div>
                <p className="text-white/80 text-sm">Humidity</p>
                <p className="text-white">{weather.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg className="h-6 w-6 text-yellow-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" 
                />
              </svg>
              <div>
                <p className="text-white/80 text-sm">UV Index</p>
                <p className="text-white">{weather.uvIndex}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;