import React, { useState, useEffect } from "react";
import { addAppointment, getPets } from "../../api";

export default function AppointmentForm({ refresh }) {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    pet: "",
    date: "",
    reason: "",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPets();
        setPets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.pet || !form.date || !form.reason) {
      alert("Fill all fields");
      return;
    }

    try {
      await addAppointment(form); // ✅ token يروح من api.js
      setForm({ pet: "", date: "", reason: "" });
      refresh();
    } catch (err) {
      console.error(err);
      alert("Add failed ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={form.pet}
        onChange={(e) =>
          setForm({ ...form, pet: e.target.value })
        }
      >
        <option value="">Select pet</option>
        {pets.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Reason"
        value={form.reason}
        onChange={(e) =>
          setForm({ ...form, reason: e.target.value })
        }
      />

      <button>Add Appointment</button>
    </form>
  );
}