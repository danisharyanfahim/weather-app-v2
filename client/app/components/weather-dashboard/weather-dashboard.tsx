"use client";
import React, { useEffect, useState } from "react";
import { formatStringToPath } from "../../utils/utility-functions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCloudMoonRain } from "react-icons/fa";
import { IoMdCloudyNight } from "react-icons/io";
import { IoMoonSharp, IoRainy, IoSunny } from "react-icons/io5";
import { BsCloudFog2Fill, BsCloudsFill } from "react-icons/bs";
import {
  WiDayHaze,
  WiDayThunderstorm,
  WiFog,
  WiNightAltSnowWind,
  WiNightAltThunderstorm,
  WiNightFog,
} from "react-icons/wi";
import { GiSnowflake2 } from "react-icons/gi";
import CurrentCard from "./current-card";
import HourlyCard from "./hourly-card";
import DailyCard from "./daily-card";

export const checkIfDay = (
  dt: number,
  sunset: number,
  sunrise: number
): boolean => {
  return dt > sunrise && dt < sunset;
};

export const selectWeatherIcon = (
  weatherType: string,
  dt: number,
  sunset: number,
  sunrise: number,
  showNightIcons: boolean = true
): React.ReactNode => {
  weatherType = weatherType.toLowerCase();
  if (weatherType === "clear") {
    return checkIfDay(dt, sunset, sunrise) ? (
      <IoSunny />
    ) : showNightIcons ? (
      <IoMoonSharp />
    ) : (
      <IoSunny />
    );
  } else if (weatherType === "clouds") {
    return checkIfDay(dt, sunset, sunrise) ? (
      <BsCloudsFill />
    ) : showNightIcons ? (
      <IoMdCloudyNight />
    ) : (
      <BsCloudsFill />
    );
  } else if (weatherType === "rain" || weatherType === "drizzle") {
    return checkIfDay(dt, sunset, sunrise) ? (
      <IoRainy />
    ) : showNightIcons ? (
      <FaCloudMoonRain />
    ) : (
      <IoRainy />
    );
  } else if (weatherType === "thunderstorm") {
    return checkIfDay(dt, sunset, sunrise) ? (
      <WiDayThunderstorm />
    ) : showNightIcons ? (
      <WiNightAltThunderstorm />
    ) : (
      <WiDayThunderstorm />
    );
  } else if (weatherType === "mist") {
    return checkIfDay(dt, sunset, sunrise) ? (
      <WiFog />
    ) : showNightIcons ? (
      <WiNightFog />
    ) : (
      <WiFog />
    );
  } else if (weatherType === "snow") {
    return checkIfDay(dt, sunset, sunrise) ? (
      <GiSnowflake2 />
    ) : showNightIcons ? (
      <WiNightAltSnowWind />
    ) : (
      <GiSnowflake2 />
    );
  } else if (weatherType === "haze" || weatherType === "smoke") {
    return checkIfDay(dt, sunset, sunrise) ? (
      <WiDayHaze />
    ) : showNightIcons ? (
      <BsCloudFog2Fill />
    ) : (
      <WiDayHaze />
    );
  }
};

const WeatherDashboard = ({
  location,
  units,
  defaultLocation,
  hourlySectionWidth = 100,
  graphHeight = 150,
}: {
  location: string;
  units: string;
  defaultLocation: string;
  hourlySectionWidth?: number;
  graphHeight?: number;
}) => {
  const [weatherData, setWeatherData] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let measuringUnits = {
    speedUnit: "km/h",
    distanceUnit: "km",
    tempUnit: "°C",
    distanceMultiplier: 1,
    speedMultiplier: 3.6, //Metric returns meters per second so it is necessary to multiply by 3.6 to get km/h
  };

  useEffect(() => {
    fetchData(); // Fetch image for New York when the component loads
  }, [location, units]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/?location=${formatStringToPath(
          location ?? defaultLocation
        )}&units=${units}`
      ).then((response) => response.json());
      const { data } = response;
      setWeatherData(data);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    }
    setLoading(false);
  };

  if (units === "imperial") {
    measuringUnits = {
      speedUnit: "mph",
      tempUnit: "°F",
      distanceMultiplier: 0.6213, //Converts kilometers to miles
      speedMultiplier: 1, //Returns speed in miles per hour so no multiplier is needed
      distanceUnit: "miles",
    };
  }

  return (
    <div
      className="weather-dashboard"
      style={{ "--hourly-section-width": hourlySectionWidth + "px" }}
    >
      {!loading ? (
        weatherData ? (
          <div className="weather-data-container">
            <CurrentCard weatherData={weatherData} units={measuringUnits} />
            <HourlyCard
              weatherData={weatherData}
              hourlySectionWidth={hourlySectionWidth}
              graphHeight={graphHeight}
            />
            <DailyCard weatherData={weatherData} />
          </div>
        ) : (
          <div className="no-results-container">
            <h2>No Results</h2>
          </div>
        )
      ) : (
        <div className="loading-container">
          <h2 className="loading-icon-container">
            <AiOutlineLoading3Quarters id="loading-icon" />
          </h2>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
