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
    <div className="pet-item">
      <h3>🐾 {pet.name}</h3>
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Age:</strong> {pet.age} years</p>
      {pet.ownerName && <p><strong>Owner:</strong> {pet.ownerName}</p>}

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default PetItem;