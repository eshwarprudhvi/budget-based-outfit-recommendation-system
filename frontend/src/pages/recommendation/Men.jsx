import { useState } from 'react'
import MenPageSideBar from '../../components/recommendation/MenPageSideBar'

export default function Men() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const handleGenerate = async (formData) => {
    if (!formData.occasion || !formData.aesthetics) {
      alert('Please select an occasion and style block to formulate the outfit.')
      return
    }
    
    setLoading(true)
    setResults(null)

    // Placeholder - will connect to ML service later
    setTimeout(() => {
      setResults(formData)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#faf9ff] relative overflow-hidden pt-24 px-4 py-10">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-300/20 blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-300/20 blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 h-full flex flex-col">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
            Menswear <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI Curator</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Our intelligent engine formulates complete, aesthetically cohesive outfits based strictly on your preferences and budget.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
          
          {/* SIDEBAR (FORM) - 4 Columns Wide */}
          <div className="lg:col-span-4 xl:col-span-3 sticky top-24">
            <MenPageSideBar onGenerate={handleGenerate} loading={loading} />
          </div>

          {/* RESULTS AREA - 8 Columns Wide */}
          <div className="lg:col-span-8 xl:col-span-9 bg-white/60 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[600px] p-6 lg:p-10 flex flex-col relative overflow-hidden">
            
            {/* INNER CONTENT REVEAL */}
            {!results && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-blue-100">
                  <span className="text-4xl">👔</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Awaiting Parameters</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Adjust the parameters in the sidebar to configure your desired look. The AI will strictly honor your budget constraints and aesthetic choices.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">⚡</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 animate-pulse">Running Styling Engine...</h3>
                <p className="text-gray-500 font-medium">Scanning inventory and calculating budget optimizations.</p>
              </div>
            )}

            {results && !loading && (
              <div className="flex-1 flex flex-col animation-fadeIn opacity-100 transition-opacity duration-500">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Curated Outfit Ready</h3>
                    <p className="text-gray-500 font-medium mt-1">Based on {results.occasion} • {results.aesthetics} • ₹{results.budget.toLocaleString()}</p>
                  </div>
                  <span className="px-4 py-2 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 text-sm">
                    100% Match
                  </span>
                </div>
                
                {/* Placeholder Results View */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-inner flex-1 overflow-auto">
                   <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                     {JSON.stringify(results, null, 2)}
                   </pre>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}
