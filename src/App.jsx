import { useState, useEffect } from 'react'
import Starfield from './components/Starfield'
import ApiKeyPanel from './components/ApiKeyPanel'
import WelcomeScreen from './components/WelcomeScreen'
import InputsScreen from './components/InputsScreen'
import LoadingScreen from './components/LoadingScreen'
import RevealScreen from './components/RevealScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [appState, setAppState] = useState({
    zodiacSign: null,
    topic: null,
    feeling: null
  })
  const [fortuneData, setFortuneData] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)

  const switchScreen = (screen) => {
    setCurrentScreen(screen)
  }

  const handleBegin = () => {
    switchScreen('inputs')
  }

  const handleConsult = async (apiKey) => {
    switchScreen('loading')

    try {
      const fortune = await getFortune(apiKey, appState)
      let audio = null

      try {
        audio = await getSpeech(apiKey, fortune.vocalSummary)
      } catch (error) {
        console.error('TTS failed:', error)
      }

      setFortuneData(fortune)
      setAudioBlob(audio)
      switchScreen('reveal')
    } catch (error) {
      alert(`Error: ${error.message}`)
      switchScreen('inputs')
    }
  }

  const handleRestart = () => {
    setAppState({
      zodiacSign: null,
      topic: null,
      feeling: null
    })
    setFortuneData(null)
    setAudioBlob(null)
    switchScreen('welcome')
  }

  return (
    <>
      <Starfield />
      <ApiKeyPanel />

      <WelcomeScreen
        active={currentScreen === 'welcome'}
        onBegin={handleBegin}
      />

      <InputsScreen
        active={currentScreen === 'inputs'}
        appState={appState}
        setAppState={setAppState}
        onConsult={handleConsult}
      />

      <LoadingScreen active={currentScreen === 'loading'} />

      <RevealScreen
        active={currentScreen === 'reveal'}
        fortuneData={fortuneData}
        audioBlob={audioBlob}
        onRestart={handleRestart}
      />
    </>
  )
}

// API Functions
async function getFortune(apiKey, appState) {
  const prompt = `I am a ${appState.zodiacSign} and I am feeling ${appState.feeling}. I seek guidance on my ${appState.topic}.

First, use your search tool to find the current, real-time planetary alignments and astrological events (like "Mars in Leo" or "Mercury retrograde") and how they generally affect a ${appState.zodiacSign}.

Then, weave all this information together (my sign, my feeling, my topic, and the current planets) to generate a response in this exact JSON format:

{
  "vocalSummary": "A 1-2 sentence concise summary of the fortune.",
  "fullFortune": "A 2-3 paragraph detailed reading.",
  "cosmicInfluence": "A 1-paragraph explanation of which planetary transit is influencing this fortune.",
  "astrologyTip": "A single, actionable sentence of advice."
}`

  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    tools: [{
      google_search: {}
    }],
    systemInstruction: {
      parts: [{
        text: "You are a mystical, wise, and comforting modern astrologer. You provide insightful, poetic, and helpful guidance based on the stars. Your tone is enigmatic but kind. Your response MUST be a valid JSON object with no additional text before or after the JSON."
      }]
    },
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2048,
    }
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`)
  }

  const data = await response.json()
  const responseText = data.candidates[0].content.parts[0].text

  let jsonText = responseText.trim()
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/g, '')
  }

  return JSON.parse(jsonText)
}

async function getSpeech(apiKey, textToSpeak) {
  const requestBody = {
    contents: [{
      parts: [{
        text: textToSpeak
      }]
    }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Puck"
          }
        }
      }
    }
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-tts:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`TTS API Error: ${errorData.error?.message || 'Unknown error'}`)
  }

  const data = await response.json()
  console.log('TTS Response:', data)

  if (data.candidates && data.candidates[0]) {
    const candidate = data.candidates[0]

    if (candidate.content && candidate.content.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'audio/wav'
          return base64ToAudioBlob(part.inlineData.data, mimeType)
        }
      }
    }
  }

  throw new Error('No audio data in response')
}

function base64ToAudioBlob(base64, mimeType = 'audio/wav') {
  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return new Blob([bytes], { type: mimeType })
}

export default App
