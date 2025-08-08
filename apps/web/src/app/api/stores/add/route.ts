import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongo';
import Store from '@/models/Store';
import { AddStoreResponse } from '@/types/api';
import { requireRoles } from '@/lib/auth/checkRole';

export async function POST(request: NextRequest) {
    const auth = await requireRoles(['shopkeeper']);

    if (!auth.authorized) {
        return NextResponse.json<AddStoreResponse>(
            { success: false, error: auth.error },
            { status: 403 },
        );
    }

    try {
        await connectToDatabase();
        const { name, category, location } = await request.json();

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
            shopkeeper: auth.user.email,
            status: 'created',
        });

        return NextResponse.json<AddStoreResponse>(
            {
                success: true,
                data: { store },
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
