import React, { useState } from "react";

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-300 rounded">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
