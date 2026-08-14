import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import CertificateService from "@/services/CertificateService";
import { certificateApiSchema } from "@/schemas/certificateApiSchema";
export async function GET() {
  try {
    await connectDB();

    const certificates =
      await CertificateService.getCertificates();

    return NextResponse.json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch certificates.",
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

    const data = certificateApiSchema.parse(body);

    const certificate =
      await CertificateService.createCertificate(
        data
      );

    return NextResponse.json(
      {
        success: true,
        data: certificate,
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
            : "Failed to create certificate.",
      },
      {
        status: 400,
      }
    );
  }
}