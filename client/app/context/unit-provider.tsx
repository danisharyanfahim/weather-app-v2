"use client";
import React, { createContext, useState } from "react";

export interface UnitContextType {
  units: "metric" | "imperial";
  setUnits: React.Dispatch<React.SetStateAction<"metric" | "imperial">>;
}

export const UnitContext = createContext<UnitContextType>({
  units: "metric",
  setUnits: () => {},
});

const UnitContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const value = { units, setUnits };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};

export default UnitContextProvider;
