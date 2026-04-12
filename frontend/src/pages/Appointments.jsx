import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import "./Appointments.css";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
export default function Appointments() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const refresh = () => setRefreshFlag((prev) => !prev);

  return (
    <div className="appointments-container">
      <h1 className="appointments-title">
        <BsCalendar className="title-icon" /> My Appointments
      </h1>
      <AppointmentForm refresh={refresh} />
      <AppointmentList refresh={refreshFlag} />
    </div>
  );
}