import React from "react";
import { FiGithub } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { CgMail } from "react-icons/cg";
import { LuLinkedin } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* column-1 */}
          <div className="gap-4 flex flex-col">
            <h2 className="text-xl font-bold text-white">
              AI Outfit Generator
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing fashion with machine learning. Our AI-powered
              platform helps you create perfect outfits tailored to your budget,
              occasion, and personal style preferences.
            </p>
            <div className="items-center flex gap-4 mt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <LuLinkedin />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <CgMail />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <RiTwitterXFill />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <FiGithub />
              </a>
            </div>
          </div>

          {/* column-2 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-base">Quick Links</h3>

            <ul className="flex flex-col gap-3">
              {["Home", "About", "Features", "How It Works"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* COLUMN 3 - SUPPORT */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-base">Support</h3>

            <ul className="flex flex-col gap-3">
              {[
                "Help Center",
                "Privacy Policy",
                "Terms of Service",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* DIVIDER */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 AI Outfit Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
