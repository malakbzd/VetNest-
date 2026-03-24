import React from "react";
import img from "../assets/About.png";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="about-container">

        <div className="about-text">
          <h2 className="about-title">About Scooby</h2>

          <p className="about-paragraph-main">
            At <span className="about-highlight">Scooby</span>, we believe that
            pets aren't just animals — they're family. That's why we built a
            platform that delivers trusted, loving, and professional pet care
            services to your doorstep.
          </p>

          <p className="about-paragraph">
            Whether it's a grooming session, a vet consultation, or simply a
            delicious treat — we ensure your pet gets the best. Founded by true
            animal lovers, our mission is to make every pet feel healthy,
            happy, and loved.
          </p>
        </div>

        <div className="about-image-container">
          <img src={img} alt="About Pet Milo" className="about-image" />
        </div>

      </div>
    </section>
  );
};

export default AboutUs;