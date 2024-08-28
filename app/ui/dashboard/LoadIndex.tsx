"use Client";

import React from "react";

interface LoadIndicatorProps {
  number: number;
}

const LoadIndicator: React.FC<LoadIndicatorProps> = ({ number }) => {
  //console.log(number);
  // Ensure the number is within the range of 0 to 12
  const clampedNumber = Math.max(0, Math.min(number, 12));
  // Calculate the percentage
  const percentage = 100 - (clampedNumber / 12) * 100;

  return (
    <div className="w-[90%] mx-auto bg-gray-300 rounded-full h-4 md:h-6 mb-4">
      <div
        className="bg-blue-800 h-full rounded-full flex justify-center items-center font-bold text-white dark:text-black dark:bg-blue-500"
        style={{ width: `${percentage}%` }}
      >
        {Math.floor(percentage)}%
      </div>
    </div>
  );
};

export default LoadIndicator;
