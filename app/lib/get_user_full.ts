"use server";
import { cache } from "react";
import { getLoggedUserFull, getUserFull, userData } from "./actions";

export const preloadUserFull = async (id: string | undefined) => {
  if (id) {
    void GetUserFull(undefined, id);
  }
};

export const GetUserFull = cache(getUserFull);
export const GetLoggedUserFull = cache(getLoggedUserFull);
export const UserData = cache(userData);
