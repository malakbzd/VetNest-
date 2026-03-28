import { useState } from "react";
import { addAppointment } from "../../services/appointmentService";

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
    <form onSubmit={handleSubmit}>
      <input type="date"
        onChange={(e) => setForm({...form, date: e.target.value})} />

      <input placeholder="Reason"
        onChange={(e) => setForm({...form, reason: e.target.value})} />

      <button>Add</button>
    </form>
  );
}