import React, { useState, useEffect } from "react";
import { getPatients } from "../api";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";

function PatientDashboard() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const res = await getPatients();
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", color: "#2c3e50" }}>🐕 Patient Management</h1>
      <PatientForm fetchPatients={fetchPatients} />
      <PatientList patients={patients} fetchPatients={fetchPatients} />
    </div>
  );
}

export default PatientDashboard;