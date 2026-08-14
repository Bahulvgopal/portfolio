import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import EducationService from "@/services/EducationService";
import {
  educationSchema,
} from "@/schemas/educationSchema";

/* ================= GET ================= */

export async function GET() {
  await connectDB();

  const educations =
    await EducationService.getEducations();

  return NextResponse.json({
    success: true,
    data: educations,
  });
}

/* ================= POST ================= */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const data =
      educationSchema.parse(body);

    const education =
      await EducationService.createEducation(data);

    return NextResponse.json(
      {
        success: true,
        message: "Education created successfully.",
        data: education,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.issues?.[0]?.message ||
          error.message ||
          "Failed to create education.",
        errors: error?.issues ?? null,
      },
      {
        status: 400,
      }
    );
  }
}