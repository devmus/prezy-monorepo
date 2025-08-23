// packages/models/src/Order.ts
import { Schema, model, models, Types, Document } from "mongoose";

export interface IOrderDoc extends Document {
  _id: Types.ObjectId;
  userId?: Types.ObjectId | null;
  serviceId: Types.ObjectId;
  storeId: Types.ObjectId;

  quantity: number;
  currency: string;
  unitAmount: number;
  subtotal: number;
  taxAmount: number;
  total: number;

  status: "pending" | "paid" | "delivered" | "failed" | "canceled";
  paidAt?: Date | null;
  fulfilledAt?: Date | null;

  payment: {
    method: "stripe" | "swish";
    provider: "stripe" | "swish";
    stripe?: { sessionId?: string; paymentIntentId?: string };
    swish?: {
      payeePaymentReference?: string | null;
      paymentReference?: string | null;
    };
    attempts?: number;
    requestedAt?: Date; // <-- important: Date, not string
  };

  deliveryInfo: {
    receiptEmail: string;
    recipientEmail: string;
    message?: string;
  };

  idempotencyKey?: string | null;
  metadata?: Record<string, any>;

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrderDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    quantity: { type: Number, default: 1 },
    currency: { type: String, required: true },
    unitAmount: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered", "failed", "canceled"],
      default: "pending",
    },
    paidAt: { type: Date, default: null },
    fulfilledAt: { type: Date, default: null },
    payment: {
      // method: { type: String, enum: ["stripe", "swish", "klarna", "crypto"], required: true },
      // provider: { type: String, enum: ["stripe", "swish", "klarna", "crypto"], required: true },
      method: { type: String, enum: ["stripe", "swish"], required: true },
      provider: { type: String, enum: ["stripe", "swish"], required: true },
      stripe: { sessionId: String, paymentIntentId: String },
      swish: { payeePaymentReference: String, paymentReference: String },
      attempts: { type: Number, default: 0 },
      requestedAt: { type: Date },
    },
    deliveryInfo: {
      receiptEmail: { type: String, required: true },
      recipientEmail: { type: String, required: true },
      message: { type: String },
    },
    idempotencyKey: { type: String, index: true, sparse: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Order = models.Order || model<IOrderDoc>("Order", OrderSchema);
