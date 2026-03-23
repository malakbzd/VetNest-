import React, { useEffect, useState } from "react";
import { getPatients } from "./api";
import PatientList from "./components/PatientList";
import PatientForm from "./components/PatientForm";

function App() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const res = await getPatients();
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🐾 Veterinary Clinic Manager</h1>
      <PatientForm fetchPatients={fetchPatients} />
      <PatientList patients={patients} fetchPatients={fetchPatients} />
    </div>
  );
}

export default App;