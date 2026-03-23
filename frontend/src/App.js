import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import FAQsAccordion from "./components/FAQs";
import Footer from "./components/Footer";
import { getPatients } from "./api";

function App() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      console.log("FETCHING...");

      const res = await getPatients();

      console.log("DATA:", res.data);

      setPatients(res.data);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <FAQsAccordion />

      {/* 🔥 هنا ربطنا backend */}
      <div style={{ padding: "20px" }}>
        <h2>🐾 Patients</h2>

        {patients.length === 0 ? (
          <p>No patients yet</p>
        ) : (
          patients.map((p) => (
            <div key={p._id}>
              <h3>{p.name}</h3>
              <p>{p.species}</p>
              <p>{p.owner}</p>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;