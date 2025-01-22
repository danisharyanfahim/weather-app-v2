"use client";
import React, { createContext, useState } from "react";
import { PeriodType } from "../types/types";

export interface PeriodContextType {
  period: PeriodType;
  setPeriod: React.Dispatch<React.SetStateAction<PeriodType>>;
}

export const PeriodContext = createContext<PeriodContextType>({
  period: "day",
  setPeriod: () => {},
});

const PeriodContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [period, setPeriod] = useState<PeriodType>("day");
  const value = { period, setPeriod };

  return (
    <PeriodContext.Provider value={value}>{children}</PeriodContext.Provider>
  );
};

export default PeriodContextProvider;
