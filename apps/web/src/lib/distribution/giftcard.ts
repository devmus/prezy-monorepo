import { connectDB, DeliveryInfo } from '@prezy/auth';
import { Giftcard, Service } from '@prezy/auth';

/**
 * Generate a random UUID with 10 characters (no special characters)
 */
export const generateGiftcardUUID = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Create a new giftcard document in the database
 */
export const createGiftcard = async (serviceId: string, deliveryInfo: DeliveryInfo) => {
    await connectDB();

    // Verify the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
        throw new Error(`Service with ID ${serviceId} not found`);
    }

    // Generate unique UUID
    const uuid = generateGiftcardUUID();

    // Create the giftcard document
    const giftcard = new Giftcard({
        service: serviceId,
        uuid,
        receiptEmail: deliveryInfo.receiptEmail,
        receiverEmail: deliveryInfo.giftCardEmail,
        status: false, // Not redeemed yet
        redeemDate: null,
    });

    await giftcard.save();

    return giftcard;
};
