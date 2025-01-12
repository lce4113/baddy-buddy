"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingOverlay from "./LoadingOverlay";

export default function Page() {
  const gameHistory = [
    { id: 1, name: "Game 1", date: "Jan 9th, 2025" },
    { id: 2, name: "Game 2", date: "Jan 10th, 2025" },
    { id: 3, name: "Game 3", date: "Jan 11th, 2025" },
    { id: 4, name: "Game 4", date: "Jan 12th, 2025" },
    { id: 5, name: "Game 5", date: "Jan 13th, 2025" },
    { id: 6, name: "Game 6", date: "Jan 17th, 2025" },
    { id: 7, name: "Game 7", date: "Jan 18th, 2025" },
    { id: 8, name: "Game 8", date: "Jan 25th, 2025" },
  ];

  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsLoading(true);
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://127.0.0.1:5001/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        setStatus(`Upload successful: ${result.message}`);

        console.log(file);
        console.log(file.name.split(".")[0]);
        const name = file.name.split(".")[0];
        console.log(
          "http://127.0.0.1:5000/fetch_player_position?video_id=" + name
        );
        const data = await fetch(
          "http://127.0.0.1:5000/fetch_player_position?video_id=" + name,
          {
            method: "GET",
          }
        );
        const dataJson = await data.json();
        console.log(dataJson);
        // if (!data.ok) {
        //     throw new Error(`HTTP error! status: ${res.status}`);
        //   }
        //   return res.json(); // Parse the response body as JSON
        // }

        // // console.log(resData); // Log the parsed response body
        // const newData = processResData(resData);
        // setData(newData);
        // // console.log(newData.rData);
        // // console.log("^ rData");
        // // console.log(processResData(resData));
        // console.log(newData);

        // console.error("Fetch error:", err);
      } else {
        setStatus(`Error: ${result.error}`);
      }
      setIsLoading(false);
    } catch (e) {
      setStatus("Upload failed. Please try again.");
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen p-5 relative pt-24">
      <LoadingOverlay isLoading={isLoading} />
      <div className="text-center mb-10 flex flex-col space-y-2 px-8 items-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
          Baddy Buddy
        </h1>
        <p className="text-gray-400">Advanced Analytics for Badminton</p>
        <div className="py-8">
          <input
            type="file"
            id="fileInput"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="w-72 inline-block px-6 py-3 text-lg font-bold text-white bg-black rounded cursor-pointer hover:bg-gray-800"
          >
            UPLOAD NEW GAME <span className="ml-2">📤</span>
          </label>
          <div>
            {status != null && (
              <p
                className={`mt-3 ${
                  status.includes("Error") ? "text-red-500" : "text-green-500"
                }`}
              >
                {status}
              </p>
            )}
          </div>
          <div className="h-2" />
          <Link href="/chat" className="text-gray-400 hover:underline">
            Chat with Baddie Birdie AI ✨
          </Link>
        </div>
      </div>

      <section className="flex flex-col w-full px-4 mt-16 items-center">
        <div className="w-full">
          <h2 className="text-start text-xl mb-5 font-bold text-gray-500">
            Game History
          </h2>
        </div>
        <ul className="list-none p-0 w-full">
          {gameHistory.map((game) => (
            <li
              key={game.id}
              className="bg-gray-800 p-4 mb-3 rounded cursor-pointer hover:bg-gray-700"
            >
              <a href={`/stats/${game.id}`} className="block text-gray-300">
                {game.name} - {game.date}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Chatbot Trigger */}
      <Link
        href="/chat"
        passHref
        className="fixed bottom-5 right-4 w-24 h-24 object-contain transition duration-300 ease-in-out animate-wiggle"
      >
        <Image
          src="/birdie-baddie.png"
          alt="Decorative Graphic"
          className=""
          layout="fill"
          objectFit="cover"
        />
      </Link>
    </div>
  );
}
