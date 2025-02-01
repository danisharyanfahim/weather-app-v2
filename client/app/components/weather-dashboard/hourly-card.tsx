"use client";
import React, { useEffect, useRef, useState } from "react";
import LineGraph from "../line-graph";
import { formatTime } from "@/app/utils/utility-functions";
import { selectWeatherIcon } from "./weather-dashboard";
import { TbDropletsFilled } from "react-icons/tb";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HourlyCard = ({
  weatherData,
  hourlySectionWidth,
  graphHeight,
}: {
  weatherData: any;
  hourlySectionWidth: number;
  graphHeight: number;
}) => {
  const getHourlyData = () => {
    if (!weatherData) return [];
    return weatherData?.hourly.slice(1, 25).map((hour: any) => {
      return Math.round(hour.temp);
    });
  };
  const [position, setPosition] = useState<number>(0);
  const [scrolling, setScrolling] = useState(false);
  const carouselRef = useRef(null);
  const directionRef = useRef<"left" | "right">(null);

  const handleScroll = (direction: "left" | "right") => {
    setScrolling(true);
    directionRef.current = direction;
  };

  const scrollCarousel = (speed: number) => {
    let newPosition = position + speed;
    if (newPosition <= 0) {
      newPosition = 0;
    } else if (newPosition >= carouselRef.current?.scrollWidth) {
      newPosition = carouselRef.current?.scrollWidth;
    }
    carouselRef.current?.scrollTo({
      left: Math.round(newPosition),
    });
    setPosition(newPosition);
  };

  const handleMouseUp = () => {
    setScrolling(false);
    directionRef.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrolling) {
        if (directionRef.current === "left") {
          scrollCarousel(-5);
        } else {
          scrollCarousel(5);
        }
      }
    }, 1);
    window.addEventListener("mouseup", () => handleMouseUp());
    window.addEventListener("touchend", () => handleMouseUp());

    return () => {
      clearInterval(interval);
      window.removeEventListener("mouseup", () => handleMouseUp());
      window.removeEventListener("touchend", () => handleMouseUp());
    };
  }, [scrolling, position]);

  return (
    <div className="hourly-forecast-container">
      <div className="button-container left">
        <button
          className="left-button"
          onMouseDown={() => handleScroll("left")}
          onTouchStart={() => handleScroll("left")}
        >
          <FaChevronLeft />
        </button>
      </div>
      <div className="button-container right">
        <button
          className="right-button"
          onMouseDown={() => handleScroll("right")}
          onTouchStart={() => handleScroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>
      <div
        className="hourly-forecast-mask"
        ref={carouselRef}
        onScroll={() => {
          setPosition(Math.round(carouselRef.current?.scrollLeft));
        }}
      >
        <div className="hourly-forecast-page">
          <div className="graph-container">
            <LineGraph
              data={getHourlyData()}
              graphWidth={getHourlyData().length * hourlySectionWidth}
              graphHeight={graphHeight}
              padding={{ x: hourlySectionWidth / 2, y: 30 }}
              id="hourly-forecast-temp-graph"
            />
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
                  <li key={index} className="hourly-forecast-section">
                    <p>{newTime}</p>
                    <div className="weather-icon" id="weather-icon-hourly">
                      {selectWeatherIcon(
                        hour.weather[0].main,
                        hour.dt + weatherData?.timezone_offset + 18000,
                        weatherData?.current.sunset,
                        weatherData?.current.sunrise,
                        false
                      )}
                    </div>
                    {/* <p>
                            <GiWaterDrop /> {hour.humidity}%
                          </p> */}
                    <h4>{Math.round(hour.temp)}°</h4>
                    <p className="precipitation">
                      <TbDropletsFilled /> {Math.round(hour.pop * 100)}%
                    </p>

                    {/* <p>{formatCamelCase(hour.weather[0].description)}</p> */}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HourlyCard;
