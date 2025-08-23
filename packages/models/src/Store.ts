// import { IStore } from "@prezy/types";
// import mongoose, { Schema } from "mongoose";

// // Store Schema
// const StoreSchema: Schema = new Schema<IStore>(
//   {
//     name: {
//       type: String,
//       required: [true, "Store name is required"],
//       trim: true,
//       maxlength: [100, "Store name cannot exceed 100 characters"],
//     },
//     description: {
//       type: String,
//       // required: [true, 'Store description is required'],
//       trim: true,
//       maxlength: [1000, "Store description cannot exceed 1000 characters"],
//     },
//     category: {
//       type: String,
//       required: [true, "Store category is required"],
//       trim: true,
//       maxlength: [100, "Store category cannot exceed 100 characters"],
//     },
//     shopkeeper: {
//       type: String,
//       required: [true, "Shopkeeper is required"],
//     },
//     status: {
//       type: String,
//       enum: ["created", "certified", "delisted"],
//       required: [true, "Status is required"],
//     },
//     location: {
//       address: {
//         type: String,
//         required: [true, "Address is required"],
//         trim: true,
//       },
//       city: {
//         type: String,
//         required: [true, "City is required"],
//         trim: true,
//       },
//       zipCode: {
//         type: String,
//         required: [true, "ZIP code is required"],
//         trim: true,
//       },
//       country: {
//         type: String,
//         required: [true, "Country is required"],
//         trim: true,
//         default: "Sweden",
//       },
//       coordinates: {
//         latitude: {
//           type: Number,
//           min: -90,
//           max: 90,
//         },
//         longitude: {
//           type: Number,
//           min: -180,
//           max: 180,
//         },
//       },
//     },
//     services: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Service",
//       },
//     ],
//   },
//   {
//     timestamps: true, // Automatically adds createdAt and updatedAt
//     collection: "stores",
//   }
// );

// // Indexes for better query performance
// StoreSchema.index({ name: 1 });
// StoreSchema.index({ "location.city": 1, "location.state": 1 });
// StoreSchema.index({ "location.coordinates": "2dsphere" }); // For geospatial queries

// // Virtual for full address
// StoreSchema.virtual("fullAddress").get(function (this: IStore) {
//   return `${this.location.address}, ${this.location.city}, ${this.location.state} ${this.location.zipCode}, ${this.location.country}`;
// });

// // Ensure virtuals are included in JSON output
// StoreSchema.set("toJSON", { virtuals: true });
// StoreSchema.set("toObject", { virtuals: true });

// // Export the model
// export const Store =
//   (mongoose.models?.Store as any) ||
//   mongoose.model<IStore>("Store", StoreSchema);

// packages/models/src/Store.ts
import { Schema, model, models, Document, Types } from "mongoose";

export type StoreStatus = "created" | "certified" | "delisted";

export interface IStoreLocationSubdoc {
  address: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
}

export interface IStoreDoc extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  category: string;
  shopkeeper: Types.ObjectId; // ref User
  status: StoreStatus;
  location: IStoreLocationSubdoc;
  services: Types.ObjectId[]; // ref Service
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<IStoreLocationSubdoc>(
  {
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: { type: String, required: [true, "City is required"], trim: true },
    state: { type: String, trim: true }, // <-- added to match your interface/virtual/index
    zipCode: {
      type: String,
      required: [true, "ZIP code is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      default: "Sweden",
    },
    coordinates: {
      latitude: { type: Number, min: -90, max: 90 },
      longitude: { type: Number, min: -180, max: 180 },
    },
  },
  { _id: false }
);

const StoreSchema = new Schema<IStoreDoc>(
  {
    name: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
      maxlength: [100, "Store name cannot exceed 100 characters"],
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Store description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Store category is required"],
      trim: true,
      maxlength: [100, "Store category cannot exceed 100 characters"],
    },
    shopkeeper: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Shopkeeper is required"],
      index: true,
    },
    status: {
      type: String,
      enum: ["created", "certified", "delisted"],
      required: [true, "Status is required"],
      index: true,
      default: "created",
    },
    location: { type: LocationSchema, required: true },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  {
    timestamps: true,
    collection: "stores",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
StoreSchema.index({ name: 1 });
StoreSchema.index({ "location.city": 1, "location.state": 1 });

// ⚠️ Note about geospatial index:
// Your original index used `StoreSchema.index({ "location.coordinates": "2dsphere" })`,
// but Mongoose/Mongo require GeoJSON for 2dsphere (e.g., { type: "Point", coordinates: [lng, lat] }).
// Since your shape is { latitude, longitude }, 2dsphere won't work as-is.
// If you want proper geo queries, we can switch to a GeoJSON field later.

// Virtual
StoreSchema.virtual("fullAddress").get(function (this: IStoreDoc) {
  const { address, city, state, zipCode, country } = this.location ?? {};
  return [address, city, state, zipCode, country].filter(Boolean).join(", ");
});

export const Store = models.Store || model<IStoreDoc>("Store", StoreSchema);
