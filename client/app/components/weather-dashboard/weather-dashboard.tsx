"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../search-bar";
import Toggle from "../toggle";
import {
  formatCamelCase,
  formatDate,
  formatStringToPath,
  formatTime,
  formatTimeDuration,
  getCurrentTime,
  getDay,
} from "../../utils/utility-functions";
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
  WiRaindrops,
} from "react-icons/wi";
import { GiSnowflake2, GiSunrise, GiSunset, GiWaterDrop } from "react-icons/gi";
import LineGraph from "../line-graph";
import { SiAccuweather } from "react-icons/si";
import { ImLocation } from "react-icons/im";
import { LuWind } from "react-icons/lu";
import { MdAir } from "react-icons/md";
import {
  TbBinocularsFilled,
  TbDropletsFilled,
  TbSunMoon,
} from "react-icons/tb";
import { PiSunglassesFill } from "react-icons/pi";
import CurrentCard from "./current-card";
import HourlyCard from "./hourly-card";
import DailyCard from "./daily-card";

export const selectWeatherIcon = (
  weatherType: string,
  dt: number,
  sunset: number,
  sunrise: number,
  showNightIcons: boolean = true
): React.ReactNode => {
  weatherType = weatherType.toLowerCase();
  if (weatherType === "clear") {
    if (dt > sunrise && dt < sunset) {
      return <IoSunny />;
    } else {
      return showNightIcons ? <IoMoonSharp /> : <IoSunny />;
    }
  } else if (weatherType === "clouds") {
    if (dt > sunrise && dt < sunset) {
      return <BsCloudsFill />;
    } else {
      return showNightIcons ? <IoMdCloudyNight /> : <BsCloudsFill />;
    }
  } else if (weatherType === "rain" || weatherType === "drizzle") {
    if (dt > sunrise && dt < sunset) {
      return <IoRainy />;
    } else {
      return showNightIcons ? <FaCloudMoonRain /> : <IoRainy />;
    }
  } else if (weatherType === "thunderstorm") {
    if (dt > sunrise && dt < sunset) {
      return <WiDayThunderstorm />;
    } else {
      return showNightIcons ? (
        <WiNightAltThunderstorm />
      ) : (
        <WiDayThunderstorm />
      );
    }
  } else if (weatherType === "mist") {
    if (dt > sunrise && dt < sunset) {
      return <WiFog />;
    } else {
      return showNightIcons ? <WiNightFog /> : <WiFog />;
    }
  } else if (weatherType === "snow") {
    if (dt > sunrise && dt < sunset) {
      return <GiSnowflake2 />;
    } else {
      return showNightIcons ? <WiNightAltSnowWind /> : <GiSnowflake2 />;
    }
  } else if (weatherType === "haze" || weatherType === "smoke") {
    if (dt > sunrise && dt < sunset) {
      return <WiDayHaze />;
    } else {
      return showNightIcons ? <BsCloudFog2Fill /> : <WiDayHaze />;
    }
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
      <div className="top">
        <h1>
          <SiAccuweather />
          Weather Dashboard
        </h1>
        <SearchBar />
        <Toggle
          option1={{ name: "Celsius", value: "metric" }}
          option2={{ name: "Fahrenheit", value: "imperial" }}
        />
      </div>
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
          <h2>No Results</h2>
        )
      ) : (
        <h2 className="loading-icon-container">
          <AiOutlineLoading3Quarters id="loading-icon" />
        </h2>
      )}
    </div>
  );
};

export default WeatherDashboard;
