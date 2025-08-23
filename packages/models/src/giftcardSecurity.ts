// packages/models/src/giftcardSecurity.ts
import { createHash, timingSafeEqual } from "crypto";

export function hashCode(plain: string): string {
  return createHash("sha256").update(plain, "utf8").digest("hex");
}

export function codesEqual(plain: string, storedHash: string): boolean {
  const a = Buffer.from(hashCode(plain), "hex");
  const b = Buffer.from(storedHash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}
