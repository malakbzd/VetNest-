import { useEffect, useState } from "react";
export default function PetList() {
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
      {pets.map((p) => (
        <div key={p._id}>
          <h4>{p.name}</h4>
          <p>{p.type} - {p.age}</p>
          <button onClick={() => deletePet(p._id).then(fetchPets)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}