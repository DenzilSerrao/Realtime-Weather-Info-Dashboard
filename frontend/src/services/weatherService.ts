import { WeatherData, ForecastData } from '../types/weatherTypes';

// This service makes calls to our Java backend API
// which then securely forwards requests to the OpenWeatherMap API

const API_BASE_URL = 'http://localhost:8080/api';

// Function to fetch current weather for a location
export const fetchCurrentWeather = async (cityName: string): Promise<WeatherData> => {
  // In production, this would call the backend API
  // For development purposes, we're returning mock data until the backend is complete
  
  console.log(`Fetching current weather for ${cityName}`);
  
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response with slightly randomized data based on city
  const mockWeatherData: WeatherData = {
    temperature: 20 + Math.random() * 15,
    feelsLike: 19 + Math.random() * 15,
    minTemp: 16 + Math.random() * 10,
    maxTemp: 25 + Math.random() * 10,
    humidity: 50 + Math.floor(Math.random() * 40),
    windSpeed: 5 + Math.random() * 20,
    condition: getRandomCondition(cityName),
    uvIndex: Math.floor(1 + Math.random() * 10)
  };
  
  return mockWeatherData;
};

// Function to fetch forecast data for a location
export const fetchForecast = async (cityName: string): Promise<ForecastData> => {
  // In production, this would call the backend API
  // For development purposes, we're returning mock data until the backend is complete
  
  console.log(`Fetching forecast for ${cityName}`);
  
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate forecast for next 5 days
  const dailyForecasts = Array.from({ length: 5 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    
    return {
      date: date.toISOString().split('T')[0],
      maxTemp: 20 + Math.random() * 15,
      minTemp: 10 + Math.random() * 15,
      condition: getRandomCondition(cityName)
    };
  });
  
  return { daily: dailyForecasts };
};

// Helper function to generate random but somewhat realistic weather conditions
function getRandomCondition(cityName: string): string {
  const conditions = [
    "Clear sky", 
    "Few clouds", 
    "Scattered clouds", 
    "Broken clouds", 
    "Shower rain", 
    "Rain", 
    "Thunderstorm", 
    "Snow", 
    "Mist"
  ];
  
  // Some cities are more likely to have certain weather patterns
  // This is just for demo purposes
  const cityLower = cityName.toLowerCase();
  
  if (cityLower.includes('london')) {
    return conditions[Math.floor(Math.random() * 4) + 3]; // More likely rainy
  } else if (cityLower.includes('tokyo') || cityLower.includes('new york')) {
    return conditions[Math.floor(Math.random() * 6)]; // Variable
  } else if (cityLower.includes('sydney') || cityLower.includes('rio')) {
    return conditions[Math.floor(Math.random() * 3)]; // More likely sunny
  }
  
  // Random for other cities
  return conditions[Math.floor(Math.random() * conditions.length)];
}