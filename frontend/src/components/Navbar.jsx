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

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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

        {/* Mobile */}
        <div className="menu-toggle" onClick={() => setMenu(!menu)}>
          {menu ? <FiX size={25} /> : <FiMenu size={25} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${menu ? "show" : ""}`}>
        <Link to="/">Home</Link>

        {user?.role === "user" && <Link to="/patients">Patients</Link>}
        {user?.role === "doctor" && <Link to="/doctors">Doctors</Link>}
        {user?.role === "admin" && (
          <>
            <Link to="/patients">Patients</Link>
            <Link to="/doctors">Doctors</Link>
          </>
        )}

        <Link to="/shop">Shop</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <span onClick={handleLogout} style={{ color: "red" }}>
            Logout
          </span>
        )}
      </div>
    </header>
  );
};

export default Navbar;