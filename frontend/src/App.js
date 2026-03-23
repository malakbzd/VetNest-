import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import FAQsAccordion from "./components/FAQs";
import Footer from "./components/Footer";

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

