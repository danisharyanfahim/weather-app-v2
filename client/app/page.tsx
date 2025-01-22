import React from "react";
import WeatherApp from "./components/weather-app";
import WeatherContextProvider from "./context/weather-provider";
import PeriodContextProvider from "./context/period-provider";

const WeatherPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ location: string; units: string }>;
}) => {
  const { location, units } = await searchParams;
  return (
    <div className="weather-app-container">
      <WeatherContextProvider>
        <PeriodContextProvider>
          <WeatherApp units={units} location={location} />
        </PeriodContextProvider>
      </WeatherContextProvider>
    </div>
  );
};

export default WeatherPage;
