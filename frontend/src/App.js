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

export default App;

