"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { UnitContext, UnitContextType } from "../context/unit-provider";

const Toggle = ({
  option1,
  option2,
  setOptionOneAsDefault = true,
}: {
  option1: { name: string; value: string };
  option2: { name: string; value: string };
  setOptionOneAsDefault?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<{
    name: string;
    value: string;
  }>(setOptionOneAsDefault ? option1 : option2);
  const { units, setUnits } = useContext<UnitContextType>(UnitContext);

  // Toggle the option based on current units value
  const toggleOption = () => {
    const newOption = units === option1.value ? option2 : option1;
    const params = new URLSearchParams(searchParams.toString());

    setUnits(newOption.value); // Update the units in the context provider
    setSelectedOption(newOption);
    params.set("units", newOption.value);

    router.push(`?${params.toString().toLowerCase()}`, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  // Update the selected option when `units` changes
  useEffect(() => {
    const newOption = units === option1.value ? option1 : option2;
    setSelectedOption(newOption);
  }, [units, option1, option2]);

  return (
    <button className={`toggle-container ${units}`} onClick={toggleOption}>
      <div className={`toggle-button ${units}`}>
        <h6 className="toggle-icon">{selectedOption.name}</h6>
      </div>
    </button>
  );
};

export default Toggle;
