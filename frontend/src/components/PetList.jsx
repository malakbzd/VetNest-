import React from "react";
import PetItem from "./PetItem";

function PetList({ pets, refresh }) {
  if (pets.length === 0) {
    return <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>No pets yet. Add your first pet above!</div>;
  }

  return (
    <div style={styles.list}>
      {pets.map((pet) => (
        <PetItem key={pet._id} pet={pet} refresh={refresh} />
      ))}
    </div>
  );
}

const styles = {
  list: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }
};

export default PetList;