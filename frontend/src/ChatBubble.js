import React from "react";

const BOT_AVATAR = "https://api.dicebear.com/7.x/thumbs/svg?seed=AI";
const USER_AVATAR = "https://api.dicebear.com/7.x/thumbs/svg?seed=User";

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatBubble({ sender, text, time }) {
  const isUser = sender === "user";
  return (
    <div className={`chat-bubble-row ${isUser ? "row-user" : "row-bot"}`}>
      {!isUser && <img className="avatar" src={BOT_AVATAR} alt="bot" />}
      <div className={`chat-bubble ${isUser ? "bubble-user" : "bubble-bot"}`}>
        <span className="msg-text">{text}</span>
        <span className="msg-time">{formatTime(time)}</span>
      </div>
      {isUser && <img className="avatar" src={USER_AVATAR} alt="user" />}
    </div>
  );
}
