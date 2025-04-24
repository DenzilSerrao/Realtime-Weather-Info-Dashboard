package com.weatherview.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.weatherview.config.OpenWeatherConfig;
import com.weatherview.dto.CurrentWeatherDTO;
import com.weatherview.dto.DailyForecastDTO;
import com.weatherview.dto.ForecastDTO;
import com.weatherview.exception.WeatherApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;
    private final OpenWeatherConfig openWeatherConfig;
    private final AtomicReference<CurrentWeatherDTO> cachedCurrentWeather = new AtomicReference<>(null);

    @Autowired
    public WeatherService(RestTemplate restTemplate, OpenWeatherConfig openWeatherConfig) {
        this.restTemplate = restTemplate;
        this.openWeatherConfig = openWeatherConfig;
    }

    public CurrentWeatherDTO getCurrentWeather(String city) {
        // Return cached value if available
        if (cachedCurrentWeather.get() != null) {
            return cachedCurrentWeather.get();
        }

        // Use the provided API endpoint (ignores 'city' due to strict rate limits)
        String url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=77f0272a2a80fc0de1868e1f92ef34f1";

        try {
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);
            if (response == null) {
                throw new WeatherApiException("Received null response from OpenWeather API");
            }

            // Parse values using the JSON structure provided
            double temperature = response.path("main").path("temp").asDouble();
            double feelsLike = response.path("main").path("feels_like").asDouble();
            double minTemp = response.path("main").path("temp_min").asDouble();
            double maxTemp = response.path("main").path("temp_max").asDouble();
            int humidity = response.path("main").path("humidity").asInt();
            double windSpeed = response.path("wind").path("speed").asDouble();
            String condition = response.path("weather").get(0).path("description").asText();
            int uvIndex = 0; // API does not provide UV index

            CurrentWeatherDTO currentWeather = CurrentWeatherDTO.builder()
                    .temperature(temperature)
                    .feelsLike(feelsLike)
                    .minTemp(minTemp)
                    .maxTemp(maxTemp)
                    .humidity(humidity)
                    .windSpeed(windSpeed)
                    .condition(condition)
                    .uvIndex(uvIndex)
                    .build();

            cachedCurrentWeather.set(currentWeather);
            return currentWeather;
        } catch (Exception e) {
            throw new WeatherApiException("Error fetching current weather data: " + e.getMessage(), e);
        }
    }

    public ForecastDTO getForecast(String city) {
        String url = UriComponentsBuilder
                .fromHttpUrl(openWeatherConfig.getApiUrl() + "/forecast")
                .queryParam("q", city)
                .queryParam("units", "metric")
                .queryParam("appid", openWeatherConfig.getApiKey())
                .build()
                .toUriString();

        try {
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);

            if (response == null) {
                throw new WeatherApiException("Received null response from OpenWeather API");
            }

            // Process the forecast data to create a 5-day forecast
            JsonNode list = response.path("list");
            List<DailyForecastDTO> dailyForecasts = new ArrayList<>();

            // We need to convert the 3-hour forecasts into daily forecasts
            // This is a simplified implementation
            LocalDate currentDate = null;
            double maxTemp = Double.MIN_VALUE;
            double minTemp = Double.MAX_VALUE;
            String dominantCondition = "";
            int conditionCounts = 0;

            for (JsonNode item : list) {
                // Get date from timestamp
                long timestamp = item.path("dt").asLong();
                LocalDate forecastDate = Instant.ofEpochSecond(timestamp)
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate();

                // If we've moved to a new day
                if (currentDate != null && !forecastDate.equals(currentDate)) {
                    // Add the previous day's forecast
                    dailyForecasts.add(DailyForecastDTO.builder()
                            .date(currentDate.toString())
                            .maxTemp(maxTemp)
                            .minTemp(minTemp)
                            .condition(dominantCondition)
                            .build());

                    // Reset for new day
                    maxTemp = Double.MIN_VALUE;
                    minTemp = Double.MAX_VALUE;
                    dominantCondition = "";
                    conditionCounts = 0;
                }

                // Update current date
                currentDate = forecastDate;

                // Update min/max temp
                double temp = item.path("main").path("temp").asDouble();
                maxTemp = Math.max(maxTemp, temp);
                minTemp = Math.min(minTemp, temp);

                // Update condition (very simplified approach)
                String condition = item.path("weather").path(0).path("main").asText();
                if (conditionCounts == 0 || condition.equals(dominantCondition)) {
                    dominantCondition = condition;
                    conditionCounts++;
                }

                // Stop once we have 5 days
                if (dailyForecasts.size() >= 4 && !forecastDate.equals(currentDate)) {
                    // Add the last day
                    dailyForecasts.add(DailyForecastDTO.builder()
                            .date(currentDate.toString())
                            .maxTemp(maxTemp)
                            .minTemp(minTemp)
                            .condition(dominantCondition)
                            .build());
                    break;
                }
            }

            // In case we haven't added the last day yet
            if (dailyForecasts.size() < 5 && currentDate != null) {
                dailyForecasts.add(DailyForecastDTO.builder()
                        .date(currentDate.toString())
                        .maxTemp(maxTemp)
                        .minTemp(minTemp)
                        .condition(dominantCondition)
                        .build());
            }

            return ForecastDTO.builder()
                    .daily(dailyForecasts)
                    .build();

        } catch (Exception e) {
            throw new WeatherApiException("Error fetching forecast data: " + e.getMessage(), e);
        }
    }
}