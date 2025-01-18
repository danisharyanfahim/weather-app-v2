"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  const toggleOption = () => {
    const newOption =
      selectedOption.value === option1.value ? option2 : option1;
    const params = new URLSearchParams(searchParams.toString());

    setSelectedOption(newOption);
    params.set("units", newOption.value);

    router.push(`?${params.toString().toLowerCase()}`, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  useEffect(() => {
    toggleOption();
  }, []);

  return (
    <button className="toggle" onClick={toggleOption}>
      {selectedOption.name}
    </button>
  );
};

export default Toggle;
