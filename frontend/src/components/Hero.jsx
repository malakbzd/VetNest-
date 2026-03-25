// Hero.jsx
import React from "react";
import heroImg from "../assets/hero.jpg";
import "./Hero.css";

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
            <button className="btn-primary">
            About More
          </button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="Dog" />
      </div>
    </section>
  );
};

export default Hero;