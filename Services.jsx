import React from "react";
import { GiDogHouse, GiSittingDog, GiDogBowl } from "react-icons/gi";
import { FaUserMd, FaPaw, FaTruck } from "react-icons/fa";
import "./Services.css"; // import the CSS

const petServices = [
  {
    icon: <GiDogHouse size={40} />,
    title: "Pet Boarding",
    desc: "Safe and comfortable home for your pets when you're away.",
  },
  {
    icon: <FaUserMd size={40} />,
    title: "Vet Consultation",
    desc: "Expert vet support for your pet's health & wellness.",
  },
  {
    icon: <GiDogBowl size={40} />,
    title: "Pet Food Delivery",
    desc: "Nutritious food & treats delivered to your doorstep.",
  },
  {
    icon: <GiSittingDog size={40} />,
    title: "Pet Training",
    desc: "Professional training to keep your pet well-behaved.",
  },
  {
    icon: <FaPaw size={40} />,
    title: "Grooming Services",
    desc: "Bathing, trimming & pampering sessions for your furry friend.",
  },
  {
    icon: <FaTruck size={40} />,
    title: "Quick Delivery",
    desc: "Fast, hassle-free service at your convenience.",
  },
];

const Services = () => {
  return (
    <section className="services-section" id="services-section">
      <h2 className="services-title">Our Pet Services</h2>
      <p className="services-desc">
        We care for your pets like family. Explore our range of trusted pet care services designed for their happiness & your peace of mind.
      </p>

      <div className="services-grid">
        {petServices.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;