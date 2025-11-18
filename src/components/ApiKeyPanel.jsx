import { useState } from 'react'

export default function ApiKeyPanel() {
  const [apiKey, setApiKey] = useState('')
  const [collapsed, setCollapsed] = useState(true)
  const [status, setStatus] = useState({ text: '', type: '' })

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

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
          setCollapsed(true)
        }, 2000)
      } else {
        setStatus({ text: '✗ Invalid API Key', type: 'error' })
      }
    } catch (error) {
      setStatus({ text: '✗ Validation Failed', type: 'error' })
    }
  }

  return (
    <div className={`api-key-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="api-key-toggle" onClick={toggleCollapse}>
        🔑
      </div>
      <label htmlFor="apiKey" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>
        Gemini API Key:
      </label>
      <input
        type="password"
        id="apiKey"
        className="api-key-input"
        placeholder="Enter your API key"
        style={{ width: '250px' }}
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={confirmKey} className="api-key-btn">
        Confirm Key
      </button>
      <div className={`api-key-status ${status.type}`}>
        {status.text}
      </div>
      <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="api-key-link">
        Get API key from Google AI Studio →
      </a>
    </div>
  )
}
