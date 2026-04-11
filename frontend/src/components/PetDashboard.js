import React, { useState, useEffect } from "react";
import { getPets } from "../api";
import PetForm from "./PetForm";
import PetList from "./PetList";
import { FaPaw } from "react-icons/fa"; // 👈 icon
import "./pets.css";

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
    <div className="pets-container">
      <h2 className="pets-title">
        <FaPaw className="title-icon" /> My Pets
      </h2>

      <div className="pets-card">
        <PetForm refresh={handleRefresh} />
      </div>

      <div className="pets-list">
        <PetList pets={pets} refresh={handleRefresh} />
      </div>
    </div>
  );
}

export default PetDashboard;