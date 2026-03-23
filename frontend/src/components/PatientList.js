import React from "react";
import PatientItem from "./PatientItem";

function PatientList({ patients, fetchPatients }) {
  return (
    <div>
      {patients.map((p) => (
        <PatientItem
          key={p._id}
          patient={p}
          fetchPatients={fetchPatients}
        />
      ))}
    </div>
  );
}

export default PatientList;