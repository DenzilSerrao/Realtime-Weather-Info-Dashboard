import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';
import { ForecastData, DailyForecast } from '../types/weatherTypes';

interface ForecastSectionProps {
  forecast: ForecastData;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ forecast }) => {
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return <Sun className="h-10 w-10 text-yellow-300" />;
    } else if (conditionLower.includes('cloud') && !conditionLower.includes('rain')) {
      return <Cloud className="h-10 w-10 text-white" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="h-10 w-10 text-blue-300" />;
    } else if (conditionLower.includes('snow')) {
      return <CloudSnow className="h-10 w-10 text-white" />;
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return <CloudLightning className="h-10 w-10 text-yellow-400" />;
    }
    
    return <Cloud className="h-10 w-10 text-white" />;
  };

  const formatDay = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="backdrop-blur-md bg-white/20 rounded-lg shadow-lg p-6 slide-up">
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.daily.map((day, index) => (
          <div 
            key={index} 
            className="backdrop-blur-sm bg-white/10 rounded-lg p-4 flex flex-col items-center"
          >
            <p className="text-white font-medium mb-2">{formatDay(day.date)}</p>
            <div className="my-2">{getWeatherIcon(day.condition)}</div>
            <p className="text-white text-center capitalize text-sm mb-2">{day.condition}</p>
            <div className="flex justify-between w-full text-sm">
              <span className="text-white font-medium">{Math.round(day.maxTemp)}°</span>
              <span className="text-white/70">{Math.round(day.minTemp)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;