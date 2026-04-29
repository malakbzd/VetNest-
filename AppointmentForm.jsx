import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addAppointment } from "../api";
import { getPets } from "../api";

export default function AppointmentForm({ refresh }) {
  const [pets, setPets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [reason, setReason] = useState("");
  const [petId, setPetId] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPets();
        setPets(res.data);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      }
    };
    fetchPets();
  }, []);

  // Disable weekends (Saturday = 6, Sunday = 0)
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!petId || !selectedDate || !selectedTime || !reason) {
      alert("Please fill all fields");
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateTimeString = `${year}-${month}-${day}T${selectedTime}`;

    try {
      await addAppointment({ pet: petId, date: dateTimeString, reason });
      setPetId("");
      setSelectedDate(null);
      setSelectedTime("10:00");
      setReason("");
      refresh();
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || "Failed to book appointment.";
      alert(msg);
      console.error("Booking error:", err);
    }
  };

  const timeOptions = [];
  for (let h = 8; h <= 18; h++) {
    const hour = String(h).padStart(2, '0');
    timeOptions.push(`${hour}:00`);
    timeOptions.push(`${hour}:30`);
  }

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="form-group">
        <label>Select Pet</label>
        <select
          className="form-select"
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
          required
        >
          <option value="">Choose a pet</option>
          {pets.map((pet) => (
            <option key={pet._id} value={pet._id}>
              {pet.name} ({pet.type})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          filterDate={isWeekday}
          placeholderText="Select a weekday (Mon-Fri)"
          className="form-input"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          required
        />
      </div>

      <div className="form-group">
        <label>Time</label>
        <select
          className="form-select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          required
        >
          {timeOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="form-group full">
        <label>Reason</label>
        <textarea
          className="form-textarea"
          placeholder="Describe the reason for visit"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Book Appointment
        </button>
      </div>
    </form>
  );
}