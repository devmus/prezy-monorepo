// packages/auth/src/loginFunctions.ts

import type { JWT } from "next-auth/jwt";
import type { User as NextAuthUser, Account } from "next-auth";
import { connectToDatabase } from "@prezy/db"; // or '@prezy/db' if you re-export
import { User } from "@prezy/models"; // your User mongoose model exported from models pkg

export const loginFunctions = async (
  token: JWT,
  user: NextAuthUser,
  account: Account | null
) => {
  await connectToDatabase();

  if (user?.email) {
    const preferredLang =
      (account?.params as { preferred_lang?: string })?.preferred_lang ?? "en";

    let dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      dbUser = await User.create({
        email: user.email,
        name: user.name,
        role: "user",
        language: preferredLang,
      });
    } else {
      dbUser.role ||= "user";
      dbUser.language ||= preferredLang;
      await dbUser.save();
    }

    (token as any)._id = dbUser._id;
    (token as any).role = dbUser.role;
  }
};
