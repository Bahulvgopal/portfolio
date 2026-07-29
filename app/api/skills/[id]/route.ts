import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db"; // Use your project's DB import
import SkillService from "@/services/SkillService";
import { updateSkillSchema } from "@/schemas/skillSchema";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: Props
) {
  try {
    await connectDB();

    const { id } = await params;

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

    const skill =
      await SkillService.getSkill(id);

    if (!skill) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch skill.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: Props
) {
  try {
    await connectDB();

    const { id } = await params;

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

    const body = await req.json();

    const data =
      updateSkillSchema.parse(body);

    const skill =
      await SkillService.updateSkill(
        id,
        data
      );

    if (!skill) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update skill.",
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: Props
) {
  try {
    await connectDB();

    const { id } = await params;

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

    const skill =
      await SkillService.deleteSkill(id);

    if (!skill) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete skill.",
      },
      {
        status: 500,
      }
    );
  }
}