import { useState } from "react";
import "./Appointments.css";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentList from "../components/appointments/AppointmentList";
import { BsCalendar } from "react-icons/bs";

export default function Appointments() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refresh = () => setRefreshFlag(!refreshFlag);

  return (
    <div className="admin-appointments-container">

      {/* TITLE (Admin Style) */}
      <h2 className="admin-title">
        <BsCalendar className="title-icon" />
        Appointments
      </h2>

      {/* FORM */}
      <AppointmentForm refresh={refresh} />

      {/* LIST */}
      <AppointmentList refreshTrigger={refreshFlag} />

    </div>
  );
}