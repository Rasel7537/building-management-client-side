
import React from "react";
import authImage from "../assets/authImg.png"; 
import { FaGoogle } from "react-icons/fa";
import { Outlet } from "react-router";

const LoginComponent = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col lg:flex-row items-center justify-center px-4 lg:px-20">

      <Outlet></Outlet>

      {/* Right Side: Illustration */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
        <img
          src={authImage}
          alt="Delivery Illustration"
          className="rounded-xl shadow-xl max-w-md"
        />
      </div>
    </div>
  );
};

export default LoginComponent;
