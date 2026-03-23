import React, { useState } from "react";
import { addPatient } from "../api";

function PatientForm({ fetchPatients }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [owner, setOwner] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Name is required");
      return;
    }

    await addPatient({
      name,
      species,
      owner
    });

    setName("");
    setSpecies("");
    setOwner("");

    fetchPatients();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Animal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Species"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
      />

      <input
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />

      <button>Add Patient</button>
    </form>
  );
}

export default PatientForm;