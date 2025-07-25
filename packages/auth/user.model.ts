import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  role: {
    type: String,
    enum: ["user", "shopkeeper", "admin"],
    default: "user",
  },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
