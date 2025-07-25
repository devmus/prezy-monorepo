// import { MongoClient, Db, Document } from 'mongodb';

// // MongoDB connection configuration
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
// const MONGODB_DB = process.env.MONGODB_DB || 'prezy';

// // Global variables to store the connection
// let cachedClient: MongoClient | null = null;
// let cachedDb: Db | null = null;

// // Interface for MongoDB connection options
// interface MongoConnectionOptions {
//     uri?: string;
//     dbName?: string;
//     maxPoolSize?: number;
//     serverSelectionTimeoutMS?: number;
//     socketTimeoutMS?: number;
// }

// /**
//  * Connect to MongoDB with caching for development
//  */
// export async function connectToDatabase(options: MongoConnectionOptions = {}) {
//     // If we have cached connection, return it
//     if (cachedClient && cachedDb) {
//         return { client: cachedClient, db: cachedDb };
//     }

//     const {
//         uri = MONGODB_URI,
//         dbName = MONGODB_DB,
//         maxPoolSize = 10,
//         serverSelectionTimeoutMS = 5000,
//         socketTimeoutMS = 45000,
//     } = options;

//     try {
//         // Create new client
//         const client = new MongoClient(uri, {
//             maxPoolSize,
//             serverSelectionTimeoutMS,
//             socketTimeoutMS,
//         });

//         // Connect to MongoDB
//         await client.connect();
//         console.log('✅ Connected to MongoDB');

//         // Get database instance
//         const db = client.db(dbName);

//         // Cache the connection
//         cachedClient = client;
//         cachedDb = db;

//         return { client, db };
//     } catch (error) {
//         console.error('❌ Failed to connect to MongoDB:', error);
//         throw new Error('Failed to connect to MongoDB');
//     }
// }

// /**
//  * Get cached database instance
//  */
// export async function getDatabase(): Promise<Db> {
//     if (!cachedDb) {
//         await connectToDatabase();
//     }
//     if (!cachedDb) {
//         throw new Error('Failed to get database connection');
//     }
//     return cachedDb;
// }

// /**
//  * Get cached client instance
//  */
// export async function getClient(): Promise<MongoClient> {
//     if (!cachedClient) {
//         await connectToDatabase();
//     }
//     if (!cachedClient) {
//         throw new Error('Failed to get client connection');
//     }
//     return cachedClient;
// }

// /**
//  * Close the database connection
//  */
// export async function closeConnection() {
//     if (cachedClient) {
//         await cachedClient.close();
//         cachedClient = null;
//         cachedDb = null;
//         console.log('🔌 MongoDB connection closed');
//     }
// }

// /**
//  * Health check for database connection
//  */
// export async function checkDatabaseHealth(): Promise<boolean> {
//     try {
//         const db = await getDatabase();
//         await db.admin().ping();
//         return true;
//     } catch (error) {
//         console.error('Database health check failed:', error);
//         return false;
//     }
// }

// /**
//  * Utility function to get a collection
//  */
// export async function getCollection<T extends Document = Document>(collectionName: string) {
//     const db = await getDatabase();
//     return db.collection<T>(collectionName);
// }

// // Graceful shutdown handling
// if (typeof window === 'undefined') {
//     // Server-side only
//     process.on('SIGINT', async () => {
//         await closeConnection();
//         process.exit(0);
//     });

//     process.on('SIGTERM', async () => {
//         await closeConnection();
//         process.exit(0);
//     });
// }
