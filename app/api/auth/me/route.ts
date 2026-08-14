import { success } from "@/lib/api/apiResponse";
import { handleApiError } from "@/lib/api/handleApiError";
import { authService } from "@/services/AuthService";

export async function GET() {
  try {
    const admin = await authService.me();

    return success({ admin });
  } catch (error) {
    return handleApiError(error);
  }
}