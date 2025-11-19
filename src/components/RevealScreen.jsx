import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RevealScreen({ active, fortuneData, onRestart }) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return

    const utterance = new SpeechSynthesisUtterance(text)

    // Get available voices
    const voices = window.speechSynthesis.getVoices()

    // Try to find a better voice - prioritize these in order:
    // 1. Google UK English Female (if available)
    // 2. Any female voice with "en" language
    // 3. Samantha (macOS default, but you don't like it)
    // 4. Any other available voice
    const preferredVoice = voices.find(v => v.name.includes('Google') && v.name.includes('Female')) ||
                          voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
                          voices.find(v => v.lang.startsWith('en-GB')) ||
                          voices.find(v => v.lang.startsWith('en-US') && !v.name.includes('Samantha'))

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.rate = 0.85  // Slower, more mystical
    utterance.pitch = 1.1   // Slightly higher pitch
    utterance.volume = 1.0

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (active && fortuneData && 'speechSynthesis' in window) {
      // Auto-play the vocal summary using browser TTS
      speakText(fortuneData.vocalSummary)

      return () => {
        window.speechSynthesis.cancel()
      }
    }
  }, [active, fortuneData])

  const handleSpeak = () => {
    if ('speechSynthesis' in window && fortuneData) {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      } else {
        speakText(fortuneData.vocalSummary)
      }
    }
  }

  if (!fortuneData) return null

  return (
    <div className={`screen ${active ? 'active' : ''}`}>
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <h1 className="text-5xl mb-8 text-center heading-font" style={{ textShadow: '0 0 20px rgba(147, 51, 234, 0.8)' }}>
          Your Fortune Awaits
        </h1>

        {/* Audio Control */}
        {'speechSynthesis' in window && (
          <div className="text-center mb-8">
            <Button onClick={handleSpeak} variant="outline" size="sm">
              {isSpeaking ? '🔊 Stop Voice' : '🔊 Hear Summary'}
            </Button>
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
