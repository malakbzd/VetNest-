import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaPaw, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import "./AdminPets.css";

export default function AdminPets() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const getAuthConfig = useCallback(() => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }), []);

  // ===== FETCH =====
  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/pets",
        getAuthConfig()
      );
      setPets(res.data);
      setFilteredPets(res.data);
    } catch (err) {
      console.error(err);
      setPets([]);
    } finally {
      setLoading(false);
    }
  }, [getAuthConfig]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  // ===== SEARCH =====
  useEffect(() => {
    const filtered = pets.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPets(filtered);
  }, [search, pets]);

  // ===== DELETE =====
  const deletePet = async (id) => {
    if (!window.confirm("Delete this pet?")) return;

    await axios.delete(
      `http://localhost:5000/api/pets/${id}`,
      getAuthConfig()
    );
    fetchPets();
  };

  return (
    <div className="admin-pets-container">
      <h2 className="admin-title">
        <FaPaw className="title-icon" />
        Pets
      </h2>

      {/* SEARCH */}
      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          placeholder="Search pet..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* حالات */}
      {loading && <p className="loading">Loading...</p>}
      {!loading && filteredPets.length === 0 && (
        <p className="no-data">No pets found</p>
      )}

      {/* LIST */}
      <div className="pets-list">
        {filteredPets.map((p) => (
          <div key={p._id} className="pet-card">
            <h3>{p.name}</h3>
            <p><strong>Type:</strong> {p.type}</p>
            <p><strong>Age:</strong> {p.age} {p.ageUnit}</p>
           <p>
  <strong>Owner:</strong> {p.owner?.name} ({p.owner?.email})
</p>

           <div className="pet-actions">

  <button className="action-btn edit">
    <FaEdit />
  </button>

  <button className="action-btn delete" onClick={() => deletePet(p._id)}>
    <FaTrash />
  </button>

</div>
          </div>
        ))}
      </div>
    </div>
  );
}