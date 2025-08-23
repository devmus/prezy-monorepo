// packages/models/src/mappers/giftcardToDTO.ts
import type { GiftcardDTO } from "@prezy/types";
import type { IGiftcardDoc } from "../Giftcard.js";

export function toGiftcardDTO(doc: IGiftcardDoc): GiftcardDTO {
  return {
    id: doc._id.toString(),
    serviceId: doc.service.toString(),
    // only expose safe last 4
    codeLast4: doc.codeLast4,
    receiptEmail: doc.receiptEmail,
    receiverEmail: doc.receiverEmail,
    usedStatus: doc.usedStatus,
    redeemDate: doc.redeemDate ? doc.redeemDate.toISOString() : null,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}
