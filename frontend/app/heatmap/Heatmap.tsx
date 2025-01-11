"use client";

import React, { useEffect, useRef } from "react";
import h337 from "heatmap.js";
import Image from "next/image";

interface DataPoint {
  x: number;
  y: number;
  value: number;
}

const Heatmap = ({ data, width }: { data: DataPoint[]; width: number }) => {
  const heatmapContainer = useRef(null); // Reference to the heatmap container

  useEffect(() => {
    // Initialize Heatmap.js
    const heatmapInstance = h337.create({
      container: heatmapContainer.current,
      radius: 50, // Adjust radius for the heatmap points
    });

    const max = Math.max(...data.map((o) => o.value));

    // Add data to the heatmap
    heatmapInstance.setData({ max, data });
  }, [data]); // Re-run the effect when data changes

  const height = Math.round((350 / 612) * width);
  return (
    <div
      className="flex relative"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
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
      <div
        ref={heatmapContainer}
        className="absolute"
        style={{
          width: "100%",
          height: `${height}px`, // Ensure heatmap container takes the same height
        }}
      />
    </div>
  );
};

export default Heatmap;
