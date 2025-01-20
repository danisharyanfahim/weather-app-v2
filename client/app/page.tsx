import React from "react";
import WeatherDashboard from "./components/weather-dashboard/weather-dashboard";

const WeatherApp = async ({
  searchParams,
}: {
  searchParams: Promise<{ location: string; units: string }>;
}) => {
  const { location, units } = await searchParams;
  return (
    <WeatherDashboard
      location={location}
      units={units}
      defaultLocation="Toronto"
    />
  );
};

export default WeatherApp;
