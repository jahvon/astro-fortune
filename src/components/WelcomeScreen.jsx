import { Button } from '@/components/ui/button'

export default function WelcomeScreen({ active, onBegin }) {
  return (
    <div className={`screen ${active ? 'active' : ''}`}>
      <div className="crystal-ball"></div>
      <h1 className="text-6xl mt-12 mb-6 text-center heading-font">
        The Cosmos is Waiting
      </h1>
      <p className="text-2xl mb-12 text-center heading-font cosmic-heading">
        What guidance do you seek?
      </p>
      <Button onClick={onBegin} variant="cosmic" size="xl">
        Begin Your Reading
      </Button>
    </div>
  )
}
