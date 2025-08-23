// import { IService } from "./service.js";

// export interface IStore {
//   _id: string;
//   name: string;
//   description: string;
//   category: string;
//   shopkeeper: string;
//   status: string;
//   location: {
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     country: string;
//     coordinates?: {
//       latitude: number;
//       longitude: number;
//     };
//   };
//   services: Array<IService>;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface StoreLocation {
//   address: string;
//   city: string;
//   zipCode: string;
//   country: string;
//   coordinates: {
//     latitude: number;
//     longitude: number;
//   };
// }

// packages/types/src/store.ts

export type StoreStatus = "created" | "certified" | "delisted";

export interface StoreCoordinatesDTO {
  latitude: number;
  longitude: number;
}

export interface StoreLocationDTO {
  address: string;
  city: string;
  state?: string; // your interface used this; keep it optional
  zipCode: string;
  country: string;
  coordinates?: StoreCoordinatesDTO; // optional, like in your original IStore
}

// This replaces your previous IStore (DTO surface for clients)
export interface StoreDTO {
  id: string;
  name: string;
  description?: string;
  category: string;
  shopkeeper: string; // user id (stringified ObjectId)
  status: StoreStatus;
  location: StoreLocationDTO;

  // We expose IDs here to avoid accidental heavy payloads;
  // you can add a "StoreWithServicesDTO" later if you want populated services.
  serviceIds: string[];

  createdAt: string; // ISO
  updatedAt: string; // ISO
}
