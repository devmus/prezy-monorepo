import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@prezy/db';
// import { Store, Service } from '@prezy/models';
import { confirmedPurchase } from '@/lib/distribution/confirmedPurchase';

export async function POST(request: NextRequest) {
    //Confirm session
    //   const user = await getAuthUser();

    //   if (!user) {
    //     return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    //   }

    try {
        await connectToDatabase();

        //Get userData from session
        // const userData = await User.findOne({ email: user.email });

        // const userEmail = userData.email;

        const body = await request.json();

        if (!body.serviceId || !body.deliveryInfo) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const response = await confirmedPurchase(body.serviceId, body.deliveryInfo);

        // return NextResponse.redirect(session.url as string, 303);
        return NextResponse.json(response);
    } catch (err: unknown) {
        const error = err as { message?: string; statusCode?: number };
        return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
    }
}
