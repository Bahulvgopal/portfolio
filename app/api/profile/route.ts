import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import ProfileService from "@/services/ProfileService";
import { profileApiSchema } from "@/schemas/profileApiSchema";

/* ================= GET PROFILE ================= */

export async function GET() {
  try {
    const profile = await ProfileService.getProfile();

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}

/* ================= UPDATE PROFILE ================= */

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const validated = profileApiSchema.parse(body);

    const profile =
      await ProfileService.updateProfile(validated);

    /*
     * Profile information is displayed on the public
     * homepage, so invalidate the cached homepage after
     * updating the profile.
     */
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: profile,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    console.error("Profile update error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.errors?.[0]?.message ??
          "Failed to update profile",
      },
      { status: 400 }
    );
  }
}