import { Document } from "mongoose";
import { IService } from "./service";

// export interface IGiftcard extends Document {
//   _id: string;
//   service: string; // Reference to service ID
//   uuid: string;
//   receiptEmail: string;
//   receiverEmail: string;
//   status: boolean;
//   redeemDate: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface IGiftcard extends Document {
  _id: string;
  service: IService;
  uuid: string;
  receiptEmail: string;
  receiverEmail: string;
  status: boolean;
  redeemDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
