import React, { useEffect, useState } from "react";
import axios from "axios";
import "./main.css";

export default function PetAppointmentPage() {
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [petForm, setPetForm] = useState({
    name: "",
    type: "",
    age: "",
    ageUnit: "years",
  });

  const [appointmentForm, setAppointmentForm] = useState({
    pet: "",
    date: "",
    reason: "",
  });

  const startEdit = (a) => {
  setAppointmentForm({
    pet: a.pet?._id,
    date: a.date.split("T")[0],
    reason: a.reason,
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};
  const deleteAppointment = async (id) => {
  if (!window.confirm("Delete this appointment?")) return;

  await axios.delete(
    `http://localhost:5000/api/appointments/${id}`,
    getAuthConfig()
  );

  setRefresh(!refresh);
};
  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // ===== FETCH PETS =====
  const fetchPets = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/pets",
      getAuthConfig()
    );
    setPets(res.data);
  };

  // ===== FETCH APPOINTMENTS =====
  const fetchAppointments = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/appointments",
      getAuthConfig()
    );
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchPets();
    fetchAppointments();
  }, [refresh]);

  // ===== CREATE PET =====
  const createPet = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/pets",
      petForm,
      getAuthConfig()
    );

    setAppointmentForm((prev) => ({
      ...prev,
      pet: res.data._id,
    }));

    setPetForm({ name: "", type: "", age: "", ageUnit: "years" });
    setRefresh(!refresh);
  };

  // ===== CREATE APPOINTMENT =====
  const createAppointment = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/appointments",
      appointmentForm,
      getAuthConfig()
    );

    setAppointmentForm({ pet: "", date: "", reason: "" });
    setRefresh(!refresh);
    alert("Appointment created ✅");
  };

  return (
    <div className="pets-container">

      <h1 className="pets-title">🐾 Pet & Appointment System</h1>

      {/* ================= PET FORM ================= */}
      <form onSubmit={createPet} className="pets-form">

        <div className="form-group">
          <label>Name</label>
          <input
            className="form-input"
            value={petForm.name}
            onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <input
            className="form-input"
            value={petForm.type}
            onChange={(e) => setPetForm({ ...petForm, type: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            className="form-input"
            type="number"
            value={petForm.age}
            onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Unit</label>
          <select
            className="form-select"
            value={petForm.ageUnit}
            onChange={(e) =>
              setPetForm({ ...petForm, ageUnit: e.target.value })
            }
          >
            <option value="days">Days</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="submit-btn">Add Pet</button>
        </div>
      </form>

      {/* ================= APPOINTMENT FORM ================= */}
      <form onSubmit={createAppointment} className="appointment-form">

        <div className="form-group">
          <label>Pet</label>
          <select
            className="form-select"
            value={appointmentForm.pet}
            onChange={(e) =>
              setAppointmentForm({ ...appointmentForm, pet: e.target.value })
            }
          >
            <option value="">Select Pet</option>
            {pets.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            className="form-input"
            type="date"
            value={appointmentForm.date}
            onChange={(e) =>
              setAppointmentForm({ ...appointmentForm, date: e.target.value })
            }
          />
        </div>

        <div className="form-group full">
          <label>Reason</label>
          <input
            className="form-input"
            value={appointmentForm.reason}
            onChange={(e) =>
              setAppointmentForm({
                ...appointmentForm,
                reason: e.target.value,
              })
            }
          />
        </div>

        <div className="form-actions">
          <button className="submit-btn">Book Appointment</button>
        </div>
      </form>

      {/* ================= APPOINTMENTS LIST ================= */}
   {/* ================= PETS LIST ================= */}
<h2 className="appointments-title">Pets</h2>

<div className="appointment-list">
  {pets.length === 0 ? (
    <div className="no-data">No pets yet</div>
  ) : (
    pets.map((p) => (
      <div key={p._id} className="appointment-card">
        <p><strong>Name:</strong> {p.name}</p>
        <p><strong>Type:</strong> {p.type}</p>
        <p><strong>Age:</strong> {p.age} {p.ageUnit}</p>
      </div>
    ))
  )}
</div>


{/* ================= APPOINTMENTS LIST ================= */}
<h2 className="appointments-title">Appointments</h2>

<div className="appointment-list">
  {appointments.length === 0 ? (
    <div className="no-data">No appointments yet</div>
  ) : (
    appointments.map((a) => (
      <div key={a._id} className="appointment-card">

        <p>
          <strong>Pet:</strong> {a.pet?.name || "Unknown"}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(a.date).toLocaleDateString()}
        </p>

        <p>
          <strong>Reason:</strong> {a.reason}
        </p>

        <div className="appointment-actions">
          <button className="edit-btn" onClick={() => startEdit(a)}>
            ✏️
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteAppointment(a._id)}
          >
            🗑️
          </button>
        </div>

      </div>
    ))
  )}
</div>

    </div>
  );
}