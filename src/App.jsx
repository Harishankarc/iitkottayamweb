import './App.css'
<<<<<<< HEAD
import AppFooter from './components/footer';
import { Loader } from './components/input_output_utils';
import NavBar from './components/navbar';
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader } from './components/input_output_utils';
import WhyIIIT from './screens/home/whyIIIT';
>>>>>>> origin/footer
import { ThemeProvider } from './context/createContext';
import HomePage from './screens/home/homepage'
import React, { useState, useEffect } from "react";

function App() {
  return (
    <ThemeProvider>
<<<<<<< HEAD
      <NavBar />
      <HomePage />
      <AppFooter />
=======
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/why-iiitk" element={<WhyIIIT />} />
        </Routes>
      </BrowserRouter>
>>>>>>> origin/footer
    </ThemeProvider>
  );
}

export default App