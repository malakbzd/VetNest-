// Hero.jsx
import React from "react";
import heroImg from "../assets/hero.jpg";
import "./Hero.css";
import catImg from "../assets/cat.jpg";

const Hero = () => {
  const handleReservation = () => {
    const isAuth = !!localStorage.getItem("token");

    if (!isAuth) {
      const registerSection = document.getElementById("register");
      if (registerSection) {
        registerSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.location.href = "/patients"; // or your reservation page
    }
  };
  const scrollToAbout = () => {
  const section = document.getElementById("about-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
  return (
    <section className="hero">
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
        <img src={catImg} alt="Dog" />
      </div>
    </section>
  );
};

export default Hero;