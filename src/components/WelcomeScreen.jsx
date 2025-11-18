export default function WelcomeScreen({ active, onBegin }) {
  return (
    <div className={`screen ${active ? 'active' : ''}`}>
      <div className="crystal-ball"></div>
      <h1 className="text-6xl mt-12 mb-6 text-center heading-font" style={{ textShadow: '0 0 20px rgba(147, 51, 234, 0.8)' }}>
        The Cosmos is Waiting
      </h1>
      <p className="text-2xl mb-12 text-center heading-font" style={{ color: 'rgba(236, 72, 153, 1)' }}>
        What guidance do you seek?
      </p>
      <button onClick={onBegin} className="cosmic-button">
        Begin Your Reading
      </button>
    </div>
  )
}
