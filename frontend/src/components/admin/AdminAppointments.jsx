import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BsCalendar, BsTrash, BsPencilSquare } from "react-icons/bs";
import "./AdminAppointments.css";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    reason: "",
    status: "pending",
  });

  const getAuthConfig = useCallback(() => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }), []);

  // ===== FETCH =====
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments",
        getAuthConfig()
      );

      const today = new Date();

      const sorted = res.data.sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);

setAppointments(sorted);
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

    await axios.delete(
      `http://localhost:5000/api/appointments/${id}`,
      getAuthConfig()
    );

    fetchAppointments();
  };

  // ===== EDIT =====
  const handleEdit = (a) => {
    setFormData({
      date: a.date?.slice(0, 10),
      reason: a.reason || "",
      status: a.status || "pending",
    });
    setEditingId(a._id);
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateAppointment();

    setEditingId(null);
    setFormData({ date: "", reason: "", status: "pending" });

    fetchAppointments();
  };

  return (
    <div className="admin-appointments-container">
      <h2 className="admin-title">
        <BsCalendar className="title-icon" />
        Appointments
      </h2>

      {/* FORM */}
      {editingId && (
        <form onSubmit={handleSubmit} className="admin-form">

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
            placeholder="Reason"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
          />

          <select
            className="admin-input"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>

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

      {/* LIST */}
      {loading && <p className="loading">Loading...</p>}

      {!loading && appointments.length === 0 && (
        <p className="no-data">No appointments</p>
      )}

      <div className="appointments-list">
        {appointments.map((a) => (
          <div key={a._id} className="appointment-card">

            <p><strong>User:</strong> {a.user?.name}</p>
            <p>
  <strong>Pet:</strong> {a.pet?.name} ({a.pet?.type})
</p>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
            <p><strong>Reason:</strong> {a.reason}</p>
            <p><strong>Status:</strong> {a.status}</p>

            <div className="appointment-actions">

              <button className="action-btn edit" onClick={() => handleEdit(a)}>
                <BsPencilSquare />
              </button>

              <button className="action-btn delete" onClick={() => deleteAppointment(a._id)}>
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