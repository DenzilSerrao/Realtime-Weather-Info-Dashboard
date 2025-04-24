export interface Location {
  id: number;
  name: string;
  country: string;
}

export interface WeatherData {
  englishCondition?: string,
  temperature: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  uvIndex: number;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
}

export interface ForecastData {
  daily: DailyForecast[];
}