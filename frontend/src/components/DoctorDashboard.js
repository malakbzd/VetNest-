import React, { useState, useEffect } from "react";
import { getDoctors } from "../api";
import DoctorForm from "./DoctorForm";
import DoctorList from "./DoctorList";

function DoctorDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const fetchDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", color: "#2c3e50" }}>👩‍⚕️ Doctor Management</h1>
      <DoctorForm
        fetchDoctors={fetchDoctors}
        editingDoctor={editingDoctor}
        setEditingDoctor={setEditingDoctor}
      />
      <DoctorList
        doctors={doctors}
        fetchDoctors={fetchDoctors}
        setEditingDoctor={setEditingDoctor}
      />
    </div>
  );
}

export default DoctorDashboard;