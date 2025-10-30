import React, { useState, useEffect } from 'react';
import { MyDiv } from './input_output_utils';


const ImageSlider = ({ images }) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <MyDiv
      variant="transparent"
      className="relative w-100vw md:h-[550px] h-[300px] overflow-hidden px-10"
      padding={false}
      >
      <MyDiv className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${index === currentIndex
                ? 'translate-x-0'
                : index < currentIndex
                  ? '-translate-x-full'
                  : 'translate-x-full'
              }`}
          >
            <img
              src={image}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-40" />
          </div>
        ))}
      </MyDiv >

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 animate-fadeIn">
            {images[currentIndex]?.title || 'Welcome'}
          </h1>
          <p className="text-xl animate-fadeIn">
            {images[currentIndex]?.description || ''}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </MyDiv>
  );
};

export default ImageSlider;