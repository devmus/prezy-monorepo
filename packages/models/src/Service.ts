// import mongoose, { Schema } from "mongoose";
// import type { IService } from "@prezy/types";

// const ServiceSchema = new Schema<IService>(
//   {
//     store: {
//       type: Schema.Types.ObjectId,
//       ref: "Store", // Reference to the Store model
//       required: true,
//     },
//     name: {
//       type: String,
//       required: [true, "Service name is required"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Service description is required"],
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: [true, "Service price is required"],
//       min: [0, "Price cannot be negative"],
//     },
//     category: {
//       type: String,
//       required: [true, "Category is required"],
//       trim: true,
//     },
//     imageUrl: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//     collection: "services",
//   }
// );

// // Create index on name and storeId for efficient queries
// ServiceSchema.index({ name: 1 });
// ServiceSchema.index({ storeId: 1 });

// // Export the model
// export const Service =
//   (mongoose.models?.Service as any) ||
//   mongoose.model<IService>("Service", ServiceSchema);

// packages/models/src/Service.ts
import { Schema, model, models, Document, Types } from "mongoose";

export interface IServiceDoc extends Document {
  _id: Types.ObjectId;
  store: Types.ObjectId; // ref Store
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDoc>(
  {
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "services",
  }
);

// Indexes for common queries
ServiceSchema.index({ store: 1, category: 1 });

export const Service =
  models.Service || model<IServiceDoc>("Service", ServiceSchema);
