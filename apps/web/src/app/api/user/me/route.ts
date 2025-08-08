// apps/web/src/app/api/user/me.ts
import { getServerSession } from 'next-auth';
import { authOptions, connectDB, User } from '@prezy/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
}
