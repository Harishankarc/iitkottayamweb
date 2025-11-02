import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader } from './components/input_output_utils';
import WhyIIIT from './screens/home/whyIIIT';
import { ThemeProvider } from './context/createContext';
import HomePage from './screens/home/homepage'
import React, { useState, useEffect } from "react";
import Nirf from './screens/home/nirf';
import NavBar from './components/navbar';
import AppFooter from './components/footer';
import Admission from './screens/home/admission';
import Governance from './screens/home/Governance';
import Academics from './screens/home/academics';


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/why-iiitk" element={<WhyIIIT />} />
          <Route path="/nirf/2025" element={<Nirf />} />
          <Route path="/institute/governance" element={<Governance />} />
          <Route path="/institute/admission" element={<Admission />} />
          <Route path="/institute/academics" element={<Academics />} />
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App