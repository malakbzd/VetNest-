import React, { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../../api";

export default function AppointmentList({ refresh }) {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    try {
      await deleteAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  return (
    <div>
      {appointments.length === 0 ? (
        <p>No appointments</p>
      ) : (
        appointments.map((a) => (
          <div key={a._id}>
            <h3>{a.pet?.name}</h3>
            <p>{new Date(a.date).toLocaleString()}</p>
            <p>{a.reason}</p>

            <button onClick={() => handleDelete(a._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}