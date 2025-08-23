// packages/models/src/mappers/serviceToDTO.ts
import type { ServiceDTO } from "@prezy/types";
import type { IServiceDoc } from "../Service.js";

export function toServiceDTO(doc: IServiceDoc): ServiceDTO {
  return {
    id: doc._id.toString(),
    storeId: doc.store.toString(),
    name: doc.name,
    description: doc.description,
    price: doc.price,
    category: doc.category,
    imageUrl: doc.imageUrl,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}
