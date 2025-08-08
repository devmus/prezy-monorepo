import { connectDB } from "../lib/db";

import type { JWT } from "next-auth/jwt";
import type { User as NextAuthUser, Account } from "next-auth";
import { User } from "../models/user.model";

export const loginFunctions = async (
  token: JWT,
  user: NextAuthUser,
  account: Account | null
) => {
  await connectDB();

  if (user?.email) {
    const preferredLang =
      (account?.params as { preferred_lang?: string })?.preferred_lang ?? "en";
    let dbUser = await User.findOne({ email: user.email });

    if (!dbUser) {
      // Extremely rare, but fallback
      dbUser = await User.create({
        email: user.email,
        name: user.name,
        role: "user",
        language: preferredLang,
      });
    } else {
      // Patch only if needed — avoids unnecessary writes
      dbUser.role = dbUser.role || "user";
      dbUser.language = dbUser.language || preferredLang || "en";
      await dbUser.save();
    }

    token._id = dbUser._id;
    token.role = dbUser.role;
  }
};
