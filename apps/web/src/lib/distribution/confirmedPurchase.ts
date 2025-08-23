import { createGiftcard } from './giftcard';
import { sendReceiptEmail, sendGiftcardEmail } from './email';
import { Service } from '@prezy/models';
import { connectToDatabase } from '@prezy/db';
import { DeliveryInfo } from '@prezy/types';

export const confirmedPurchase = async (serviceId: string, deliveryInfo: DeliveryInfo) => {
    console.log('serviceId', serviceId);
    console.log('deliveryInfo', deliveryInfo);

    try {
        // Connect to database
        await connectToDatabase();

        // Verify the service exists and get its details
        const service = await Service.findById(serviceId);
        if (!service) {
            throw new Error(`Service with ID ${serviceId} not found`);
        }

        // Create a gift card with UUID and link it with serviceId document
        const giftcard = await createGiftcard(serviceId, deliveryInfo);

        // Send e-mail for receipt and giftcard with message
        await Promise.all([
            sendReceiptEmail(
                deliveryInfo.receiptEmail,
                service,
                giftcard,
                deliveryInfo.message || '',
            ),
            sendGiftcardEmail(
                deliveryInfo.recipientEmail,
                service,
                giftcard,
                deliveryInfo.message || '',
            ),
        ]);

        console.log('Purchase confirmed successfully:', {
            serviceId,
            giftcardId: giftcard._id,
            giftcardUUID: giftcard.uuid,
            receiptEmail: deliveryInfo.receiptEmail,
            receiverEmail: deliveryInfo.recipientEmail,
        });

        return {
            success: true,
            giftcard,
            service,
        };
    } catch (error) {
        console.error('Error in confirmedPurchase:', error);
        throw error;
    }
};
