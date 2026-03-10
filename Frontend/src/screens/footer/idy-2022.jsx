import React, { useState } from 'react';
import API from '../../api/api';
import { useTheme } from '../../context/createContext';

export default function IDY2022() {
  const { darkMode } = useTheme();
    const color1 = API.color1;
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop',
      caption: 'Students practicing yoga asanas at the OAT'
    },
    {
      url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop',
      caption: 'Meditation and breathing exercises session'
    },
    {
      url: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&auto=format&fit=crop',
      caption: 'Faculty and students participating together'
    },
    {
      url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&auto=format&fit=crop',
      caption: 'Group yoga session at IIIT Kottayam campus'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <div className={`py-12 px-4 sm:px-6 md:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-screen-2xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-600 font-semibold text-sm">International Yoga Day</span>
            </div>
          </div>
          
          {/* Title */}
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            International Yoga Day
          </h1>
          
          {/* Description */}
          <p className={`text-base md:text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            The theme of this year's Yoga Day celebration is <span className="font-semibold">'Yoga for Humanity'</span>
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 md:px-8">
        
        {/* Programme Details */}
        <div className={`rounded-xl p-6 md:p-8 shadow-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: color1 }}>
            Programme Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color1}20` }}>
                  <svg className="w-6 h-6" style={{ color: color1 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Date</p>
                  <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>21st June 2022 at 5:30 PM</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color1}20` }}>
                  <svg className="w-6 h-6" style={{ color: color1 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Venue</p>
                  <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>OAT - IIIT Kottayam</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Section */}
        <div className={`rounded-xl p-6 md:p-8 shadow-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: color1 }}>
            Activities
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: `${color1}20` }}>
                <span className="font-bold" style={{ color: color1 }}>1</span>
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Inaugural Address</h3>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: `${color1}20` }}>
                <span className="font-bold" style={{ color: color1 }}>2</span>
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>The role of yoga under the pandemic period</h3>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: `${color1}20` }}>
                <span className="font-bold" style={{ color: color1 }}>3</span>
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Various YOGA asanas, involving breathing relaxation and meditation exercises
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Event Images Slider */}
        <div className={`rounded-xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4`}>
          <div className="relative max-w-3xl mx-auto group">
            {/* Images */}
            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img 
                    src={image.url} 
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
                style={{ backgroundColor: `${color1}E6` }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
                style={{ backgroundColor: `${color1}E6` }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Caption */}
            <p className={`text-sm text-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {images[currentSlide].caption}
            </p>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-8' : 'w-2'
                  }`}
                  style={{ 
                    backgroundColor: index === currentSlide ? color1 : (darkMode ? '#4B5563' : '#D1D5DB')
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
