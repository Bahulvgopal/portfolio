import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/lib/config/constants";
import { verifyToken } from "./jwt";
import { adminRepository } from "@/repositories/AdminRepository";

export async function auth() {
  const cookieStore = await cookies();

  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return {
      isAuthenticated: false,
      admin: null,
    };
  }

  try {
    const payload = await verifyToken(token);

    const admin = await adminRepository.findById(payload.adminId);

    if (!admin) {
      return {
        isAuthenticated: false,
        admin: null,
      };
    }

    return {
      isAuthenticated: true,
      admin,
    };
  } catch {
    return {
      isAuthenticated: false,
      admin: null,
    };
  }
}