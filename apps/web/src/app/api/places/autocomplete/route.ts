import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const input = searchParams.get('input');

    if (!input) {
        return NextResponse.json({ success: false, error: 'Missing input' }, { status: 400 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input,
    )}&components=country:se&location=59.3293,18.0686&radius=30000&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        return NextResponse.json({ success: true, predictions: data.predictions }, { status: 200 });
    } catch (err) {
        console.error('Autocomplete API error:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch autocomplete results' },
            { status: 500 },
        );
    }
}
