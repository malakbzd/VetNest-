import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ مهم
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ scroll function
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-logo">
          <h2>VetNest</h2>
          <p>
            Your pet's second-best friend (after you!). We provide top-notch care, grooming, food & more.
          </p>
          <div className="social-icons">
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* ✅ Quick Links FIXED */}
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><button onClick={() => scrollToSection("hero")}>Home</button></li>
            <li><button onClick={() => scrollToSection("services-section")}>Services</button></li>
            <li><button onClick={() => scrollToSection("about-section")}>About Us</button></li>
            <li><button onClick={() => scrollToSection("faq")}>FAQ</button></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3>Our Services</h3>
          <ul>
            <li>Pet Grooming</li>
            <li>Vet Consultation</li>
            <li>Pet Food Delivery</li>
            <li>Training & Boarding</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3>Contact Us</h3>
          <ul>
            <li>Email: support@vetnest.com</li>
            <li>Phone: +213 52345679</li>
            <li>Hours: Mon - Sat, 9AM - 7PM</li>
            <li>Location: Algeria</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; 2026 developed by champion programmers | All rights reserved
      </div>
    </footer>
  );
};


export default Footer;
