import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/config/constants";
import { verifyToken } from "@/lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  console.log("========== MIDDLEWARE ==========");
  console.log("Path:", request.nextUrl.pathname);
  console.log("Token exists:", !!token);

  if (token) {
  try {
    const payload = await verifyToken(token);
    console.log("JWT Verified:", payload);
  } catch (err) {
    console.error("JWT ERROR:", err);
  }
}

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};