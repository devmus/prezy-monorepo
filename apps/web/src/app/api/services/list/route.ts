import { NextResponse } from 'next/server';
import { connectToDatabase } from '@prezy/db';
import { Service, Store } from '@prezy/models';
import { IService } from '@prezy/types';
import { ListServicesResponse } from '@/types/api';

void Store;

export async function GET() {
    try {
        await connectToDatabase();
        const services: IService[] = await Service.find({}).populate('store');

        return NextResponse.json<ListServicesResponse>(
            {
                success: true,
                data: { services },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json<ListServicesResponse>(
            {
                success: false,
                error: 'Failed to fetch services',
            },
            { status: 500 },
        );
    }
}
