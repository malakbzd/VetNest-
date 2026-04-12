import React, { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../api";
export default function AppointmentList({ refresh }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("Cancel this appointment?")) {
      try {
        await deleteAppointment(id);
        fetchAppointments();
      } catch (err) {
        alert("Failed to cancel");
      }
    }
  };

  if (loading) return <div className="loading">Loading your appointments...</div>;
  if (appointments.length === 0)
    return <div className="no-data">No appointments yet. Book one above!</div>;

  return (
    <div className="appointment-list">
      {appointments.map((apt) => (
        <div key={apt._id} className="appointment-card">
          <p>
            <strong>Pet:</strong> {apt.pet?.name || "Unknown"}
          </p>
          <p>
            <strong>Date:</strong> {new Date(apt.date).toLocaleString()}
          </p>
          <p>
            <strong>Reason:</strong> {apt.reason}
          </p>
          <p>
            <strong>Status:</strong>
            <span className={`status-badge status-${apt.status}`}> {apt.status}</span>
          </p>
          <div className="appointment-actions">
            <button onClick={() => handleDelete(apt._id)} className="delete-btn" title="Cancel">
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}