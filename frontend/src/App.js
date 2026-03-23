import React from "react";
import Navbar from "../../VetNest-Project/src/Navbar";
import Hero from "../../VetNest-Project/src/Hero";
import AboutUs from "../../VetNest-Project/src/AboutUs";
import FAQsAccordion from "../../VetNest-Project/src/FAQs";
import Footer from "../../VetNest-Project/src/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <FAQsAccordion />
      <Footer />
    </>
  );
}
const fetchPatients = async () => {
  try {
    const res = await getPatients();
    console.log("DATA:", res.data); 
    setPatients(res.data);
  } catch (error) {
    console.error("ERROR:", error);
  }
};
export default App;

