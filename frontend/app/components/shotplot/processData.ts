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

interface Data {
  lData: DataPoint[];
  rData: DataPoint[];
}

export function processResData(data: ResData): Data {
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
