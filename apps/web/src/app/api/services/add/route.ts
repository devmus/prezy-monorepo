import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@prezy/db';
import { Store, Service } from '@prezy/models';
import { AddServiceResponse } from '@/types/api';

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const { name, description, price, category, imageUrl, storeId } = await request.json();

        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json<AddServiceResponse>(
                {
                    success: false,
                    error: 'Service name is required and must be a non-empty string',
                },
                { status: 400 },
            );
        }

        const storeObject = await Store.findById(storeId);
        if (!storeObject) {
            return NextResponse.json<AddServiceResponse>(
                {
                    success: false,
                    error: 'Store not found',
                },
                { status: 404 },
            );
        }

        const service = await Service.create({
            name: name.trim(),
            store: storeObject._id,
            description: description.trim(),
            price: price,
            category: category.trim(),
            imageUrl: imageUrl.trim(),
        });

        storeObject.services.push(service._id);
        await storeObject.save();

        return NextResponse.json<AddServiceResponse>(
            {
                success: true,
                data: service,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json<AddServiceResponse>(
            {
                success: false,
                error: 'Failed to create service',
            },
            { status: 500 },
        );
    }
}
