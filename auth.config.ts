import type { NextAuthConfig } from "next-auth";

export let userLoggedIn: any;

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isHome = nextUrl.pathname.startsWith("/home");
      const isPlanet = nextUrl.pathname.startsWith("/planet");
      const isRegister = nextUrl.pathname.startsWith("/register");
      const isForgotPassword = nextUrl.pathname.startsWith("/reset-password");
      const isResetPassword = nextUrl.pathname.startsWith("/recovery");

      if (isHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && !isPlanet) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
