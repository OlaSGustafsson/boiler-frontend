import { useState, useEffect } from "react";
import { CurrentWeather } from "../types/types";
import { GetCurrentWeather } from "../services/WeatherService";
import "../styles/Weather.css";
import { GetDateString } from "../logic/logic";
import { WindDirection } from "../constants/constants";

export const Weather = () => {
  const [weather, setWeather] = useState<CurrentWeather>();
  const [icon, setIcon] = useState<string>();
  const [moreHidden, setMoreHidden] = useState<boolean>(true);
  const [windDirection, setWindDirection] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const weath = (await GetCurrentWeather()) as CurrentWeather;
      setWeather(weath);
      setIcon(`http://openweathermap.org/img/w/${weath.weather[0].icon}.png`);
      setWindDirection(
        weath.wind.deg
          ? `${WindDirection[Math.round((weath.wind.deg * 16) / 360)]}`
          : "undefined"
      );
    };
    fetchData();
  }, []);

  return (
    <div className="card extra">
      <header className="card-header">
        <div className="card-header-title weather">
          <div>{weather?.name}</div>
          <div>
            <img src={icon} alt="" />
          </div>
          <div>
            {Math.round(weather?.main.temp as number)}&deg;C (
            <i className="fas fa-allergies"></i>
            {" " + Math.round(weather?.main.feels_like as number)}&deg;C)
          </div>
        </div>
        <button
          className="card-header-icon"
          aria-label="more options"
          onClick={() => {
            setMoreHidden(!moreHidden);
          }}
        >
          <span className="icon">
            <i
              className={
                "fas " + (moreHidden ? "fa-angle-down" : "fa-angle-up")
              }
              aria-hidden="true"
            ></i>
          </span>
        </button>
      </header>
      <div className={"card-content" + (moreHidden ? " is-hidden" : "")}>
        <div className="content weather">
          <div>{GetDateString(weather?.dt as number)}</div>
          <div>
            <i className="fa fa-sun"></i>
            <i className="fas fa-long-arrow-alt-up"></i>
            {" " + GetDateString(weather?.sys.sunrise as number).split(" ")[1]}
          </div>
          <div>
            <i className="fa fa-sun"></i>
            <i className="fas fa-long-arrow-alt-down"></i>
            {" " + GetDateString(weather?.sys.sunset as number).split(" ")[1]}
          </div>
        </div>
        <div className="content weather">
          <div>
            {Math.round(weather?.wind.speed as number)} m/s {windDirection} (
            {weather?.wind.deg}&deg;)
          </div>
          <div>{weather?.weather[0].description}</div>
        </div>
      </div>
    </div>
  );
};
