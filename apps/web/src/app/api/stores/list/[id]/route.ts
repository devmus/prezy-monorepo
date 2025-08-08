import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@prezy/auth';
import { Store } from '@/models/Store';
import { Service } from '@/models/Service';
import { GetStoreResponse } from '@/types/api';

void Service;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await connectDB();

        const store = await Store.findById(id).populate('services');

        return NextResponse.json<GetStoreResponse>(
            {
                success: true,
                data: { store },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error fetching stores:', error);
        return NextResponse.json<GetStoreResponse>(
            {
                success: false,
                error: 'Failed to fetch stores',
            },
            { status: 500 },
        );
    }
}
