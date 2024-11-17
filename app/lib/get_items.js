import { cache } from "react";
import "server-only";
import { getLoggedUser } from "./actions";

export const preload = (email) => {
  if (email) {
    void getUserF(email);
  }
};

export const getUserF = cache(async (email) => {
  const currentUser = await getLoggedUser(email);
  return currentUser;
});
