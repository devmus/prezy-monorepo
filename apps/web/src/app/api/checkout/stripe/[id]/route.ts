import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
// import { stripe } from '§/utils/stripeMode';
// import dbConnect from '§/utils/dbConnect';
// import User from '§/models/user';
// import { getAuthUser } from '§/utils/getAuthUser';
// import stripeConfig from '§/utils/stripeConfig';
// import { apiBonus100 } from '§/utils/configValues';

import { connectDB } from '@prezy/auth';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    console.log('INSIDE');

    const { id } = await params;
    //Confirm session
    //   const user = await getAuthUser();

    //   if (!user) {
    //     return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    //   }

    try {
        const headersList = await headers();
        const origin = headersList.get('origin') || 'http://localhost:3000';

        await connectDB();

        //Get userData from session
        // const userData = await User.findOne({ email: user.email });

        // const userEmail = userData.email;
        // const stripeCustomerId = userData.stripeCustomerId;

        // Get Product and Price Ids
        // const internalStripeFinder = 'usage100';
        // const productId = stripeConfig.products[internalStripeFinder];
        // const priceId = stripeConfig.prices[internalStripeFinder];

        // Fetch the product details from Stripe for logging or verification
        // const productDetails = await stripe.products.retrieve(productId);
        const session = {
            url: `${origin}/service/1?session_id={CHECKOUT_SESSION_ID}`,
        };
        // Create Checkout Sessions from body params.
        // const session = await stripe.checkout.sessions.create({
        //   line_items: [
        //     {
        //       // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //       price: priceId,
        //       quantity: 1,
        //     },
        //   ],
        //   mode: 'payment',
        //   customer: stripeCustomerId,
        //   metadata: {
        //     userEmail: userEmail, // Optionally include email for easier debugging
        //     productName: productDetails.name, // Using product name from Stripe
        //     productId: productId, // Including product ID for reference
        //     apiBonus: apiBonus100.amount,
        //   },
        //   success_url: `${origin}/service/1?session_id={CHECKOUT_SESSION_ID}`,
        //   cancel_url: `${origin}/profile?canceled=true`,
        // });
        // return NextResponse.redirect(session.url as string, 303);
        console.log(id, session.url);

        return NextResponse.redirect(session.url as string, 303);
    } catch (err: unknown) {
        const error = err as { message?: string; statusCode?: number };
        return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
    }
}
