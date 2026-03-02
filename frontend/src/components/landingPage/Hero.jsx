export default function Hero() {
  return (
    <section className="flex flex-col select-none justify-center items-center bg-gray-100 w-full text-center px-4 pt-20 pb-16">
      <div>
        <img src="/logo.jpeg" className="h-20 rounded-3xl" />
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-3xl leading-tight mb-4">
        AI-Powered Outfit Generator
      </h1>
      <p className="text-gray-500 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
        Create perfect outfits tailored to your budget, occasion, and style
        preferences using advanced machine learning algorithms.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Primary Button */}
        <button className="bg-gradient-to-r from-purple-600 to-blue-500 cursor-pointer text-white px-7 py-3 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition duration-200 shadow-md w-full sm:w-auto justify-center">
          Start Generating Outfits
          <span>→</span>
        </button>

        {/* Secondary Button */}
        <button className="border border-gray-300 text-gray-700 px-7 py-3 cursor-pointer rounded-lg font-semibold hover:bg-gray-50 transition duration-200 w-full sm:w-auto">
          Learn More
        </button>
      </div>
    </section>
  );
}
