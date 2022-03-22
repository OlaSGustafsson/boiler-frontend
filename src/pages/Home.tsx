import React from "react";
import { Snapshot } from "../components/Snapshot";
import { Weather } from "../components/Weather";
import "../styles/Page.css";

export const Home = (props: { setSensors: Function }) => {
  return (
    <div className="page">
      <Weather></Weather>
      <Snapshot setSensors={props.setSensors}></Snapshot>
    </div>
  );
};
