// packages\auth\src\authOptions.ts
import "server-only";

import { createRequire } from "node:module";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import { clientPromise } from "@prezy/db";
import { loginFunctions } from "./loginFunctions.js";

const require = createRequire(import.meta.url);
// Force the CJS default export consistently
const GoogleProvider = require("next-auth/providers/google").default as (args: {
  clientId: string;
  clientSecret: string;
}) => any;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  //adapter creates the user
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        await loginFunctions(token, user, account);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user._id = token._id;
      }
      return session;
    },
  },
};
