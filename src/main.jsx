import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [listening, setListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const startListening = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser. Use Chrome.");
      return;
    }
    recognition.start();
    setListening(true);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
    };
    recognition.onend = () => setListening(false);
  };

  const sendMessage = async () => {
    if (!transcript) return;
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: transcript })
    });
    const data = await res.json();
    setReply(data.text);

    const utterance = new SpeechSynthesisUtterance(data.text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>🎤 Voice Bot Starter</h1>
      <button onClick={startListening} disabled={listening}>
        {listening ? "Listening..." : "Start Mic"}
      </button>
      <p><b>You said:</b> {transcript}</p>
      <button onClick={sendMessage}>Send</button>
      <p><b>Bot reply:</b> {reply}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
