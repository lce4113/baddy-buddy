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
    <div className="w-full">
      <div className="flex space-x-4 w-full text-lg">
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="font-bold">Distance</div>
          <div>{totalDistance.toFixed(2)} ft</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="font-bold">Calories</div>
          <div>{(totalDistance * 0.06).toFixed(2)} Cal</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDistance;
