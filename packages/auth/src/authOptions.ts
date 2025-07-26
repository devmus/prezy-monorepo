import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import { findOrCreateUser } from "@prezy/auth";
import { clientPromise, SessionUser, AppJWT } from "@prezy/auth";

interface ISession {
  session: SessionUser;
  token: AppJWT;
}

//HOW TO FIX session.user.role and session.user._id ???

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user?.email) {
        const dbUser = await findOrCreateUser(user.email, user.name);
        token.role = dbUser.role;
        token._id = dbUser._id;
      }
      return token;
    },
    async session({ session, token }: ISession) {
      if (session.user) {
        session.user.role = token.role;
        session.user._id = token._id;
      }
      return session;
    },
  },
};
