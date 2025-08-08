import { NextResponse } from 'next/server';
import { connectDB } from '@prezy/auth';
import Store from '@/models/Store';
import { ListStoresResponse } from '@/types/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '@prezy/auth';

export async function GET(req: Request) {
    try {
        await connectDB();

        const url = new URL(req.url);
        const mineOnly = url.searchParams.get('mine') === 'true';

        let stores;

        if (mineOnly) {
            const session = await getServerSession(authOptions);

            if (!session?.user?.email) {
                return NextResponse.json(
                    { success: false, error: 'Unauthorized' },
                    { status: 401 },
                );
            }

            stores = await Store.find({ shopkeeper: session.user.email });
        } else {
            stores = await Store.find({});
        }

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
