import React, { useState } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";

const HomePage = () => {
  // const {fetchUserData} = useHomePageController();


  return (
    <>
      <NavBar />
      <Footer />
    </>
  );
};

export default HomePage;


const NewsCard = ({ title, date, isNew, link }) => {
  const { darkMode } = useTheme()
  return (
    <>
      <style>
        {`
          @keyframes glowPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}
      </style>

      <a
        href={link}
        className={`block bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md rounded-lg px-4 py-3 border border-gray-200 mb-2 ${darkMode ? "!bg-[#111827]" : ''}`}
      >
        <div className={`flex justify-between items-center `}>
          <h3 className="text-[15px] md:text-base font-medium text-gray-800">
            {title}
          </h3>

          {isNew && (
            <span
              className="text-[13px] bg-red-500 text-white px-2 py-0.5 rounded-md"
              style={{
                animation: "glowPulse 1.2s ease-in-out infinite"
              }}
            >
              New
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </a>
    </>
  );
};
