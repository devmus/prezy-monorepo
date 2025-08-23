// packages/models/src/User.ts
import { Schema, model, models, Document, Types } from "mongoose";
import type { UserRole, UserLanguage } from "@prezy/types";

export interface IUserDoc extends Document {
  _id: Types.ObjectId;
  email: string;
  name?: string;
  role: UserRole;
  language: UserLanguage;
  image?: string;
  emailVerified?: Date | null;
  shopkeeper?: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDoc>(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    role: {
      type: String,
      enum: ["user", "shopkeeper", "admin"],
      default: "user",
      index: true,
    },
    language: {
      type: String,
      enum: ["en", "sv", "th"],
      default: "en",
    },
    image: { type: String },
    emailVerified: { type: Date, default: null },
  },
  { timestamps: true }
);

UserSchema.index({ role: 1, createdAt: -1 });

export const User = models.User || model<IUserDoc>("User", UserSchema);
