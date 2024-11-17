"use server";
import { cache } from "react";
import { getLoggedUserFull, getUserFull, userData } from "./actions";

export const preloadUserFull = async (id) => {
  if (id) {
    void GetUserFull(undefined, id);
  }
};

export const GetUserFull = cache(getUserFull);
export const GetLoggedUserFull = cache(getLoggedUserFull);
export const UserData = cache(userData);
