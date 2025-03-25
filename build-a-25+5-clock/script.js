import React, { useState, useEffect, useRef } from "https://esm.sh/react"
import ReactDOM, { createRoot } from "https://esm.sh/react-dom/client"

const App = () => {
  const [time, setTime] = useState({
    span: [1, 60],
    sessionLength: 25,
    breakLength: 5,
    onBreak: false,
    timerOn: false
  })
  const [totalSession, setTotalSession] = useState(time.sessionLength * 60)
  const [totalBreak, setTotalBreak] = useState(time.breakLength * 60)
  const [timeLeft, setTimeLeft] = useState({
    session: {
      minutes: Math.floor(totalSession / 60),
      seconds: totalSession % 60
    },
    break: {
      minutes: Math.floor(totalBreak / 60),
      seconds: totalBreak % 60,
    }
  })
  const id = useRef()
  
  useEffect(() => {
    const newSessionTotal = time.sessionLength * 60
    const newBreakTotal = time.breakLength * 60
    
    setTotalSession(newSessionTotal)
    setTotalBreak(newBreakTotal)
    
    setTimeLeft({
      ...timeLeft,
      session: {
        minutes: Math.floor(newSessionTotal / 60),
        seconds: newSessionTotal % 60
      },
      break: {
        minutes: Math.floor(newBreakTotal / 60),
        seconds: newBreakTotal % 60
      }
    })  
 
  }, [time.sessionLength, time.breakLength])
  
  useEffect(() => {
    const newTotal = totalSession
    console.log('session:', newTotal)
    if (newTotal < 0) {
      console.log('session over')
      document.getElementById("beep").play()
      setTime((prevState) => {
        return { ...prevState, onBreak: true }
      })
      clearInterval(id.current)
      setTotalSession(time.sessionLength * 60)
    }
    setTimeLeft({
      ...timeLeft,
      session: {
        minutes: Math.floor(newTotal / 60),
        seconds: newTotal % 60
      }
    })
  }, [totalSession])
  
  useEffect(() => {
    const newTotal = totalBreak
    console.log('break:', newTotal)
    if (newTotal < 0) {
      console.log('break over')
      document.getElementById("beep").play()
      setTime((prevState) => {
        return { ...prevState, onBreak: false }
      })
      clearInterval(id.current)
      setTotalBreak(time.breakLength * 60)
    }
    setTimeLeft({
      ...timeLeft,
      break: {
        minutes: Math.floor(newTotal / 60),
        seconds: newTotal % 60
      }
    })
  }, [totalBreak])

  useEffect(() => {
    if (time.timerOn) {
      if (!time.onBreak) {
        console.log('session on')
        id.current = setInterval(() => {
          setTotalSession((prevTotal) => prevTotal - 1)
        }, 1000)
      } else {
        console.log('break on')
        id.current = setInterval(() => {
          setTotalBreak((prevTotal) => prevTotal - 1)
        }, 1000)
      }
    } else {
      if (!time.onBreak) {
        console.log('session off')
        clearInterval(id.current)
      } else {
        console.log('break off')
        clearInterval(id.current)
      }
    }
  }, [time.timerOn, time.onBreak])
  
  return (
    <div className="app-container">
      <Inputs
        time={time}
        setTime={setTime}
      />
      <Timer
        time={time}
        setTime={setTime}
        timeLeft={timeLeft}
      />
      <Controls
        time={time}
        setTime={setTime}
        id={id}
      />
      <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<App />)

const Inputs = ({ time, setTime }) => {
  
  return (
    <div className="input-container">
      <div className="break">
        <span id="break-label">Break Length</span>
        <div className="break-buttons">
          <button
            id="break-increment"
            onClick={() => setTime({
              ...time,
              breakLength: time.breakLength < time.span[1] ?
              time.breakLength + 1 :
              time.breakLength
            })}
            disabled={time.timerOn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon">
  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
</svg>

          </button>          
          <button
            id="break-decrement"
            onClick={() => setTime({
              ...time,
              breakLength: time.breakLength > time.span[0] ?
              time.breakLength - 1 :
              time.breakLength
            })}
            disabled={time.timerOn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon">
  <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
</svg>

          </button>
        </div>
        <span id="break-length">{time.breakLength}</span>
      </div>
      <div className="session">
        <span id="session-label">Session Length</span>
        <div className="session-buttons">
          <button
            id="session-increment"
            onClick={() => setTime({
              ...time,
              sessionLength: time.sessionLength < time.span[1] ?
              time.sessionLength + 1 :
              time.sessionLength
            })}
            disabled={time.timerOn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon">
  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
</svg>

          </button>          
          <button
            id="session-decrement"
            onClick={() => setTime({
              ...time,
              sessionLength: time.sessionLength > time.span[0] ?
              time.sessionLength - 1 :
              time.sessionLength
            })}
            disabled={time.timerOn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon">
  <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
</svg>

          </button>
        </div>
        <span id="session-length">{time.sessionLength}</span>
      </div>
    </div>
  )
}

const Timer = ({ time, setTime, timeLeft }) => {  
  return (
    <div className="timer-container">
      <span id="timer-label">{!time.onBreak ? 'Session' : 'Break'}</span>
      {!time.onBreak ?
        <span id="time-left">
          {
            timeLeft.session.minutes >= 10 ?
            timeLeft.session.minutes :
            `0${timeLeft.session.minutes}`
          }
          :
          {
            timeLeft.session.seconds >= 10 ?
            timeLeft.session.seconds :
            `0${timeLeft.session.seconds}`
          }
        </span> :
        <span id="time-left">
          {
            timeLeft.break.minutes >= 10 ?
            timeLeft.break.minutes :
            `0${timeLeft.break.minutes}`
          }
          :
          {
            timeLeft.break.seconds >= 10 ?
            timeLeft.break.seconds :
            `0${timeLeft.break.seconds}`
          }
      </span>
      }
    </div>
  )
}

const Controls = ({ time, setTime, id }) => {
  
  const handleStartOrStop = () => {
    setTime({
      ...time,
      timerOn: !time.timerOn
    })
  }
  
  const handleReset = () => {
    setTime({
      span: [1, 60],
      sessionLength: 25,
      breakLength: 5,
      onBreak: false,
      timerOn: false      
    })
    clearInterval(id.current)
    document.getElementById("beep").currentTime = 0
    document.getElementById("beep").pause()
  }
  
  return (
    <div className="controls">
      <button id="start_stop" onClick={handleStartOrStop}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon">
  <path d="M12.75 4a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h.5a.75.75 0 0 0 .75-.75V4.75a.75.75 0 0 0-.75-.75h-.5ZM17.75 4a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h.5a.75.75 0 0 0 .75-.75V4.75a.75.75 0 0 0-.75-.75h-.5ZM3.288 4.819A1.5 1.5 0 0 0 1 6.095v7.81a1.5 1.5 0 0 0 2.288 1.277l6.323-3.906a1.5 1.5 0 0 0 0-2.552L3.288 4.819Z" />
</svg>

      </button>
      <button id="reset" onClick={handleReset}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon">
  <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
</svg>

      </button>
    </div>
  )
}
