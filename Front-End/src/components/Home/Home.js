import React from "react";
import HeroSection from "./HeroSection.js";
import Navbar from "../Navbar/NavBar.js";

export const Home = () => {
  return (
    <div>
      <div className="absol">
        <div className="top-div"></div>
        <Navbar />
      </div>
      <HeroSection />
    </div>
  );
};
