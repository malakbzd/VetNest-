import React, { useState } from "react";
import { addPet } from "../api";

function PetForm({ refresh }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !type || !age) {
      alert("Name, type, and age are required");
      return;
    }
    await addPet({ name, type, age: parseInt(age), ownerName });
    setName("");
    setType("");
    setAge("");
    setOwnerName("");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Pet Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Type (Dog, Cat, Bird...)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Age (years)"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Owner Name (optional)"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Pet</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" },
  input: { padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", flex: 1, minWidth: "150px" },
  button: { padding: "0.5rem 1rem", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }
};

export default PetForm;