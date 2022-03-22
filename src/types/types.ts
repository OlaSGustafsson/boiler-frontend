export interface SensorData {
  id: string;
  name: string;
  temperature?: number;
  description?: string;
}
export interface DataSnapshot {
  timestamp: number;
  sensors: SensorData[];
}
export interface ChartDataValues {
  timestamp: number;
  temperature: number;
}
export interface ChartDataDateValues {
  date: string;
  temperature: number;
}
export interface ChartData {
  sensorId: string;
  values: ChartDataValues[];
}

export interface Coordinate {
  lon: number;
  lat: number;
}
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}
export interface Wind {
  speed: number;
  deg: number;
}
export interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}
export interface CurrentWeather {
  coord: Coordinate;
  weather: Weather[];
  base: string;
  main: Main;
  wind: Wind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Sensor {
  id: string;
  name: string;
  description?: string;
  order?: number;
}
