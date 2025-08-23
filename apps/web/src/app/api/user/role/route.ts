// apps/web/app/api/user/language/route.ts

import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@prezy/db';
import { authOptions } from '@prezy/auth';
import { User } from '@prezy/models';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role } = await req.json();
    if (!['user', 'shopkeeper'].includes(role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    await connectToDatabase();
    await User.updateOne({ email: session.user.email }, { role });

    return NextResponse.json({ success: true });
}
