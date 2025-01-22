"use client";
import React, { createContext, useState } from "react";
import { UnitsType } from "../types/types";

export interface UnitContextType {
  units: UnitsType;
  setUnits: React.Dispatch<React.SetStateAction<UnitsType>>;
}

export const UnitContext = createContext<UnitContextType>({
  units: "metric",
  setUnits: () => {},
});

const UnitContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [units, setUnits] = useState<UnitsType>("metric");
  const value = { units, setUnits };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};

export default UnitContextProvider;
