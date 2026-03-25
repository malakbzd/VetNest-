import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/patients" element={<PatientDashboard />} />
        <Route path="/doctors" element={<DoctorDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;