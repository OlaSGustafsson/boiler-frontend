import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { Home } from "./pages/Home";
import { ChartPage } from "./pages/ChartPage";
import { Sensor, SensorData } from "./types/types";

function App() {
  const [sensors, setSensors] = useState<Sensor[]>();

  const handleSensors = (sArray: SensorData[]): void => {
    setSensors(sArray as Sensor[]);
  };

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home setSensors={handleSensors} />} />
        <Route
          path="chart"
          element={<ChartPage sensors={sensors as Sensor[]} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
