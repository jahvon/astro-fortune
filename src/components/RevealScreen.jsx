import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
        <Card className="mb-6 bg-gray-900/90 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-3xl text-pink-400">Today's Fortune</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-gray-200">
              {fortuneData.fullFortune}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-gray-900/90 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-2xl text-pink-400">Cosmic Influence</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-gray-200">
              {fortuneData.cosmicInfluence}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-gray-900/90 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-2xl text-pink-400">Zodiac Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-gray-200">
              {fortuneData.astrologyTip}
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={onRestart} variant="cosmic" size="xl">
            Seek Another Reading
          </Button>
        </div>
      </div>
    </div>
  )
}
