import React from "react";
import WeatherDashboard from "./components/weather-dashboard";

const WeatherApp = async ({
  searchParams,
}: {
  searchParams: Promise<{ location: string; units: string }>;
}) => {
  const { location, units } = await searchParams;
  return (
    <div>
      <WeatherDashboard
        location={location}
        units={units}
        defaultLocation="Toronto"
      />
    </div>
  );
};

export default WeatherApp;
