import { generateToken } from "@/lib/auth/jwt";
import { comparePassword } from "@/lib/auth/password";
import { AuthenticationError } from "@/lib/errors";
import { adminRepository } from "@/repositories/AdminRepository";import { LoginDTO, LoginResponseDTO } from "@/types/auth";
import { auth } from "@/lib/auth/auth";

class AuthService {
 async login(data: LoginDTO): Promise<LoginResponseDTO> {
  const email = data.email.trim().toLowerCase();

  console.log("========== LOGIN ==========");
  console.log("Input email:", email);

  const admin = await adminRepository.findByEmail(email);

  console.log("Admin found:", admin);

  if (!admin) {
    throw new AuthenticationError("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(
    data.password,
    admin.password
  );

  console.log("Entered password:", data.password);
  console.log("Stored hash:", admin.password);
  console.log("Password valid:", isPasswordValid);

  if (!isPasswordValid) {
    throw new AuthenticationError("Invalid email or password");
  }

  const token = await generateToken({
  adminId: admin._id.toString(),
  email: admin.email,
});

  return {
    token,
    admin: {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
    },
  };
}

  async me() {
  const { admin } = await auth();

  if (!admin) {
    throw new AuthenticationError("Not authenticated");
  }

  return admin;
}

}

export const authService = new AuthService();