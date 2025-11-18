import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ApiKeyPanel() {
  const [apiKey, setApiKey] = useState('')
  const [open, setOpen] = useState(false)
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
          setOpen(false)
        }, 2000)
      } else {
        setStatus({ text: '✗ Invalid API Key', type: 'error' })
      }
    } catch (error) {
      setStatus({ text: '✗ Validation Failed', type: 'error' })
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="api-key-toggle">
            🔑
          </button>
        </SheetTrigger>
        <SheetContent className="bg-card/95 backdrop-blur-lg border-primary/50">
          <SheetHeader>
            <SheetTitle className="text-primary font-['Cinzel']">Gemini API Key</SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Enter your Gemini API key to unlock cosmic wisdom
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="apiKey" className="text-sm text-foreground block mb-2">
                API Key
              </label>
              <Input
                type="password"
                id="apiKey"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-background/50 border-primary/50 text-foreground focus:border-primary focus:ring-primary"
              />
            </div>
            <Button onClick={confirmKey} variant="cosmic" className="w-full">
              Confirm Key
            </Button>
            {status.text && (
              <div className={`text-sm text-center ${status.type === 'success' ? 'text-secondary' : 'text-destructive'}`}>
                {status.text}
              </div>
            )}
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary hover:text-primary/80 block text-center transition-colors hover:shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
            >
              Get API key from Google AI Studio →
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
