import React, { useState } from 'react'

function App() {
  const [transcript, setTranscript] = useState("")

  // placeholder for future voice bot logic
  const handleStart = () => {
    setTranscript("Voice bot ready!")
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Voice Bot Starter</h1>
      <button onClick={handleStart}>Start</button>
      <p>{transcript}</p>
    </div>
  )
}

export default App
