import { useState, useEffect } from "react";
import { Sensor } from "../types/types";
import { ChartHours } from "../constants/constants";

export const ChartFilter = (props: {
  sensors: Sensor[];
  selectSensor: Function;
  selectedSensor: Sensor;
  hours: number;
  selectHours: Function;
}) => {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | undefined>(
    props.selectedSensor
  );
  const [selectedHours, setSelectedHours] = useState<number>(props.hours);

  const selectSensor = (sensor: Sensor) => {
    setSelectedSensor(sensor);
    props.selectSensor(sensor);
  };

  const selectHours = (hours: number) => {
    setSelectedHours(hours);
    props.selectHours(hours);
  };

  useEffect(() => {
    setSelectedSensor(props.selectedSensor);
    setSelectedHours(props.hours);
  }, [props]);

  return (
    <div className="box" style={{ flexDirection: "row", margin: 0 }}>
      <div className="columns is-mobile">
        <div className="column">
          <div className="buttons are-small">
            {props.sensors.map((sensor, idx) => {
              return (
                <button
                  key={idx}
                  className={
                    "button is-rounded" +
                    (selectedSensor?.id === sensor.id ? " is-info" : "")
                  }
                  onClick={() => selectSensor(sensor)}
                >
                  {sensor.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="columns is-mobile">
        <div className="column">
          <div className="buttons are-small">
            {ChartHours.map((hours, idx) => {
              return (
                <button
                  key={idx}
                  className={
                    "button is-rounded" +
                    (selectedHours === hours ? " is-info" : "")
                  }
                  onClick={() => selectHours(hours)}
                >
                  {hours} h
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
