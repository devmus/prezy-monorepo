// packages/models/src/mappers/storeToDTO.ts
import type { StoreDTO } from "@prezy/types";
import type { IStoreDoc } from "../Store.js";

export function toStoreDTO(doc: IStoreDoc): StoreDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    category: doc.category,
    shopkeeper: doc.shopkeeper.toString(),
    status: doc.status,
    location: {
      address: doc.location.address,
      city: doc.location.city,
      state: doc.location.state,
      zipCode: doc.location.zipCode,
      country: doc.location.country,
      coordinates:
        doc.location.coordinates?.latitude != null &&
        doc.location.coordinates?.longitude != null
          ? {
              latitude: doc.location.coordinates.latitude!,
              longitude: doc.location.coordinates.longitude!,
            }
          : undefined,
    },
    serviceIds: (doc.services || []).map((s) => s.toString()),
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}
