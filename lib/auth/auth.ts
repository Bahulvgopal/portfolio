import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/lib/config/constants";
import { verifyToken } from "./jwt";
import { adminRepository } from "@/repositories/AdminRepository";

export async function auth() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(AUTH_COOKIE_NAME)?.value;

  console.log("========== AUTH CHECK ==========");
  console.log("Cookie name:", AUTH_COOKIE_NAME);
  console.log("Token exists:", !!token);

  if (!token) {
    console.log("❌ AUTH: No token");

    return {
      isAuthenticated: false,
      admin: null,
    };
  }

  try {
    const payload = await verifyToken(token);

    console.log("✅ AUTH: JWT verified");
    console.log("Admin ID:", payload.adminId);
    console.log("Email:", payload.email);

    const admin =
      await adminRepository.findById(payload.adminId);

    console.log("Admin found:", !!admin);

    if (!admin) {
      console.log("❌ AUTH: Admin not found in database");

      return {
        isAuthenticated: false,
        admin: null,
      };
    }

    console.log("✅ AUTH: Fully authenticated");

    return {
      isAuthenticated: true,
      admin,
    };
  } catch (error) {
    console.error("❌ AUTH ERROR:", error);

    return {
      isAuthenticated: false,
      admin: null,
    };
  }
}