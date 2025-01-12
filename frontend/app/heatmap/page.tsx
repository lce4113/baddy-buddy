import { CourtHeatmap } from "./Heatmap";

// class Point {
//   constructor() {
//     this.curr = {
//       x: Math.round(Math.random() * 100),
//       y: Math.round(Math.random() * 100),
//     };
//   }
//   move() {
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
