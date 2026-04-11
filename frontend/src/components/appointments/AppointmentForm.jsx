import { useState } from "react";
import axios from "axios";
import "../../pages/Appointments.css";

export default function AppointmentForm({ refresh }) {
  const [form, setForm] = useState({
    userName: "",
    date: "",
    service: "",
  });

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userName || !form.date || !form.service) return;

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        form,
        getAuthConfig()
      );

      setForm({
        userName: "",
        date: "",
        service: "",
      });

      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">

      {/* USER */}
      <div className="form-group">
        <label>User Name</label>
        <input
          className="form-input"
          placeholder="Enter user name"
          value={form.userName}
          onChange={(e) =>
            setForm({ ...form, userName: e.target.value })
          }
        />
      </div>

      {/* DATE */}
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

      {/* SERVICE */}
      <div className="form-group full">
        <label>Service</label>
        <input
          className="form-input"
          placeholder="Vaccination / Checkup..."
          value={form.service}
          onChange={(e) =>
            setForm({ ...form, service: e.target.value })
          }
        />
      </div>

      {/* BUTTON */}
      <div className="form-actions">
        <button className="form-btn">
          Add Appointment
        </button>
      </div>

    </form>
  );
}