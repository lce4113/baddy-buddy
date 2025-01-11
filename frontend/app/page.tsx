"use client";

import React, { useState } from "react";
import Link from "next/link";

function App() {
  const gameHistory = [
    { id: 1, name: "Game 1", date: "Jan 9th, 2025" },
    { id: 2, name: "Game 2", date: "Jan 10th, 2025" },
    { id: 3, name: "Game 3", date: "Jan 11th, 2025" },
    { id: 4, name: "Game 4", date: "Jan 12th, 2025" },
    { id: 5, name: "Game 5", date: "Jan 13th, 2025" },
  ];

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setStatus(`Upload successful: ${result.message}`);
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      setStatus("Upload failed. Please try again.");
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `You said: "${input}"` },
      ]);
    }, 500);

    setInput("");
  };

  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen p-5 relative">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Baddy Buddy
        </h1>
        <p className="text-gray-400">Advanced Analytics for Badminton</p>
        <input
          type="file"
          id="fileInput"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileInput"
          className="mt-5 inline-block px-4 py-2 text-lg font-bold text-white bg-black rounded cursor-pointer hover:bg-gray-800"
        >
          UPLOAD NEW GAME <span className="ml-2">📤</span>
        </label>
        <button
          onClick={handleUpload}
          className={`mt-2 px-4 py-2 text-lg font-bold text-white bg-purple-500 rounded hover:bg-purple-600 ${
            !file ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!file}
        >
          Upload
        </button>
        {status && <p className="mt-3 text-gray-400">{status}</p>}
      </header>

      <section className="text-center">
        <h2 className="text-2xl mb-5">Game History</h2>
        <ul className="list-none p-0">
          {gameHistory.map((game) => (
            <li
              key={game.id}
              className="bg-gray-800 p-4 mb-3 rounded cursor-pointer hover:bg-gray-700 w-11/12 max-w-lg mx-auto"
            >
              <a href={`/stats/${game.id}`} className="block text-white">
                {game.name} - {game.date}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Chatbot Trigger */}
      <img
        src="/birdie-baddie.png"
        alt="Decorative Graphic"
        className="fixed bottom-5 right-5 w-20 h-20 object-contain max-w-xs transition duration-300 ease-in-out hover:scale-150 cursor-pointer"
        onClick={() => setChatVisible(!chatVisible)}
      />

      {/* Chatbot UI */}
      {chatVisible && (
        <div className="fixed bottom-20 right-5 w-80 bg-gray-800 p-4 rounded shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">Chat Assistant</h3>
            <button
              className="text-red-400 hover:text-red-500"
              onClick={() => setChatVisible(false)}
            >
              ✖
            </button>
          </div>
          <div className="h-64 overflow-y-auto bg-gray-700 p-3 rounded space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.sender === "user"
                    ? "text-right text-blue-300"
                    : "text-left text-gray-300"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex items-center mt-3">
            <input
              type="text"
              className="flex-1 p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
