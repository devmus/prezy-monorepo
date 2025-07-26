// packages/auth/lib/db.ts

import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGODB_URI!;
  await mongoose.connect(uri);
}
