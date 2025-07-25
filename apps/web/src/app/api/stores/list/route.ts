import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongo';
import Store from '@/models/Store';
import { ListStoresResponse } from '@/types/api';

export async function GET() {
    try {
        await connectToDatabase();
        const stores = await Store.find({});
        return NextResponse.json<ListStoresResponse>(
            {
                success: true,
                data: { stores },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error fetching stores:', error);
        return NextResponse.json<ListStoresResponse>(
            {
                success: false,
                error: 'Failed to fetch stores',
            },
            { status: 500 },
        );
    }
}
