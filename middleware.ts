import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/config/constants";
import { verifyToken } from "@/lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  console.log("========== MIDDLEWARE ==========");
  console.log("Path:", pathname);
  console.log("Token exists:", !!token);

  // Protect all admin routes
  if (pathname.startsWith("/admin")) {
    // No authentication cookie
    if (!token) {
      console.log("No token → Redirecting to login");

      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    try {
      // Verify the JWT
      const payload = await verifyToken(token);

      console.log("JWT Verified:", payload);

      // Valid token → allow access
      return NextResponse.next();
    } catch (error) {
      console.error("JWT ERROR → Invalid or expired token");

      // Invalid/expired token → remove it and redirect
      const response = NextResponse.redirect(
        new URL("/login", request.url)
      );

      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });

      return response;
    }
  }

  // Prevent authenticated users from returning to login
  if (pathname === "/login" && token) {
    try {
      await verifyToken(token);

      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    } catch {
      // Invalid token — clear it and allow login page
      const response = NextResponse.next();

      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};