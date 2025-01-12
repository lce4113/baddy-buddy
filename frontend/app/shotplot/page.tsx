import {ShotPlot} from "./Shotplot";

export default function Home() {
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
    return (
        <>
            <div>shotplot page</div>
            <ShotPlot lData={lData} rData={rData} width={300} />
        </>
    )
}