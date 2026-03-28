import { useEffect, useState } from "react";
import { getAppointments, addAppointment, updateAppointment, deleteAppointment } from "../../api";

export default function AppointmentList() {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const res = await getAppointments();
    setData(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {data.map((a) => (
        <div key={a._id}>
          <p>{a.date} - {a.reason}</p>
          <button onClick={() => deleteAppointment(a._id).then(fetch)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}