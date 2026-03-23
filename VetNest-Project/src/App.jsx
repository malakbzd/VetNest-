
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import AboutUs from "./AboutUs";
import Testimonials from "./Testimonials";
import FAQs from "./FAQs";
import Footer from "./Footer";
import Loader from "./Loader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Services />
          <WhyChooseUs />
          <AboutUs />
          <Testimonials />
          <FAQs />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;