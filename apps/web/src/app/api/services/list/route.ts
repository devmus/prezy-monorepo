import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import Service from '@/models/Service';
import { ListServicesResponse } from '@/types/api';
import { IService } from '@/types/service';
import Store from '@/models/Store';

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
