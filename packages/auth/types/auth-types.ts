// packages/auth/types/auth-types.ts

export type UserRole = "user" | "shopkeeper" | "admin";

export interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
  language: string;
  _id?: string;
}

export interface AppJWT {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  role?: UserRole;
  _id?: string;
}
