// apps/web/app/api/user/language/route.ts

import { getServerSession } from 'next-auth';
import { authOptions, User, connectDB } from '@prezy/auth';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
    console.log('TEST');

    const session = await getServerSession(authOptions);
    console.log('session', session);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { language } = await req.json();
    if (!['en', 'sv', 'th'].includes(language)) {
        return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }

    await connectDB();
    await User.updateOne({ email: session.user.email }, { language });

    return NextResponse.json({ success: true });
}
