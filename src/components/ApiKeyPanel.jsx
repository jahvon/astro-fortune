import { useState } from 'react'

export default function ApiKeyPanel() {
  const [apiKey, setApiKey] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState({ text: '', type: '' })

  const confirmKey = async () => {
    if (!apiKey) {
      setStatus({ text: 'Please enter an API key', type: 'error' })
      return
    }

    setStatus({ text: 'Validating...', type: '' })

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: 'test'
              }]
            }]
          })
        }
      )

      if (response.ok) {
        setStatus({ text: '✓ API Key Confirmed', type: 'success' })
        // Store the key in sessionStorage so other components can access it
        sessionStorage.setItem('gemini-api-key', apiKey)

        setTimeout(() => {
          setIsOpen(false)
        }, 2000)
      } else {
        setStatus({ text: '✗ Invalid API Key', type: 'error' })
      }
    } catch (error) {
      setStatus({ text: '✗ Validation Failed', type: 'error' })
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button className="api-key-toggle-fixed" onClick={() => setIsOpen(true)}>
        🔑
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <>
          <div className="api-key-overlay" onClick={() => setIsOpen(false)} />
          <div className="api-key-modal">
            <button className="api-key-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'rgba(236, 72, 153, 1)' }}>
              Gemini API Key
            </h3>
            <label htmlFor="apiKey" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>
              Enter your API key:
            </label>
            <input
              type="password"
              id="apiKey"
              className="api-key-input"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ width: '100%' }}
            />
            <button onClick={confirmKey} className="api-key-btn">
              Confirm Key
            </button>
            {status.text && (
              <div className={`api-key-status ${status.type === 'success' ? 'success' : 'error'}`}>
                {status.text}
              </div>
            )}
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noreferrer"
              className="api-key-link"
            >
              Get API key from Google AI Studio →
            </a>
          </div>
        </>
      )}
    </>
  )
}
