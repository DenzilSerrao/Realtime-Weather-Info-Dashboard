import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import WeatherCard from './components/WeatherCard';
import LocationSelector from './components/LocationSelector';
import ForecastSection from './components/ForecastSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import LanguageSelector from './components/LanguageSelector';
import { fetchWeatherData } from './services/weatherService';
import { Location, WeatherData, ForecastData } from './types/weatherTypes';
import './App.css';

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<string>('en'); // Default language set to 'en'
  
  // Predefined locations
  const locations: Location[] = [
    { id: 1, name: 'New York', country: 'US' },
    { id: 2, name: 'London', country: 'UK' },
    { id: 3, name: 'Tokyo', country: 'JP' },
    { id: 4, name: 'Sydney', country: 'AU' },
    { id: 5, name: 'Paris', country: 'FR' },
    { id: 6, name: 'Berlin', country: 'DE' },
    { id: 7, name: 'Moscow', country: 'RU' },
    { id: 8, name: 'Rio de Janeiro', country: 'BR' },
    { id: 9, name: 'Mumbai', country: 'MU' },
    { id: 10, name: 'Puttur', country: 'PU' }
  ];

  useEffect(() => {
    if (selectedLocation) {
      loadWeatherData(selectedLocation);
    }
  }, [selectedLocation, lang]);

  const handleLocationChange = (location: Location | null) => {
    setSelectedLocation(location);
  };

  const loadWeatherData = async (location: Location) => {
    setLoading(true);
    setError(null);
    
    try {
      // First fetch data in English to get a language-independent condition text for background mapping
      const englishData = await fetchWeatherData(location.name, 'en');
      
      // Then fetch data in the selected language (if different) for display
      const translatedData = lang === 'en' 
        ? englishData 
        : await fetchWeatherData(location.name, lang);
      
      // Merge the data: use the translated condition for display and store the English condition separately
      const combinedCurrent = {
        ...translatedData.current,
        englishCondition: englishData.current.condition // new property for background mapping
      };
      
      setWeather(combinedCurrent);
      setForecast(translatedData.forecast);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Modify getBackgroundClass to use the englishCondition (if available) for background mapping
  const getBackgroundClass = () => {
    if (!weather) return 'bg-gradient-to-br from-blue-400 to-blue-600';
    
    // Use englishCondition if available for background mapping
    const condition = (weather.englishCondition || weather.condition).toLowerCase();
    console.log('Background mapping condition:', condition);
    
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <LocationSelector 
                locations={locations}
                selectedLocation={selectedLocation}
                onLocationChange={handleLocationChange}
              />
              <LanguageSelector 
                selectedLang={lang} 
                onLanguageChange={(newLang) => setLang(newLang)} 
              />
            </div>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplay message={error} />
          ) : weather && selectedLocation ? (
            <>
              <WeatherCard weather={weather} location={selectedLocation} />
              {forecast && <ForecastSection forecast={forecast} />}
            </>
          ) : (
            <div className="backdrop-blur-sm bg-white/20 rounded-lg shadow-lg p-8 text-center">
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