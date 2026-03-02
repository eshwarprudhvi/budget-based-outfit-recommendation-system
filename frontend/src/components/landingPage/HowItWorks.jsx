import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      circleBg: "bg-blue-500",
      title: "Set Your Budget",
      desc: "Define your spending limit using our easy slider or input field.",
    },
    {
      number: "2",
      circleBg: "bg-purple-500",
      title: "Choose Preferences",
      desc: "Select occasion, colors, and which items to include in your outfit.",
    },
    {
      number: "3",
      circleBg: "bg-green-500",
      title: "Adjust Priorities",
      desc: "Set ML weights to allocate more budget to items that matter most to you.",
    },
    {
      number: "4",
      circleBg: "bg-yellow-400",
      title: "Get Your Outfit",
      desc: "Receive a complete outfit with match scores and detailed recommendations.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Four simple steps to your perfect outfit
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* CIRCLE WITH NUMBER */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 ${step.circleBg}`}
              >
                {step.number}
              </div>

              {/* TITLE */}
              <h3 className="text-gray-900 font-bold text-lg mb-2">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
