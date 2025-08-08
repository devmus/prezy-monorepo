import { Document } from "mongoose";
import { IStore } from "./store";

// export interface IService extends Document {
//   _id: string;
//   store: string; // Reference to store ID
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   inStock: boolean;
//   imageUrl?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface DeliveryInfo {
//   receiptEmail: string;
//   giftCardEmail: string;
//   message: string;
// }

export interface IService extends Document {
  _id: string;
  store: IStore;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryInfo {
  receiptEmail: string;
  giftCardEmail: string;
  message: string;
}
