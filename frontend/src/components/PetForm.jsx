import { useState } from "react";
import axios from "axios";
import "./pets.css";

export default function PetForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    age: "",
    ageUnit: "years",
    ownerName: ""
  });

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/pets",
        form,
        getAuthConfig()
      );

      setForm({
        name: "",
        type: "",
        age: "",
        ageUnit: "years",
        ownerName: ""
      });

      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">

      {/* NAME */}
      <div className="form-group">
        <label>Pet Name</label>
        <input
          className="admin-input"
          placeholder="Enter pet name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      </div>

      {/* TYPE */}
      <div className="form-group">
        <label>Type</label>
        <input
          className="admin-input"
          placeholder="Dog, Cat..."
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        />
      </div>

      {/* AGE */}
      <div className="form-group">
        <label>Age</label>

        <div className="age-group">
          <input
            className="admin-input"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />

          <select
            className="admin-select"
            value={form.ageUnit}
            onChange={(e) =>
              setForm({ ...form, ageUnit: e.target.value })
            }
          >
            <option value="days">Days</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>

      {/* OWNER */}
      <div className="form-group">
        <label>Owner Name</label>
        <input
          className="admin-input"
          placeholder="Owner name"
          value={form.ownerName}
          onChange={(e) =>
            setForm({ ...form, ownerName: e.target.value })
          }
        />
      </div>

      {/* BUTTON */}
      <div className="form-actions">
        <button className="admin-btn">
          Add Pet
        </button>
      </div>

    </form>
  );
}