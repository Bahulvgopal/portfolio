import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";

import CertificateService from "@/services/CertificateService";
import { updateCertificateApiSchema } from "@/schemas/certificateApiSchema";

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

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
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

    const certificate =
      await CertificateService.getCertificate(
        id
      );

    if (!certificate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Certificate not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch certificate.",
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

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
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
  updateCertificateApiSchema.parse(body);

    const certificate =
      await CertificateService.updateCertificate(
        id,
        data
      );

    if (!certificate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Certificate not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update certificate.",
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

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
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

    const certificate =
      await CertificateService.deleteCertificate(
        id
      );

    if (!certificate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Certificate not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Certificate deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete certificate.",
      },
      {
        status: 500,
      }
    );
  }
}