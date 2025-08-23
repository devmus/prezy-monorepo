// packages/models/src/mappers/orderToDTO.ts
import type { OrderDTO } from "@prezy/types";
import type { IOrderDoc } from "../Order.js";

export function toOrderDTO(doc: IOrderDoc): OrderDTO {
  return {
    id: doc._id.toString(),
    userId: doc.userId ? doc.userId.toString() : null,
    serviceId: doc.serviceId.toString(),
    storeId: doc.storeId.toString(),
    quantity: doc.quantity,

    currency: doc.currency,
    unitAmount: doc.unitAmount,
    subtotal: doc.subtotal,
    taxAmount: doc.taxAmount ?? 0,
    total: doc.total,

    status: doc.status,
    paidAt: doc.paidAt ? doc.paidAt.toISOString() : null,
    fulfilledAt: doc.fulfilledAt ? doc.fulfilledAt.toISOString() : null,

    payment: {
      method: doc.payment.method,
      provider: doc.payment.provider,
      stripe: doc.payment.stripe,
      swish: doc.payment.swish,
      attempts: doc.payment.attempts,
      requestedAt: doc.payment.requestedAt
        ? doc.payment.requestedAt.toISOString()
        : undefined,
    },

    deliveryInfo: {
      receiptEmail: doc.deliveryInfo.receiptEmail,
      recipientEmail: doc.deliveryInfo.recipientEmail,
      message: doc.deliveryInfo.message ?? "",
    },

    idempotencyKey: doc.idempotencyKey ?? null,
    metadata: (doc.metadata as Record<string, any>) ?? undefined,

    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}
