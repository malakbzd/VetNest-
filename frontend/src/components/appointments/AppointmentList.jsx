import { useEffect, useState } from "react";
import axios from "axios";
import { getAppointments, deleteAppointment } from "../../api";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../../pages/Appointments.css";

export default function AppointmentList({ refreshTrigger }) {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    userName: "",
    date: "",
    service: "",
  });

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchData = async () => {
    const res = await getAppointments();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  // ===== DELETE =====
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    await deleteAppointment(id);
    fetchData();
  };

  // ===== EDIT =====
  const handleEdit = (a) => {
    setForm({
      userName: a.userName || "",
      date: a.date || "",
      service: a.service || "",
    });
    setEditingId(a._id);
  };

  // ===== UPDATE =====
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${editingId}`,
        form,
        getAuthConfig()
      );

      setEditingId(null);
      setForm({ userName: "", date: "", service: "" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      {/* ===== EDIT FORM ===== */}
      {editingId && (
        <form onSubmit={handleUpdate} className="appointment-form">

          <div className="form-group">
            <label>User</label>
            <input
              className="form-input"
              value={form.userName}
              onChange={(e) =>
                setForm({ ...form, userName: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-input"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
          </div>

          <div className="form-group full">
            <label>Service</label>
            <input
              className="form-input"
              value={form.service}
              onChange={(e) =>
                setForm({ ...form, service: e.target.value })
              }
            />
          </div>

          <div className="form-actions">
            <button className="form-btn">Update</button>

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

      {/* ===== LIST ===== */}
      <div className="appointment-list">
        {data.map((a) => (
          <div key={a._id} className="appointment-card">

            <div className="appointment-info">
              <p><strong>User:</strong> {a.userName}</p>
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Service:</strong> {a.service}</p>
            </div>

            <div className="appointment-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(a)}
              >
                <FaEdit />
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(a._id)}
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