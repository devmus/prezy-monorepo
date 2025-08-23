// packages/models/src/mappers/userToDTO.ts
import type { IUserDoc } from "../User.js";
import type { UserDTO } from "@prezy/types";

export function toUserDTO(doc: IUserDoc): UserDTO {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    role: doc.role,
    language: doc.language,
    image: doc.image,
    emailVerified: doc.emailVerified ? doc.emailVerified.toISOString() : null,
  };
}
