export * from "./user.js";
export * from "./order.js";
export * from "./service.js";
export * from "./store.js";
export * from "./giftcard.js";
export * from "./auth-types.js";

// Why not just one type everywhere?

// Because each layer has different responsibilities and different shapes of the data.

// 1. DTO (Data Transfer Object)

// Purpose: Define what your API returns (what clients see).

// Lives in: packages/types.

// Characteristics:

// Always plain JSON-safe values: strings, numbers, booleans, arrays, records.

// ObjectIds become strings.

// Dates become ISO strings.

// No Mongo/Mongoose stuff leaking out (no _id, no __v, no virtuals unless explicit).

// Why separate: Guarantees your frontend/mobile clients get a predictable shape, not “whatever Mongoose feels like returning”.
