import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Droplets, Wind, Thermometer } from 'lucide-react';
import Navbar from './components/Navbar';
import WeatherCard from './components/WeatherCard';
import LocationSelector from './components/LocationSelector';
import ForecastSection from './components/ForecastSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import { fetchCurrentWeather, fetchForecast } from './services/weatherService';
import { Location, WeatherData, ForecastData } from './types/weatherTypes';
import './App.css';

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Predefined locations
  const locations: Location[] = [
    { id: 1, name: 'New York', country: 'US' },
    { id: 2, name: 'London', country: 'UK' },
    { id: 3, name: 'Tokyo', country: 'JP' },
    { id: 4, name: 'Sydney', country: 'AU' },
    { id: 5, name: 'Paris', country: 'FR' },
    { id: 6, name: 'Berlin', country: 'DE' },
    { id: 7, name: 'Moscow', country: 'RU' },
    { id: 8, name: 'Rio de Janeiro', country: 'BR' }
  ];

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation);
    }
  }, [selectedLocation]);

  const fetchWeatherData = async (location: Location) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await fetchCurrentWeather(location.name);
      const forecastData = await fetchForecast(location.name);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (location: Location) => {
    setSelectedLocation(location);
  };

  // Determine background class based on weather
  const getBackgroundClass = () => {
    if (!weather) return 'bg-gradient-to-br from-blue-400 to-blue-600';
    
    const condition = weather.condition.toLowerCase();
    if (condition.includes('clear') || condition.includes('sunny')) {
      return 'bg-gradient-to-br from-yellow-300 to-blue-500';
    } else if (condition.includes('cloud')) {
      return 'bg-gradient-to-br from-gray-300 to-blue-400';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'bg-gradient-to-br from-gray-500 to-gray-700';
    } else if (condition.includes('snow')) {
      return 'bg-gradient-to-br from-blue-100 to-gray-300';
    } else if (condition.includes('thunder') || condition.includes('storm')) {
      return 'bg-gradient-to-br from-gray-700 to-gray-900';
    }
    
    return 'bg-gradient-to-br from-blue-400 to-blue-600';
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${getBackgroundClass()}`}>
      <div className="container mx-auto px-4 py-8">
        <Navbar />
        
        <div className="max-w-4xl mx-auto mt-8">
          <div className="backdrop-blur-sm bg-white/20 rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              Weather Forecast
            </h1>
            
            <LocationSelector 
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange}
            />
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplay message={error} />
          ) : weather && selectedLocation ? (
            <>
              <WeatherCard weather={weather} location={selectedLocation} />
              
              {forecast && (
                <ForecastSection forecast={forecast} />
              )}
            </>
          ) : (
            <div className="backdrop-blur-sm bg-white/20 rounded-lg shadow-lg p-8 text-center">
              <div className="flex justify-center mb-6">
                <Sun className="h-16 w-16 text-yellow-300" />
                <Cloud className="h-16 w-16 text-white -ml-6" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Select a Location to View Weather
              </h2>
              <p className="text-white/90">
                Choose a city from the dropdown menu above to see the current weather and forecast.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;