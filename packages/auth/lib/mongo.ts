// packages/auth/lib/mongo.ts

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

// ✅ Must be exported
export const clientPromise = client.connect();
