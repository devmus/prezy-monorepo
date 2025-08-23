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

    const { language } = await req.json();
    if (!['en', 'sv', 'th'].includes(language)) {
        return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }

    await connectToDatabase();
    await User.updateOne({ email: session.user.email }, { language });

    return NextResponse.json({ success: true });
}
