import { useState } from 'react'

const ALL_COLORS = [
  { name: 'Black', bg: 'bg-black' },
  { name: 'White', bg: 'bg-white border border-gray-300' },
  { name: 'Navy', bg: 'bg-blue-900' },
  { name: 'Charcoal', bg: 'bg-neutral-800' },
  { name: 'Grey', bg: 'bg-gray-500' },
  { name: 'Light Grey', bg: 'bg-gray-300' },
  { name: 'Brown', bg: 'bg-amber-900' },
  { name: 'Tan', bg: 'bg-amber-600' },
  { name: 'Beige', bg: 'bg-orange-100 border border-gray-300' },
  { name: 'Cream', bg: 'bg-stone-100 border border-gray-300' },
  { name: 'Khaki', bg: 'bg-stone-400' },
  { name: 'Olive', bg: 'bg-lime-900' },
  { name: 'Forest Green', bg: 'bg-green-900' },
  { name: 'Emerald', bg: 'bg-emerald-700' },
  { name: 'Mint', bg: 'bg-emerald-300' },
  { name: 'Teal', bg: 'bg-teal-700' },
  { name: 'Royal Blue', bg: 'bg-blue-700' },
  { name: 'Light Blue', bg: 'bg-blue-300' },
  { name: 'Indigo', bg: 'bg-indigo-900' },
  { name: 'Plum', bg: 'bg-purple-900' },
  { name: 'Lavender', bg: 'bg-purple-300' },
  { name: 'Maroon', bg: 'bg-rose-900' },
  { name: 'Burgundy', bg: 'bg-red-900' },
  { name: 'Crimson', bg: 'bg-red-700' },
  { name: 'Red', bg: 'bg-red-500' },
  { name: 'Rust', bg: 'bg-orange-800' },
  { name: 'Terracotta', bg: 'bg-orange-600' },
  { name: 'Mustard', bg: 'bg-yellow-600' },
  { name: 'Peach', bg: 'bg-orange-300' },
  { name: 'Pale Pink', bg: 'bg-pink-200' },
  { name: 'Rose', bg: 'bg-rose-500' },
]

export default function WomenPageSideBar({ onGenerate, loading }) {
  const [isColorsExpanded, setIsColorsExpanded] = useState(false)
  const [form, setForm] = useState({
    budget: 5000,
    gender: 'Female', // Pre-selected and fixed
    occasion: '',
    style: '',
    colors: [],
    prompt: '',
    tops: [],
    bottoms: [],
    includes: {
      footwear: true,
      jewelry: false,
      bag: false,
      watch: false,
    },
    priorities: {
      topwear: 30,
      bottomwear: 30,
      shoes: 25,
      accessories: 15,
    }
  })

  const handleGenerateClick = () => {
    // Ensure priorities do not exceed 100%
    const totalWeight = Object.values(form.priorities).reduce((a, b) => a + b, 0);
    if (totalWeight > 100) {
      alert("Budget Allocations cannot exceed 100%. Please adjust your percentages.");
      return;
    }

    // Map output exactly to backend schema
    const formattedData = {
      occasion: form.occasion.toLowerCase() || "",
      gender: "women",
      budget: form.budget,
      preferences: Object.keys(form.priorities).map(key => ({
        item: key,
        weight: form.priorities[key]
      })).filter(pref => pref.weight > 0),
      colors: form.colors.map(color => color.toLowerCase()),
      optional_items: Object.keys(form.includes).filter(k => form.includes[k]),
      aesthetics: form.style,
      topwear_preferences: form.tops,
      bottomwear_preferences: form.bottoms
    };

    onGenerate(formattedData);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-8 flex flex-col gap-8 h-full">
      
      {/* HEADER SECTION */}
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
          Womenswear Curator
        </h2>
        <p className="text-sm text-gray-500 font-medium mt-1">Set your preferences for the perfect fit.</p>
      </div>

      {/* GENDER */}
      <div>
        <label className="text-sm font-bold text-gray-800 block mb-3">
          👤 Gender
        </label>
        <div className="flex">
          <button
            disabled
            className="w-full py-2.5 rounded-xl text-sm font-bold border bg-pink-600 text-white border-pink-600 shadow-sm opacity-90 cursor-not-allowed flex justify-center items-center gap-2"
          >
            Female <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          </button>
        </div>
      </div>

      {/* BUDGET */}
      <div>
        <label className="text-sm font-bold text-gray-800 block mb-3">
          💰 Budget
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="500"
            max="50000"
            step="500"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
          />
          <span className="bg-pink-50 text-pink-700 font-bold px-4 py-2 rounded-xl text-sm min-w-[90px] text-center border border-pink-100">
            ₹{form.budget.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2 px-1">
          <span>₹500</span>
          <span>₹50,000</span>
        </div>
      </div>

      {/* OCCASION */}
      <div>
        <label className="text-sm font-bold text-gray-800 block mb-3">
          🎯 Occasion
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['Casual', 'Formal', 'Business', 'Wedding', 'Party', 'Date Night', "Traditional", "Brunch", "Cocktail"].map((o) => (
            <button
              key={o}
              onClick={() => setForm({ ...form, occasion: o })}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer
                ${form.occasion === o
                  ? 'bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* STYLE */}
      <div>
        <label className="text-sm font-bold text-gray-800 block mb-3">
          🎨 Aesthetic
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['Chic', 'Elegant', 'Classic', 'Boho', 'Sporty', 'Trendy', 'Vintage', 'Luxury', 'Indo-Western '].map((s) => (
            <button
              key={s}
              onClick={() => setForm({ ...form, style: s })}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer
                ${form.style === s
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:bg-rose-50'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* COLORS */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-bold text-gray-800">
            🌈 Preferred Colors
          </label>
          <button
            onClick={() => setIsColorsExpanded(!isColorsExpanded)}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer"
          >
            {isColorsExpanded ? 'View Less' : 'View All'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 transition-all duration-300">
          {(isColorsExpanded ? ALL_COLORS : ALL_COLORS.slice(0, 5)).map((color) => (
            <button
              key={color.name}
              onClick={() => {
                const already = form.colors.includes(color.name)
                setForm({
                  ...form,
                  colors: already
                    ? form.colors.filter(c => c !== color.name)
                    : [...form.colors, color.name]
                })
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer
                ${form.colors.includes(color.name)
                  ? 'border-rose-600 bg-rose-50 text-rose-700 shadow-sm'
                  : 'border-gray-200 text-gray-600 bg-white hover:border-rose-300 hover:bg-gray-50'
                }`}
            >
              <span className={`w-3.5 h-3.5 rounded-full shadow-inner ${color.bg}`}></span>
              {color.name}
            </button>
          ))}
          {!isColorsExpanded && (
            <button
              onClick={() => setIsColorsExpanded(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold border border-gray-200 text-gray-500 bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              +26 More
            </button>
          )}
        </div>
      </div>

      {/* TOPS */}
      <div>
        <label className="text-sm font-bold text-gray-800 block mb-3">
          👚 Topwear Preferences (Optional)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['T-Shirt', 'Blouse', 'Crop Top', 'Dress', 'Sweater', 'Tank Top', 'Kurti'].map((o) => (
            <button
              key={o}
              onClick={() => {
                const already = form.tops.includes(o)
                setForm({
                  ...form,
                  tops: already
                    ? form.tops.filter(item => item !== o)
                    : [...form.tops, o]
                })
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer
                ${form.tops.includes(o)
                  ? 'bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOMS */}
      <div>
        <label className="text-sm font-bold text-gray-800 block mb-3">
          👗 Bottomwear Preferences (Optional)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['Jeans', 'Trousers', 'Skirt', 'Shorts', 'Leggings', 'Palazzos'].map((o) => (
            <button
              key={o}
              onClick={() => {
                const already = form.bottoms.includes(o)
                setForm({
                  ...form,
                  bottoms: already
                    ? form.bottoms.filter(item => item !== o)
                    : [...form.bottoms, o]
                })
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer
                ${form.bottoms.includes(o)
                  ? 'bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* PRIORITIES */}
      <div>
        <label className="text-sm font-bold text-gray-800 block mb-3">
          📊 Budget Allocation (%)
        </label>
        <p className="text-xs text-gray-500 font-medium mb-3">
          Total cannot exceed 100%. Decrease a category out of 50% to free up budget for another.
        </p>
        <div className="flex flex-col gap-4 bg-white/50 p-4 border border-gray-100 rounded-2xl shadow-inner">
          {Object.keys(form.priorities).map(key => {
             const othersSum = Object.keys(form.priorities)
               .filter(k => k !== key)
               .reduce((sum, k) => sum + form.priorities[k], 0);
             const maxAllowed = Math.min(50, 100 - othersSum);
             
             return (
               <div key={key}>
                 <div className="flex items-center justify-between mb-2 text-xs font-bold text-gray-700 capitalize">
                   <span className="flex items-center gap-2">
                     <span className={`w-2 h-2 rounded-full ${form.priorities[key] > 0 ? 'bg-rose-500' : 'bg-gray-300'}`}></span>
                     {key === 'bottomwear' ? 'Bottomwear' : key === 'shoes' ? 'Footwear' : key} 
                   </span>
                   <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                     {form.priorities[key]}%
                   </span>
                 </div>
                 <input
                   type="range"
                   min="0"
                   max={50} 
                   value={form.priorities[key]}
                   onChange={(e) => {
                       let val = Number(e.target.value);
                       if (val > maxAllowed) val = maxAllowed;
                       setForm({
                         ...form,
                         priorities: { ...form.priorities, [key]: val }
                       })
                   }}
                   className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                 />
                 <div className="flex justify-between mt-1 text-[10px] text-gray-400 font-semibold px-0.5">
                   <span>0%</span>
                   <span>Max: {maxAllowed}%</span>
                 </div>
               </div>
             )
          })}
          
          {/* Total Bar */}
          <div className="mt-2 pt-3 border-t border-gray-200">
             <div className="flex justify-between items-center text-sm font-bold">
               <span className="text-gray-700">Total Assigned:</span>
               <span className={`${Object.values(form.priorities).reduce((a,b)=>a+b,0) <= 100 ? 'text-green-600' : 'text-red-500'}`}>
                 {Object.values(form.priorities).reduce((a,b)=>a+b,0)}%
               </span>
             </div>
          </div>
        </div>
      </div>

      {/* INCLUDES */}
      <div>
        <label className="text-sm font-bold text-gray-800 block mb-3">
          ✨ Must Include
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(form.includes).map((item) => (
            <button
              key={item}
              onClick={() => setForm({
                ...form,
                includes: { ...form.includes, [item]: !form.includes[item] }
              })}
              className={`py-2 px-4 rounded-xl text-sm font-bold border transition-all duration-200 capitalize flex justify-between items-center cursor-pointer
                ${form.includes[item]
                  ? 'bg-pink-50 text-pink-700 border-pink-300'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
            >
              <span>{item}</span>
              {form.includes[item] ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              ) : (
                <span className="text-gray-300 text-lg leading-none">+</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* GENERATE BUTTON */}
      <button
        onClick={handleGenerateClick}
        disabled={loading}
        className="w-full mt-auto bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 rounded-2xl font-bold text-base hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Generating Look...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Curate Womenswear Outfit
          </>
        )}
      </button>

    </div>
  )
}
