import { useEffect, useState } from "react";
import { getPets } from "../../api";

export default function AdminPets() {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    const res = await getPets();
    setPets(res.data);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      <h2>🐾 Pets</h2>

      {pets.map((p) => (
        <div key={p._id}>
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}