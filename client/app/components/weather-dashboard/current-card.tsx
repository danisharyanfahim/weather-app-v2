"use client";
import {
  formatCamelCase,
  formatDate,
  formatTime,
  formatTimeDuration,
  getCurrentTime,
  removeAfterHyphen,
} from "@/app/utils/utility-functions";
import React, { useContext, useEffect, useRef } from "react";
import { ImLocation } from "react-icons/im";
import { PiSunglassesFill } from "react-icons/pi";
import { TbBinocularsFilled, TbSunMoon } from "react-icons/tb";
import { checkIfDay, selectWeatherIcon } from "./weather-dashboard";
import { GiSunrise, GiSunset, GiWaterDrop } from "react-icons/gi";
import { LuWind } from "react-icons/lu";
import { MdAir } from "react-icons/md";
import { IoTriangleSharp } from "react-icons/io5";
import { WeatherContext } from "@/app/context/weather-provider";
import { PeriodContext } from "@/app/context/period-provider";
import { PeriodType } from "@/app/types/types";

const CurrentCard = ({
  weatherData,
  units,
}: {
  weatherData: any;
  units: {
    speedUnit: string;
    distanceUnit: string;
    tempUnit: string;
    distanceMultiplier: number;
    speedMultiplier: number;
  };
}) => {
  const {
    speedUnit,
    tempUnit,
    distanceMultiplier,
    speedMultiplier,
    distanceUnit,
  } = units;
  const { setWeather } = useContext(WeatherContext);
  const { period, setPeriod } = useContext(PeriodContext);
  const dayRef = useRef<PeriodType>(period);

  // const convertUVI = (uvi: number): string => {
  //   if (uvi <= 2) {
  //     return "Low";
  //   } else if (uvi <= 5) {
  //     return "Moderate";
  //   } else if (uvi <= 7) {
  //     return "High";
  //   } else if (uvi <= 10) {
  //     return "Very High";
  //   } else {
  //     return "Extreme";
  //   }
  // };

  // const setAngle = (value: number, numberOfIntervals: number) => {
  //   const interval = 180 / numberOfIntervals;
  //   value = value * interval;
  //   if (value >= 180) value = 180;
  //   return value * interval;
  // };

  useEffect(() => {
    const newPeriod = checkIfDay(
      weatherData?.current.dt,
      weatherData?.current.sunset,
      weatherData?.current.sunrise
    )
      ? "day"
      : "night";

    if (dayRef.current !== newPeriod) {
      setPeriod(newPeriod);
      dayRef.current = newPeriod;
    }
  }, [weatherData]);

  useEffect(() => {
    setWeather(weatherData?.current.weather[0].main.toLowerCase());
  }, [weatherData?.current.weather[0].main]);

  //Formats chemical formula into HTML subscript format using regex
  const formatChemicalFormula = (formula: string) => {
    const formatted = formula.replace(/([A-Za-z])(\d+)/g, (match, p1, p2) => {
      return `${p1}<sub>${p2}</sub>`;
    });

    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div
      className="current-forecast-container"
      style={{
        "--wind-direction": weatherData?.current.wind_deg + "deg",
        // "--uv-angle": setAngle(weatherData?.current.uvi, 12),
      }}
    >
      <div
        className="main-container"
        style={{
          backgroundImage: `linear-gradient(135deg, var(--background-color-1), var(--background-color-2)), url(${weatherData.imageUrl})`,
        }}
      >
        <div className="info-container">
          <p id="current-time">
            {getCurrentTime(weatherData?.timezone_offset)}
          </p>
          {/* <p>
                      Last Updated at{" "}
                      {formatTime(
                        weatherData?.current.dt,
                        weatherData?.timezone_offset
                      )}
                    </p> */}
          <p id="current-location">
            <ImLocation /> {weatherData?.name}, {weatherData?.country}
          </p>
          <p id="current-date">{formatDate(weatherData?.current.dt)}</p>
        </div>
        <div className="weather-container">
          <div className="weather-icon" id="weather-icon-current">
            {selectWeatherIcon(
              weatherData?.current.weather[0].main,
              weatherData?.current.dt,
              weatherData?.current.sunset,
              weatherData?.current.sunrise
            )}
          </div>
          <p id="weather-description">
            {formatCamelCase(weatherData?.current.weather[0].description)}
          </p>
        </div>
        <div className="temp-container">
          <h4 id="main-temp">
            {Math.round(weatherData?.current.temp)}
            {tempUnit}
          </h4>
          <p id="feels-like">
            Feels Like {Math.round(weatherData?.current.feels_like)}
            {tempUnit}
          </p>
        </div>
      </div>
      <div className="secondary-container">
        <div className="humidity-container">
          <p className="icon">
            <GiWaterDrop />
          </p>
          <h4 className="info">{weatherData?.current.humidity}% </h4>
          <p className="title">Humidity</p>
        </div>
        <div className="visibility-container">
          <p className="icon">
            <TbBinocularsFilled />
          </p>
          <h4 className="info">
            {Math.round(
              (weatherData?.current.visibility / 1000) * distanceMultiplier
            )}{" "}
            {distanceUnit}
          </h4>
          <p className="title">Visibility</p>
        </div>

        <div className="sunrise-container">
          <div className="icon">
            <GiSunrise />
          </div>
          <h4 className="info">
            {formatTime(
              weatherData?.current.sunrise,
              weatherData?.timezone_offset
            )}
          </h4>
          <p className="title">Sunrise </p>
        </div>
        <div className="sunset-container">
          <div className="icon">
            <GiSunset />
          </div>
          <h4 className="info">
            {formatTime(
              weatherData?.current.sunset,
              weatherData?.timezone_offset
            )}
          </h4>
          <p className="title">Sunset</p>
        </div>
        <div className="day-length-container">
          <h4 className="info">
            {formatTimeDuration(
              weatherData?.current.sunset - weatherData?.current.sunrise
            )}
          </h4>
          <p className="title">
            <TbSunMoon />
            Day Length
          </p>
        </div>
        <div className="wind-container">
          <div className="compass-dial">
            <IoTriangleSharp className="arrow" />
            <div className="ring"></div>
          </div>
          <p className="info">
            {Math.round(weatherData?.current.wind_speed * speedMultiplier)}{" "}
            {speedUnit}
          </p>
          <p className="title">
            <LuWind /> Wind Speed
          </p>
        </div>
        {/* <div className="uvi-container">
          <div className="semi-circle-container">
            <div className="semi-circle"></div>
            <p>{weatherData?.current.uvi}</p>
          </div>
          <p className="title">
            <PiSunglassesFill />
            UV Index: {convertUVI(weatherData?.current.uvi)}
          </p>
        </div> */}
        <div className="aqi-container">
          <div className="aqi-data-container">
            {Object.keys(weatherData?.list[0].components).map((key) => (
              <div key={key} className="chemical-info-container">
                <strong className="chemical info">
                  {weatherData?.list[0].components[key]}
                </strong>
                <p className="label">
                  {formatChemicalFormula(removeAfterHyphen(key.toUpperCase()))}
                </p>
              </div>
            ))}
          </div>
          <p className="title">
            <MdAir />
            Air Quality Index: {weatherData?.list[0].main.aqi}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentCard;
