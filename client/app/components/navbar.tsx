"use client";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import SearchBar from "./search-bar";
import Toggle from "./toggle";
import { TiWeatherPartlySunny } from "react-icons/ti";

const Navbar = () => {
  const [showing, setShowing] = useState<boolean>(false);

  return (
    <>
      <div id="navbar">
        <h1 className="logo">
          <span className="icon">
            <TiWeatherPartlySunny />
          </span>
          <span className="text">
            Weather<span className="colored">App</span>
          </span>
        </h1>
        <div className="right-side">
          <Toggle
            option1={{ name: "C", value: "metric" }}
            option2={{ name: "F", value: "imperial" }}
          />
          <button
            className="nav-menu-button"
            onClick={() => setShowing((prev) => !prev)}
          >
            <IoMenu />
          </button>
        </div>
      </div>
      <div className={`side-nav ${showing ? "showing" : ""}`}>
        <SearchBar onSubmit={() => setShowing(false)} />
      </div>
    </>
  );
};

export default Navbar;
