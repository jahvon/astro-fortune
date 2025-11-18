import { useEffect, useRef } from 'react'

export default function RevealScreen({ active, fortuneData, audioBlob, onRestart }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (active && audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob)
      audioRef.current.src = audioUrl

      return () => URL.revokeObjectURL(audioUrl)
    }
  }, [active, audioBlob])

  if (!fortuneData) return null

  return (
    <div className={`screen ${active ? 'active' : ''}`}>
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <h1 className="text-5xl mb-8 text-center heading-font" style={{ textShadow: '0 0 20px rgba(147, 51, 234, 0.8)' }}>
          Your Fortune Awaits
        </h1>

        {/* Audio Player */}
        {audioBlob && (
          <div className="text-center mb-8">
            <audio ref={audioRef} controls autoPlay className="max-w-500px" style={{ width: '100%', maxWidth: '500px' }} />
          </div>
        )}

        {/* Fortune Cards */}
        <div className="fortune-card mb-6">
          <h3 className="text-3xl mb-4">Today's Fortune</h3>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(229, 231, 235, 1)' }}>
            {fortuneData.fullFortune}
          </p>
        </div>

        <div className="fortune-card mb-6">
          <h3 className="text-2xl mb-4">Cosmic Influence</h3>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(229, 231, 235, 1)' }}>
            {fortuneData.cosmicInfluence}
          </p>
        </div>

        <div className="fortune-card mb-8">
          <h3 className="text-2xl mb-4">Zodiac Tip</h3>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(229, 231, 235, 1)' }}>
            {fortuneData.astrologyTip}
          </p>
        </div>

        <div className="text-center">
          <button onClick={onRestart} className="cosmic-button">
            Seek Another Reading
          </button>
        </div>
      </div>
    </div>
  )
}
