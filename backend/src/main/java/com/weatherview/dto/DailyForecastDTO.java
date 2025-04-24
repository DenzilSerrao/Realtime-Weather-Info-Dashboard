package com.weatherview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyForecastDTO {
    private String date;
    private double maxTemp;
    private double minTemp;
    private String condition;
}