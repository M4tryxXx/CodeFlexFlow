import { cache } from "react";
import "server-only";
import { getLoggedUserFull } from "./actions";

export const preloadUserFull = (id: string | undefined) => {
  if (id) {
    void GetUserFull(id);
  }
};

export const GetUserFull = cache(async (id: string | undefined) => {
  const currentUser = await getLoggedUserFull(id);
  return currentUser;
});
