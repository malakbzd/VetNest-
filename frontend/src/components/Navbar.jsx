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

  // ✅ safe parse (ما يطيحش)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ✅ logout clean
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenu(false);
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

          {/* 🔥 SEPARATION */}
          {user?.role === "user" && <Link to="/patients">Patients</Link>}

          {user?.role === "doctor" && <Link to="/doctors">Doctors</Link>}

          {user?.role === "admin" && (
            <>
              <Link to="/patients">Patients</Link>
              <Link to="/doctors">Doctors</Link>
            </>
          )}

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
                <Link to="/grooming">Grooming</Link>
                <Link to="/training">Training</Link>
                <Link to="/pet-sitting">Pet Sitting</Link>
              </div>
            )}
          </div>

          <Link to="/about">About</Link>
          <Link to="/shop">Shop</Link>

          {/* Auth */}
          {!user ? (
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

          {!user ? (
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
        <Link to="/" onClick={() => setMenu(false)}>Home</Link>

        {user?.role === "user" && (
          <Link to="/patients" onClick={() => setMenu(false)}>Patients</Link>
        )}

        {user?.role === "doctor" && (
          <Link to="/doctors" onClick={() => setMenu(false)}>Doctors</Link>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/patients" onClick={() => setMenu(false)}>Patients</Link>
            <Link to="/doctors" onClick={() => setMenu(false)}>Doctors</Link>
          </>
        )}

        <Link to="/shop" onClick={() => setMenu(false)}>Shop</Link>

        {!user ? (
          <>
            <Link to="/login" onClick={() => setMenu(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenu(false)}>Register</Link>
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