import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { env } from "@/lib/config/env";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export interface JwtPayload extends JWTPayload {
  adminId: string;
  email: string;
}

export async function generateToken(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(
  token: string
): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret);

  return {
    adminId: payload.adminId as string,
    email: payload.email as string,
    ...payload,
  };
}