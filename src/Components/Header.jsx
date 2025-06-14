import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">
              <NavLink 
                to="/" 
                className="gradient-text hover:scale-105 transition-transform duration-300"
              >
                James Ngandu
              </NavLink>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/skills", label: "Skills" },
              { to: "/projects", label: "Projects" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    menuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    menuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-64 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg border border-gray-200/50">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/skills", label: "Skills" },
              { to: "/projects", label: "Projects" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;