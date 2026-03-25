import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Navbar.css";
import LogoImg from "../assets/logooo.jpg";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  // 🔐 check auth
  const isAuth = !!localStorage.getItem("token");

  // 🚪 logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="flex-between">

        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={LogoImg} alt="VetNest Logo" className="logo-img" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="nav-desktop">
          <Link to="/">Home</Link>

          {isAuth && <Link to="/patients">Patients</Link>}
          {isAuth && <Link to="/doctors">Doctors</Link>}

          {/* Services */}
          <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{ position: "relative" }}
          >
            <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              Services <IoMdArrowDropdown size={20} />
            </span>

            {showDropdown && (
              <div style={dropdownStyle}>
                <a href="/grooming">Grooming</a>
                <a href="/training">Training</a>
                <a href="/pet-sitting">Pet Sitting</a>
              </div>
            )}
          </div>

          <Link to="/about">About</Link>

          {/* ✅ Shop */}
          <Link to="/shop">Shop</Link>

          {/* 🔐 Auth */}
          {!isAuth ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <span onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
              Logout
            </span>
          )}
        </nav>

        {/* Icons */}
        <div className="icons-desktop">
          {[FiSearch, FiHeart, FiShoppingBag].map((Icon, idx) => (
            <span key={idx} className="icon"><Icon /></span>
          ))}

          {!isAuth ? (
            <>
              <span className="icon" onClick={() => navigate("/login")}>
                <FiUser />
              </span>

              <span className="icon" onClick={() => navigate("/register")}>
                📝
              </span>
            </>
          ) : (
            <span className="icon" onClick={handleLogout}>
              <FiUser />
            </span>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="menu-toggle" onClick={() => setMenu(!menu)}>
          {menu ? <FiX size={25} /> : <FiMenu size={25} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${menu ? "show" : ""}`}>
        <Link to="/">Home</Link>

        {isAuth && <Link to="/patients">Patients</Link>}
        {isAuth && <Link to="/doctors">Doctors</Link>}

        <details>
          <summary>Services</summary>
          <div style={{ paddingLeft: "1rem" }}>
            <a href="/grooming">Grooming</a>
            <a href="/training">Training</a>
            <a href="/pet-sitting">Pet Sitting</a>
          </div>
        </details>

        <Link to="/shop">Shop</Link>

        {!isAuth ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <span onClick={handleLogout} style={{ color: "red", cursor: "pointer" }}>
            Logout
          </span>
        )}
      </div>
    </header>
  );
};

const dropdownStyle = {
  position: "absolute",
  top: "1.5rem",
  left: 0,
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
  padding: "0.5rem",
  borderRadius: "0.25rem",
  zIndex: 10,
  width: "10rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
};

export default Navbar;