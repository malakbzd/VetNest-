import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + tagline */}
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

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Services</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact</a></li>
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
            <li>Phone: +91 98765 43210</li>
            <li>Hours: Mon - Sat, 9AM - 7PM</li>
            <li>Location: Navi Mumbai, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        &copy; 2026 developed by champion programmers | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;