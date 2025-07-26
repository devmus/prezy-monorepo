// packages/auth/lib/user.ts

import { User } from "../models/user.model"; // adjust path to your Mongoose model
import { connectDB } from "./db";
import { cookies } from "next/headers";

export async function findOrCreateUser(email: string, name?: string | null) {
  if (!email) throw new Error("Email is required");

  await connectDB();

  let user = await User.findOne({ email });

  if (!user) {
    const cookieStore = await cookies();
    const preferredLang = cookieStore.get("preferred_lang")?.value ?? "en";

    user = await User.create({
      email,
      name,
      language: preferredLang,
    });
  }

  return user;
}
