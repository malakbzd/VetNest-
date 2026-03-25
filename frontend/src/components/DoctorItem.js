import React from "react";
import { deleteDoctor } from "../api";

function DoctorItem({ doctor, fetchDoctors, setEditingDoctor }) {
  const handleDelete = async () => {
    if (window.confirm("Delete this doctor?")) {
      await deleteDoctor(doctor._id);
      fetchDoctors();
    }
  };

  return (
    <div style={styles.card}>
      <h3>{doctor.name}</h3>
      <p><strong>Specialty:</strong> {doctor.specialty}</p>
      <p><strong>Phone:</strong> {doctor.phone || "—"}</p>
      <p><strong>Email:</strong> {doctor.email || "—"}</p>
      <div style={styles.actions}>
        <button onClick={() => setEditingDoctor(doctor)} style={styles.editBtn}>Edit</button>
        <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderLeft: "4px solid #3498db",
  },
  actions: { display: "flex", gap: "0.5rem", marginTop: "0.8rem" },
  editBtn: { padding: "0.3rem 0.8rem", backgroundColor: "#f39c12", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  deleteBtn: { padding: "0.3rem 0.8rem", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
};

export default DoctorItem;