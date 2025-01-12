"use client";

import React, { useState, useRef } from "react";
import { Anthropic } from '@anthropic-ai/sdk';

export default function Page() {
  const gameHistory = [
    { id: 1, name: "Game 1", date: "Jan 9th, 2025" },
    { id: 2, name: "Game 2", date: "Jan 10th, 2025" },
    { id: 3, name: "Game 3", date: "Jan 11th, 2025" },
    { id: 4, name: "Game 4", date: "Jan 12th, 2025" },
    { id: 5, name: "Game 5", date: "Jan 13th, 2025" },
  ];

  // Initialize Anthropic client
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: 'assistant', content: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Add scroll to bottom effect
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    setMessages(prev => [...prev, { role: "user", content: input }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `You said: "${input}"` },
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
      {chatVisible && (
        <div className="fixed inset-0 bg-[#343541] z-50 flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-700 p-4 flex items-center justify-between bg-[#343541]">
            <button
              onClick={() => setChatVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-white">Baddy Buddy Chat</h2>
            <div className="w-8" /> {/* Placeholder for symmetry */}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto bg-[#343541]">
            <div className="max-w-2xl mx-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 ${
                    message.role === "assistant" ? "bg-[#444654]" : "bg-[#343541]"
                  }`}
                >
                  <div className="max-w-2xl mx-auto flex space-x-4">
                    <div className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0">
                      {message.role === "assistant" ? (
                        <div className="bg-green-500 rounded-sm w-full h-full flex items-center justify-center text-white text-sm font-bold">
                          BB
                        </div>
                      ) : (
                        <div className="bg-gray-500 rounded-sm w-full h-full flex items-center justify-center text-white text-sm font-bold">
                          U
                        </div>
                      )}
                    </div>
                    <div className="min-h-[20px] text-gray-100 flex-1">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Container */}
          <div className="border-t border-gray-700 bg-[#343541] p-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Message Baddy Buddy..."
                  className="w-full rounded-lg bg-[#40414f] border-none focus:ring-0 focus:outline-none text-white p-4 pr-12 resize-none"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '200px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 bottom-2 p-1 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24" 
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={input.trim() ? "#fff" : "#666"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transform rotate-90 ${isLoading ? 'opacity-50' : 'hover:stroke-blue-500'}`}
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Baddy Buddy can assist with game analysis and badminton techniques.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}