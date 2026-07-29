import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import EducationService from "@/services/EducationService";
import {
  updateEducationSchema,
} from "@/schemas/educationSchema";

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

  const education =
    await EducationService.getEducation(id);

  if (!education) {
    return NextResponse.json(
      {
        success: false,
        message: "Education not found.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    data: education,
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
      updateEducationSchema.parse(body);

    const updated =
      await EducationService.updateEducation(
        id,
        data
      );

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          message: "Education not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Education updated successfully.",
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
    await EducationService.deleteEducation(id);

  if (!deleted) {
    return NextResponse.json(
      {
        success: false,
        message: "Education not found.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Education deleted successfully.",
  });
}