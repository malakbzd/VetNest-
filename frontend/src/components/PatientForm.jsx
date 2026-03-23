import React, { useState } from "react";
import { addPatient } from "../api";

function PatientForm({ fetchPatients }) {
  const [form, setForm] = useState({
    name: "",
    species: "",
    owner: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) return;

    await addPatient(form);

    setForm({ name: "", species: "", owner: "" });
    fetchPatients();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Animal Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Species (Dog, Cat...)"
        value={form.species}
        onChange={(e) =>
          setForm({ ...form, species: e.target.value })
        }
      />

      <input
        placeholder="Owner Name"
        value={form.owner}
        onChange={(e) =>
          setForm({ ...form, owner: e.target.value })
        }
      />

      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;