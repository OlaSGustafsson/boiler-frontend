import React, { useState, useEffect } from "react";
import { Chart } from "../components/Chart";
import { Sensor } from "../types/types";
import { GetSensors } from "../services/TemperatureService";
// import "../styles/Page.css";
import { ChartFilter } from "../components/ChartFilter";

export const ChartPage = (props: { sensors: Sensor[] }) => {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | undefined>();
  const [allSensors, setAllSensors] = useState<Sensor[] | []>([]);
  const [selectedHours, setSelectedHours] = useState<number>(48);

  useEffect(() => {
    const fetchSensors = async () => {
      const result = (await GetSensors()) as Sensor[];
      setAllSensors(result);
      setSelectedSensor(result[0]);
    };
    if (props.sensors) {
      setAllSensors(props.sensors);
      if (!selectedSensor) {
        setSelectedSensor(props.sensors[0]);
      }
    } else {
      fetchSensors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sensors]);

  const handleSelectSensor = (sensor: Sensor) => {
    setSelectedSensor(sensor);
  };

  const handleSelectHours = (hours: number) => {
    setSelectedHours(hours);
  };

  return (
    <div className="card">
      <ChartFilter
        sensors={allSensors}
        selectSensor={handleSelectSensor}
        selectedSensor={selectedSensor as Sensor}
        hours={selectedHours}
        selectHours={handleSelectHours}
      ></ChartFilter>
      <Chart sensor={selectedSensor as Sensor} hours={selectedHours}></Chart>
    </div>
  );
};
