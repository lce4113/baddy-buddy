"use client";

import React, { useEffect, useRef } from "react";
import h337 from "heatmap.js";
import Image from "next/image";
import { DataPoint } from "./page";

export const CourtHeatmap = ({
  data,
  radius,
  width,
}: {
  data: Data;
  radius: number;
  width: number;
}) => {
  const height = Math.round((350 / 612) * width);
  const x_margin = 26.5;
  const y_margin = 21.5;
  const courtWidth = width / 2 - x_margin;
  const courtHeight = height - 2 * y_margin;

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
      <Heatmap
        data={data.lData}
        radius={radius}
        width={courtWidth}
        height={courtHeight}
        left={x_margin}
        top={y_margin}
      />
      <Heatmap
        data={data.rData}
        radius={radius}
        width={courtWidth}
        height={courtHeight}
        left={x_margin}
        top={y_margin}
      />
    </div>
  );
};

const Heatmap = ({
  data,
  radius,
  width,
  height,
  left,
  top,
}: {
  data: DataPoint[];
  radius: number;
  width: number;
  height: number;
  left: number;
  top: number;
}) => {
  const heatmapContainer = useRef(null); // Reference to the heatmap container

  data = data.map(({ x, y, value }) => ({
    x: Math.round((x / 100) * width),
    y: Math.round((y / 100) * height),
    value,
  }));

  useEffect(() => {
    // Initialize Heatmap.js
    const heatmapInstance = h337.create({
      container: heatmapContainer.current,
      radius, // Adjust radius for the heatmap points
    });

    // const max = Math.max(...data.map((o) => o.value));
    const max = 10;

    // Add data to the heatmap
    heatmapInstance.setData({ max, data });
  }, [data, radius]); // Re-run the effect when data changes

  return (
    <div
      ref={heatmapContainer}
      className="absolute"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
      }}
    />
  );
};
