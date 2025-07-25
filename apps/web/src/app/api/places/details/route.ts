import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get('placeId');

    if (!placeId) {
        return NextResponse.json({ success: false, error: 'Missing placeId' }, { status: 400 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        return NextResponse.json({ success: true, result: data.result }, { status: 200 });
    } catch (err) {
        console.error('Place Details API error:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch place details' },
            { status: 500 },
        );
    }
}
