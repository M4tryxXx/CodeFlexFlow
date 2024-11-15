import { cache } from "react";
import "server-only";
import { getLoggedUser } from "./actions";

export const preload = (email: string | undefined) => {
  if (email) {
    void getUserF(email);
  }
};

export const getUserF = cache(async (email: string | undefined) => {
  const currentUser = await getLoggedUser(email);
  return currentUser;
});
