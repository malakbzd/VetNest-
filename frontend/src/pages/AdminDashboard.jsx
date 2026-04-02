import { useState } from "react";
import AdminPets from "../components/admin/AdminPets";
import AdminAppointments from "../components/admin/AdminAppointments";
import AdminArticles from "../components/admin/AdminArticles";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [section, setSection] = useState("pets");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <button onClick={() => setSection("pets")}>🐾 Pets</button>
        <button onClick={() => setSection("appointments")}>📅 Appointments</button>
        <button onClick={() => setSection("articles")}>📰 Articles</button>
      </div>

      {/* Content */}
      <div className="content">
        {section === "pets" && <AdminPets />}
        {section === "appointments" && <AdminAppointments />}
        {section === "articles" && <AdminArticles />}
      </div>
    </div>
  );
}