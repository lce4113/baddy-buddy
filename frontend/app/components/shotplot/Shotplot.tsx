"use client";

import React from "react";
import Image from "next/image";
import { processShotplotData, ResData } from "./processData";

export const ShotPlot = ({ data, width }: { data: ResData; width: number }) => {
  const height = Math.round((350 / 612) * width); // Adjust height based on court aspect ratio
  const x_margin = 10;
  const y_margin = 10;
  // const courtWidth = width - 2 * x_margin; // Half court width minus margin
  // const courtHeight = height - 2 * y_margin;

  console.log("data:", processShotplotData(data));
  console.log("width:", width);
  console.log("height:", height);
  data = processShotplotData(data).map(({ x, y }) => ({
    x: Math.round(
      (((x / 100) * (100 - 2 * x_margin) + x_margin) * width) / 100
    ),
    y: Math.round(
      (((y / 100) * (100 - 2 * y_margin) + y_margin) * height) / 100
    ),
  }));
  console.log("scaled data:", data);

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

      {data.map((point, index) => (
        <div
          key={`lData-${index}`}
          className="absolute bg-red-500 rounded-full"
          style={{
            width: "8px", // Dot size
            height: "8px",
            transform: "translate(-50%, -50%)",
            left: `${point.x}px`,
            top: `${point.y}px`,
          }}
        ></div>
      ))}
    </div>
  );
};
