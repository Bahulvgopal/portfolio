import mongoose from "mongoose";

import { env } from "@/lib/config/env";

const MONGODB_URI = env.MONGODB_URI;


declare global {
  var mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseConnection ?? {
  conn: null,
  promise: null,
};

global.mongooseConnection = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "portfolio-cms",
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}