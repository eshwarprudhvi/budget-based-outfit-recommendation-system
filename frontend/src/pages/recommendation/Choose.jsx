import { useNavigate } from 'react-router-dom'

const paths = [
  {
    id: 'girls',
    image: 'https://hips.hearstapps.com/hmg-prod/images/aline-kaplan-zara-blazer-trousers-mango-waistcoat-lobus-bag-news-photo-1692315065.jpg?crop=0.668xw:1.00xh;0.138xw,0&resize=640:*',
    eyebrow: 'ESTIMATED TIME: ~2 MIN',
    eyebrowColor: 'text-purple-600',
    title: 'For Her',
    titleColor: 'text-[#3B2844]',
    description: 'Precision-tailored AI curation for the modern feminine silhouette, driven by your personal style preferences and precise budget.',
    descColor: 'text-gray-600',
    glassClass: 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl',
    btnBg: 'bg-gradient-to-r from-pink-500 to-rose-400',
    btnText: 'text-white',
  },
  {
    id: 'boys',
    image: 'https://cdn.shopify.com/s/files/1/0598/1070/9672/files/vjvnow-1_8089e9a6-d4dd-41c1-bc5c-c9d7c3d5965a_480x480.jpg?v=1723104002',
    eyebrow: 'ESTIMATED TIME: ~2 MIN',
    eyebrowColor: 'text-[#4A8EB4]',
    title: 'For Him',
    titleColor: 'text-white',
    description: 'Intelligent styling engine for menswear, generating the perfect look based entirely on your specific aesthetics and budget priorities.',
    descColor: 'text-gray-300',
    glassClass: 'bg-white/10 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
    btnBg: 'bg-gradient-to-r from-[#7a2ff8] to-[#145de0]',
    btnText: 'text-white',
  },
]

export default function Choose() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-[#faf9ff]">
      {/* ── PREMIUM BACKGROUND EFFECT ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-purple-300/30 blur-[120px]" />
        <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-pink-300/30 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-300/30 blur-[120px]" />
      </div>

      {/* ── HERO HEADER ── */}
      <div className="relative z-10 text-center mb-16 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm mb-6">
          <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
          <span className="text-xs font-semibold text-gray-800 tracking-wide uppercase">AI-Powered Styling</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
          The AI{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Outfit Generator
          </span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl mx-auto font-medium">
          Artificial intelligence meets the precision of high-end editorial fashion. Select your path to begin.
        </p>
      </div>

      {/* ── PATH CARDS ── */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-6xl justify-center items-center">
        {paths.map((path) => (
          <div
            key={path.id}
            onClick={() => navigate(`/recommendations/${path.id}`)}
            className="group relative w-full md:w-[480px] h-[640px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${path.image})` }}
            />
            {/* Gradient Overlay for contrast (darker at bottom) */}
            {path.id === 'boys' ? (
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            ) : (
               <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
            )}

            {/* Glass Box */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className={`p-8 rounded-3xl ${path.glassClass} transition-all duration-500`}>
                
                <h4 className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${path.eyebrowColor}`}>
                  {path.eyebrow}
                </h4>
                
                <h2 className={`text-4xl font-bold tracking-tight mb-4 ${path.titleColor}`}>
                  {path.title}
                </h2>
                
                <p className={`text-[15px] leading-relaxed mb-8 font-medium ${path.descColor}`}>
                  {path.description}
                </p>

                <button 
                  className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-[1.02] ${path.btnBg} ${path.btnText} cursor-pointer`}
                >
                  Enter Curator Lab
                  <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
              </div>
            </div>

          </div>
        ))}
        
      </div>


    </div>
  )
}