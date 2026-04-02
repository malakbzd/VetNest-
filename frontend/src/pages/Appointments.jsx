import { useState } from "react";
import "./Appointments.css";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentList from "../components/appointments/AppointmentList";

export default function Appointments() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refresh = () => setRefreshFlag(!refreshFlag);

  return (
    <div className="appointments-container">
      <h2 className="appointments-title">🐾 Appointments</h2>
      <AppointmentForm refresh={refresh} />
      <AppointmentList refreshTrigger={refreshFlag} />
    </div>
  );
}