import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
//import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import PatientItem from './components/PatientItem';
//import FAQsAccordion from "./components/FAQs";
//import Footer from "./components/Footer";
import Loader from "./components/Loader";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <AboutUs />
        
        </>
      )}
    </>
  );
};

export default App;