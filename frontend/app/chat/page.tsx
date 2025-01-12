"use client";

import React, { useState, useRef } from "react";
import { Anthropic } from "@anthropic-ai/sdk";
import Link from "next/link";
import { TextBlock } from "@anthropic-ai/sdk/resources/index.mjs";

export default function ChatPage() {
  // Initialize Anthropic client
  const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<Anthropic.MessageParam>>([
    {
      role: "assistant",
      content: "Hi! How can I help you today?",
    },
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

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Add user's message to chat
    const newMessages: Array<Anthropic.MessageParam> = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Use the Anthropic client to fetch the assistant's response

      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: newMessages,
      });

      console.log(msg.content);

      // Add the assistant's response to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: msg.content[0] ? (msg.content[0] as TextBlock).text : "",
        },
      ]);
    } catch (error) {
      console.error("Error communicating with Claude:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: "Sorry, something went wrong. Please try again.",
            },
          ],
        },
      ]);
    } finally {
      setInput("");
      setIsLoading(false);
    }

    console.log(messages);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      <div className="border-b border-gray-700 p-4 flex items-center justify-between bg-gray-900">
        <Link href="/" className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Link>
        <h2 className="text-lg font-semibold text-white">Baddy Buddy Chat</h2>
        <div className="w-8" /> {/* Placeholder for symmetry */}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <div className="max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 ${
                message.role === "assistant" ? "bg-gray-800" : "bg-gray-900"
              }`}
            >
              <div className="max-w-2xl mx-auto flex space-x-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
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
                  {message.content.toString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Container */}
      <div className="border-t border-gray-700 bg-gray-900 p-4">
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
              disabled={isLoading}
              placeholder="Message Baddy Buddy..."
              className="w-full rounded-lg bg-gray-700 border-none focus:ring-0 focus:outline-none text-white p-4 pr-12 resize-none"
              rows={1}
              style={{ minHeight: "44px", maxHeight: "200px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-4 bottom-4 p-1 rounded-lg text-gray-600"
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
                className={`transform ${
                  isLoading ? "" : "hover:stroke-gray-500"
                }`}
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
  );
}
