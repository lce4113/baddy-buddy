"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export const ShotPlot = ({ data, width }: { data: Data; width: number }) => {
  const height = Math.round((350 / 612) * width); // Adjust height based on court aspect ratio
  const x_margin = 26.5;
  const y_margin = 21.5;
  const courtWidth = width / 2 - x_margin; // Half court width minus margin
  const courtHeight = height - 2 * y_margin;

  // Function to map data coordinates to the court's dimensions
  const mapCoordinates = (x: number, y: number) => {
    const adjustedX = x_margin + (x / 100) * courtWidth;
    const adjustedY = y_margin + (y / 100) * courtHeight;
    return { left: adjustedX, top: adjustedY };
  };

  // const [plotData, setPlotData] = useState({ lData: [], rData: [] });

  // useEffect(() => {
  //     fetch("http://169.231.54.168:5001/fetch_birdie_end_pos?video_id=test1")
  //     .then((res) => {
  //         if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //         }
  //         return res.json(); // Parse the response body as JSON
  //     })
  //     .then((resData) => {
  //         console.log("hi");
  //         console.log(resData); // Log the parsed response body
  //         setPlotData(processResData(resData));
  //         // console.log(processResData(resData));
  //     })
  //     .catch((err) => {
  //         console.error("Fetch error:", err);
  //     });
  // }, []);

  return (
    <div
      className="flex relative"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {/* Background Court Image */}
      <Image
        src="/court.jpg"
        className="absolute"
        width={width}
        height={height}
        alt="Badminton Court"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />

      {/* Render red dots for lData */}
      {data.lData.map((point, index) => {
        const { left, top } = mapCoordinates(point.x, point.y);
        return (
          <div
            key={`lData-${index}`}
            className="absolute bg-red-500 rounded-full"
            style={{
              width: "8px", // Dot size
              height: "8px",
              left: `${left}px`,
              top: `${top}px`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        );
      })}

      {/* Render red dots for rData */}
      {data.rData.map((point, index) => {
        const { left, top } = mapCoordinates(point.x + courtWidth, point.y);
        return (
          <div
            key={`rData-${index}`}
            className="absolute bg-red-500 rounded-full"
            style={{
              width: "8px", // Dot size
              height: "8px",
              left: `${left}px`,
              top: `${top}px`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        );
      })}
    </div>
  );
};
