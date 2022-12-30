import { SensorData } from "../types/types";

export const GetDateString = (epochseconds: number): string => {
  if (!epochseconds) {
    return "Ogiltigt datum";
  }
  const epochMillis = epochseconds * 1000;
  const snapDate = new Date();
  snapDate.setTime(epochMillis);
  const timeZoneOffsetInMillis =
    snapDate.getTimezoneOffset() * 60 * 1000 * -1 + epochMillis;
  snapDate.setTime(timeZoneOffsetInMillis);
  const snapArray = snapDate.toISOString().split("T");
  return `${snapArray[0]} ${snapArray[1].slice(0, 5)}`;
};

export const GetShortDateString = (epochseconds: number): string => {
  if (!epochseconds) {
    return "Ogiltigt datum";
  }
  const epochMillis = epochseconds * 1000;
  const snapDate = new Date();
  snapDate.setTime(epochMillis);
  const weekDay = snapDate
    .toLocaleTimeString("sv-se", { weekday: "short" })
    .split(" ")[0];
  return `${weekDay} ${snapDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export const GetTimeStamp = (theDate?: Date) => {
  if (!theDate) {
    return Math.floor(Date.now() / 1000);
  }
  return Math.floor(theDate.getTime() / 1000);
};

export const GetTimeStampSubHours = (hours: number, theDate?: Date) => {
  const fromDate: Date = theDate ? theDate : new Date();
  return Math.floor(
    fromDate.setTime(fromDate.getTime() - hours * 60 * 60 * 1000) / 1000
  );
};

export const CalcEnergy = (T: number, Tref = 20, V = 833): number => {
  return 0.00116 * V * (T - Tref);
};

export const CalcTotalEnergy = (sensors: SensorData[]): number => {
  const sum = sensors.reduce((accumulator, curSensor) => {
    const energy = CalcEnergy(curSensor.temperature as number);
    return accumulator + energy;
  }, 0);
  return Math.round(sum);
};
