import React from "react";
import PetItem from "./PetItem";

function PetList({ pets, refresh, onEdit }) {
  return (
    <div className="pets-list">
      {pets.length === 0 ? (
        <p className="no-data">No pets found</p>
      ) : (
        pets.map((pet) => (
          <PetItem
            key={pet._id}
            pet={pet}
            refresh={refresh}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default PetList;