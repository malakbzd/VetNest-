import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../../api";
import "../../pages/Appointments.css";
export default function AppointmentList({ refreshTrigger }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getAppointments();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  return (
    <div className="appointment-list">
      {data.map((a) => (
        <div key={a._id} className="appointment-card">
          <div className="appointment-info">
            <p><strong>Date:</strong> {a.date}</p>
            <p><strong>Reason:</strong> {a.reason}</p>
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteAppointment(a._id).then(fetchData)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}