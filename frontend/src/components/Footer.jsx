import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#3e2612] text-white pt-14 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo + tagline */}
        <div>
          <h2 className="text-3xl font-bold mb-3">Scooby</h2>
          <p className="text-sm text-[#e6d9cd]">
            Your pet's second-best friend (after you!). We provide top-notch care, grooming, food & more.
          </p>
          <div className="flex gap-4 mt-4">
            <FaInstagram className="hover:text-[#f9b87e] cursor-pointer" />
            <FaFacebookF className="hover:text-[#f9b87e] cursor-pointer" />
            <FaTwitter className="hover:text-[#f9b87e] cursor-pointer" />
            <FaYoutube className="hover:text-[#f9b87e] cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-[#e6d9cd] text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="/">Services</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-[#e6d9cd] text-sm">
            <li>Pet Grooming</li>
            <li>Vet Consultation</li>
            <li>Pet Food Delivery</li>
            <li>Training & Boarding</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="text-[#e6d9cd] text-sm space-y-2">
            <li>Email: support@Scooby.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Hours: Mon - Sat, 9AM - 7PM</li>
            <li>Location: Navi Mumbai, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#6a4b30] mt-12 pt-4 text-center text-[#d5c1b3] text-sm">
         @copyright developed by champion programmers | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;