"use client";

import React, { useEffect, useState } from "react";
import { CourtHeatmap } from "@/app/components/heatmap/Heatmap";
import { ShotPlot } from "@/app/components/shotplot/Shotplot";
import Link from "next/link";
import { askClaude } from "@/app/chat/claude";
import PlayerDistance from "@/app/components/distance/Distance";
import Markdown from "react-markdown";

function StatsPage() {
  const [response, setResponse] = useState<string>("Click to generate");
  const [loading, setLoading] = useState(false);

  const analyzeGame = async () => {
    setLoading(true);
    try {
      const result = await askClaude(
        "Analyze this game using the heat map image provided and provide your analysis in a concise, readable way.", // Your prompt here
        `
You are an expert AI badminton coach named Baddy Buddy, highly skilled in analyzing player movement patterns and birdie placement on the court to provide actionable feedback and strategy recommendations.
You will not respond to unrelated prompts, and instead bring their attention back to badminton.
You will format your responses cleanly with markdown.
You are always confident in your answers, even if you need to make up data (obviously don't tell them you made it up).

Your Role:
Analyze the player's movement across each game and the location of where the birdie lands on the court after each rally.
Provide constructive, personalized feedback to help the player improve their badminton skills, focusing on areas such as positioning, footwork, shot selection, and strategy.
Suggest drills, exercises, and in-game tactics based on observed data trends and patterns.
`, // Your system prompt here
        "/demo/player-heatmap.png"
      );
      setResponse(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [heatmapData, setHeatmapData] = useState<string | null>({
    lData: [],
    rData: [],
  });
  const [shotplotData, setShotplotData] = useState<string | null>([]);

  const [ID, setID] = useState(0);
  const [windowWidth, setWindowWidth] = useState(100);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const ID = window.location.href.split("/").slice(-1)[0];
    setID(ID);
    console.log("test");
    const hData = JSON.parse(localStorage.getItem("games"))[ID - 1]
      .playerDataJson;
    if (hData) {
      setHeatmapData(hData);
    }
    console.log("hData:", hData);
    const sData = JSON.parse(localStorage.getItem("games"))[ID - 1]
      .shotPlotJson;
    if (sData) {
      setShotplotData(sData);
    }
    console.log("sdata:", sData);
  }, []);

  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen p-5">
      <header className="text-center mb-10">
        <Link
          href="/"
          className="absolute top-5 left-5 px-4 py-2 text-white rounded hover:underline"
        >
          ◀ Back
        </Link>
        <h1 className="mt-24 text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          {`Game ${ID} Stats`}
        </h1>
        <p className="text-gray-400">In-depth Analytics for Your Game</p>
      </header>

      <main className="space-y-10">
        {/* Shot Heatmap Section */}
        <section className="bg-gray-800 p-6 rounded shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Shot Heatmap</h2>
          <p className="text-gray-400 mb-4">
            Visualize where you lost your points during the game.
          </p>
          <ShotPlot data={shotplotData} width={windowWidth * 0.8} />
        </section>

        {/* Movement Tracking Section */}
        <section className="bg-gray-800 p-6 rounded shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Movement Tracking</h2>
          <p className="text-gray-400 mb-4">Observe your movement patterns.</p>
          <CourtHeatmap
            data={heatmapData}
            radius={10}
            width={windowWidth * 0.8}
          />
        </section>

        <section className="bg-gray-800 p-6 rounded shadow-md max-w-4xl mx-auto">
          <h2
            onClick={analyzeGame}
            className="text-2xl mb-3 p-1 font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent w-full bg-[length:200%_200%] animate-gradient"
          >
            Baddie Birdie AI Analysis
          </h2>
          {loading && <p>Loading...</p>}
          {response && (
            <Markdown className={"markdown text-md"}>{response}</Markdown>
          )}
        </section>
        {/* Distance Tracking Section */}
        <section className="bg-gray-800 p-6 rounded shadow-md max-w-4xl mx-auto flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Distance Tracking</h2>
          <p className="text-gray-400 mb-4">
            See how many calories you burned.
          </p>
          <PlayerDistance data={heatmapData} />
        </section>
      </main>
    </div>
  );
}

export default StatsPage;
