import React, { useState } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';
import ImageSlider from "../../components/imageslider";


// const {fetchUserData} = useHomePageController();
// import { useHomePageController } from "./homepageController";

const HomePage = () => {
 const sliderImages = [
    { src: img1, alt: 'Campus View 1', title: 'THE BEST OF THE BEST', description: 'Excellence in Education and Research' },
    { src: img2, alt: 'Campus View 2', title: 'Innovation Hub', description: 'Leading the Future of Technology' },
    { src: img3, alt: 'Campus View 3', title: 'World-Class Facilities', description: 'State-of-the-art Infrastructure' }
  ];

  return (
    <>
      <NavBar />
      <ImageSlider images={sliderImages} />
      <Footer />
    </>
  );
};

export default HomePage;
