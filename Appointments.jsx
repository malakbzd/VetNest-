import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentList from "../components/appointments/AppointmentList";

export default function Appointments() {
  return (
    <div>
      <h2>Appointments</h2>
      <AppointmentForm refresh={() => window.location.reload()} />
      <AppointmentList />
    </div>
  );
}