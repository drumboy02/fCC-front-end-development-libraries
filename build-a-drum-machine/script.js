import React, { useState } from "https://esm.sh/react"
import ReactDOM, { createRoot } from "https://esm.sh/react-dom/client"

const PADS = [
  { 
    pad: 1, 
    key: 'Q', 
    clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'
  },
  { 
    pad: 2, 
    key: 'W', 
    clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'
  },
  { 
    pad: 3, 
    key: 'E', 
    clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'
  },
  { 
    pad: 4, 
    key: 'A', 
    clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'
  },
  { 
    pad: 5, 
    key: 'S', 
    clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'
  },
  { 
    pad: 6, 
    key: 'D', 
    clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'
  },
  { 
    pad: 7, 
    key: 'Z', 
    clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'
  },
  { 
    pad: 8, 
    key: 'X', 
    clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'
  },
  { 
    pad: 9, 
    key: 'C', 
    clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'
  },
]

document.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();
  const display = document.getElementById("display")
  
  if (key === "Q" || key === "W" || key === "E" || key === "A" || key === "S" || key === "D" || key === "Z" || key === "X" || key === "C") {
    const audioEl = document.getElementById(key)   
    audioEl.play()
    display.textContent = audioEl.parentElement.id
    audioEl.parentElement.setAttribute('style', 'color: #f00')
    setTimeout(() => {
      audioEl.parentElement.removeAttribute('style', 'color: #f00')
    }, 250)
  }
})

const App = () => {
  return (
    <div className="app-container">
      <RhythmComposer />
    </div>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<App />)

const RhythmComposer = () => {
  const [activePad, setActivePad] = useState('')
  
  return (
      <div id="drum-machine">
        <div class="logo">fCC</div>
        <div class="logo-2">Rhythm Composer CR-707</div>
        <div className="top">          
          <Display activePad={activePad} />
        </div>
        <div className="bottom">
          {PADS.map(drumPad => {
            return (
              <DrumPad
                key={drumPad.pad}
                pad={drumPad.pad}
                triggerKey={drumPad.key}
                clip={drumPad.clip}
                activePad={activePad}
                setActivePad={setActivePad}
              />
            )
          })}
        </div>
        <div className="orange-strip" />
      </div>
  )
}

const Display = ({ activePad }) => {
  const clipName = activePad.slice(activePad.lastIndexOf('/') + 1, activePad.length)
  
  return (
    <div id="display">{clipName}</div>
  )
}

const DrumPad = ({ pad, triggerKey, clip , activePad, setActivePad }) => {
  
  const trigger = (clip) => {
    setActivePad(clip)
    document.getElementById(triggerKey).play()
  }
  
  return (
    <button id={clip.slice(clip.lastIndexOf('/') + 1, clip.length)} className="drum-pad active" onClick={() => trigger(clip)}>
      {triggerKey}
      <audio src={clip} id={triggerKey} className="clip"></audio>
    </button>
  )
}

