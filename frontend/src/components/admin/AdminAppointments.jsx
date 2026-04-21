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

  // ===== FETCH + SORT + FILTER =====
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments",
        getAuthConfig()
      );

      const today = new Date();

      const filtered = res.data
        // ✅ غير المواعيد القادمة
        .filter((a) => new Date(a.date) >= today)
        // ✅ ترتيب حسب التاريخ
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setAppointments(filtered);
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
    date: a.date?.slice(0, 10), // important for input type="date"
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
    setFormData({ userName: "", date: "", service: "" });

    fetchAppointments();
  };

  // ===== HELPER: CLASS حسب التاريخ =====
  const getStatusClass = (date) => {
    const today = new Date();
    const d = new Date(date);

    const diff = (d - today) / (1000 * 60 * 60 * 24);

    if (diff < 1) return "today";       // اليوم
    if (diff <= 3) return "soon";       // قريب
    return "normal";
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
        <input
  type="date"
  value={formData.date}
  onChange={(e) =>
    setFormData({ ...formData, date: e.target.value })
  }
/>

<input
  type="text"
  placeholder="Reason"
  value={formData.reason}
  onChange={(e) =>
    setFormData({ ...formData, reason: e.target.value })
  }
/>

<select
  value={formData.status}
  onChange={(e) =>
    setFormData({ ...formData, status: e.target.value })
  }
>
  <option value="pending">Pending</option>
  <option value="confirmed">Confirmed</option>
  <option value="cancelled">Cancelled</option>
</select>    </button>
          </div>
        </form>
      )}

      {/* حالات */}
      {loading && <p className="loading">Loading...</p>}
      {!loading && appointments.length === 0 && (
        <p className="no-data">No upcoming appointments</p>
      )}

      {/* LIST */}
      <div className="appointments-list">
        {appointments.map((a) => (
          <div
            key={a._id}
            className={`appointment-card ${getStatusClass(a.date)}`}
          >
           <p><strong>User:</strong> {a.user?.name}</p>
<p><strong>Pet:</strong> {a.pet?.name}</p>
<p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
<p><strong>Reason:</strong> {a.reason}</p>
<p><strong>Status:</strong> {a.status}</p>

            <div className="appointment-actions">
              <button onClick={() => handleEdit(a)} className="edit-btn">
                <BsPencilSquare />
              </button>

              <button onClick={() => deleteAppointment(a._id)} className="delete-btn">
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