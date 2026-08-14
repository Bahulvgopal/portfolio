import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import ExperienceService from "@/services/ExperienceService";
import {
  updateExperienceSchema,
} from "@/schemas/experienceSchema";

/* ================= GET ================= */

export async function GET(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  await connectDB();

  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid ID.",
      },
      {
        status: 400,
      }
    );
  }

  const experience =
    await ExperienceService.getExperience(id);

  if (!experience) {
    return NextResponse.json(
      {
        success: false,
        message: "Experience not found.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    data: experience,
  });
}

/* ================= PATCH ================= */

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const body = await req.json();

    const data =
  updateExperienceSchema.parse(body);

    const updated =
      await ExperienceService.updateExperience(
        id,
        data
      );

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Experience updated successfully.",
      data: updated,
    });
  } catch (error: any) {
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message:
        error?.issues?.[0]?.message ||
        error.message ||
        "Update failed.",
      errors: error?.issues ?? null,
    },
    {
      status: 400,
    }
  );
}
}

/* ================= DELETE ================= */

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  await connectDB();

  const { id } = await context.params;

  const deleted =
    await ExperienceService.deleteExperience(
      id
    );

  if (!deleted) {
    return NextResponse.json(
      {
        success: false,
        message: "Experience not found.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Experience deleted successfully.",
  });
}