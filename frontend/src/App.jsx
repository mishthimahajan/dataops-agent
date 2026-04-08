import { useState } from "react";
import ChatBox from "./components/ChatBox";
import Table from "./components/Table";
import Chart from "./components/Chart";
import VoiceInput from "./components/VoiceInput";

const BASE_URL = "http://127.0.0.1:5000";

function App() {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);
  const [beforeData, setBeforeData] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text) return;

    // Save user message
    setMessages((prev) => [...prev, { sender: "user", text }]);

    // Show thinking animation
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "🤖 Thinking..." }
    ]);

    // Get initial dataset (BEFORE)
    const resetRes = await fetch(`${BASE_URL}/reset`);
    const initial = await resetRes.json();
    setBeforeData(initial.dataset);

    // NLP call
    const res = await fetch(`${BASE_URL}/nlp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: text })
    });

    const result = await res.json();

    // Execute actions
    let rewardList = [];
    for (let act of result.actions) {
      const stepRes = await fetch(`${BASE_URL}/step`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ type: act })
      });

      const stepData = await stepRes.json();
      rewardList.push(stepData.reward);
    }

    // Get final dataset (AFTER)
    const finalRes = await fetch(`${BASE_URL}/reset`);
    const finalData = await finalRes.json();

    setData(finalData.dataset);
    setRewards(rewardList);

    // Replace thinking message with result
    setMessages((prev) => [
      ...prev.slice(0, -1),
      {
        sender: "bot",
        text: `✅ Done: ${result.actions.join(", ")}`
      }
    ]);

    setLoading(false);
  };

  return (
    <div style={container}>
      <div style={card}>

        <h1 style={heading}>
          🚀 DataOps AI Assistant
        </h1>

        <VoiceInput onSpeak={sendMessage} />

        <ChatBox messages={messages} onSend={sendMessage} />

        {/* BEFORE vs AFTER */}
        <h2>📊 Before</h2>
        <Table data={beforeData} />

        <h2>📊 After</h2>
        <Table data={data} />

        {/* GRAPH */}
        <Chart rewards={rewards} />

        {/* SCORE BAR */}
        <div style={scoreContainer}>
          <div
            style={{
              ...scoreBar,
              width: `${Math.min(rewards.length * 30, 100)}%`
            }}
          >
            Score Progress 🚀
          </div>
        </div>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  background: "linear-gradient(135deg,#0f172a,#1e293b)",
  minHeight: "100vh",
  padding: "20px"
};

const card = {
  width: "75%",
  margin: "auto",
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "15px",
  backdropFilter: "blur(15px)",
  color: "white",
  textAlign: "center"
};

const heading = {
  fontSize: "32px",
  marginBottom: "15px",
  background: "linear-gradient(90deg,#22c55e,#4ade80)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const scoreContainer = {
  width: "60%",
  margin: "20px auto",
  background: "#334155",
  borderRadius: "10px"
};

const scoreBar = {
  background: "#22c55e",
  padding: "10px",
  borderRadius: "10px",
  color: "black",
  fontWeight: "bold",
  transition: "0.5s"
};

export default App;