import { useEffect, useState } from "react";
import axios from "axios";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manage Appointments</h2>

      {appointments.map((a) => (
        <div key={a._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p>User: {a.userName}</p>
          <p>Date: {a.date}</p>
          <p>Service: {a.service}</p>

          <button onClick={() => deleteAppointment(a._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminAppointments;