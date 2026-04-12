import React, { useState, useEffect } from "react";
import { addAppointment } from "../api";
import { getPets } from "../api";
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
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="form-group">
        <label>Select Pet</label>
        <select
          className="form-select"
          value={form.pet}
          onChange={(e) => setForm({ ...form, pet: e.target.value })}
          required
        >
          <option value="">Choose a pet</option>
          {pets.map((pet) => (
            <option key={pet._id} value={pet._id}>
              {pet.name} ({pet.type})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date & Time</label>
        <input
          type="datetime-local"
          className="form-input"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>

      <div className="form-group full">
        <label>Reason</label>
        <textarea
          className="form-textarea"
          placeholder="Describe the reason for visit"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Book Appointment
        </button>
      </div>
    </form>
  );
}