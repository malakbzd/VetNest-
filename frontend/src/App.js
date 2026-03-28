import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import Services from "./components/Services";
import FAQsAccordion from "./components/FAQsAccordion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShopPage from "./pages/ShopPage";
import ArticlesPage from "./pages/ArticlesPage";
import Appointments from "./pages/Appointments";
import PetDashboard from "./components/PetDashboard";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const user = (() => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Failed to parse user:", error);
    localStorage.removeItem("user");
    return null;
  }
})();

  if (loading) return <Loader />;

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public home page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <AboutUs />
              <FAQsAccordion />
            </>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public pages */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/articles" element={<ArticlesPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/appointments"
          element={user ? <Appointments /> : <Navigate to="/login" />}
        />
        <Route
          path="/pets"
          element={user ? <PetDashboard /> : <Navigate to="/login" />}
        />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;