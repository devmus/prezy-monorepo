// import { IService } from "./service.js";

// export interface IGiftcard {
//   _id: string;
//   service: IService;
//   uuid: string;
//   receiptEmail: string;
//   receiverEmail: string;
//   usedStatus: boolean;
//   redeemDate: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// packages/types/src/giftcard.ts
export interface GiftcardDTO {
  id: string;
  serviceId: string;

  // no full code exposed, just last 4 chars
  codeLast4: string;

  receiptEmail: string;
  receiverEmail: string;
  usedStatus: boolean;
  redeemDate: string | null;

  createdAt: string;
  updatedAt: string;
}
