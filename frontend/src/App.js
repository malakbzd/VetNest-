import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import Login from "./pages/Login"; // ✅ زيد هذا

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ check auth
  const isAuth = () => !!localStorage.getItem("token");

  if (loading) return <Loader />;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AboutUs />} />

        {/* ✅ protected routes */}
        <Route
          path="/patients"
          element={isAuth() ? <PatientDashboard /> : <Login />}
        />

        <Route
          path="/doctors"
          element={isAuth() ? <DoctorDashboard /> : <Login />}
        />

        {/* ✅ login route */}
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;