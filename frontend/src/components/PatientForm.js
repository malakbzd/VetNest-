import React, { useState } from "react";
import { addPatient } from "../api";

function PatientForm({ fetchPatients }) {
  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPatient({ ...form, completed: false });
    setForm({ title: "", description: "" });
    fetchPatients();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Animal Name"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />
      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;