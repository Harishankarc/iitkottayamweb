import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader } from './components/input_output_utils';
import WhyIIIT from './screens/home/whyIIIT';
import { ThemeProvider } from './context/createContext';
import HomePage from './screens/home/homepage'
import React, { useState, useEffect } from "react";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/why-iiitk" element={<WhyIIIT />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App