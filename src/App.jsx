import './App.css'
import { Loader } from './components/input_output_utils';
import HomePage from './screens/home/homepage'
import React, { useState, useEffect } from "react";



function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) return <Loader/>;

  return <HomePage />;
}

export default App
