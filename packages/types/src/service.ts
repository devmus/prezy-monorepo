// import { IStore } from "./store.js";

// export interface IService {
//   _id: string;
//   store: IStore;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   inStock: boolean;
//   imageUrl?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// packages/types/src/service.ts

export interface ServiceDTO {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
