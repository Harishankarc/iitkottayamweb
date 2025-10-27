import './App.css'
import AppFooter from './components/footer';
import { Loader } from './components/input_output_utils';
import NavBar from './components/navbar';
import { ThemeProvider } from './context/createContext';
import HomePage from './screens/home/homepage'
import React, { useState, useEffect } from "react";

function App() {
  return (
    <ThemeProvider>
      <NavBar />
      <HomePage />
      <AppFooter />
    </ThemeProvider>
  );
}

export default App