import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import FAQs from "./components/FAQsAccordion";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";

import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ زيدناها

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 🔐 check auth
  const isAuth = () => !!localStorage.getItem("token");

  if (loading) return <Loader />;

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/patients"
          element={isAuth() ? <PatientDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/doctors"
          element={isAuth() ? <DoctorDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      <FAQs />
      <Footer />
    </Router>
  );
};

export default App;