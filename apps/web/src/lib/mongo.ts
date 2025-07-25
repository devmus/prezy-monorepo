// // lib/mongo.ts
// import { MongoClient } from 'mongodb';

// const client = new MongoClient('mongodb://localhost:27017');

// export async function connectToDatabase() {
//     await client.connect();
//     const db = client.db('prezy'); // or your desired db name
//     return db;
// }

// lib/mongo.ts

////////////////////////////////////////////////////////////

import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

export async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI!); // Set this in your `.env.local`
    }
}
