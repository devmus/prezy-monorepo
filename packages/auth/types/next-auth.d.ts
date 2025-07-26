// import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// import NextAuth from "next-auth";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role?: "user" | "shopkeeper" | "admin";
//       _id?: string;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: "user" | "shopkeeper" | "admin";
//     _id?: string;
//   }
// }

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      _id?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    _id?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    role?: string;
  }
}
