import { useEffect, useState } from "react";

const calculateDistance = (data) => {
  let totalDistance = 0;

  for (let i = 1; i < data.lData.length; i++) {
    const prevFrame = data.lData[i - 1];
    const currFrame = data.lData[i];

    // Calculate Euclidean distance
    const distance = Math.sqrt(
      Math.pow(currFrame["x"] - prevFrame["x"], 2) +
        Math.pow(currFrame["y"] - prevFrame["y"], 2)
    );

    totalDistance += distance;
  }

  console.log(totalDistance);
  return totalDistance;
};

const PlayerDistance = ({ data }: { data: any }) => {
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    if (data) {
      const distance = calculateDistance(data);
      setTotalDistance(distance);
    }
  }, [data]);

  return (
    <div>
      <div className="bg-gray-700">
        <div>Distance</div>
        <div>{totalDistance.toFixed(2)}</div>
      </div>
      <p>Total Distance: {totalDistance.toFixed(2)} feet</p>
    </div>
  );
};

export default PlayerDistance;
