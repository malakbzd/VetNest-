import React, { useState, useEffect } from "react";
import { addDoctor, updateDoctor } from "../api";

function DoctorForm({ fetchDoctors, editingDoctor, setEditingDoctor }) {
  const [formData, setFormData] = useState({ name: "", specialty: "", phone: "", email: "" });

  useEffect(() => {
    if (editingDoctor) {
      setFormData({
        name: editingDoctor.name,
        specialty: editingDoctor.specialty,
        phone: editingDoctor.phone || "",
        email: editingDoctor.email || "",
      });
    } else {
      setFormData({ name: "", specialty: "", phone: "", email: "" });
    }
  }, [editingDoctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.specialty) {
      alert("Name and specialty are required");
      return;
    }

    if (editingDoctor) {
      await updateDoctor(editingDoctor._id, formData);
      setEditingDoctor(null);
    } else {
      await addDoctor(formData);
    }

    setFormData({ name: "", specialty: "", phone: "", email: "" });
    fetchDoctors();
  };

  const handleCancel = () => {
    setEditingDoctor(null);
    setFormData({ name: "", specialty: "", phone: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Full Name*"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Specialty*"
        value={formData.specialty}
        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
        style={styles.input}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        style={styles.input}
      />
      <button type="submit" style={styles.submitBtn}>
        {editingDoctor ? "Update Doctor" : "Add Doctor"}
      </button>
      {editingDoctor && (
        <button type="button" onClick={handleCancel} style={styles.cancelBtn}>
          Cancel
        </button>
      )}
    </form>
  );
}

const styles = {
  form: { display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" },
  input: { padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", flex: 1, minWidth: "150px" },
  submitBtn: { padding: "0.5rem 1rem", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  cancelBtn: { padding: "0.5rem 1rem", backgroundColor: "#95a5a6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
};

export default DoctorForm;