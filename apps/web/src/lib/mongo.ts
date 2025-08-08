// // lib/mongo.ts
// import { MongoClient } from 'mongodb';

// const client = new MongoClient('mongodb://localhost:27017');

// export async function connectDB() {
//     await client.connect();
//     const db = client.db('prezy'); // or your desired db name
//     return db;
// }

// lib/mongo.ts

////////////////////////////////////////////////////////////

// import mongoose from 'mongoose';

// export async function connectDB() {
//     const uri = process.env.MONGODB_URI;
//     const test = process.env.TEST;

//     console.log(test);
//     console.log(uri);

//     if (!uri) {
//         throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
//     }

//     if (mongoose.connection.readyState === 0) {
//         await mongoose.connect(process.env.MONGODB_URI!); // Set this in your `.env.local`
//     }
// }
