import { useState } from "react";
import "./Appointments.css";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import { BsCalendar } from "react-icons/bs";

export default function Appointments() {
const [refreshFlag, setRefreshFlag] = useState(false);

const refresh = () => setRefreshFlag(!refreshFlag);

return ( <div className="appointments-container"> <h1 className="appointments-title"> <BsCalendar className="title-icon" /> My Appointments </h1>


  <AppointmentForm refresh={refresh} />
  <AppointmentList refresh={refreshFlag} />
</div>


);
}
