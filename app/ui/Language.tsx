/**
 * Creates a component that detects the client-side timezone and displays the current time in the user's timezone.
 */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { user } from "@nextui-org/react";

const UserTimezoneClock = () => {
  const router = useRouter();

  const userTimezone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1]
    .toString();
  useEffect(() => {
    router.push(`?language=${userTimezone}`);
  }, []);

  return "";
};

export default UserTimezoneClock;
