// Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import this
import heroImg from "../assets/hero.jpg";
import "./Hero.css";
import catImg from "../assets/cat.jpg";

const Hero = () => {
  const navigate = useNavigate(); // ✅ initialize

 const handleReservation = () => {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  if (!token) {
    console.log("Going to register");
    navigate("/register");
  } else {
    console.log("Going to appointments");
    navigate("/appointments");
  }
};
  const scrollToAbout = () => {
    const section = document.getElementById("about-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <p className="hero-tag">Trusted Pet Care, Tailored With Love</p>
        <h1 className="hero-title">
          Your <span>Pet</span> Deserves <br /> The Best Family.
        </h1>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleReservation}>
            Make a Reservation
          </button>

          <button className="btn-primary" onClick={scrollToAbout}>
            About More
          </button>
        </div>
      </div>

      <div className="hero-image">
        <img src={catImg} alt="Pet" />
      </div>
    </section>
  );
};

export default Hero;