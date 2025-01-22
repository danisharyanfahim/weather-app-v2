import React from "react";
import WeatherDashboard from "./components/weather-dashboard/weather-dashboard";
import Header from "./components/header";
import UnitContextProvider from "./context/unit-provider";

const WeatherApp = async ({
  searchParams,
}: {
  searchParams: Promise<{ location: string; units: string }>;
}) => {
  const { location, units } = await searchParams;
  return (
    <main className="weather-app">
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
