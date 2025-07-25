import { NextRequest, NextResponse } from 'next/server';
import { AddressComponent } from '@/types';
import { sanitizeAddress } from '@/utils/sanitizeAdress';

export async function GET(request: NextRequest) {
    console.log('reverse');

    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
        return NextResponse.json({ success: false, error: 'Missing lat or lng' }, { status: 400 });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const result = data.results[0];

        if (!result) {
            return NextResponse.json(
                { success: false, error: 'No address found' },
                { status: 404 },
            );
        }

        const get = (type: string) =>
            (result.address_components as AddressComponent[]).find((c) => c.types.includes(type))
                ?.long_name || '';


        const location = {
            address: sanitizeAddress(result.address_components, result.formatted_address),
            city: get('locality') || get('postal_town'),
            zipCode: get('postal_code'),
            country: get('country'),
            coordinates: {
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
            },
        };

        return NextResponse.json({ success: true, location });
    } catch (err) {
        console.error('Reverse geocoding failed:', err);
        return NextResponse.json(
            { success: false, error: 'Reverse geocoding failed' },
            { status: 500 },
        );
    }
}
