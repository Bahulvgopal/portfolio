import {
  NextRequest,
  NextResponse,
} from "next/server";

import SettingsService from "@/services/SettingsService";
import { settingsSchema } from "@/schemas/settingsSchema";

export async function GET() {
  try {
    const settings =
      await SettingsService.getSettings();

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch settings",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const validated =
      settingsSchema.parse(body);

    const settings =
      await SettingsService.updateSettings(
        validated
      );

    return NextResponse.json({
      success: true,
      data: settings,
      message:
        "Settings updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message:
          error?.errors?.[0]?.message ??
          "Failed to update settings",
      },
      { status: 400 }
    );
  }
}