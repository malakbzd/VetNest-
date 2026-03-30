import React, { useState } from "react";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentList from "../components/appointments/AppointmentList";

export default function Appointments() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ fontSize: "2rem", color: "#2c3e50", marginBottom: "1rem", textAlign: "center" }}>
        My Appointments
      </h2>
      <AppointmentForm refresh={handleRefresh} />
      <AppointmentList key={refresh} refresh={refresh} />
    </div>
  );
}