import React, { useState, useEffect } from "react";
import { getPets, addPet, deletePet } from "../api";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", age: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get logged‑in user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await getPets();
      setPets(res.data);
    } catch (err) {
      console.error("Failed to fetch pets:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.age) {
      alert("Name, type and age are required");
      return;
    }
    try {
      await addPet({
        name: form.name,
        type: form.type,
        age: parseInt(form.age),
      });
      setForm({ name: "", type: "", age: "" });
      fetchPets();
    } catch (err) {
      console.error("Failed to add pet:", err);
      alert("Could not add pet");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this pet?")) {
      try {
        await deletePet(id);
        fetchPets();
      } catch (err) {
        console.error("Failed to delete pet:", err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{user ? `${user.name}'s Pets` : "My Pets"}</h2>

      {/* Add pet form - vertical */}
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          type="text"
          placeholder="Pet name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Type (Dog, Cat, etc.)"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Age (years)"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Add Pet
        </button>
      </form>

      {/* Pet list */}
      {pets.length === 0 ? (
        <p style={styles.empty}>No pets yet. Add one above!</p>
      ) : (
        <div style={styles.list}>
          {pets.map((pet) => (
            <div key={pet._id} style={styles.card}>
              <h3>{pet.name}</h3>
              <p>{pet.type} – {pet.age} years</p>
              <button onClick={() => handleDelete(pet._id)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#2c3e50",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
    background: "#f9f9f9",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  addButton: {
    padding: "0.75rem",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s",
  },
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
  deleteButton: {
    marginTop: "0.5rem",
    padding: "0.4rem 0.8rem",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  empty: {
    textAlign: "center",
    color: "#7f8c8d",
    marginTop: "2rem",
  },
};