import { NextRequest, NextResponse } from "next/server";
import ProfileService from "@/services/ProfileService";
import { profileApiSchema } from "@/schemas/profileApiSchema";

export async function GET() {
  try {
    const profile = await ProfileService.getProfile();

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
  console.error("Profile update error:", error);

  return NextResponse.json(
    {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update profile",
    },
    { status: 500 }
  );
}
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const validated = profileApiSchema.parse(body);

    const profile =
      await ProfileService.updateProfile(
        validated
      );

    return NextResponse.json({
      success: true,
      data: profile,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    console.error(error);

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