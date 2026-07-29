import "dotenv/config";
import { connectDB } from "@/lib/db";
import { adminRepository } from "@/repositories/AdminRepository";
import { hashPassword } from "@/lib/auth/password";
import { env } from "@/lib/config/env";

async function seedAdmin() {
  try {
    await connectDB();

    const existingAdmin = await adminRepository.findFirst();

    if (existingAdmin) {
      console.log("❌ Admin already exists.");
      process.exit(0);
    }

    console.log("Password from env:", env.ADMIN_PASSWORD);
    
    const hashedPassword = await hashPassword(env.ADMIN_PASSWORD);

    await adminRepository.create({
      name: env.ADMIN_NAME,
      email: env.ADMIN_EMAIL.toLowerCase(),
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully.");
    console.log(`Email: ${env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
  } finally {
    process.exit(0);
  }
}

seedAdmin();