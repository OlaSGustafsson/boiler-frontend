import { DataSnapshot, ChartData, Sensor } from "../types/types";

export const GetSensors = async (): Promise<Sensor[]> => {
  const url = `/api/GetLogSensors`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const GetLatest = async (): Promise<DataSnapshot> => {
  const url = `/api/GetLatestLog`;
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    return await response.json();
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
  const url = `/api/GetLogData`;
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
    return await response.json();
  } catch (error) {
    console.error(error);
    return {
      sensorId: sensorId,
      values: [],
    };
  }
};
