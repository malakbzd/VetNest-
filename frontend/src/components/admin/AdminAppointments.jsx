import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BsCalendar, BsTrash, BsPencilSquare } from "react-icons/bs";
import "./AdminAppointments.css";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    date: "",
    service: "",
  });

  const getAuthConfig = useCallback(() => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }), []);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments",
        getAuthConfig()
      );
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [getAuthConfig]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // ===== UPDATE =====
  const updateAppointment = async () => {
    await axios.put(
      `http://localhost:5000/api/appointments/${editingId}`,
      formData,
      getAuthConfig()
    );
  };

  // ===== DELETE =====
  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/appointments/${id}`,
        getAuthConfig()
      );
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  // ===== EDIT =====
  const handleEdit = (a) => {
    setFormData({
      userName: a.userName || "",
      date: a.date || "",
      service: a.service || "",
    });
    setEditingId(a._id);
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAppointment();
      setEditingId(null);
      setFormData({ userName: "", date: "", service: "" });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-appointments-container">
      <h2 className="admin-title">
        <BsCalendar className="title-icon" />
        Appointments
      </h2>

      {/* ===== EDIT FORM ===== */}
      {editingId && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            className="admin-input"
            type="text"
            placeholder="User"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
          />

          <input
            className="admin-input"
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
          />

          <input
            className="admin-input"
            type="text"
            placeholder="Service"
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
          />

          <div className="form-actions">
            <button className="admin-btn">Update</button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* حالات */}
      {loading && <p className="loading">Loading...</p>}

      {!loading && appointments.length === 0 && (
        <p className="no-data">No appointments yet</p>
      )}

      {/* LIST */}
      <div className="appointments-list">
        {appointments.map((a) => (
          <div key={a._id} className="appointment-card">
            <p><strong>User:</strong> {a.userName || "N/A"}</p>
            <p><strong>Date:</strong> {a.date || "N/A"}</p>
            <p><strong>Service:</strong> {a.service || "N/A"}</p>

           <div className="appointment-actions">
  <button
    className="edit-btn"
    onClick={() => handleEdit(a)}
  >
    <BsPencilSquare />
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteAppointment(a._id)}
  >
    <BsTrash />
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAppointments;