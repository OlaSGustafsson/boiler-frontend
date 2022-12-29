import { CSSProperties, useEffect, useState } from "react";
import { DataSnapshot, SensorData } from "../types/types";
import { GetLatest } from "../services/TemperatureService";
import "../styles/Snapshot.css";
import "../styles/Page.css";
import { GetDateString } from "../logic/logic";
import { SpinnerDotted } from "spinners-react";

export const Snapshot = (props: { setSensors: Function }) => {
  const [Snapshot, setSnapshot] = useState<DataSnapshot>();
  const [Gradient, setGradient] = useState<CSSProperties>({
    border: 0,
    ["--gradientmiddle" as any]: "70%",
  });

  useEffect(() => {
    const fetchData = async () => {
      const latest = (await GetLatest()) as DataSnapshot;
      setSnapshot(latest);
      const sensors = latest.sensors.map((s) => ({
        id: s.id,
        name: s.name,
      }));
      props.setSensors(sensors);
    };
    const calcGradients = (): CSSProperties => {
      let newGradient: CSSProperties = { ...Gradient };
      const iterable = Snapshot ? (Snapshot.sensors as SensorData[]) : [];
      for (const sensor of iterable) {
        const idx = Snapshot?.sensors.indexOf(sensor) as number;
        const newColor = {
          [`--temp${idx?.toString()}` as any]: getRgba(
            sensor.temperature as number
          ),
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
      {!Snapshot && (
        <div className="content">
          <SpinnerDotted /> Loading...
        </div>
      )}
      {Snapshot && (
        <div className="content">
          <div className="level mb-0 is-mobile">
            <div className="level-left">
              <div className="level-item">
                <div className="is-size-4-mobile has-text-weight-medium">
                  Ackumulatortank
                </div>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <button
                  className="button"
                  onClick={() => setSnapshot(undefined)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-sync-alt"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="is-size-6">
            {GetDateString(Snapshot?.timestamp as number)}
          </div>
          <div className="grad" style={Gradient}>
            {Snapshot?.sensors.map((sensor, idx) => (
              <div className="textcontainer" key={idx}>
                <span className="textbox">
                  {sensor.name}: {Math.round(sensor.temperature as number)}
                  &deg;C
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
