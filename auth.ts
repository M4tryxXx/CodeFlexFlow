import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { findUserByUsername } from "./app/lib/myDb";
import { updateLogin } from "./app/lib/myDb";
import { User } from "./app/lib/myDb"; // Import the User type

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, request): Promise<User | null> {
        const parsedCredentials = z
          .object({ username: z.string().min(3), password: z.string().min(8) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await findUserByUsername(username);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            const locale = new Date().toLocaleString();
            await updateLogin(user.id, {
              lastLogin: new Date(locale).toISOString(),
              lastLoginFrom: Intl.DateTimeFormat()
                .resolvedOptions()
                .timeZone.split("/")[1]
                .toString(),
            });
            return user;
          }
        } else {
          //console.log("Invalid credentials");
          return null;
        }
        return null;
      },
    }),
  ],
});
