export default function VoiceInput({ onSpeak }) {
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onSpeak(text);
    };

    recognition.start();
  };

  return (
    <button onClick={startListening} style={btn}>
      🎤 Speak
    </button>
  );
}

const btn = {
  padding: "10px 20px",
  marginBottom: "10px",
  background: "#f59e0b",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};