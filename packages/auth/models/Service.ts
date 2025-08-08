import mongoose, { Schema } from "mongoose";
import type { IService } from "../src/types/service";

const ServiceSchema = new Schema<IService>(
  {
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store", // Reference to the Store model
      required: true,
    },
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
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

// Create index on name and storeId for efficient queries
ServiceSchema.index({ name: 1 });
ServiceSchema.index({ storeId: 1 });

// Export the model
export const Service =
  (mongoose.models?.Service as any) ||
  mongoose.model<IService>("Service", ServiceSchema);
