"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { formatLocationName } from "../utils/utility-functions";

const requestOptions = {
  method: "POST",
  body: '{\n		"orderBy": "name",\n}',
  redirect: "follow",
};

interface City {
  name: string;
  country: string;
  population: number;
}

const citiesURL =
  "https://countriesnow.space/api/v0.1/countries/population/cities/filter";

const SearchBar = ({ defaultValue }: { defaultValue?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(defaultValue ?? "");
  const [viewSuggestions, setViewSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<
    { name: string; country: string }[]
  >([]);
  const [cityList, setCityList] = useState<City[]>([]);
  const currentLocation = useRef<string>("");

  const handleSubmit = (search: string) => {
    if (search.length > 0 && checkIfCity(search) === true) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("location", search);
      router.push(`?${params.toString()}`, undefined, {
        scroll: false,
        shallow: true,
      });
      currentLocation.current = search;
      setViewSuggestions(false); // Hide suggestions after submitting
    }
  };

  const checkIfCity = (location: string) => {
    const cities = cityList.map((city) => city.name.toLowerCase());
    return cities.includes(location.toLowerCase());
  };

  const handleChange = (location: string) => {
    setSearch(location);
    const searchSuggestions = cityList.filter((city) => {
      return city.name.toLowerCase().includes(location.toLowerCase());
    });
    setSuggestions(searchSuggestions.slice(0, 20));
  };

  const handleSuggestionClick = (suggestionName: string) => {
    setSearch(suggestionName);
    handleSubmit(suggestionName);
  };

  // Close the suggestions when clicked outside
  const handleBlur = (e: React.FocusEvent) => {
    // Only close suggestions if the click is not within the suggestions list
    if (!e.relatedTarget || !e.relatedTarget.closest(".suggestions-list")) {
      setViewSuggestions(false);
    }
  };

  const handleFocus = () => {
    if (currentLocation.current === search) {
      setSearch("");
      handleChange("");
    }
    setViewSuggestions(true);
  };

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch(citiesURL, requestOptions).then((response) =>
        response.json()
      );
      const cities = response.data.map(
        (cityInfo: {
          city: string;
          country: string;
          populationCounts: { value: string }[];
        }) => {
          return {
            name: formatLocationName(cityInfo.city),
            country: formatLocationName(cityInfo.country),
            population: Number.parseInt(cityInfo.populationCounts[0].value),
          };
        }
      );
      setCityList(
        cities.sort((a: City, b: City) => b.population - a.population)
      );
    };

    fetchCities();
  }, []);

  return (
    <div className="search-wrapper" onBlur={handleBlur} tabIndex={-1}>
      <div className="search-bar-container">
        <input
          className="search-bar"
          type="search"
          value={search}
          name="search"
          placeholder="Search..."
          onChange={(e) => handleChange(e.target.value)}
          size={17}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(search);
            }
          }}
          onFocus={() => handleFocus()}
        />
        <button
          className="search-button"
          onClick={() => {
            handleSubmit(search);
          }}
        >
          <p>
            <IoMdSearch />
          </p>
        </button>
      </div>
      {viewSuggestions && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                onMouseDown={() => handleSuggestionClick(suggestion.name)}
              >
                {suggestion.name}, {suggestion.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
