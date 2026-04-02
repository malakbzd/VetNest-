import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";
import LogoImg from "../assets/logooo.jpg";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const isAuth = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="flex-between">
        {/* LOGO */}
        <div className="logo">
          <Link to="/">
            <img src={LogoImg} alt="logo" className="logo-img" />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="nav-desktop">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/articles">Articles</Link>

          {isAuth && <Link to="/pets">Pets</Link>}
          {isAuth && <Link to="/appointments">Appointments</Link>}

          {/* ADMIN BUTTON */}
          {user?.role === "admin" && (
            <Link to="/admin" className="admin-link">
              Admin Panel
            </Link>
          )}

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

        {/* MOBILE MENU ICON */}
        <div className="menu-toggle" onClick={() => setMenu(!menu)}>
          {menu ? <FiX size={25} /> : <FiMenu size={25} />}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`nav-mobile ${menu ? "show" : ""}`}>
        <Link to="/" onClick={() => setMenu(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMenu(false)}>Shop</Link>
        <Link to="/articles" onClick={() => setMenu(false)}>Articles</Link>

        {isAuth && <Link to="/pets" onClick={() => setMenu(false)}>Pets</Link>}
        {isAuth && (
          <Link to="/appointments" onClick={() => setMenu(false)}>
            Appointments
          </Link>
        )}

        {/* ADMIN MOBILE */}
        {user?.role === "admin" && (
          <Link to="/admin" onClick={() => setMenu(false)}>
            Admin Panel
          </Link>
        )}

        {!isAuth ? (
          <>
            <span onClick={() => { navigate("/login"); setMenu(false); }}>
              Login
            </span>
            <span onClick={() => { navigate("/register"); setMenu(false); }}>
              Register
            </span>
          </>
        ) : (
          <span onClick={() => { handleLogout(); setMenu(false); }}>
            Logout
          </span>
        )}
      </div>
    </header>
  );
};

export default Navbar;