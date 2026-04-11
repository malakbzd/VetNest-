import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaPaw, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import "./AdminPets.css";

export default function AdminPets() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    owner: "",
  });

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

  // ===== CREATE =====
  const createPet = async () => {
    await axios.post(
      "http://localhost:5000/api/pets",
      formData,
      getAuthConfig()
    );
  };

  // ===== UPDATE =====
  const updatePet = async () => {
    await axios.put(
      `http://localhost:5000/api/pets/${editingId}`,
      formData,
      getAuthConfig()
    );
  };

  // ===== DELETE =====
  const deletePet = async (id) => {
    if (!window.confirm("Delete this pet?")) return;

    await axios.delete(
      `http://localhost:5000/api/pets/${id}`,
      getAuthConfig()
    );
    fetchPets();
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) await updatePet();
      else await createPet();

      setFormData({ name: "", type: "", age: "", owner: "" });
      setEditingId(null);
      fetchPets();
    } catch (err) {
      console.error(err);
    }
  };

  // ===== EDIT =====
  const handleEdit = (p) => {
    setFormData({
      name: p.name,
      type: p.type,
      age: p.age,
      owner: p.owner,
    });
    setEditingId(p._id);
  };

  return (
    <div className="admin-pets-container">
      <h2 className="admin-title">
        <FaPaw className="title-icon" />
        Pets
      </h2>

      {/* ===== SEARCH ===== */}
      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          placeholder="Search pet by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          className="admin-input"
          placeholder="Pet Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          className="admin-input"
          placeholder="Type"
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value })
          }
        />

        <input
          className="admin-input"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: e.target.value })
          }
        />

        <input
          className="admin-input"
          placeholder="Owner Name"
          value={formData.owner}
          onChange={(e) =>
            setFormData({ ...formData, owner: e.target.value })
          }
        />

        <div className="form-actions">
          <button className="admin-btn">
            {editingId ? "Update" : "Add Pet"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* حالات */}
      {loading && <p className="loading">Loading...</p>}
      {!loading && filteredPets.length === 0 && (
        <p className="no-data">No pets found</p>
      )}

      {/* ===== LIST ===== */}
      <div className="pets-list">
        {filteredPets.map((p) => (
          <div key={p._id} className="pet-card">
            <h3>{p.name}</h3>
            <p><strong>Type:</strong> {p.type}</p>
            <p><strong>Age:</strong> {p.age}</p>
            <p><strong>Owner:</strong> {p.owner}</p>

            <div className="pet-actions">
              <button onClick={() => handleEdit(p)} className="edit-btn">
                <FaEdit />
              </button>

              <button onClick={() => deletePet(p._id)} className="delete-btn">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}