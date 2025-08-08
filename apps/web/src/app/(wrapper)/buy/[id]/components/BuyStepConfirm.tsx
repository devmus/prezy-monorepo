import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DeliveryInfo, PaymentMethod } from '@/types';
import { confirmedPurchase } from '@/lib/distribution/confirmedPurchase';

const variants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    collapsed: { opacity: 0, height: 0, overflow: 'hidden', transition: { duration: 0.3 } },
};

interface BuyStepConfirmParams {
    formStep: 'details' | 'method' | 'delivery' | 'confirm';
    setFormStep: (step: 'details' | 'method' | 'delivery' | 'confirm') => void;
    selectedPaymentMethod: PaymentMethod | null;
    serviceId: string;
    deliveryInfo: DeliveryInfo;
}

interface PaymentStatus {
    loading: boolean;
    error: string | null;
    success: boolean;
}

export default function BuyStepConfirm({
    formStep,
    setFormStep,
    selectedPaymentMethod,
    serviceId,
    deliveryInfo,
}: BuyStepConfirmParams) {
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
        loading: false,
        error: null,
        success: false,
    });
    const [showSwishInstructions, setShowSwishInstructions] = useState(false);

    const handleStripePayment = async () => {
        setPaymentStatus({ loading: true, error: null, success: false });

        try {
            const response = await fetch(`/api/checkout/stripe/${serviceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deliveryInfo,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url; // redirect to Stripe checkout
            } else {
                throw new Error('Stripe URL missing');
            }
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : 'Payment failed. Please try again.';
            setPaymentStatus({ loading: false, error: errorMessage, success: false });
        }
    };

    const handleSwishPayment = async () => {
        setPaymentStatus({ loading: true, error: null, success: false });

        try {
            // Create a pending order for Swish payment
            const response = await fetch('/api/checkout/swish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceId,
                    deliveryInfo,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setShowSwishInstructions(true);
                setPaymentStatus({ loading: false, error: null, success: true });
            } else {
                throw new Error(data.error || 'Failed to create Swish payment');
            }
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : 'Payment failed. Please try again.';
            setPaymentStatus({ loading: false, error: errorMessage, success: false });
        }
    };

    const handleConfirmPayment = () => {
        if (selectedPaymentMethod === 'stripe') {
            // trigger gift card db distribution and e-mail send out in webhook for confimed payment. With an exported and reusable function that will work with either stripe or swish
            confirmedPurchase(serviceId, deliveryInfo);
        } else if (selectedPaymentMethod === 'swish') {
            handleStripePayment();
            handleSwishPayment();
        }
    };

    const handleDeliveryConfirmation = async () => {
        setPaymentStatus({ loading: true, error: null, success: false });

        try {
            const response = await fetch('/api/checkout/confirm-delivery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceId,
                    paymentMethod: selectedPaymentMethod,
                    deliveryInfo,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setPaymentStatus({ loading: false, error: null, success: true });
                // Redirect to success page or show success message
            } else {
                throw new Error(data.error || 'Failed to confirm delivery');
            }
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'Failed to confirm delivery. Please try again.';
            setPaymentStatus({ loading: false, error: errorMessage, success: false });
        }
    };

    return (
        <>
            <AnimatePresence initial={false}>
                {formStep === 'confirm' && (
                    <>
                        <motion.div
                            key="confirm-payment"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={variants}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                        Confirm Payment
                                    </h2>

                                    <div className="space-y-4">
                                        {/* Payment Method Summary */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-900 mb-2">
                                                Payment Method
                                            </h3>
                                            <p className="text-gray-600">
                                                {selectedPaymentMethod
                                                    ? selectedPaymentMethod
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      selectedPaymentMethod.slice(1)
                                                    : 'No payment method selected'}
                                            </p>
                                        </div>

                                        {/* Delivery Summary */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-900 mb-2">
                                                Delivery Information
                                            </h3>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <p>
                                                    <strong>Receipt Email:</strong>{' '}
                                                    {deliveryInfo.receiptEmail || 'Not set'}
                                                </p>
                                                <p>
                                                    <strong>Gift Card Recipient:</strong>{' '}
                                                    {deliveryInfo.giftCardEmail || 'Not set'}
                                                </p>
                                                {deliveryInfo.message && (
                                                    <p>
                                                        <strong>Message:</strong>{' '}
                                                        {deliveryInfo.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Payment Instructions */}
                                        {selectedPaymentMethod === 'swish' &&
                                            showSwishInstructions && (
                                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                                    <h3 className="font-medium text-blue-900 mb-2">
                                                        Swish Payment Instructions
                                                    </h3>
                                                    <ol className="list-decimal list-inside space-y-2 text-blue-800">
                                                        <li>Open your Swish app</li>
                                                        <li>
                                                            Scan the QR code or enter the payment
                                                            number
                                                        </li>
                                                        <li>
                                                            Enter the amount and confirm payment
                                                        </li>
                                                        <li>Wait for payment confirmation</li>
                                                        <li>
                                                            Click &quot;Confirm Payment&quot; below
                                                            once completed
                                                        </li>
                                                    </ol>
                                                </div>
                                            )}

                                        {/* Error Message */}
                                        {paymentStatus.error && (
                                            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                                                <p className="text-red-800">
                                                    {paymentStatus.error}
                                                </p>
                                            </div>
                                        )}

                                        {/* Success Message */}
                                        {paymentStatus.success &&
                                            selectedPaymentMethod === 'swish' && (
                                                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                                    <p className="text-green-800">
                                                        Payment initiated! Please complete the Swish
                                                        payment and then confirm below.
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <div className="pt-4 space-y-3">
                            {!showSwishInstructions && selectedPaymentMethod === 'swish' && (
                                <Button
                                    onClick={handleConfirmPayment}
                                    variant="wide_blue"
                                    size="lg"
                                    disabled={paymentStatus.loading}
                                >
                                    {paymentStatus.loading
                                        ? 'Processing...'
                                        : 'Start Swish Payment'}
                                </Button>
                            )}

                            {showSwishInstructions && selectedPaymentMethod === 'swish' && (
                                <Button
                                    onClick={handleDeliveryConfirmation}
                                    variant="wide_blue"
                                    size="lg"
                                    disabled={paymentStatus.loading}
                                >
                                    {paymentStatus.loading
                                        ? 'Confirming...'
                                        : 'Confirm Payment & Send Gift Card'}
                                </Button>
                            )}

                            {selectedPaymentMethod === 'stripe' && (
                                <Button
                                    onClick={handleConfirmPayment}
                                    variant="wide_blue"
                                    size="lg"
                                    disabled={paymentStatus.loading}
                                >
                                    {paymentStatus.loading ? 'Processing...' : 'Pay with Stripe'}
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {formStep !== 'confirm' &&
                    formStep !== 'details' &&
                    formStep !== 'method' &&
                    formStep !== 'delivery' && (
                        <motion.div
                            key="collapsed-button"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div>
                                <Button
                                    onClick={() => setFormStep('confirm')}
                                    variant="confirmed_step"
                                    className="justify-left"
                                >
                                    <span>
                                        Payment:{' '}
                                        {paymentStatus.success ? 'Completed' : 'Ready to Process'}
                                    </span>
                                    (click to view)
                                </Button>
                            </div>
                        </motion.div>
                    )}
            </AnimatePresence>
        </>
    );
}
