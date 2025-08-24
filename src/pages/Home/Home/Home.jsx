import React from 'react';
import Banner from '../banner/Banner';
import AboutTheBuilding from '../AboutTheBuilding/AboutTheBuilding';
import ApartmentLocation from '../ApartmentLocation/ApartmentLocation';

import Coupons from '../Coupons/Coupons';

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutTheBuilding />
      <Coupons />
      <ApartmentLocation />
    </div>
  );
};

export default Home;
