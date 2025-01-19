"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./search-bar";
import Toggle from "./toggle";
import {
  formatCamelCase,
  formatDate,
  formatStringToPath,
  formatTime,
  formatTimeDuration,
  getCurrentTime,
  getDay,
} from "../utils/utility-functions";
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
import LineGraph from "./line-graph";
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

const WeatherDashboard = ({
  location,
  units,
  defaultLocation,
}: {
  location: string;
  units: string;
  defaultLocation: string;
}) => {
  const [weatherData, setWeatherData] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let speedUnit = "km/h";
  let distanceUnit = "km";
  let tempUnit = "°C";
  let distanceMultiplier = 1;
  let speedMultiplier = 3.6; //Metric returns meters per second so it is necessary to multiply by 3.6 to get km/h

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
    speedUnit = "mph";
    tempUnit = "°F";
    distanceMultiplier = 0.6213; //Converts kilometers to miles
    speedMultiplier = 1; //Returns speed in miles per hour so no multiplier is needed
    distanceUnit = "miles";
  }

  const convertUVI = (uvi: number): string => {
    if (uvi <= 2) {
      return "Low";
    } else if (uvi <= 5) {
      return "Moderate";
    } else if (uvi <= 7) {
      return "High";
    } else if (uvi <= 10) {
      return "Very High";
    } else {
      return "Extreme";
    }
  };

  const selectWeatherIcon = (
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

  const getHourlyData = () => {
    if (!weatherData) return [];
    return weatherData?.hourly.slice(1, 24).map((hour: any) => {
      return Math.round(hour.temp);
    });
  };

  return (
    <div className="weather-dashboard">
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
          <div className="weather-data">
            <div className="current-forecast-container">
              <div
                className="main-container"
                style={{
                  backgroundImage: `url(${weatherData.imageUrl})`,
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
                  <p>
                    {formatCamelCase(
                      weatherData?.current.weather[0].description
                    )}
                  </p>
                </div>
                <div className="temp-container">
                  <p id="main-temp">
                    {Math.round(weatherData?.current.temp)}
                    {tempUnit}
                  </p>
                  <p id="feels-like">
                    Feels Like {Math.round(weatherData?.current.feels_like)}
                    {tempUnit}
                  </p>
                </div>
              </div>
              <div className="secondary-container">
                <div className="humidity-container">
                  <p>
                    {weatherData?.current.humidity}%
                    <GiWaterDrop />
                    Humidity
                  </p>
                </div>
                <div className="wind-container">
                  <p>{weatherData?.current.wind_deg}deg</p>
                  <p>
                    {Math.round(
                      weatherData?.current.wind_speed * speedMultiplier
                    )}{" "}
                    {speedUnit}
                  </p>
                  <p>
                    <LuWind /> Wind Speed
                  </p>
                </div>
                <div className="sunrise-container">
                  <p>
                    {formatTime(
                      weatherData?.current.sunrise,
                      weatherData?.timezone_offset
                    )}
                  </p>
                  <p>
                    <GiSunrise />
                    Sunrise{" "}
                  </p>
                </div>
                <div className="sunset-container">
                  <p>
                    {formatTime(
                      weatherData?.current.sunset,
                      weatherData?.timezone_offset
                    )}
                  </p>
                  <p>
                    <GiSunset />
                    Sunset{" "}
                  </p>
                </div>
                <div className="day-length-container">
                  <TbSunMoon />
                  <p>
                    Length of Day{" "}
                    {formatTimeDuration(
                      weatherData?.current.sunset - weatherData?.current.sunrise
                    )}
                  </p>
                </div>
                <div className="uvi-container">
                  <PiSunglassesFill />
                  <p>UV Index: {weatherData?.current.uvi}</p>
                  <p>UV Index Rating: {convertUVI(weatherData?.current.uvi)}</p>
                </div>
                <div className="aqi-Container">
                  <MdAir />
                  <p>AQI: {weatherData?.list[0].main.aqi}</p>
                </div>
                <div className="visibility-container">
                  <TbBinocularsFilled />
                  <p>
                    Visibility:{" "}
                    {Math.round(
                      (weatherData?.current.visibility / 1000) *
                        distanceMultiplier
                    )}{" "}
                    {distanceUnit}
                  </p>
                </div>
              </div>
            </div>
            <div className="hourly-forecast-container">
              <div className="graph-container">
                <LineGraph data={getHourlyData()} />
              </div>
              <ul className="hourly-forecast">
                {weatherData?.hourly.slice(1, 25).map(
                  (
                    hour: {
                      dt: number;
                      temp: number;
                      humidity: number;
                      pop: number;
                      weather: { main: string; description: string }[];
                    },
                    index: number
                  ) => {
                    const newTime = formatTime(
                      hour.dt,
                      weatherData.timezone_offset,
                      false
                    );

                    return (
                      <li key={index}>
                        <p>{newTime}</p>
                        <p>{Math.round(hour.temp)}°</p>
                        <p>
                          <GiWaterDrop /> {hour.humidity}%
                        </p>
                        <p>
                          <TbDropletsFilled /> {Math.round(hour.pop * 100)}%
                        </p>
                        <div>
                          {selectWeatherIcon(
                            hour.weather[0].main,
                            hour.dt,
                            weatherData?.current.sunset,
                            weatherData?.current.sunrise
                          )}
                        </div>
                        {/* <p>{formatCamelCase(hour.weather[0].description)}</p> */}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
            <ul className="daily-forecast-container">
              {weatherData?.daily.map(
                (
                  day: {
                    dt: number;
                    humidity: number;
                    pop: number;
                    weather: { main: string; description: string }[];
                    temp: { day: number; min: number; max: number };
                  },
                  index: number
                ) => {
                  const date = getDay(day.dt);

                  return (
                    <li key={index}>
                      <p className="day">{index === 0 ? "Today" : date}</p>
                      {/* <p>
                        {Math.round(day.temp.day)}
                        {tempUnit}
                      </p> */}

                      {/* <p>
                        <GiWaterDrop /> {day.humidity}%
                      </p> */}
                      <p className="precipitation">
                        <TbDropletsFilled /> {Math.round(day.pop * 100)}%
                      </p>
                      <div className="weather">
                        {selectWeatherIcon(
                          day.weather[0].main,
                          day.dt,
                          weatherData?.current.sunset,
                          weatherData?.current.sunrise,
                          false
                        )}
                      </div>
                      <p className="temp">{Math.round(day.temp.max)}°</p>
                      <p className="temp">{Math.round(day.temp.min)}°</p>
                      {/* <p>{formatCamelCase(day.weather[0].description)}</p> */}
                    </li>
                  );
                }
              )}
            </ul>
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
