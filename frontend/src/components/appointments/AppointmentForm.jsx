import { useState } from "react";
import { addAppointment } from "../../api";
import "../../pages/Appointments.css";

export default function AppointmentForm({ refresh }) {
  const [form, setForm] = useState({
    date: "",
    reason: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAppointment(form);
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <input
        placeholder="Reason"
        value={form.reason}
        onChange={(e) =>
          setForm({ ...form, reason: e.target.value })
        }
      />

      <button type="submit">Add</button>
    </form>
  );
}