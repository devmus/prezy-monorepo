import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongo';
import Store from '@/models/Store';
import { AddStoreResponse } from '@/types/api';

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const { name, category, location } = await request.json();

        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json<AddStoreResponse>(
                {
                    success: false,
                    error: 'Store name is required and must be a non-empty string',
                },
                { status: 400 },
            );
        }

        const store = await Store.create({
            name: name.trim(),
            category,
            location,
            createdAt: new Date(),
        });

        return NextResponse.json<AddStoreResponse>(
            {
                success: true,
                data: store,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error creating store:', error);
        return NextResponse.json<AddStoreResponse>(
            {
                success: false,
                error: 'Failed to create store',
            },
            { status: 500 },
        );
    }
}
