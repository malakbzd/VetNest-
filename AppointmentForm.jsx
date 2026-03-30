import React, { useState, useEffect } from "react";
import { addAppointment } from "../../api";
import { getPets } from "../../api";

export default function AppointmentForm({ refresh }) {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ pet: "", date: "", reason: "" });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPets();
        setPets(res.data);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      }
    };
    fetchPets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.pet || !form.date || !form.reason) {
      alert("Please fill all fields");
      return;
    }
    try {
      await addAppointment(form);
      setForm({ pet: "", date: "", reason: "" });
      refresh();
    } catch (err) {
      alert("Failed to book appointment");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <select
        value={form.pet}
        onChange={(e) => setForm({ ...form, pet: e.target.value })}
        style={styles.input}
        required
      >
        <option value="">Select a pet</option>
        {pets.map((pet) => (
          <option key={pet._id} value={pet._id}>
            {pet.name} ({pet.type})
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        style={styles.input}
        required
      />

      <input
        type="text"
        placeholder="Reason for visit"
        value={form.reason}
        onChange={(e) => setForm({ ...form, reason: e.target.value })}
        style={styles.input}
        required
      />

      <button type="submit" style={styles.button}>
        Book Appointment
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "500px",
    marginBottom: "2rem",
    background: "#f9f9f9",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};