import { CurrentWeather } from "../types/types";

export const GetCurrentWeather = async (): Promise<
  CurrentWeather | undefined
> => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?id=2667628&units=metric&lang=sv&appid=3e5640df65ee82ae83fa840540c5232e";
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
