import { NextResponse } from 'next/server';

import { connectToDatabase } from '@prezy/db';
import { Store, Service } from '@prezy/models';

import { GetServiceResponse } from '@/types/api';

void Store;

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await connectToDatabase();

        const service = await Service.findById(id).populate('store');

        return NextResponse.json<GetServiceResponse>(
            {
                success: true,
                data: { service },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json<GetServiceResponse>(
            {
                success: false,
                error: 'Failed to fetch services',
            },
            { status: 500 },
        );
    }
}
