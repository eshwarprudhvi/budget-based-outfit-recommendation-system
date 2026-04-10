import { useState } from 'react'

export default function Recommendations() {
  const [form, setForm] = useState({
    budget: 5000,
    gender: '',
    occasion: '',
    style: '',
    colors: [],
    prompt: '',
    includes: {
      watch: false,
      belt: false,
      shoes: true,
      socks: true,
      accessories: false,
    },
    priorities: {
      shirt: 30,
      pants: 30,
      shoes: 25,
      accessories: 15,
    }
  })

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const handleGenerate = async () => {
    if (!form.gender || !form.occasion || !form.style) {
      alert('Please select gender, occasion and style!')
      return
    }
    setLoading(true)
    setResults(null)

    // Placeholder - will connect to ML service later
    setTimeout(() => {
      setResults(JSON.stringify(form, null, 2))
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50 pt-24 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Generate Your Outfit ✨
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in your preferences and let AI create the perfect outfit for you
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── LEFT PANEL - FORM ── */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">

            {/* BUDGET */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
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
                  className="flex-1 accent-purple-600"
                />
                <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-lg text-sm min-w-[80px] text-center">
                  ₹{form.budget.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* GENDER */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                👤 Gender
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Male', 'Female', 'Unisex'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setForm({ ...form, gender: g })}
                    className={`py-2 rounded-xl text-sm font-medium border transition duration-200
                      ${form.gender === g
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-purple-400'
                      }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* OCCASION */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                🎉 Occasion
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Casual', 'Formal', 'Business', 'Wedding', 'Party', 'Sports'].map((o) => (
                  <button
                    key={o}
                    onClick={() => setForm({ ...form, occasion: o })}
                    className={`py-2 rounded-xl text-sm font-medium border transition duration-200
                      ${form.occasion === o
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-purple-400'
                      }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* STYLE */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                🎨 Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Minimalist', 'Streetwear', 'Classic', 'Bohemian', 'Sporty', 'Trendy'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm({ ...form, style: s })}
                    className={`py-2 rounded-xl text-sm font-medium border transition duration-200
                      ${form.style === s
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-purple-400'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* COLORS */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                🌈 Preferred Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Black', bg: 'bg-black' },
                  { name: 'White', bg: 'bg-white border border-gray-300' },
                  { name: 'Navy', bg: 'bg-blue-900' },
                  { name: 'Gray', bg: 'bg-gray-500' },
                  { name: 'Brown', bg: 'bg-amber-800' },
                  { name: 'Red', bg: 'bg-red-500' },
                  { name: 'Green', bg: 'bg-green-600' },
                  { name: 'Beige', bg: 'bg-amber-100 border border-gray-300' },
                ].map((color) => (
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
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition duration-200
                      ${form.colors.includes(color.name)
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 text-gray-600 hover:border-purple-400'
                      }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${color.bg}`}></span>
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* INCLUDES */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                ⌚ Include Items
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(form.includes).map((item) => (
                  <button
                    key={item}
                    onClick={() => setForm({
                      ...form,
                      includes: { ...form.includes, [item]: !form.includes[item] }
                    })}
                    className={`py-2 px-3 rounded-xl text-sm font-medium border transition duration-200 capitalize
                      ${form.includes[item]
                        ? 'bg-green-50 text-green-700 border-green-400'
                        : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'
                      }`}
                  >
                    {form.includes[item] ? '✓' : '+'} {item}
                  </button>
                ))}
              </div>
            </div>

            {/* PRIORITIES */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                ⚖️ Budget Priorities
              </label>
              <div className="flex flex-col gap-3">
                {Object.keys(form.priorities).map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 capitalize w-24">{item}</span>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={form.priorities[item]}
                      onChange={(e) => setForm({
                        ...form,
                        priorities: { ...form.priorities, [item]: Number(e.target.value) }
                      })}
                      className="flex-1 accent-purple-600"
                    />
                    <span className="text-sm font-semibold text-purple-600 w-10 text-right">
                      {form.priorities[item]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PROMPT */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                💬 Describe Your Outfit
              </label>
              <textarea
                rows={3}
                placeholder="e.g. I need a smart casual outfit for a weekend brunch, prefer earth tones..."
                value={form.prompt}
                onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              />
            </div>

            {/* GENERATE BUTTON */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Generating...
                </>
              ) : (
                <>✨ Generate Outfit</>
              )}
            </button>

          </div>

          {/* ── RIGHT PANEL - RESULTS ── */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            {!results ? (
              // EMPTY STATE
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="bg-purple-100 p-5 rounded-full mb-4">
                  <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                  </svg>
                </div>
                <h3 className="text-gray-700 font-semibold text-lg mb-2">
                  Your Outfit Will Appear Here
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Fill in your preferences and click Generate Outfit to get started
                </p>
              </div>
            ) : (
              // RESULTS
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-gray-900">
                  ✨ Your Generated Outfit
                </h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl">
                  {results}
                </pre>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}