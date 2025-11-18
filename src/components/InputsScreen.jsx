import { useState } from 'react'
import { Button } from '@/components/ui/button'

const zodiacSigns = [
  { sign: 'aries', symbol: '♈', name: 'Aries' },
  { sign: 'taurus', symbol: '♉', name: 'Taurus' },
  { sign: 'gemini', symbol: '♊', name: 'Gemini' },
  { sign: 'cancer', symbol: '♋', name: 'Cancer' },
  { sign: 'leo', symbol: '♌', name: 'Leo' },
  { sign: 'virgo', symbol: '♍', name: 'Virgo' },
  { sign: 'libra', symbol: '♎', name: 'Libra' },
  { sign: 'scorpio', symbol: '♏', name: 'Scorpio' },
  { sign: 'sagittarius', symbol: '♐', name: 'Sagittarius' },
  { sign: 'capricorn', symbol: '♑', name: 'Capricorn' },
  { sign: 'aquarius', symbol: '♒', name: 'Aquarius' },
  { sign: 'pisces', symbol: '♓', name: 'Pisces' }
]

const topics = [
  { id: 'career', label: 'Career' },
  { id: 'relationships', label: 'Relationships' },
  { id: 'personal fortune', label: 'Personal Fortune' },
  { id: 'general vibe', label: 'A General Vibe Check' }
]

const feelings = [
  { id: 'hopeful', label: 'Hopeful' },
  { id: 'curious', label: 'Curious' },
  { id: 'worried', label: 'Worried' },
  { id: 'content', label: 'Content' },
  { id: 'tired', label: 'Tired' }
]

export default function InputsScreen({ active, appState, setAppState, onConsult }) {
  const [currentStep, setCurrentStep] = useState(1)

  const handleZodiacSelect = (sign) => {
    setAppState({ ...appState, zodiacSign: sign })
    setTimeout(() => setCurrentStep(2), 300)
  }

  const handleTopicSelect = (topic) => {
    setAppState({ ...appState, topic })
    setTimeout(() => setCurrentStep(3), 300)
  }

  const handleFeelingSelect = (feeling) => {
    setAppState({ ...appState, feeling })
    setTimeout(() => setCurrentStep(4), 300)
  }

  const handleConsult = () => {
    if (!appState.zodiacSign || !appState.topic || !appState.feeling) {
      alert('Please answer all questions before consulting the cosmos.')
      return
    }

    const apiKey = sessionStorage.getItem('gemini-api-key')
    if (!apiKey) {
      alert('Please enter your Gemini API key first.')
      return
    }

    onConsult(apiKey)
  }

  // Reset to step 1 when screen becomes active
  if (active && currentStep !== 1 && !appState.zodiacSign) {
    setCurrentStep(1)
  }

  return (
    <div className={`screen ${active ? 'active' : ''}`}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        {/* Question 1: Star Sign */}
        {currentStep === 1 && (
          <div className="question-container mb-12">
            <h2 className="text-4xl mb-8 text-center heading-font" style={{ color: 'rgba(236, 72, 153, 1)' }}>
              What is your Star Sign?
            </h2>
            <div className="zodiac-grid">
              {zodiacSigns.map(({ sign, symbol, name }) => (
                <div key={sign} className="zodiac-container">
                  <div
                    className={`zodiac-icon ${appState.zodiacSign === sign ? 'selected' : ''}`}
                    onClick={() => handleZodiacSelect(sign)}
                    title={name}
                  >
                    {symbol}
                  </div>
                  <div className="zodiac-label">{name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question 2: Topic */}
        {currentStep === 2 && (
          <div className="question-container mb-12">
            <h2 className="text-4xl mb-8 text-center heading-font" style={{ color: 'rgba(236, 72, 153, 1)' }}>
              What path do you wish to illuminate?
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {topics.map(({ id, label }) => (
                <Button
                  key={id}
                  variant={appState.topic === id ? 'cosmic' : 'outline'}
                  className={appState.topic === id ? '' : 'border-purple-500/50 hover:border-purple-500'}
                  onClick={() => handleTopicSelect(id)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Question 3: Feeling */}
        {currentStep === 3 && (
          <div className="question-container mb-12">
            <h2 className="text-4xl mb-8 text-center heading-font" style={{ color: 'rgba(236, 72, 153, 1)' }}>
              How is your spirit today?
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {feelings.map(({ id, label }) => (
                <Button
                  key={id}
                  variant={appState.feeling === id ? 'cosmic' : 'outline'}
                  className={appState.feeling === id ? '' : 'border-purple-500/50 hover:border-purple-500'}
                  onClick={() => handleFeelingSelect(id)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Final Button */}
        {currentStep === 4 && (
          <div className="text-center mt-12">
            <Button onClick={handleConsult} variant="cosmic" size="xl">
              Consult the Cosmos
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
