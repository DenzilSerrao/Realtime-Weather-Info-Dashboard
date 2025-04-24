package com.weatherview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CurrentWeatherDTO {
    private double temperature;
    private double feelsLike;
    private double minTemp;
    private double maxTemp;
    private int humidity;
    private double windSpeed;
    private String condition;
    private int uvIndex;
}