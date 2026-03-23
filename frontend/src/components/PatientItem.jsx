import React from "react";
import { deletePatient } from "../api";

function PatientItem({ patient, fetchPatients }) {
  const handleDelete = async () => {
    await deletePatient(patient._id);
    fetchPatients();
  };

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{patient.name}</h3>
      <p>Species: {patient.species}</p>
      <p>Owner: {patient.owner}</p>

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default PatientItem;