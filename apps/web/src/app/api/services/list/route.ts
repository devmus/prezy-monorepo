import { NextResponse } from 'next/server';
import { connectDB } from '@prezy/auth';
import { ListServicesResponse } from '@/types/api';
import { IService, Service, Store } from '@prezy/auth';

void Store;

export async function GET() {
    try {
        await connectDB();
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
