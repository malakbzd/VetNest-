import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
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
import ShopPage from "./pages/ShopPage";
import Articles from "./pages/ArticlesPage";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import CheckoutPage from "./pages/CheckoutPage";

// Protected route wrapper (checks token only)
const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};
const AdminProtected = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return user.role === "admin" ? children : <Navigate to="/dashboard" />;
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
    <div className="home-container">
      <Hero />
      <Services />
      <AboutUs />
      <FAQsAccordion />
    </div>
  }
/>
  {/* Auth */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  
  {/* Protected pages */}
  <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
  <Route path="/pets" element={<Protected><Pets /></Protected>} />
  <Route path="/appointments" element={<Protected><Appointments /></Protected>} />
  
   // Inside Routes:
  <Route path="/cart" element={<Protected><CartPage /></Protected>} />
  <Route path="/favorites" element={<Protected><FavoritesPage /></Protected>} />
  <Route path="/orders" element={<Protected><OrderHistoryPage /></Protected>} />
  <Route path="/checkout" element={<Protected><CheckoutPage /></Protected>} />
  {/* Admin route */}
  <Route
    path="/admin"
    element={
      <Protected>
        <AdminProtected>
          <AdminDashboard />
        </AdminProtected>
      </Protected>
    }
  />

  {/* Public pages */}
  <Route path="/shop" element={<ShopPage />} />
  <Route path="/articles" element={<Articles />} />
</Routes>

      <Footer />

      
    </Router>
  );
};

export default App;