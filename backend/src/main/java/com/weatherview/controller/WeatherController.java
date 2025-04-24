package com.weatherview.controller;

import com.weatherview.dto.CurrentWeatherDTO;
import com.weatherview.dto.ForecastDTO;
import com.weatherview.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    @Autowired
    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public ResponseEntity<CurrentWeatherDTO> getCurrentWeather(
            @RequestParam @NotBlank String city) {
        return ResponseEntity.ok(weatherService.getCurrentWeather(city));
    }

    @GetMapping("/forecast")
    public ResponseEntity<ForecastDTO> getForecast(
            @RequestParam @NotBlank String city) {
        return ResponseEntity.ok(weatherService.getForecast(city));
    }
}