function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }

  return value;
}

export const env = {
  MONGODB_URI: getEnv("MONGODB_URI"),
  JWT_SECRET: getEnv("JWT_SECRET"),

  ADMIN_NAME: getEnv("ADMIN_NAME"),
  ADMIN_EMAIL: getEnv("ADMIN_EMAIL"),
  ADMIN_PASSWORD: getEnv("ADMIN_PASSWORD"),

  NODE_ENV: process.env.NODE_ENV ?? "development",
} as const;