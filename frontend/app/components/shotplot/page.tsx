import { ShotPlot } from "./Shotplot";
import Image from "next/image";

export default function Home() {
  const data = [
    [0, 0],
    [1, 0],
    [17, 43.9],
  ];
  // for (let i = 0; i < 50; i++) {
  //   data.push([Math.round(Math.random() * 17), Math.round(Math.random() * 44)]);
  // }
  console.log("pdata:", data);
  return (
    <div>
      <div>shotplot page</div>
      <Image src={"/demo/shot-scatter.png"} alt="HI" width={300} height={200} />
      {/* <ShotPlot data={data} width={300} /> */}
    </div>
  );
}
