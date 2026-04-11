import React from "react";

export default function PoweredSection() {
  const cards = [
    {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      cardBg: "bg-blue-50",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Multi-Factor Scoring",
      points: [
        "Budget efficiency (30% weight)",
        "Occasion matching (40% weight)",
        "Color preferences (20% weight)",
        "Value optimization (10% weight)",
      ],
    },
    {
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      cardBg: "bg-purple-50",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Smart Matching",
      points: [
        "Occasion consistency scoring",
        "Color coordination analysis",
        "Style compatibility checks",
        "Budget utilization optimization",
      ],
    },
    {
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      cardBg: "bg-green-50",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Real-Time Processing",
      points: [
        "Instant outfit generation",
        "Dynamic budget allocation",
        "Live preference adjustments",
        "Immediate visual feedback",
      ],
    },
  ];
  return (
    <section className="bg-white  py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Powered by Advanced AI
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Our recommendation system uses advanced AI usage to provide you with the best outfit recommendations.
          </p>
        </div>
        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={index} className={`${card.cardBg} rounded-2xl p-6`}>
              {/* ICON */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${card.iconBg} ${card.iconColor}`}
              >
                {card.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-gray-900 font-bold text-lg mb-4">
                {card.title}
              </h3>

              {/* CHECKLIST */}
              <ul className="flex flex-col gap-2">
                {card.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {/* CHECK ICON */}
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    {/* POINT TEXT */}
                    <span className="text-gray-600 text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
