"use client";
import React, { createContext, useState } from "react";
import { WeatherType } from "../types/types";

export interface WeatherContextType {
  weather: WeatherType;
  setWeather: React.Dispatch<React.SetStateAction<WeatherType>>;
}

export const WeatherContext = createContext<WeatherContextType>({
  weather: "clear",
  setWeather: () => {},
});

const WeatherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weather, setWeather] = useState<WeatherType>("clear");
  const value = { weather, setWeather };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
