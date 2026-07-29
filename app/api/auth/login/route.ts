import { NextResponse } from "next/server";
import { loginSchema } from "@/validations/auth";
import { authService } from "@/services/AuthService";
import {
  AUTH_COOKIE_NAME,
  COOKIE_MAX_AGE,
} from "@/lib/config/constants";
import { env } from "@/lib/config/env";
import { handleApiError } from "@/lib/api/handleApiError";
import { success } from "@/lib/api/apiResponse";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    console.log("Request body:", parsed.data);
    
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const result = await authService.login(parsed.data);
    const response = success({
        admin: result.admin,
       });

    response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: result.token,
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: COOKIE_MAX_AGE,
    });

    return response;
 } catch (error) {
  return handleApiError(error);
}
}