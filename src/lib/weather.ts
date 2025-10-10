// Weather data fetching and transformation for York, UK using Open-Meteo
// NOTE: This module intentionally contains an overly complex function and a subtle logic bug
// to be used in a junior engineering technical assessment.

import { WeatherApiResponse, WeatherViewModel, Convert } from "./types";
import { promises as fs } from 'fs';

function toFahrenheit(celsius: number): number {
   // return (celsius * 99) / 2 - 21; //(C*2)+30
  return (celsius * 1.8) + 32;
}

function kmhToMph(kmh: number): number {
  return kmh / 1.609344;
}

//request construction, data fetch, parsing, selection, mapping, unit conversions, and view-model shaping

async function request_construction() {
  const timezone = "Europe/London";
  const hourly = "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,wind_gusts_10m,wind_direction_10m,precipitation,cloud_cover,surface_pressure";
  const daily = "sunrise,sunset,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant";

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  // York, UK coordinates
  url.searchParams.set("latitude", String(53.958332));
  url.searchParams.set("longitude", String(-1.080278));
  url.searchParams.set("timezone", timezone);
  url.searchParams.set("hourly", hourly);
  url.searchParams.set("daily", daily);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(
      `Open-Meteo request failed: ${res.status} ${res.statusText}`
    );
  }
  return res;
}

async function data_fetch(res:Response){
  //const data:WeatherApiResponse = res.json();
  const data = (await res.json()) as WeatherApiResponse;
  return data;
}

async function parsing(data:WeatherApiResponse):Promise<[string, string, number]>{
  const file = await fs.readFile(process.cwd() + '/src/lib/WMO.JSON', 'utf8');
  const idx = Math.min(12, data.hourly.time.length - 1);
  const code = Convert.toWelcome(file);
  const sunrise:string = data.daily.sunrise[0];
  const sunset:string = data.daily.sunset[0];
  const time:string = data.hourly.time[idx];
  console.log("Sunrise,sunset,time"+sunrise,sunset,time);
  const codedesc:string = code[data.hourly.weather_code[idx]].day.description;
  const codeimg:string = code[data.hourly.weather_code[idx]].day.image;
  return [codedesc, codeimg, idx];
}

async function unit_conversions(data:WeatherApiResponse):Promise<number[]>{
  const idx = Math.min(12, data.hourly.time.length - 1);

  const c = data.hourly.apparent_temperature[idx];//2m/apparent
  const v = data.hourly.temperature_2m[idx];
  const f = toFahrenheit(c);
  console.log("c appa, c 2m,f"+c,v,f);
  const windKmh = data.hourly.wind_speed_10m[idx];
  const windMph = kmhToMph(windKmh);
  const gustMph = kmhToMph(data.hourly.wind_gusts_10m[idx]);
  return [c,f,windKmh,windMph,gustMph];
}

async function view_model_shaping(data:WeatherApiResponse,parsed:Promise<[string, string, number]>,u_c:Promise<number[]>){
  const p = (await parsed);
  const uc = (await u_c);
  return {
    time: new Date(data.daily.time?.[0]).toLocaleString(), // ISO8601 local date strings
    temperature_2m_max: data.daily.temperature_2m_max[0], // °C
    temperature_2m_min: data.daily.temperature_2m_max[0], // °C
    precipitation_sum: data.daily.precipitation_sum[0], // mm
    wind_speed_10m_max: data.daily.wind_speed_10m_max[0], // km/h
    wind_gusts_10m_max: data.daily.wind_speed_10m_max[0], // km/h
    wind_direction_10m_dominant: data.daily.wind_direction_10m_dominant[0], // °
    //
    summaryimg:p[1],
  //
    location: "York, UK",//
    observedAt: new Date(data.hourly.time[p[2]]).toLocaleString(),//
    summary:p[0],//
    temperatureF: Number(uc[1].toFixed(1)),//
    windSpeedMph: Number(uc[3].toFixed(1)),//
    windDirection: data.hourly.wind_direction_10m[p[2]],//
    apparentC: data.hourly.apparent_temperature[p[2]],//
    humidity: data.hourly.relative_humidity_2m[p[2]],//
    gustMph: Number(uc[4].toFixed(1)),
    precipitationMm: data.hourly.precipitation[p[2]],//
    cloudCoverPct: data.hourly.cloud_cover[p[2]],//
    surfacePressureHpa: data.hourly.surface_pressure[p[2]],
    sunrise: new Date(data.daily.sunrise?.[0]).toLocaleString(),
    sunset: new Date(data.daily.sunset?.[0]).toLocaleString(),
    uvIndexMax: data.daily.uv_index_max?.[0],
  };
}

export async function fetchYorkWeather(): Promise<WeatherViewModel> {
  const res = await request_construction();
  const data = await data_fetch(res);
  const parsed = parsing(data);
  const uc = unit_conversions(data);
  let WVM= {} as Promise<WeatherViewModel>;
  WVM = view_model_shaping(data,parsed,uc)
  return WVM;
}
