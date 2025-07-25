# MongoDB Connection Utility

This utility provides a robust MongoDB connection management system for the Prezy application.

## Setup

1. **Install MongoDB driver** (already done):

    ```bash
    npm install mongodb
    ```

2. **Environment Variables**:
   Create a `.env.local` file in your project root with:

    ```env
    # MongoDB Configuration
    MONGODB_URI=mongodb://localhost:27017
    MONGODB_DB=prezy

    # For MongoDB Atlas (cloud hosted)
    # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prezy?retryWrites=true&w=majority
    # MONGODB_DB=prezy
    ```

## Usage

### Basic Connection

```typescript
import { connectToDatabase, getDatabase, getCollection } from '@/lib/mongodb';

// Connect to database
const { client, db } = await connectToDatabase();

// Get database instance
const db = await getDatabase();

// Get a collection
const usersCollection = await getCollection('users');
```

### Custom Connection Options

```typescript
import { connectToDatabase } from '@/lib/mongo';

const { client, db } = await connectToDatabase({
    uri: 'mongodb://localhost:27017',
    dbName: 'prezy',
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 60000,
});
```

### Health Check

```typescript
import { checkDatabaseHealth } from '@/lib/mongodb';

const isHealthy = await checkDatabaseHealth();
if (isHealthy) {
    console.log('Database is healthy');
} else {
    console.log('Database connection failed');
}
```

### Graceful Shutdown

```typescript
import { closeConnection } from '@/lib/mongodb';

// Close connection when shutting down
await closeConnection();
```

## Features

- ✅ **Connection Caching**: Reuses connections in development
- ✅ **Error Handling**: Comprehensive error handling and logging
- ✅ **TypeScript Support**: Full TypeScript support with proper types
- ✅ **Health Checks**: Built-in database health monitoring
- ✅ **Graceful Shutdown**: Proper connection cleanup on app shutdown
- ✅ **Environment Configuration**: Flexible configuration via environment variables
- ✅ **Connection Pooling**: Optimized connection pooling for performance

## Example API Route

```typescript
// app/api/users/route.ts
import { getCollection } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const usersCollection = await getCollection('users');
        const users = await usersCollection.find({}).toArray();

        return NextResponse.json({ users });
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
```
