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
      const isPublic = nextUrl.pathname.startsWith("/public");
      const isCv = nextUrl.pathname.startsWith("/cv");

      if (isHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && !isPlanet && !isCv && !isPublic) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
