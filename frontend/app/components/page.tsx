"use client";

import { useEffect, useState } from "react";
import { CourtHeatmap } from "./heatmap/Heatmap";
import { processResData } from "./heatmap/processData";

export default function Home() {
  // rng points
  // const lData = [];
  // const rData = [];
  // for (let i = 0; i < 50; i++) {
  //   lData.push({
  //     x: Math.round(Math.random() * 100),
  //     y: Math.round(Math.random() * 100),
  //     value: Math.round(Math.random() * 10),
  //   });
  //   rData.push({
  //     x: Math.round(Math.random() * 100),
  //     y: Math.round(Math.random() * 100),
  //     value: Math.round(Math.random() * 10),
  //   });
  // }

  // import data here prob
  const [data, setData] = useState({ lData: [], rData: [] });

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}fetch_player_position?video_id=test1`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse the response body as JSON
      })
      .then((resData) => {
        // console.log(resData); // Log the parsed response body
        const newData = processResData(resData);
        setData(newData);
        // console.log(newData.rData);
        // console.log("^ rData");
        // console.log(processResData(resData));
        console.log(newData);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <>
      <div>heatmap page</div>
      <CourtHeatmap data={data} radius={10} width={300} />
    </>
  );
}
