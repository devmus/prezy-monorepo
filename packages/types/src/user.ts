// packages/types/src/user.ts

export type UserRole = "user" | "shopkeeper" | "admin";
export type UserLanguage = "en" | "sv" | "th";

export interface UserDTO {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  language: UserLanguage;

  // Optional profile fields
  image?: string;

  // NextAuth usually stores this as a Date in DB
  emailVerified?: string | null; // ISO string or null
}
