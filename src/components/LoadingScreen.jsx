import { useState, useEffect } from 'react'

const loadingMessages = [
  "Reading the stars...",
  "Consulting the planets...",
  "Focusing energy...",
  "Aligning the cosmos...",
  "Channeling wisdom..."
]

export default function LoadingScreen({ active }) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!active) return

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [active])

  return (
    <div className={`screen ${active ? 'active' : ''}`}>
      <div className="crystal-ball large"></div>
      <div className="mt-12">
        <p className="loading-message">{loadingMessages[messageIndex]}</p>
      </div>
    </div>
  )
}
