import { useState } from "react";
import AdminPets from "../components/admin/AdminPets";
import AdminAppointments from "../components/admin/AdminAppointments";
import AdminArticles from "../components/admin/AdminArticles";
import AdminShop from "../components/admin/AdminShop";
import { FaPaw, FaCalendarAlt, FaNewspaper, FaShoppingCart } from "react-icons/fa";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [section, setSection] = useState("pets");

  return (
    <div className="admin-container">

      {/* ===== SIDEBAR ===== */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>

        <button
          className={`sidebar-btn ${section === "pets" ? "active" : ""}`}
          onClick={() => setSection("pets")}
        >
          <FaPaw className="sidebar-icon" />
          Pets
        </button>

        <button
          className={`sidebar-btn ${section === "appointments" ? "active" : ""}`}
          onClick={() => setSection("appointments")}
        >
          <FaCalendarAlt className="sidebar-icon" />
          Appointments
        </button>

        <button
          className={`sidebar-btn ${section === "articles" ? "active" : ""}`}
          onClick={() => setSection("articles")}
        >
          <FaNewspaper className="sidebar-icon" />
          Articles
        </button>

        {/* NEW SHOP */}
        <button
          className={`sidebar-btn ${section === "shop" ? "active" : ""}`}
          onClick={() => setSection("shop")}
        >
          <FaShoppingCart className="sidebar-icon" />
          Shop
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="content">
        {section === "pets" && <AdminPets />}
        {section === "appointments" && <AdminAppointments />}
        {section === "articles" && <AdminArticles />}
        {section === "shop" && <AdminShop />}
      </div>

    </div>
  );
}