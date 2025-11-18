# 🔮 Cosmic Fortune Teller

An immersive, interactive fortune-telling web application powered by AI. Experience mystical readings with stunning 3D visuals, advanced animations, and AI-generated fortunes based on real-time astrological data.

## ✨ Features

- **3D Starfield Background**: Interactive particle system using three.js with mouse parallax effects
- **Multi-layer Crystal Ball Animation**: Complex CSS animations with rotating gradients and glow effects
- **AI-Powered Fortunes**: Gemini API with Google Search grounding for real-time astrological insights
- **Text-to-Speech**: High-quality AI voice narration of your fortune
- **Smooth Transitions**: Seamless screen transitions with fade effects
- **Responsive Design**: Beautiful on all devices
- **Dark Mode Aesthetic**: Deep purples, indigos, and cosmic colors

## 🎨 Design Highlights

- **Color Palette**: Deep indigos (#0a0014), midnight blues, purples, with glowing accents of amethyst (#9333EA), pink (#EC4899), and cyan
- **Typography**:
  - Headings: "Cinzel" and "Cormorant Garamond" (elegant serif fonts)
  - Body: "Inter" (clean sans-serif)
- **Animations**: Floating crystal ball, rotating mist layers, pulsing glows, and smooth fades

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A Gemini API key from Google AI Studio

### Getting Your API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### Running the Application

1. **Clone or download this repository**

2. **Open `index.html` in your web browser**
   - Simply double-click the file, or
   - Right-click and select "Open with" your preferred browser, or
   - Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve
     ```

3. **Enter your API key**
   - In the top-right corner, enter your Gemini API key
   - The key is stored only in your browser session (not saved)

4. **Begin your cosmic journey!**

## 🎭 User Experience Flow

### Screen 1: The Landing (Welcome)
- Beautiful 3D starfield background
- Animated crystal ball centerpiece
- Single call-to-action: "Begin Your Reading"

### Screen 2: The Inputs (The Ritual)
Three progressive questions that fade in smoothly:

1. **What is your Star Sign?**
   - 12 clickable zodiac icons with hover effects
   - Selected icons glow with cosmic energy

2. **What path do you wish to illuminate?**
   - Choose between: Career, Relationships, Personal Fortune, or General Vibe Check

3. **How is your spirit today?**
   - Select your current feeling: Hopeful, Curious, Worried, Content, or Tired

### Screen 3: The Loading (The Incantation)
- Enlarged animated crystal ball
- Cycling mystical messages
- Active while AI processes your reading

### Screen 4: The Reveal (The Fortune)
- Auto-playing audio narration of your fortune summary
- Three beautifully formatted cards:
  - **Today's Fortune**: Your personalized 2-3 paragraph reading
  - **Cosmic Influence**: Explanation of current planetary alignments
  - **Zodiac Tip**: Actionable advice based on astrology
- Option to seek another reading

## 🔧 Technical Details

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript
- **Styling**: Tailwind CSS (via CDN) + Custom CSS
- **3D Graphics**: three.js for particle system
- **AI**: Google Gemini API
  - Model: `gemini-2.0-flash-exp`
  - Features: Google Search grounding, Text-to-Speech
- **Fonts**: Google Fonts (Cinzel, Cormorant Garamond, Inter)

### API Integration

#### Fortune Generation
- Uses Gemini with Google Search grounding
- Fetches real-time planetary alignments
- Returns structured JSON response with:
  - `vocalSummary`: Short summary for TTS
  - `fullFortune`: Detailed reading
  - `cosmicInfluence`: Planetary explanation
  - `astrologyTip`: Actionable advice

#### Text-to-Speech
- Uses Gemini TTS with "Callirrhoe" voice
- Returns base64-encoded audio
- Automatically plays on fortune reveal
- Gracefully degrades if TTS fails

### File Structure
```
astro-fortune/
├── index.html      # Complete single-page application
└── README.md       # This file
```

## 🎨 Customization

### Changing Colors
Edit the CSS custom properties and color values in the `<style>` section:
- Background: `#0a0014` (deep space black)
- Primary glow: `rgba(147, 51, 234, *)` (purple)
- Accent: `rgba(236, 72, 153, *)` (pink)
- Secondary: `rgba(79, 70, 229, *)` (indigo)

### Modifying Animations
Key animations to customize:
- `@keyframes float`: Crystal ball floating motion
- `@keyframes rotate-cw/ccw`: Mist rotation speeds
- `@keyframes pulse`: Glow intensity
- `@keyframes fadeInOut`: Loading message transitions

### Adjusting AI Behavior
In the `getFortune()` function, modify:
- `temperature`: Creativity (0.0-2.0, currently 0.9)
- `systemInstruction`: Change the astrologer's personality
- Prompt structure: Customize the fortune format

## 🌟 Features Explained

### 3D Starfield
- 3000 particles with varied purple/blue hues
- Slow rotation with parallax effect
- Responds to mouse movement for depth
- Rendered with WebGL for smooth performance

### Crystal Ball Animation
- Multi-layer radial and conic gradients
- Counter-rotating pseudo-elements
- Pulsing opacity and floating motion
- Box-shadow bloom effects for ethereal glow

### Google Search Grounding
- AI searches for current planetary positions
- Incorporates real astrological events
- Provides contextual, timely fortunes
- No hardcoded astrology data needed

## 🐛 Troubleshooting

### API Key Issues
- **Error: "Please enter your Gemini API key"**
  - Make sure you've entered your key in the top-right input field

- **Error: "API Error: API key not valid"**
  - Verify your API key is correct
  - Check that the key has Gemini API access enabled

### Audio Not Playing
- Some browsers block autoplay audio
- Click the play button manually if needed
- Check browser console for errors
- TTS gracefully degrades if it fails

### Starfield Not Rendering
- Ensure your browser supports WebGL
- Try a different browser if issues persist
- Check browser console for three.js errors

### Screen Not Transitioning
- Make sure all questions are answered
- Check browser console for JavaScript errors
- Verify API key is entered

## 📝 Notes

- **API Key Security**: Never commit your API key to version control
- **Rate Limits**: Gemini API has usage limits; check Google AI Studio for details
- **Browser Compatibility**: Best experienced in Chrome, Firefox, or Safari
- **Mobile Experience**: Fully responsive, but desktop recommended for best visuals

## 🎯 Future Enhancements

Potential features to add:
- Save favorite fortunes
- Share fortunes on social media
- Additional reading types (tarot, numerology)
- User accounts and reading history
- More voice options
- Animated zodiac constellation backgrounds
- PDF export of readings

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Credits

- **AI**: Google Gemini API
- **3D Graphics**: three.js library
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Cinzel, Cormorant Garamond, Inter)
- **Design**: Inspired by mystical and cosmic aesthetics

---

**May the cosmos guide your journey! ✨🔮**
