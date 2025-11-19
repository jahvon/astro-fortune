import { useState } from 'react'
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

      // Use browser's built-in TTS instead of Google Cloud TTS
      setFortuneData(fortune)
      setAudioBlob(null) // We'll use Web Speech API instead
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
        onRestart={handleRestart}
      />
    </>
  )
}

// API Functions
async function getFortune(apiKey, appState) {
  const prompt = `I am a ${appState.zodiacSign} and I am feeling ${appState.feeling}. I seek guidance on my ${appState.topic}.

Generate a mystical, insightful astrological reading that weaves together my sign, feeling, and topic.

CRITICAL: Your response must be ONLY a valid JSON object with these exact fields. Do not include any text before or after the JSON:

{
  "vocalSummary": "A 1-2 sentence concise summary",
  "fullFortune": "A detailed 2-3 paragraph reading",
  "cosmicInfluence": "A 1-paragraph explanation of planetary influences",
  "astrologyTip": "A single actionable sentence of advice"
}

IMPORTANT: Keep each field under these limits to ensure valid JSON:
- vocalSummary: 1-2 sentences maximum
- fullFortune: 2-3 paragraphs maximum (about 300 words)
- cosmicInfluence: 1 paragraph maximum (about 100 words)
- astrologyTip: 1 sentence maximum`

  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    systemInstruction: {
      parts: [{
        text: "You are a mystical, wise, and comforting modern astrologer. You provide insightful, poetic, and helpful guidance based on the stars. Your tone is enigmatic but kind. CRITICAL: You must ONLY output valid JSON with properly escaped quotes. Never include markdown code blocks or any text outside the JSON object."
      }]
    },
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          vocalSummary: {
            type: "string",
            description: "A 1-2 sentence concise summary of the fortune"
          },
          fullFortune: {
            type: "string",
            description: "A 2-3 paragraph detailed reading"
          },
          cosmicInfluence: {
            type: "string",
            description: "A 1-paragraph explanation of which planetary transit is influencing this fortune"
          },
          astrologyTip: {
            type: "string",
            description: "A single, actionable sentence of advice"
          }
        },
        required: ["vocalSummary", "fullFortune", "cosmicInfluence", "astrologyTip"]
      }
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

  try {
    return JSON.parse(jsonText)
  } catch (parseError) {
    console.error('JSON Parse Error:', parseError)
    console.error('Attempted to parse:', jsonText)
    throw new Error(`Failed to parse AI response: ${parseError.message}. The AI may have generated invalid JSON.`)
  }
}


export default App
