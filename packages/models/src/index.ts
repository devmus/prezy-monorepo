export { User } from "./User.js";
export { Store } from "./Store.js";
export { Service } from "./Service.js";
export { Giftcard } from "./Giftcard.js";
export { Order } from "./Order.js";

// Model Doc interfaces (handy for typing in services/controllers)
export type { IUserDoc } from "./User.js";
export type { IStoreDoc } from "./Store.js";
export type { IServiceDoc } from "./Service.js";
export type { IGiftcardDoc } from "./Giftcard.js";
export type { IOrderDoc } from "./Order.js";

// Mappers
export { toUserDTO } from "./mappers/userToDTO.js";
export { toStoreDTO } from "./mappers/storeToDTO.js";
export { toServiceDTO } from "./mappers/serviceToDTO.js";
export { toGiftcardDTO } from "./mappers/giftcardToDTO.js";
export { toOrderDTO } from "./mappers/orderToDTO.js";

// Giftcard helpers (hash/verify/redeem)
export {
  findGiftcardByCode,
  verifyGiftcardCode,
  redeemGiftcardByCode,
  createGiftcardWithCode,
} from "./Giftcard.js";

///////////////////////////

// 2. Model (Mongoose Schema/Model)

// Purpose: Define how data is stored in MongoDB.

// Lives in: packages/models.

// Characteristics:

// Uses Schema, model, and ObjectId.

// Knows about indexes, defaults, required fields, validation.

// Contains Mongo-specific features (timestamps, virtuals).

// Why separate: You don’t want client apps depending directly on a Mongoose schema; it ties them to DB internals.

///////////////////////////

// 3. Document Interface (e.g. IUserDoc)

// Purpose: TypeScript interface for the Mongoose document instance.

// Lives in: same file as model.

// Characteristics:

// _id is a Types.ObjectId.

// Dates are real Date objects (not strings).

// Might include Mongoose methods/virtuals.

// Why separate: Without this, you end up with any for Mongoose docs or DTO types leaking into your database layer.

////////////////////////////////

// 4. Mapper (e.g. toUserDTO)

// Purpose: Convert from a Mongoose document → DTO.

// Lives in: packages/models/src/mappers.

// Characteristics:

// Does type conversions: _id.toString() → id, Date → .toISOString().

// Filters out sensitive/internal fields (password hashes, codeHash, etc.).

// Enforces consistency — all API responses look the same.

// Why separate: So your controllers/handlers never need to worry about what shape the DB returns. They just return toUserDTO(doc).

////////////////////////////////

// Example in practice

// Let’s say you change your DB:

// // Add phone number field to UserSchema
// phone: { type: String }

// Model / IOrderDoc: Gains phone?: string.

// Mapper: Decides whether to expose it.

// If you don’t want to leak it to clients yet → don’t include it in toUserDTO.

// When ready, update UserDTO and mapper at the same time.

// DTO: Clients only see what you intend them to.

// This gives you freedom to evolve DB without breaking clients, and freedom to evolve API without changing DB internals.

// TL;DR

// DTO = API shape (plain, client-facing).

// Model = DB schema (Mongoose).

// Doc interface = TS typing for DB docs (ObjectIds, Dates).

// Mapper = glue to safely convert DB docs → DTOs.

// This pattern keeps concerns clean, prevents Mongo details from leaking to the client, and lets you refactor storage without breaking APIs.
