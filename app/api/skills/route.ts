import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db"; // Use your project's DB import
import SkillService from "@/services/SkillService";
import { skillSchema } from "@/schemas/skillSchema";

export async function GET() {
  try {
    await connectDB();

    const skills = await SkillService.getSkills();

    return NextResponse.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch skills.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const data = skillSchema.parse(body);

    const skill =
      await SkillService.createSkill(data);

    return NextResponse.json(
      {
        success: true,
        data: skill,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create skill.",
      },
      {
        status: 400,
      }
    );
  }
}