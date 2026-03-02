import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-0.5"
      : "text-gray-600 hover:text-purple-600 font-medium transition duration-200";

  return (
    <>
      <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink
            to="/"
            className="text-xl font-bold text-purple-600 tracking-wide flex gap-2"
          >
            <img src="/logo.jpeg" className="w-fit-content h-7 rounded-4xl" />
            OutfitAI
          </NavLink>
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/recommendations" className={navLinkClass} end>
                Recommendations
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={navLinkClass} end>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className="bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 transition duration-200"
              >
                Get Started
              </NavLink>
            </li>
          </ul>
          {/* hamburger icon */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                menuOpen && "rotate-45 translate-y-2"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                menuOpen && "opacity-0"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                menuOpen && "-rotate-45 -translate-y-2"
              }`}
            ></span>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/recommendations"
              className="text-gray-700 hover:text-purple-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Recommendations
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-purple-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 text-white text-center px-5 py-2 rounded-full font-medium hover:bg-purple-700"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
