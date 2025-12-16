import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/final-logo.png";

const Buildinglogo = () => {
  return (
    <div className="mx-24">
      <Link to="/" className="flex gap-1 items-center ">
        <img className="w-12" src={logo} alt="BMS Logo" />
        <p className="font-bold text-2xl text-center mt-1.5  text-black">
          BMS Hub
        </p>
      </Link>
    </div>
  );
};

export default Buildinglogo;
