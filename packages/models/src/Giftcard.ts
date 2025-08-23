// import { IGiftcard } from "@prezy/types";
// import mongoose, { Schema } from "mongoose";

// const GiftcardSchema = new Schema<IGiftcard>(
//   {
//     service: {
//       type: Schema.Types.ObjectId,
//       ref: "Service", // Reference to the Service model
//       required: true,
//     },
//     uuid: {
//       type: String,
//       required: [true, "UUID is required"],
//       trim: true,
//     },
//     receiptEmail: {
//       type: String,
//       required: [true, "Receipt email is required"],
//       trim: true,
//     },
//     receiverEmail: {
//       type: String,
//       required: [true, "Receiver email is required"],
//       trim: true,
//     },
//     usedStatus: {
//       type: Boolean,
//       default: false, // false = not redeemed, true = redeemed
//     },
//     redeemDate: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//     collection: "giftcards",
//   }
// );

// // Create indexes for efficient queries
// GiftcardSchema.index({ uuid: 1 }, { unique: true });
// GiftcardSchema.index({ service: 1 });
// GiftcardSchema.index({ status: 1 });

// // Export the model
// export const Giftcard =
//   (mongoose.models?.Giftcard as any) ||
//   mongoose.model<IGiftcard>("Giftcard", GiftcardSchema);

// packages/models/src/Giftcard.ts
import { Schema, model, models, Document, Types } from "mongoose";
import { hashCode } from "./giftcardSecurity.js";

export interface IGiftcardDoc extends Document {
  _id: Types.ObjectId;
  service: Types.ObjectId;

  // Instead of uuid
  codeHash: string; // full hash of redeemable code
  codeLast4: string; // derived last 4 chars (for UX/support)

  receiptEmail: string;
  receiverEmail: string;
  usedStatus: boolean;
  redeemDate: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

const GiftcardSchema = new Schema<IGiftcardDoc>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },
    codeHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    codeLast4: {
      type: String,
      required: true,
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
    usedStatus: {
      type: Boolean,
      default: false,
      index: true,
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

export const Giftcard =
  models.Giftcard || model<IGiftcardDoc>("Giftcard", GiftcardSchema);

/**
 * Factory: create a Giftcard document from a plain redeem code + payload.
 */
export async function createGiftcardWithCode(
  serviceId: Types.ObjectId,
  code: string,
  receiptEmail: string,
  receiverEmail: string
) {
  const codeHash = hashCode(code);
  const codeLast4 = code.slice(-4);

  const giftcard = new Giftcard({
    service: serviceId,
    codeHash,
    codeLast4,
    receiptEmail,
    receiverEmail,
  });

  return giftcard.save();
}

// packages/models/src/Giftcard.ts (append these helpers)
import type { ClientSession } from "mongoose";

/**
 * Look up a giftcard by a plaintext redeem code (without redeeming).
 */
export async function findGiftcardByCode(code: string) {
  const codeHash = hashCode(code);
  return Giftcard.findOne({ codeHash }).exec();
}

/**
 * Verify a giftcard code without mutating state.
 * Returns a concise status for UI flows.
 */
export async function verifyGiftcardCode(code: string) {
  const doc = await findGiftcardByCode(code);
  if (!doc) return { ok: false, reason: "not_found" as const };
  if (doc.usedStatus) {
    return {
      ok: false,
      reason: "already_redeemed" as const,
      redeemDate: doc.redeemDate ?? null,
    };
  }
  return {
    ok: true,
    reason: "valid" as const,
    card: doc,
  };
}

/**
 * Atomically mark a giftcard as redeemed if it exists and is not already used.
 * Uses a conditional update to prevent double redemption.
 *
 * Optionally accepts a Mongoose session for surrounding transactions.
 */
export async function redeemGiftcardByCode(
  code: string,
  opts?: { now?: Date; session?: ClientSession }
) {
  const codeHash = hashCode(code);
  const now = opts?.now ?? new Date();

  // Atomic: only update if currently unused
  const updated = await Giftcard.findOneAndUpdate(
    { codeHash, usedStatus: false },
    { $set: { usedStatus: true, redeemDate: now } },
    { new: true, session: opts?.session }
  ).exec();

  if (updated) {
    return { ok: true as const, card: updated };
  }

  // Determine reason for failure (not found vs already redeemed)
  const existing = await Giftcard.findOne({ codeHash }).exec();
  if (!existing) return { ok: false as const, reason: "not_found" as const };

  return {
    ok: false as const,
    reason: "already_redeemed" as const,
    redeemDate: existing.redeemDate ?? null,
  };
}
