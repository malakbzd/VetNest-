import React, { useState, useEffect } from "react";
import { getPets } from "../api";
import PetForm from "./PetForm";
import PetList from "./PetList";

function PetDashboard() {
  const [pets, setPets] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchPets = async () => {
    const res = await getPets();
    setPets(res.data);
  };

  useEffect(() => {
    fetchPets();
  }, [refresh]);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", color: "#2c3e50", marginBottom: "1rem" }}>
        🐾 My Pets
      </h1>
      <PetForm refresh={handleRefresh} />
      <PetList pets={pets} refresh={handleRefresh} />
    </div>
  );
}

export default PetDashboard;