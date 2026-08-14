import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import ExperienceService from "@/services/ExperienceService";
import {
  experienceSchema,
} from "@/schemas/experienceSchema";

/* ================= GET ================= */

export async function GET() {
  await connectDB();

  const experiences =
    await ExperienceService.getExperiences();

  return NextResponse.json({
    success: true,
    data: experiences,
  });
}

/* ================= POST ================= */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const data =
      experienceSchema.parse(body);

    const experience =
      await ExperienceService.createExperience(data);

    return NextResponse.json(
      {
        success: true,
        message: "Experience created successfully.",
        data: experience,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Failed to create experience.",
      },
      {
        status: 400,
      }
    );
  }
}