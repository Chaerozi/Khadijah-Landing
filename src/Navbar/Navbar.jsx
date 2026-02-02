import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/Beranda/Logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Beranda", to: "/#beranda" },
    { name: "Tentang", to: "/#tentang" },
    { name: "Program", to: "/#program" },
    { name: "Pendaftaran", to: "/#pendaftaran" },
    { name: "Kontak", to: "/#kontak" },
  ];

  /* ===== Scroll Effect ===== */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveHash = (hash) => location.hash === hash;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed w-full top-0 z-[9999] transition-all duration-300
        ${scrolled
          ? "bg-white/80 backdrop-blur shadow-md h-14"
          : "bg-white h-16"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">

            {/* ===== LOGO ===== */}
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Khadijah Islamic School"
                className={`object-contain transition-all duration-300
                ${scrolled ? "w-9 h-9" : "w-10 h-10"}`}
              />
              <span className="font-semibold text-gray-800 text-lg">
                Khadijah Islamic School
              </span>
            </div>

            {/* ===== DESKTOP MENU ===== */}
            <div className="hidden md:flex space-x-10">
              {menuItems.map((item) => {
                const hash = item.to.replace("/", "");
                const active = isActiveHash(hash);

                return (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={`relative group font-semibold transition-colors duration-300
                      ${active
                        ? "text-yellow-500"
                        : "text-gray-700 hover:text-yellow-500"}
                    `}
                  >
                    {item.name}

                    {/* underline */}
                    <span
                      className={`absolute left-0 -bottom-2 h-[3px] bg-yellow-500 rounded-full transition-all duration-300
                        ${active ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                    />
                  </NavLink>
                );
              })}
            </div>

            {/* ===== MOBILE BUTTON ===== */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                /* Close */
                <svg
                  className="w-7 h-7 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                /* Hamburger */
                <svg
                  className="w-7 h-7 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm transition-opacity
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-16 left-0 w-full bg-white z-[9999]
        transition-all duration-300 overflow-hidden
        ${isOpen ? "max-h-96 shadow-lg" : "max-h-0"}
        `}
      >
        {menuItems.map((item) => {
          const hash = item.to.replace("/", "");
          const active = isActiveHash(hash);

          return (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-4 font-medium transition
                ${active
                  ? "text-orange-500 bg-orange-50"
                  : "text-gray-700 hover:bg-orange-50 hover:text-yel-500"}
              `}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </>
  );
}
