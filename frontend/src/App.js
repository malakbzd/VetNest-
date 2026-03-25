import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  if (loading) return <Loader />;

  return (
    <Router>
    <Navbar />
    <Hero />
       <Services />
      <Routes>
        {/* Public */}
        <Route path="/" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patients */}
        <Route
          path="/patients"
          element={
            user?.role === "user" || user?.role === "admin"
              ? <PatientDashboard />
              : <Navigate to="/" />
          }
        />

        {/* Doctors */}
        <Route
          path="/doctors"
          element={
            user?.role === "doctor" || user?.role === "admin"
              ? <DoctorDashboard />
              : <Navigate to="/" />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;