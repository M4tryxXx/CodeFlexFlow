"use Client";

import React from "react";

const LoadIndicator = ({ number }) => {
  //console.log(number);
  // Ensure the number is within the range of 0 to 12
  const clampedNumber = Math.max(0, Math.min(number, 13));
  //console.log(clampedNumber);
  // Calculate the percentage
  const percentage = 100 - (clampedNumber / 13) * 100;

  return (
    <div className="w-[90%] mx-auto bg-gray-200 rounded-full h-4 md:h-6 mb-4">
      {percentage > 0 ? (
        <div
          className="bg-blue-300 h-full rounded-full flex justify-center items-center font-bold dark:text-white text-black dark:bg-blue-500"
          style={{ width: `${percentage}%` }}
        >
          {Math.floor(percentage)}%
        </div>
      ) : (
        <div className="bg-stone-200 h-full rounded-full flex justify-center items-center font-bold text-white dark:text-black dark:bg-stone-200 w-full">
          0%
        </div>
      )}
    </div>
  );
};

export default LoadIndicator;
