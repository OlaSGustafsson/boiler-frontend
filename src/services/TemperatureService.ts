import { DataSnapshot, ChartData, Sensor } from "../types/types";

export const GetSensors = async (): Promise<Sensor[]> => {
  const url =
    "https://func-boiler.azurewebsites.net/api/GetSensors?code=YUU3XXmyvIxg3kTmjfhUGV7HiRNY6MtTTFvo0kD3D10vAN6ZXvmMGw==";
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
  const url =
    "https://func-boiler.azurewebsites.net/api/GetLatest?code=O2VK4lAxxt6iaDqbv5eRIAJGN4FR/CeT2WS8VjHu2192Oc4R8s63Cg==";
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
  const url =
    "https://func-boiler.azurewebsites.net/api/GetData?code=X64FXJxbqOchQ/UAg5iBDDnF4QF14XGaIOWJnuJ0MHmMKnsTHy64ZA==";
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
