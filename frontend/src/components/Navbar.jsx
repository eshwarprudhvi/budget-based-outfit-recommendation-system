import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md w-full">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-purple-600 tracking-wide flex gap-2"
          >
            <img src="/logo.jpeg" className="w-fit-content h-7 rounded-4xl" />
            OutfitAI
          </Link>
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="text-gray-600 hover:text-purple-600 font-medium transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/recommendations"
                className="text-gray-600 hover:text-purple-600 font-medium transition duration-200"
              >
                Recommendations
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-600 hover:text-purple-600 font-medium transition duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 transition duration-200"
              >
                Get Started
              </Link>
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
