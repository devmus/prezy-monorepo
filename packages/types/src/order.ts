// packages/types/src/order.ts
export type PaymentMethod = "stripe" | "swish" | "klarna" | "crypto";

export interface PaymentStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export type PaymentPhase =
  | { state: "idle" }
  | { state: "initiating" }
  | { state: "redirecting" } // Stripe redirect
  | { state: "awaiting_user" } // Swish waiting for user to finish in app
  | { state: "success" }
  | { state: "error"; message: string };

export type OrderStatus =
  | "pending"
  | "paid"
  | "delivered"
  | "failed"
  | "canceled";

export interface DeliveryInfo {
  receiptEmail: string;
  recipientEmail: string;
  message: string;
}

export interface OrderDTO {
  id: string; // always plain string here, so works in any app (web, mobile)
  userId?: string | null;
  serviceId: string;
  storeId: string;
  quantity: number;

  currency: string;
  unitAmount: number;
  subtotal: number;
  taxAmount: number;
  total: number;

  status: OrderStatus;
  paidAt?: string | null; // ISO 8601
  fulfilledAt?: string | null;

  payment: {
    method: PaymentMethod;
    provider: "stripe" | "swish";
    stripe?: { sessionId?: string; paymentIntentId?: string };
    swish?: {
      payeePaymentReference?: string | null;
      paymentReference?: string | null;
    };
    attempts?: number;
    requestedAt?: string;
  };

  deliveryInfo: DeliveryInfo;

  idempotencyKey?: string | null;
  metadata?: Record<string, any>;

  createdAt: string;
  updatedAt: string;
}
