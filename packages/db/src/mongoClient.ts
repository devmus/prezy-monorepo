import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("MONGODB_URI is not set");

let cached = (global as any)._mongoClient as {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
};

if (!cached) {
  cached = (global as any)._mongoClient = { client: null, promise: null };
}

export const clientPromise: Promise<MongoClient> = cached.client
  ? Promise.resolve(cached.client)
  : (cached.promise ??= (async () => {
      const client = new MongoClient(uri);
      await client.connect();
      cached.client = client;
      return client;
    })());
