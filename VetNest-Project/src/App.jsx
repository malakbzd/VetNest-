
import React, { useState, useEffect } from "react";
import Navbar from "../../frontend/src/components/Navbar";
import Hero from "../../frontend/src/components/Hero";
import Services from "../../frontend/src/components/Services";
import WhyChooseUs from "../../frontend/src/components/WhyChooseUs";
import AboutUs from "../../frontend/src/components/AboutUs";
import Testimonials from "../../frontend/src/components/Testimonials";
import FAQs from "../../frontend/src/components/FAQs";
import Footer from "../../frontend/src/components/Footer";
import Loader from "../../frontend/src/components/Loader";

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