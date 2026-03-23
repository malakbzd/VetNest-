import React from "react";
import { deletePatient, updatePatient } from "../api";

function PatientItem({ patient, fetchPatients }) {
  const handleDelete = async () => {
    await deletePatient(patient._id);
    fetchPatients();
  };

  const toggleComplete = async () => {
    await updatePatient(patient._id, {
      ...patient,
      completed: !patient.completed
    });
    fetchPatients();
  };

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{patient.title}</h3>
      <p>{patient.description}</p>
      <p>Status: {patient.completed ? "Treated" : "Pending"}</p>

      <button onClick={toggleComplete}>
        Mark as Treated
      </button>

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default PatientItem;