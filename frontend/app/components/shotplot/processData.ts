export interface ResData {
  pos: number[][];
}

interface Point {
  x: number;
  y: number;
  value: number;
}

interface Data {
  lData: Point[];
  rData: Point[];
}

export function processShotplotData(data: ResData): Data {
  const pData = [];

  const cWidth = 43.9,
    cHeight = 17,
    cAlleyWidth = 1.4;
  const scaleX = (v) => Math.round((v / cWidth) * 100);
  const scaleY = (v) => Math.round(((v + cAlleyWidth) / cHeight) * 100);

  for (const d of data) {
    pData.push({
      x: scaleX(d[1]),
      y: scaleY(d[0]),
    });
  }
  return pData;
}
