import React from "react";
import PetItem from "./PetItem";

function PetList({ pets, refresh }) {
  return (
    <div>
      {pets.map((pet) => (
        <PetItem key={pet._id} pet={pet} refresh={refresh} />
      ))}
    </div>
  );
}

export default PetList;