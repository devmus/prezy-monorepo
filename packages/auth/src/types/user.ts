export interface UserData {
  _id: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
  name: string;
  role: UserRole;
  language: "en" | "sv" | "th";
  shopkeeper: string;
}

export type UserRole = "user" | "shopkeeper" | "admin";
