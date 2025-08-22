import React from 'react';
import Banner from '../banner/Banner';
import AboutTheBuilding from '../AboutTheBuilding/AboutTheBuilding';
import CouponsSection from '../CouponsSection/CouponsSection';
import ApartmentLocation from '../ApartmentLocation/ApartmentLocation';

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <AboutTheBuilding></AboutTheBuilding>
        <CouponsSection></CouponsSection>
        <ApartmentLocation></ApartmentLocation>
        
    </div>
  );
};

export default Home;