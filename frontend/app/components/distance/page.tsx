"use client";

import PlayerDistance from "./Distance";

const frames = {
  0: { top: [0, 0], bottom: [1, 1] },
  1: { top: [1, 1], bottom: [2, 2] },
  2: { top: [2, 2], bottom: [3, 3] },
  // Add more frames as needed
};

export default function Home() {
  return (
    <div>
      <PlayerDistance frames={frames} />
    </div>
  );
}
