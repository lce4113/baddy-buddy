"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function ChatMessage({
  content,
  role,
}: {
  content: string;
  role: string;
}) {
  return (
    <div
      className={`p-4 ${role === "assistant" ? "bg-gray-800" : "bg-gray-900"}`}
    >
      <div className="max-w-2xl mx-auto flex space-x-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
          {role === "assistant" ? (
            <div className="bg-green-500 rounded-sm w-full h-full  text-white text-sm font-bold">
              <Image
                src="/birdie-baddie.png" // Replace with the path to your image
                alt="Icon"
                width={50} // Adjust the width as needed
                height={50} // Adjust the height as needed
              />
            </div>
          ) : (
            <div className="bg-gray-500 rounded-sm w-full h-full flex items-center justify-center text-white text-sm font-bold">
              U
            </div>
          )}
        </div>
        <div className="min-h-[20px] text-gray-100">
          <ReactMarkdown className="markdown text-lg">{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
