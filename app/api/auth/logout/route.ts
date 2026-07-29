import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/config/constants";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete(AUTH_COOKIE_NAME);

  return response;
}