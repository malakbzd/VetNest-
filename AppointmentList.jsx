import React, { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../../api";

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
        alert("Failed to cancel appointment");
      }
    }
  };

  if (loading) return <div style={styles.loader}>Loading...</div>;

  if (appointments.length === 0) {
    return <div style={styles.empty}>No appointments yet. Book one above!</div>;
  }

  return (
    <div style={styles.list}>
      {appointments.map((apt) => (
        <div key={apt._id} style={styles.card}>
          <h3>{apt.pet?.name || "Pet not found"}</h3>
          <p>
            <strong>Date:</strong> {new Date(apt.date).toLocaleString()}
          </p>
          <p>
            <strong>Reason:</strong> {apt.reason}
          </p>
          <p>
            <strong>Status:</strong> {apt.status || "pending"}
          </p>
          <button onClick={() => handleDelete(apt._id)} style={styles.deleteBtn}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "1rem",
    background: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  deleteBtn: {
    marginTop: "0.5rem",
    padding: "0.4rem 0.8rem",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    color: "#7f8c8d",
    marginTop: "2rem",
  },
  loader: {
    textAlign: "center",
    padding: "2rem",
    color: "#7f8c8d",
  },
};