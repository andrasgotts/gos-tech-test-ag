
export type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly: {
    time: string[]; // ISO8601 local time strings, starts at 00:00 local time
    temperature_2m: number[]; // °C
    apparent_temperature: number[]; // °C
    relative_humidity_2m: number[]; // %
    weather_code: number[]; // WMO code
    wind_speed_10m: number[]; // km/h (default)
    wind_gusts_10m: number[]; // km/h
    wind_direction_10m: number[]; // °
    precipitation: number[]; // mm
    cloud_cover: number[]; // %
    surface_pressure: number[]; // hPa
  };
  hourly_units: {
    time?: string; // usually not present in units, included for completeness
    temperature_2m: string;
    apparent_temperature: string;
    relative_humidity_2m: string;
    weather_code: string;
    wind_speed_10m: string;
    wind_gusts_10m: string;
    wind_direction_10m: string;
    precipitation: string;
    cloud_cover: string;
    surface_pressure: string;
  };
  daily: {
    time: string[]; // ISO8601 local date strings
    sunrise: string[]; // ISO8601 local
    sunset: string[]; // ISO8601 local
    temperature_2m_max: number[]; // °C
    temperature_2m_min: number[]; // °C
    uv_index_max: number[]; // index
    precipitation_sum: number[]; // mm
    wind_speed_10m_max: number[]; // km/h
    wind_gusts_10m_max: number[]; // km/h
    wind_direction_10m_dominant: number[]; // °
  };
  daily_units: {
    time?: string;
    sunrise: string;
    sunset: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    uv_index_max: string;
    precipitation_sum: string;
    wind_speed_10m_max: string;
    wind_gusts_10m_max: string;
    wind_direction_10m_dominant: string;
  };
};

export type WeatherViewModel = {
  time: string; // ISO8601 local date strings
  temperature_2m_max: number; // °C
  temperature_2m_min: number; // °C
  precipitation_sum: number; // mm
  wind_speed_10m_max: number; // km/h
  wind_gusts_10m_max: number; // km/h
  wind_direction_10m_dominant: number; // °
  //
  summaryimg: string; // °
  //
  location: string;
  observedAt: string; // ISO8601 local time string (selected hour)
  summary: string; // mapped from weather code
  temperatureF: number; // Fahrenheit
  windSpeedMph: number; // mph
  windDirection: number; // °
  temperature_2m: number; // °C
  apparentC: number;
  humidity: number;
  gustMph: number;
  precipitationMm: number;
  cloudCoverPct: number;
  surfacePressureHpa: number;
  sunrise?: string;
  sunset?: string;
  uvIndexMax?: number;
};
//https://app.quicktype.io/#l=ts
export type DayOrNight = {
    day:   Day;
    night: Day;
}

export type Day = {
    description: string;
    image:       string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDayOrNight(json: string): { [key: string]: DayOrNight } {
        return JSON.parse(json);
    }

    public static DayOrNightToJson(value: { [key: string]: DayOrNight }): string {
        return JSON.stringify(value);
    }
}

