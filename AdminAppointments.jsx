import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { FaCalendarAlt, FaTrash, FaEdit } from "react-icons/fa";
import "./AdminAppointments.css";

function AdminAppointments() {
  const formRef = useRef(null);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchDate, setSearchDate] = useState(null); // Store as Date object

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: null,
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
      {
        date: formData.date ? formData.date.toISOString().split('T')[0] : "",
        reason: formData.reason,
        status: formData.status,
      },
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
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ===== EDIT =====
  const handleEdit = (a) => {
    setFormData({
      date: a.date ? new Date(a.date) : null,
      reason: a.reason || "",
      status: a.status || "pending",
    });
    setEditingId(a._id);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAppointment();
      setEditingId(null);
      setFormData({ date: null, reason: "", status: "pending" });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  // Filter appointments by date
  const filteredAppointments = searchDate
    ? appointments.filter(a => {
        const aptDate = new Date(a.date).toDateString();
        const search = searchDate.toDateString();
        return aptDate === search;
      })
    : appointments;

  return (
    <div className="admin-appointments-container">

      <h2 className="admin-title">
        <FaCalendarAlt className="title-icon" />
        Appointments
      </h2>

      {/* SEARCH BAR */}
      <div className="admin-search-bar">
        <DatePicker
          selected={searchDate}
          onChange={(date) => setSearchDate(date)}
          className="admin-search-input"
          placeholderText="Filter by date"
          dateFormat="yyyy-MM-dd"
          isClearable
        />
        {searchDate && (
          <button onClick={() => setSearchDate(null)} className="clear-search">
            Clear
          </button>
        )}
      </div>

      {/* EDIT FORM */}
      {editingId && (
        <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            className="admin-input"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date"
          />
          <input
            className="admin-input"
            type="text"
            placeholder="Reason"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          />
          <select
            className="admin-input"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="form-actions">
            <button className="admin-btn" type="submit">Update</button>
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
      {!loading && filteredAppointments.length === 0 && (
        <p className="no-data">No appointments found</p>
      )}

      <div className="appointments-list">
        {filteredAppointments.map((a) => (
          <div key={a._id} className="appointment-card">
            <p><strong>User:</strong> {a.user?.name}</p>
            <p><strong>Pet:</strong> {a.pet?.name} ({a.pet?.type})</p>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
            <p><strong>Reason:</strong> {a.reason}</p>
            <p><strong>Status:</strong> {a.status}</p>
            <div className="appointment-actions">
              <button
                type="button"
                className="action-btn edit"
                onClick={() => handleEdit(a)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="action-btn delete"
                onClick={() => deleteAppointment(a._id)}
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

export default AdminAppointments;