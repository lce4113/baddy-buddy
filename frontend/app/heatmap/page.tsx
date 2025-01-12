"use client";

import { useEffect, useState } from "react";
import { CourtHeatmap } from "./Heatmap";

interface ResData {
  [key: number]: {
    bottom: number[];
    top: number[];
  };
}

interface DataPoint {
  x: number;
  y: number;
  value: number;
}

export interface Data {
  lData: DataPoint[];
  rData: DataPoint[];
}

function processResData(data: ResData): Data {
  const pData = { lData: [], rData: [] };

  const cWidth = 43.9 / 2,
    cHeight = 17,
    cAlleyWidth = 1.4;
  const scaleRX = (v) => Math.round(((v - cWidth) / cWidth) * 100);
  const scaleLX = (v) => Math.round((v / cWidth) * 100);
  const scaleY = (v) => Math.round(((v + cAlleyWidth) / cHeight) * 100);

  for (const d of Object.values(data)) {
    if (d.bottom != null) {
      const scaledLX = scaleLX(d.bottom[1]),
        scaledLY = scaleY(d.bottom[0]);
      if (scaledLX >= 0 && scaledLX <= 100 && scaledLY >= 0 && scaledLY <= 100)
        pData.lData.push({
          x: scaledLX,
          y: scaledLY,
          value: 1,
        });
    }
    if (d.top != null) {
      const scaledRX = scaleRX(d.top[1]),
        scaledRY = scaleY(d.top[0]);
      if (scaledRX >= 0 && scaledRX <= 100 && scaledRY >= 0 && scaledRY <= 100)
        pData.rData.push({
          x: scaledRX,
          y: scaledRY,
          value: 1,
        });
    }
  }
  return pData;
}

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
    fetch("http://169.231.54.168:5001/fetch_player_position?video_id=test1")
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
<<<<<<< HEAD
=======
        console.log(newData);
>>>>>>> dc23315746208d501b7fd1495dcf0f5e35dfa9ce
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
