import { Document } from "mongoose";
import { IService } from "./service";

// export interface IStore extends Document {
//   _id: string;
//   name: string;
//   description: string;
//   category: string;
//   address: string;
//   location: {
//     type: string;
//     coordinates: number[];
//   };
//   shopkeeper: string; // Email of the shopkeeper
//   imageUrl?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface IStore extends Document {
  _id: string;
  name: string;
  description: string;
  category: string;
  shopkeeper: string;
  status: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  services: Array<IService>;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreLocation {
  address: string;
  city: string;
  zipCode: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
