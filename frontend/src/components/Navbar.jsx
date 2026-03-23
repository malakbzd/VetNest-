import React, { useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 lg:px-20">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-[#5c3a1e] font-bold text-2xl">
          <span className="bg-[#e2c6aa] p-2 rounded-full">
            <FaPaw />
          </span>
          <span>Scooby</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#2f1e0e]">
          <a href="/" className="hover:text-[#d1733d]">
            Home
          </a>
          <div
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="hover:text-[#d1733d] cursor-pointer flex items-center gap-1">
              Services{" "}
              <span className="text-xs">
                <IoMdArrowDropdown size={20} />
              </span>
            </span>
            {showDropdown && (
              <div className="absolute top-6 left-0 bg-white shadow p-2 rounded z-10 w-40">
                <a href="/" className="block px-2 py-1 hover:text-[#d1733d]">
                  Grooming
                </a>
                <a href="/" className="block px-2 py-1 hover:text-[#d1733d]">
                  Training
                </a>
                <a href="/" className="block px-2 py-1 hover:text-[#d1733d]">
                  Pet Sitting
                </a>
              </div>
            )}
          </div>
          <a href="/" className="hover:text-[#d1733d]">
            About
          </a>
          <a href="/" className="hover:text-[#d1733d]">
            Shop
          </a>
          <a href="/" className="hover:text-[#d1733d]">
            Blog
          </a>
          <a href="/" className="hover:text-[#d1733d]">
            Contact
          </a>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex gap-3 text-[#d1733d] text-lg">
          {[FiSearch, FiHeart, FiShoppingBag, FiUser].map((Icon, idx) => (
            <span
              key={idx}
              className="p-2 border border-[#d1733d] rounded-full cursor-pointer hover:bg-[#d1733d] hover:text-white transition"
            >
              <Icon />
            </span>
          ))}
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center">
          {menu ? (
            <FiX size={25} onClick={handleChange} />
          ) : (
            <FiMenu size={25} onClick={handleChange} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={` ${
          menu ? "translate-x-0" : "-translate-x-full"
        } lg:hidden flex flex-col absolute bg-[#f5eee6] text-[#6B4226] left-0 top-16 font-semibold text-2xl pt-8 px-5 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
      >
        <a href="/" className="hover:text-[#d1733d]">
          Home
        </a>
        <details className="group">
          <summary className="cursor-pointer hover:text-[#d1733d]">
            Services
          </summary>
          <div className="pl-4 mt-1 flex flex-col gap-2.5">
            <a href="/" className="hover:text-[#d1733d]">
              Grooming
            </a>
            <a href="/" className="hover:text-[#d1733d]">
              Training
            </a>
            <a href="/" className="hover:text-[#d1733d]">
              Pet Sitting
            </a>
          </div>
        </details>
        <a href="/" className="hover:text-[#d1733d]">
          About
        </a>
        <a href="/" className="hover:text-[#d1733d]">
          Shop
        </a>
        <a href="/" className="hover:text-[#d1733d]">
          Blog
        </a>
        <a href="/" className="hover:text-[#d1733d]">
          Contact
        </a>
        <div className="flex gap-3 mt-2">
          {[FiSearch, FiHeart, FiShoppingBag, FiUser].map((Icon, idx) => (
            <span
              key={idx}
              className="p-2 border border-[#d1733d] rounded-full cursor-pointer hover:bg-[#d1733d] hover:text-white transition"
            >
              <Icon />
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;