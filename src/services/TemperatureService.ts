import { DataSnapshot } from "../types/types";

export const GetLatest = async (): Promise<DataSnapshot> => {
  const url = `https://func-ola-boiler.azurewebsites.net/api/GetLatest?code=gCpaxkM8drViKxqkvc6qI3EdzBiFKNoXqXTGL3Ciywd943XauDVYvA==`;
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return { timestamp: new Date().getTime(), sensors: [] };
  }
};
