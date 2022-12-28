import { DataSnapshot, ChartData, Sensor } from "../types/types";
import { apiKeyGetSensors, apiKeyGetLatest, apiKeyGetData } from "../secrets";

export const GetSensors = async (): Promise<Sensor[]> => {
  const url = `https://func-boiler.azurewebsites.net/api/GetSensors?code=${apiKeyGetSensors}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const GetLatest = async (): Promise<DataSnapshot> => {
  const url = `https://func-boiler.azurewebsites.net/api/GetLatest?code=${apiKeyGetLatest}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return { timestamp: new Date().getTime() / 1000, sensors: [] };
  }
};

export const GetData = async (
  sensorId: string,
  startTimeStamp: number,
  endTimeStamp: number
): Promise<ChartData> => {
  const url = `https://func-boiler.azurewebsites.net/api/GetData?code=${apiKeyGetData}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify({
        SensorId: sensorId,
        StartTimeStamp: startTimeStamp,
        EndTimeStamp: endTimeStamp,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return {
      sensorId: sensorId,
      values: [],
    };
  }
};
