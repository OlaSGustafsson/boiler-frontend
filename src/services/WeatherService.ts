import { CurrentWeather } from "../types/types";

export const GetCurrentWeather = async (): Promise<
  CurrentWeather | undefined
> => {
  const url = `/api/GetWeather`;
  try {
    const response = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: "2667628",
        units: "metric",
        lang: "sv",
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
