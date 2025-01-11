import { CourtHeatmap } from "./Heatmap";

// class Point {
//   constructor() {
//     this.curr = {
//       x: Math.round(Math.random() * 100),
//       y: Math.round(Math.random() * 100),
//     };
//   }
//   move() {
//     const dist = 10;
//     this.curr.x += Math.round(Math.random() * dist * 2 - dist);
//     this.curr.x = Math.max(Math.min(this.curr.x, 100), 0);
//     this.curr.y += Math.round(Math.random() * dist * 2 - dist);
//     this.curr.y = Math.max(Math.min(this.curr.y, 100), 0);
//   }
//   get() {
//     return {
//       x: this.curr.x,
//       y: this.curr.y,
//       value: Math.round(Math.random() * 10),
//     };
//   }
// }

export default function Home() {
  // rng points
  const lData = [];
  const rData = [];
  for (let i = 0; i < 50; i++) {
    lData.push({
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100),
      value: Math.round(Math.random() * 10),
    });
    rData.push({
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100),
      value: Math.round(Math.random() * 10),
    });
  }
  // import data here prob
  return (
    <>
      <div>heatmap page</div>
      <CourtHeatmap lData={lData} rData={rData} radius={20} width={300} />
    </>
  );
}
