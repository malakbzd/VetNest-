import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import "./Navbar.css";
import LogoImg from "../assets/logooo.jpg";

const Navbar = () => {
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
            <img src={LogoImg} alt="logo" className="logo-img" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="nav-desktop">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/articles">Articles</Link>

          {/* 🔐 يظهر فقط بعد login */}
          {isAuth && <Link to="/pets">Pets</Link>}
          {isAuth && <Link to="/appointments">Appointments</Link>}

          {/* Auth */}
          {!isAuth ? (
            <>
              <span onClick={() => navigate("/login")} className="link-btn">
                Login
              </span>
              <span onClick={() => navigate("/register")} className="link-btn">
                Register
              </span>
            </>
          ) : (
            <span onClick={handleLogout} className="logout">
              Logout
            </span>
          )}
        </nav>

        {/* Icons */}
        <div className="icons-desktop">

          <span className="icon"><FiSearch /></span>
          <span className="icon"><FiHeart /></span>
          <span className="icon"><FiShoppingBag /></span>

          {/* 🔐 قبل login */}
          {!isAuth ? (
            <>
              <span className="icon" onClick={() => navigate("/login")}>
                <FiUser />
              </span>
            </>
          ) : (
            <>
              {/* 🐶 pets */}
              <span className="icon" onClick={() => navigate("/pets")}>
                🐶
              </span>

              {/* 📅 appointments */}
              <span className="icon" onClick={() => navigate("/appointments")}>
                📅
              </span>

              {/* logout */}
              <span className="icon" onClick={handleLogout}>
                <FiUser />
              </span>
            </>
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
        <Link to="/shop">Shop</Link>
        <Link to="/articles">Articles</Link>

        {isAuth && <Link to="/pets">Pets</Link>}
        {isAuth && <Link to="/appointments">Appointments</Link>}

        {!isAuth ? (
          <>
            <span onClick={() => navigate("/login")}>Login</span>
            <span onClick={() => navigate("/register")}>Register</span>
          </>
        ) : (
          <span onClick={handleLogout} className="logout">
            Logout
          </span>
        )}
      </div>
    </header>
  );
};

export default Navbar;