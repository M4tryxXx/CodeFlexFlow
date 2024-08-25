/**
 * Creates a component that detects the client-side timezone and displays the current time in the user's timezone.
 */
"use client";
import { useEffect, useState } from "react";

const UserTimezoneClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const userTimezone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1]
    .toString();

  return (
    <div>
      <h2>Current Time in Your Timezone ({userTimezone}):</h2>
      <p>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default UserTimezoneClock;
