import { useState } from "react";
import axios from "axios";
import "../../pages/Appointments.css";

export default function AppointmentForm({ refresh }) {
  const [form, setForm] = useState({
    userName: "",
    date: "",
    service: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userName || !form.date || !form.service) {
      alert("Fill all fields ❗");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        form
        // 🟢 جرب بدون auth أولاً
      );

      alert("Added ✅");

      setForm({
        userName: "",
        date: "",
        service: "",
      });

      refresh();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">

      <div className="form-group">
        <label>User Name</label>
        <input
          className="form-input"
          value={form.userName}
          onChange={(e) =>
            setForm({ ...form, userName: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          className="form-input"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />
      </div>

      <div className="form-group full">
        <label>Service</label>
        <input
          className="form-input"
          value={form.service}
          onChange={(e) =>
            setForm({ ...form, service: e.target.value })
          }
        />
      </div>

      <div className="form-actions">
        <button className="form-btn">
          Add Appointment
        </button>
      </div>

    </form>
  );
}