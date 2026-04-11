import { useState } from 'react'
import WomenPageSideBar from '../../components/recommendation/WomenPageSideBar'
import { getRecommendations } from '../../services/api'
import toast from 'react-hot-toast'

export default function Women() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const handleGenerate = async (formData) => {
    if (!formData.occasion || !formData.aesthetics) {
      alert('Please select an occasion and style block to formulate the outfit.')
      return
    }
    
    try {
      setLoading(true)
      setResults(null)

      const res = await getRecommendations(formData)
      if (res.data && res.data.outfits) {
        setResults({
          meta: formData,
          outfits: res.data.outfits,
        })
        toast.success("Outfits generated successfully!")
      } else {
        toast.error("Generation failed or invalid format.")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Error generating outfits.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fff9fb] relative overflow-hidden pt-24 px-4 py-10">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-pink-300/20 blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-rose-300/20 blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 h-full flex flex-col">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
            Womenswear <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">AI Curator</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Our intelligent engine formulates complete, aesthetically cohesive outfits based strictly on your preferences and budget.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
          
          {/* SIDEBAR (FORM) - 4 Columns Wide */}
          <div className="lg:col-span-4 xl:col-span-3 sticky top-24">
            <WomenPageSideBar onGenerate={handleGenerate} loading={loading} />
          </div>

          {/* RESULTS AREA - 8 Columns Wide */}
          <div className="lg:col-span-8 xl:col-span-9 bg-white/60 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[600px] p-6 lg:p-10 flex flex-col relative overflow-hidden">
            
            {/* INNER CONTENT REVEAL */}
            {!results && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-pink-100">
                  <span className="text-4xl">👗</span>
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
                  <div className="absolute inset-0 border-4 border-pink-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-pink-600 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">✨</div>
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
                    <p className="text-gray-500 font-medium mt-1">Based on {results.meta.occasion} • {results.meta.aesthetics} • ₹{results.meta.budget.toLocaleString()}</p>
                  </div>
                  <span className="px-4 py-2 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 text-sm">
                    100% Match
                  </span>
                </div>
                
                {/* Results Display */}
                <div className="bg-transparent flex-1 overflow-auto space-y-8 pb-10">
                  {results.outfits.map((outfit, index) => (
                    <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100">
                      <h4 className="text-xl font-extrabold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-sm">Look {outfit.outfit_id}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {outfit.items.map((item, iIndex) => (
                          <div key={iIndex} className="bg-rose-50/30 p-4 rounded-2xl border border-rose-100 hover:border-rose-300 transition-colors">
                            <p className="font-bold text-gray-900 text-sm mb-3">
                              {item.item_name || item.search_query || "Clothing Item"}
                            </p>
                            <div className="flex flex-col gap-3">
                              {item.products && item.products.length > 0 ? (
                                item.products.slice(0, 2).map((prod, pIndex) => (
                                  <a key={pIndex} href={prod.link} target="_blank" rel="noreferrer" className="flex items-start gap-4 bg-white p-3 rounded-xl border border-rose-100 hover:shadow-md transition-shadow cursor-pointer">
                                    {prod.image ? (
                                       <img src={prod.image} alt="Product" className="w-16 h-16 object-cover rounded-lg bg-gray-100" />
                                    ) : (
                                       <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🛍️</div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">{prod.title}</p>
                                      <p className="text-rose-600 font-bold mt-1.5 text-sm">{prod.price}</p>
                                    </div>
                                  </a>
                                ))
                              ) : (
                                <p className="text-xs text-gray-400 italic">No products matched automatically.</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}
