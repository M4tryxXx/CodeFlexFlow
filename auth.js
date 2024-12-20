import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { selectUserLogIn } from "./app/lib/myDb";
import { UserLogInType } from "./app/lib/types"; // Import the User type

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const parsedCredentials = z
          .object({ username: z.string().min(3), password: z.string().min(8) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          // console.log("Looking for user with username: ", username);
          const user = await selectUserLogIn(undefined, undefined, username);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
        } else {
          ////console.log("Invalid credentials");
          return null;
        }
        return null;
      },
    }),
  ],
});
