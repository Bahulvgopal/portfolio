
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ProjectService from "@/services/ProjectService";
import { ProjectSchema } from "@/validations/project";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectDB();

    const projects = await ProjectService.getProjects();

    return NextResponse.json({
  success: true,
  data: projects,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const data = ProjectSchema.parse(body);

    const project = await ProjectService.createProject(data);

    revalidatePath("/projects");
    revalidatePath("/projects/[slug]", "page");
    
    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully.",
        data: project,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors: error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create project.",
      },
      {
        status: 500,
      }
    );
  }
}