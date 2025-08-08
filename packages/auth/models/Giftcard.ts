import { IGiftcard } from "../src/types/giftcard";
import mongoose, { Schema } from "mongoose";

const GiftcardSchema = new Schema<IGiftcard>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service", // Reference to the Service model
      required: true,
    },
    uuid: {
      type: String,
      required: [true, "UUID is required"],
      unique: true,
      trim: true,
    },
    receiptEmail: {
      type: String,
      required: [true, "Receipt email is required"],
      trim: true,
    },
    receiverEmail: {
      type: String,
      required: [true, "Receiver email is required"],
      trim: true,
    },
    status: {
      type: Boolean,
      default: false, // false = not redeemed, true = redeemed
    },
    redeemDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "giftcards",
  }
);

// Create indexes for efficient queries
GiftcardSchema.index({ uuid: 1 }, { unique: true });
GiftcardSchema.index({ service: 1 });
GiftcardSchema.index({ status: 1 });

// Export the model
export const Giftcard =
  (mongoose.models?.Giftcard as any) ||
  mongoose.model<IGiftcard>("Giftcard", GiftcardSchema);
