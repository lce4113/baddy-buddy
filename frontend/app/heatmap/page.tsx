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
        console.log(newData);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <>
      <div>heatmap page</div>
      <CourtHeatmap lData={lData} rData={rData} radius={20} width={300} />
    </>
  );
}
