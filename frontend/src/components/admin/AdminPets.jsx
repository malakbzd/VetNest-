import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { FaPaw, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import "./AdminPets.css";

export default function AdminPets() {
  const formRef = useRef(null);

  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [editingPet, setEditingPet] = useState(null);

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
      console.error("Fetch pets error:", err);
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
      (p.name || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPets(filtered);
  }, [search, pets]);

  // ===== DELETE =====
  const deletePet = async (id) => {
    if (!window.confirm("Delete this pet?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/pets/${id}`,
        getAuthConfig()
      );

      setPets((prev) => prev.filter((p) => p._id !== id));
      setFilteredPets((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ===== UPDATE =====
  const updatePet = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/pets/${editingPet._id}`,
        editingPet,
        getAuthConfig()
      );

      setEditingPet(null);
      fetchPets();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // ===== EDIT =====
  const handleEdit = (p) => {
    setEditingPet(p);

    // 🔥 scroll to edit form + focus
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const input = formRef.current?.querySelector("input");
      input?.focus();
    });
  };

  return (
    <div className="admin-pets-container">

      {/* TITLE */}
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

      {/* EDIT FORM */}
      {editingPet && (
        <div ref={formRef} className="edit-box">
          <h3>Edit Pet</h3>

          <input
            value={editingPet.name}
            onChange={(e) =>
              setEditingPet({ ...editingPet, name: e.target.value })
            }
            placeholder="Name"
          />

          <input
            value={editingPet.type}
            onChange={(e) =>
              setEditingPet({ ...editingPet, type: e.target.value })
            }
            placeholder="Type"
          />

          <input
            type="number"
            value={editingPet.age}
            onChange={(e) =>
              setEditingPet({ ...editingPet, age: e.target.value })
            }
            placeholder="Age"
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="button" onClick={updatePet}>
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditingPet(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && <p className="loading">Loading...</p>}

      {/* EMPTY */}
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

              <button
                type="button"
                className="action-btn edit"
                onClick={() => handleEdit(p)}
              >
                <FaEdit />
              </button>

              <button
                type="button"
                className="action-btn delete"
                onClick={() => deletePet(p._id)}
              >
                <FaTrash />
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}