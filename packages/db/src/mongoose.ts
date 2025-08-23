import mongoose from "mongoose";

let cached = (global as any)._mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(uri = process.env.MONGODB_URI!) {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    if (!uri) throw new Error("MONGODB_URI is not set");
    cached.promise = mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
