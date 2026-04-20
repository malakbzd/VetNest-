import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

export default function PetItem({ pet, refresh, onEdit }) {

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${pet.name}?`)) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/pets/${pet._id}`,
        getAuthConfig()
      );
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  // 👇 format age
  const formatAge = (age, unit) => {
    if (!age || !unit) return "N/A";

    if (age === 1) {
      return `${age} ${unit.slice(0, -1)}`; // 1 year
    }

    return `${age} ${unit}`;
  };

  return (
    <div className="pet-card">
      <h3>{pet.name}</h3>

      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Age:</strong> {formatAge(pet.age, pet.ageUnit)}</p>
      {pet.ownerName && (
        <p><strong>Owner:</strong> {pet.ownerName}</p>
      )}

      <div className="pet-actions">
        <button className="edit-btn" onClick={() => onEdit(pet)}>
          <FaEdit />
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}