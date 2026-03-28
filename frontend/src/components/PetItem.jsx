import React from "react";
import { deletePet } from "../api";

function PetItem({ pet, refresh }) {
  const handleDelete = async () => {
    if (window.confirm(`Delete ${pet.name}?`)) {
      await deletePet(pet._id);
      refresh();
    }
  };

  return (
    <div style={styles.card}>
      <h3>{pet.name}</h3>
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Age:</strong> {pet.age} years</p>
      {pet.ownerName && <p><strong>Owner:</strong> {pet.ownerName}</p>}
      <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderLeft: "4px solid #27ae60"
  },
  deleteBtn: {
    marginTop: "0.5rem",
    padding: "0.3rem 0.8rem",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default PetItem;