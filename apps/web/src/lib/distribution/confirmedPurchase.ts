import { createGiftcard } from './giftcard';
import { sendReceiptEmail, sendGiftcardEmail } from './email';
import { connectDB, DeliveryInfo } from '@prezy/auth';
import { Service } from '@prezy/auth';

export const confirmedPurchase = async (serviceId: string, deliveryInfo: DeliveryInfo) => {
    console.log('serviceId', serviceId);
    console.log('deliveryInfo', deliveryInfo);

    try {
        // Connect to database
        await connectDB();

        // Verify the service exists and get its details
        const service = await Service.findById(serviceId);
        if (!service) {
            throw new Error(`Service with ID ${serviceId} not found`);
        }

        // Create a gift card with UUID and link it with serviceId document
        const giftcard = await createGiftcard(serviceId, deliveryInfo);

        // Send e-mail for receipt and giftcard with message
        await Promise.all([
            sendReceiptEmail(deliveryInfo.receiptEmail, service, giftcard, deliveryInfo.message),
            sendGiftcardEmail(deliveryInfo.giftCardEmail, service, giftcard, deliveryInfo.message),
        ]);

        console.log('Purchase confirmed successfully:', {
            serviceId,
            giftcardId: giftcard._id,
            giftcardUUID: giftcard.uuid,
            receiptEmail: deliveryInfo.receiptEmail,
            receiverEmail: deliveryInfo.giftCardEmail,
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
