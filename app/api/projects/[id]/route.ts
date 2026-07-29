import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import ProjectService from "@/services/ProjectService";
import { ProjectSchema } from "@/validations/project";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

/* ================= GET PROJECT ================= */

export async function GET(
  req: Request,
  { params }: Context
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    const project = await ProjectService.getProject(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project.",
      },
      { status: 500 }
    );
  }
}

/* ================= UPDATE PROJECT ================= */

export async function PATCH(
  req: Request,
  { params }: Context
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    

    const data = ProjectSchema.partial().parse(body);

    

    const updated = await ProjectService.updateProject(
      id,
      data
    );

    

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project.",
      },
      { status: 500 }
    );
  }
}

/* ================= DELETE PROJECT ================= */

export async function DELETE(
  req: Request,
  { params }: Context
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    const deleted = await ProjectService.deleteProject(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project.",
      },
      { status: 500 }
    );
  }
}