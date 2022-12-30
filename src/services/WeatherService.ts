import { CurrentWeather } from "../types/types";

const openWeatherMapAppId = process.env.REACT_APP_OPENWEATHERMAPAPPID;

export const GetCurrentWeather = async (): Promise<
  CurrentWeather | undefined
> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?id=2667628&units=metric&lang=sv&appid=${openWeatherMapAppId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
