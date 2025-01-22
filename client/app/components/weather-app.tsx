"use client";
import React, { useContext } from "react";
import UnitContextProvider from "../context/unit-provider";
import Header from "./header";
import WeatherDashboard from "./weather-dashboard/weather-dashboard";
import WeatherContextProvider, {
  WeatherContext,
} from "../context/weather-provider";
import PeriodContextProvider, {
  PeriodContext,
} from "../context/period-provider";

const WeatherApp = ({
  location,
  units,
}: {
  location: string;
  units: string;
}) => {
  const { weather } = useContext(WeatherContext);
  const { period } = useContext(PeriodContext);

  return (
    <main className={`weather-app ${period}`} id={weather}>
      <UnitContextProvider>
        <Header />
        <WeatherDashboard
          location={location ?? "toronto"}
          units={units ?? "metric"}
          defaultLocation="Toronto"
        />
      </UnitContextProvider>
    </main>
  );
};

export default WeatherApp;
