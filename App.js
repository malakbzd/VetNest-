import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import FAQsAccordion from "./components/FAQsAccordion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pets from "./pages/Pets";
import Appointments from "./pages/Appointments";
import Shop from "./pages/Shop";
import Articles from "./pages/Articles";
import Dashboard from "./pages/Dashboard";

// Protected route wrapper (checks token only)
const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home page */}
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

        {/* Protected pages */}
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/pets" element={<Protected><Pets /></Protected>} />
        <Route path="/appointments" element={<Protected><Appointments /></Protected>} />

        {/* Public pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;