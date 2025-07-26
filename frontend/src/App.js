import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const API_URL = "http://localhost:5000/api/chat"; // Adjust if needed

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m your AI Career Mentor. How can I help you today?",
      time: Date.now(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatWindow = useRef(null);

  useEffect(() => {
    if (chatWindow.current)
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {
      sender: "user",
      text: input,
      time: Date.now(),
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: data.reply || "Error: No response from server.",
          time: Date.now(),
        },
      ]);
    } catch (err) {
      toast.error("Couldn't reach the server or AI model.");
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: "Oops, something went wrong. Try again!",
          time: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container dark">
      <header className="menubar">
        <span className="logo">🚀</span>
        <span className="title">Career Mentor</span>
      </header>
      <main className="chat-section">
        <div className="chat-window" ref={chatWindow}>
          {messages.map((msg, i) => (
            <ChatBubble key={i} sender={msg.sender} text={msg.text} time={msg.time} />
          ))}
          {loading && <TypingIndicator />}
        </div>
        <form className="input-bar" onSubmit={handleSend}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your career question…"
            autoFocus
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </main>
      <footer className="footer">
        <span>Powered by Node.js, MongoDB, and AI 🤗</span>
      </footer>
      <ToastContainer />
    </div>
  );
}
export default App;
