import React, { useState } from "react";
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Navbar.css";
import LogoImg from "../assets/logo.jpg";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <header className="header">
      <div className="flex-between">
    {/* Logo */}
<div className="logo">
  <img src={LogoImg} alt="VetNest Logo" className="logo-img" />
</div>

        {/* Desktop Menu */}
        <nav className="nav-desktop">
          <a href="/">Home</a>
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              Services <IoMdArrowDropdown size={20} />
            </span>
            {showDropdown && (
              <div style={{
                position: "absolute",
                top: "1.5rem",
                left: 0,
                backgroundColor: "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                zIndex: 10,
                width: "10rem",
              }}>
                <a href="/">Grooming</a>
                <a href="/">Training</a>
                <a href="/">Pet Sitting</a>
              </div>
            )}
          </div>
          <a href="/">About</a>
          <a href="/">Shop</a>
          <a href="/">Blog</a>
          <a href="/">Contact</a>
        </nav>

        {/* Icons */}
        <div className="icons-desktop">
          {[FiSearch, FiHeart, FiShoppingBag, FiUser].map((Icon, idx) => (
            <span key={idx} className="icon"><Icon /></span>
          ))}
        </div>

        {/* Hamburger */}
        <div className="menu-toggle" onClick={() => setMenu(!menu)}>
          {menu ? <FiX size={25} /> : <FiMenu size={25} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${menu ? "show" : ""}`}>
        <a href="/">Home</a>
        <details>
          <summary style={{ cursor: "pointer" }}>Services</summary>
          <div style={{ paddingLeft: "1rem", marginTop: "0.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <a href="/">Grooming</a>
            <a href="/">Training</a>
            <a href="/">Pet Sitting</a>
          </div>
        </details>
        <a href="/">About</a>
        <a href="/">Shop</a>
        <a href="/">Blog</a>
        <a href="/">Contact</a>
        <div className="mobile-icons">
          {[FiSearch, FiHeart, FiShoppingBag, FiUser].map((Icon, idx) => (
            <span key={idx} className="icon"><Icon /></span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;