import { NextAuthConfig } from "next-auth";
import { NextRequest } from "next/server";
import { Session } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Check if the user has a valid session cookie to access dashboard pages (called by Proxy)
    authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      // Check if the user is trying to access a page in dashboard
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        // Check if the user has a valid session cookie
        if (!!auth?.user) {
          return true;
        } else {
          return false; // The user gets redirected to the sign-in page (NextAuth default behaviour)
        }
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
