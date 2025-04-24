import { WeatherData, ForecastData } from '../types/weatherTypes';

const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";
const API_KEY = "ad5a656947414823856142937252404";

export interface CombinedWeatherData {
  current: WeatherData;
  forecast: ForecastData;
}

// Function to fetch both current weather and forecast for a location, modified to accept a language parameter
export const fetchWeatherData = async (
  cityName: string,
  lang: string
): Promise<CombinedWeatherData> => {
  console.log(`Fetching weather data for ${cityName} in language ${lang}`);
  
  const apiURL = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(cityName)}&days=6&aqi=no&alerts=yes&lang=${lang}`;
  
  const response = await fetch(apiURL);
  
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  
  const data = await response.json();
  
  const current: WeatherData = {
    temperature: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    // Use the forecast for today's min/max temps from the first forecast day
    minTemp: data.forecast.forecastday[0].day.mintemp_c,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
    condition: data.current.condition.text,
    uvIndex: data.current.uv
  };

  // Use the remaining days of forecast (excluding the first day)
  const forecastDays = data.forecast.forecastday.slice(1);
  const dailyForecasts = forecastDays.map((day: any) => ({
    date: day.date,
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
    condition: day.day.condition.text
  }));

  const forecast: ForecastData = {
    daily: dailyForecasts
  };

  return { current, forecast };
};