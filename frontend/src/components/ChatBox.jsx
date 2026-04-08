import { useState } from "react";

export default function ChatBox({ messages, onSend }) {
  const [input, setInput] = useState("");

  return (
    <div style={chatContainer}>
      
      {/* Chat Area */}
      <div style={messagesBox}>
        {messages.length === 0 && (
          <p style={{ color: "#94a3b8" }}>
            💬 Start by typing or speaking an instruction...
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div style={bubble(msg.sender)}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ marginTop: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type instruction..."
          style={inputStyle}
        />
        <button
          onClick={() => {
            onSend(input);
            setInput("");
          }}
          style={btn}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const chatContainer = {
  width: "60%",
  margin: "auto",
  marginBottom: "20px"
};

const messagesBox = {
  height: "220px",
  overflowY: "auto",
  background: "rgba(255,255,255,0.05)",   // ✅ lighter glass
  backdropFilter: "blur(10px)",
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  fontSize: "14px"
};

const bubble = (sender) => ({
  padding: "10px 14px",
  margin: "6px",
  borderRadius: "12px",
  maxWidth: "70%",
  color: "white",
  fontWeight: "500",
  background:
    sender === "user"
      ? "linear-gradient(135deg, #22c55e, #16a34a)"
      : "rgba(51, 65, 85, 0.9)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
});

const inputStyle = {
  padding: "12px",
  width: "70%",
  borderRadius: "10px",
  marginRight: "10px",
  border: "none",
  outline: "none",
  background: "#f1f5f9",
  color: "#0f172a",
  fontWeight: "500"
};

const btn = {
  padding: "12px 16px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
};