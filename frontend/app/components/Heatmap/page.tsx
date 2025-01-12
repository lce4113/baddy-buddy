import { CourtHeatmap } from "./Heatmap";

export default function Home() {
  const lData = [];
  const rData = [];
  for (let i = 0; i < 50; i++) {
    lData.push({
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100),
    });
    rData.push({
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100),
    });
  }
  const data = { lData, rData };
  return (
    <>
      <div>heatmap page</div>
      <CourtHeatmap data={data} radius={20} width={300} />
    </>
  );
}
