import Heatmap from "./Heatmap";

export default function Home() {
  return (
    <>
      <div>heatmap page</div>
      <Heatmap
        data={[
          { x: 10, y: 15, value: 5 },
          { x: 100, y: 105, value: 9 },
          { x: 100, y: 105, value: 9 },
        ]}
        width={500}
      />
    </>
  );
}
