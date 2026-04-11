import React from "react";
import { useNavigate } from "react-router-dom";

export default function LastSection() {
  const navigate = useNavigate();
  return (
    <div className="bg-linear-to-r from-purple-600 to-blue-500 py-16 px-4 mb-10">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Ready to Transform Your Wardrobe?
        </h2>
        <p className="text-blue-100 text-base md:text-lg">
          Join thousands of users who are already using AI to create perfect
          outfits
        </p>
        <button 
          onClick={() => navigate('/recommendations')}
          className="border-2 border-white cursor-pointer text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white hover:text-purple-600 transition duration-200"
        >
          Start Generating Outfits Now
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
