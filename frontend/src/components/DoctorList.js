import React from "react";
import DoctorItem from "./DoctorItem";

function DoctorList({ doctors, fetchDoctors, setEditingDoctor }) {
  return (
    <div style={styles.list}>
      {doctors.map((doctor) => (
        <DoctorItem
          key={doctor._id}
          doctor={doctor}
          fetchDoctors={fetchDoctors}
          setEditingDoctor={setEditingDoctor}
        />
      ))}
    </div>
  );
}

const styles = {
  list: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" },
};

export default DoctorList;