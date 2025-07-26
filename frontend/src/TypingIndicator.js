import React from "react";
import "./App.css";

export default function TypingIndicator() {
  return (
    <div className="typing-indicator-row">
      <img
        className="avatar"
        src="https://api.dicebear.com/7.x/thumbs/svg?seed=AI"
        alt="bot"
      />
      <div className="chat-bubble bubble-bot">
        <span className="typing-indicator">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
      </div>
    </div>
  );
}
