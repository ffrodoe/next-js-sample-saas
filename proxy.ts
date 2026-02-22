import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;

    const isDashboard = nextUrl.pathname.startsWith("/dashboard");

    if (isDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
    }
});

export const config = {
    matcher: ["/dashboard/:path*"],
};