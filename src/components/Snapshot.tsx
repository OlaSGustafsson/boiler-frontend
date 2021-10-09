import { CSSProperties, useEffect, useState } from "react";
import { DataSnapshot, SensorData } from "../types/types";
import { GetLatest } from "../services/TemperatureService";
import "../styles/Snapshot.css";

export const Snapshot = () => {
  const [Snapshot, setSnapshot] = useState<DataSnapshot>();
  const [TimeStamp, setTimeStamp] = useState<string>();
  const [Gradient, setGradient] = useState<CSSProperties>({
    border: 0,
    ["--gradientmiddle" as any]: "70%",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  useEffect(() => {
    const fetchData = async () => {
      const latest = (await GetLatest()) as DataSnapshot;
      setTimeStamp(getDateString(latest.timestamp));
      setSnapshot(latest);
    };
    const calcGradients = (): CSSProperties => {
      let newGradient: CSSProperties = { ...Gradient };
      const iterable = Snapshot ? (Snapshot.sensors as SensorData[]) : [];
      for (const sensor of iterable) {
        const idx = Snapshot?.sensors.indexOf(sensor) as number;
        const newColor = {
          [`--temp${idx?.toString()}` as any]: getRgba(sensor.temperature),
        };
        newGradient = Object.assign(newGradient, newColor);
      }
      return newGradient;
    };
    fetchData();
    const calculatedGradient = calcGradients();
    setGradient(calculatedGradient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Snapshot?.timestamp]);

  const getDateString = (epochseconds: number): string => {
    const epochMillis = epochseconds * 1000;
    const snapDate = new Date();
    snapDate.setTime(epochMillis);
    const timeZoneOffsetInMillis =
      snapDate.getTimezoneOffset() * 60 * 1000 * -1 + epochMillis;
    snapDate.setTime(timeZoneOffsetInMillis);
    const snapArray = snapDate.toISOString().split("T");
    return `${snapArray[0]} ${snapArray[1].slice(0, 5)}`;
  };

  const getRgba = (temperature: number): string => {
    const max = 72,
      min = 30;
    const span = max - min;
    const t = temperature;
    const red = Math.round(((span - (max - t)) * 255) / span);
    const validRed = red > 255 ? 255 : red < 0 ? 0 : red;
    const green = Math.abs(Math.round(((span - (t - span / 2)) * 255) / span));
    const validGreen = green > 255 ? 255 : green < 0 ? 0 : green;
    const blue = Math.round(((span - (t - min)) * 255) / span);
    const validBlue = blue > 255 ? 255 : blue < 0 ? 0 : blue;
    return `rgba(${validRed}, ${validGreen}, ${validBlue}, 1)`;
  };
  return (
    <div className="box">
      <div className="content">
        <div className="title">Ackumulatortank</div>
        <div className="subtitle">{TimeStamp}</div>
        <div className="grad" style={Gradient}>
          {Snapshot?.sensors.map((sensor, idx) => (
            <div className="textcontainer" key={idx}>
              <span className="textbox">
                {sensor.name}: {Math.round(sensor.temperature)}&deg;C
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
