"use client";

import { getDay } from "@/app/utils/utility-functions";
import React, { useEffect, useRef, useState } from "react";
import { TbDropletsFilled } from "react-icons/tb";
import { selectWeatherIcon } from "./weather-dashboard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DailyCard = ({ weatherData }: { weatherData: any }) => {
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
    <div className="daily-forecast-container">
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
        className="daily-forecast-mask"
        ref={carouselRef}
        onScroll={() => {
          setPosition(Math.round(carouselRef.current?.scrollLeft));
        }}
      >
        <ul className="daily-forecast-items-container">
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

                  <div className="weather-icon" id="weather-icon-daily">
                    {selectWeatherIcon(
                      day.weather[0].main,
                      day.dt,
                      weatherData?.current.sunset,
                      weatherData?.current.sunrise,
                      false
                    )}
                  </div>
                  <div className="temps">
                    <p className="temp">{Math.round(day.temp.max)}°</p>
                    <p className="temp">{Math.round(day.temp.min)}°</p>
                  </div>
                  <p className="precipitation">
                    <TbDropletsFilled /> {Math.round(day.pop * 100)}%
                  </p>
                  {/* <p>{formatCamelCase(day.weather[0].description)}</p> */}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default DailyCard;
