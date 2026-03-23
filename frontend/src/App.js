
import React from "react";
import Navbar from "../../VetNest-Project/src/Navbar";
import Hero from "../../VetNest-Project/src/Hero";
import AboutUs from "../../VetNest-Project/src/AboutUs";
import FAQsAccordion from "../../VetNest-Project/src/FAQs";
import Footer from "../../VetNest-Project/src/Footer";

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