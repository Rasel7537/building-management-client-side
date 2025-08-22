
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Blue Minimalist Modern Real Estate Logo.png';

const Buildinglogo = () => {
  return (
    <Link to="/" className="flex gap-2 items-center">
      <img className="w-16" src={logo} alt="BMS Logo" />
      <p className="font-bold text-2xl text-black">BMS Hub</p>
    </Link>
  );
};

export default Buildinglogo;
