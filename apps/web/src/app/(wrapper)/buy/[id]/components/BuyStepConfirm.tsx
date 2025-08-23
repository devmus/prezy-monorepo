// // apps\web\src\app\(wrapper)\buy\[id]\components\BuyStepConfirm.tsx

// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useState } from 'react';
// import { DeliveryInfo, PaymentMethod, PaymentStatus } from '@prezy/types';

// const variants = {
//     open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
//     collapsed: { opacity: 0, height: 0, overflow: 'hidden', transition: { duration: 0.3 } },
// };

// interface BuyStepConfirmParams {
//     formStep: 'details' | 'method' | 'delivery' | 'confirm';
//     setFormStep: (step: 'details' | 'method' | 'delivery' | 'confirm') => void;
//     selectedPaymentMethod: PaymentMethod | null;
//     serviceId: string;
//     deliveryInfo: DeliveryInfo;
//     paymentStatus: PaymentStatus;
//     setPaymentStatus: (status: PaymentStatus) => void;
// }

// export default function BuyStepConfirm({
//     formStep,
//     setFormStep,
//     selectedPaymentMethod,
//     serviceId,
//     deliveryInfo,
//     paymentStatus,
//     setPaymentStatus,
// }: BuyStepConfirmParams) {
//     const [showSwishInstructions, setShowSwishInstructions] = useState(false);

//     const handleStripePayment = async () => {
//         setPaymentStatus({ loading: true, error: null, success: false });

//         try {
//             const response = await fetch(`/api/checkout/stripe/${serviceId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     deliveryInfo,
//                 }),
//             });

//             const data = await response.json();

//             if (data.url) {
//                 window.location.href = data.url; // redirect to Stripe checkout
//             } else {
//                 throw new Error('Stripe URL missing');
//             }
//         } catch (err: unknown) {
//             const errorMessage =
//                 err instanceof Error ? err.message : 'Payment failed. Please try again.';
//             setPaymentStatus({ loading: false, error: errorMessage, success: false });
//         }
//     };

//     const handleSwishPayment = async () => {
//         setPaymentStatus({ loading: true, error: null, success: false });

//         try {
//             // Create a pending order for Swish payment
//             const response = await fetch('/api/checkout/swish', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     serviceId,
//                     deliveryInfo,
//                 }),
//             });

//             const data = await response.json();

//             if (data.success) {
//                 setShowSwishInstructions(true);
//                 setPaymentStatus({ loading: false, error: null, success: true });
//             } else {
//                 throw new Error(data.error || 'Failed to create Swish payment');
//             }
//         } catch (err: unknown) {
//             const errorMessage =
//                 err instanceof Error ? err.message : 'Payment failed. Please try again.';
//             setPaymentStatus({ loading: false, error: errorMessage, success: false });
//         }
//     };

//     const handleConfirmPayment = async () => {
//         if (selectedPaymentMethod === 'stripe') {
//             // trigger gift card db distribution and e-mail send out in webhook for confimed payment. With an exported and reusable function that will work with either stripe or swish

//             handleStripePayment();
//         } else if (selectedPaymentMethod === 'swish') {
//             handleSwishPayment();
//         }
//     };

//     const handleDeliveryConfirmation = async () => {
//         // setPaymentStatus({ loading: true, error: null, success: false });
//         // try {
//         //     const response = await fetch('/api/checkout/confirm-delivery', {
//         //         method: 'POST',
//         //         headers: {
//         //             'Content-Type': 'application/json',
//         //         },
//         //         body: JSON.stringify({
//         //             serviceId,
//         //             paymentMethod: selectedPaymentMethod,
//         //             deliveryInfo,
//         //         }),
//         //     });
//         //     const data = await response.json();
//         //     if (data.success) {
//         //         setPaymentStatus({ loading: false, error: null, success: true });
//         //         // Redirect to success page or show success message
//         //     } else {
//         //         throw new Error(data.error || 'Failed to confirm delivery');
//         //     }
//         // } catch (err: unknown) {
//         //     const errorMessage =
//         //         err instanceof Error
//         //             ? err.message
//         //             : 'Failed to confirm delivery. Please try again.';
//         //     setPaymentStatus({ loading: false, error: errorMessage, success: false });
//         // }
//     };

//     return (
//         <>
//             <AnimatePresence initial={false}>
//                 {formStep === 'confirm' && (
//                     <>
//                         <motion.div
//                             key="confirm-payment"
//                             initial="collapsed"
//                             animate="open"
//                             exit="collapsed"
//                             variants={variants}
//                         >
//                             <div className="space-y-6">
//                                 <div>
//                                     <h2 className="text-xl font-semibold text-gray-700 mb-4">
//                                         Checkout summary
//                                     </h2>

//                                     <div className="space-y-4">
//                                         {/* Payment Method Summary */}
//                                         <div className="bg-gray-50 p-4 rounded-lg">
//                                             <h3 className="font-medium text-gray-900 mb-2">
//                                                 Payment Method
//                                             </h3>
//                                             <p className="text-gray-600">
//                                                 {selectedPaymentMethod
//                                                     ? selectedPaymentMethod
//                                                           .charAt(0)
//                                                           .toUpperCase() +
//                                                       selectedPaymentMethod.slice(1)
//                                                     : 'No payment method selected'}
//                                             </p>
//                                         </div>

//                                         {/* Delivery Summary */}
//                                         <div className="bg-gray-50 p-4 rounded-lg">
//                                             <h3 className="font-medium text-gray-900 mb-2">
//                                                 Delivery Information
//                                             </h3>
//                                             <div className="space-y-1 text-sm text-gray-600">
//                                                 <p>
//                                                     <strong>Receipt Email:</strong>{' '}
//                                                     {deliveryInfo.receiptEmail || 'Not set'}
//                                                 </p>
//                                                 <p>
//                                                     <strong>Gift Card Recipient:</strong>{' '}
//                                                     {deliveryInfo.recipientEmail || 'Not set'}
//                                                 </p>
//                                                 {deliveryInfo.message && (
//                                                     <p>
//                                                         <strong>Message:</strong>{' '}
//                                                         {deliveryInfo.message}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                         <div className="pt-4 space-y-3">
//                             {!showSwishInstructions && selectedPaymentMethod === 'swish' && (
//                                 <Button
//                                     onClick={handleConfirmPayment}
//                                     variant="wide_blue"
//                                     size="lg"
//                                     disabled={paymentStatus.loading}
//                                 >
//                                     {paymentStatus.loading
//                                         ? 'Processing...'
//                                         : 'Start Swish Payment'}
//                                 </Button>
//                             )}

//                             {showSwishInstructions && selectedPaymentMethod === 'swish' && (
//                                 <Button
//                                     onClick={handleDeliveryConfirmation}
//                                     variant="wide_blue"
//                                     size="lg"
//                                     disabled={paymentStatus.loading}
//                                 >
//                                     {paymentStatus.loading
//                                         ? 'Confirming...'
//                                         : 'Confirm Payment & Send Gift Card'}
//                                 </Button>
//                             )}

//                             {selectedPaymentMethod === 'stripe' && (
//                                 <Button
//                                     onClick={handleConfirmPayment}
//                                     variant="wide_blue"
//                                     size="lg"
//                                     disabled={paymentStatus.loading}
//                                 >
//                                     {paymentStatus.loading ? 'Processing...' : 'Pay with Stripe'}
//                                 </Button>
//                             )}
//                         </div>
//                     </>
//                 )}
//             </AnimatePresence>
//             <AnimatePresence initial={false}>
//                 {formStep !== 'confirm' &&
//                     formStep !== 'details' &&
//                     formStep !== 'method' &&
//                     formStep !== 'delivery' && (
//                         <motion.div
//                             key="collapsed-button"
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             transition={{ duration: 0.2 }}
//                         >
//                             <div>
//                                 <Button
//                                     onClick={() => setFormStep('confirm')}
//                                     variant="confirmed_step"
//                                     className="justify-left"
//                                 >
//                                     <span>
//                                         Payment:{' '}
//                                         {paymentStatus.success ? 'Completed' : 'Ready to Process'}
//                                     </span>
//                                     (click to view)
//                                 </Button>
//                             </div>
//                         </motion.div>
//                     )}
//             </AnimatePresence>
//         </>
//     );
// }

import { motion, AnimatePresence } from 'framer-motion';
import { DeliveryInfo, PaymentMethod, PaymentPhase } from '@prezy/types';

const variants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    collapsed: { opacity: 0, height: 0, overflow: 'hidden', transition: { duration: 0.3 } },
};

interface BuyStepConfirmParams {
    formStep: 'details' | 'method' | 'delivery' | 'confirm';
    setFormStep: (s: 'details' | 'method' | 'delivery' | 'confirm') => void;
    selectedPaymentMethod: PaymentMethod | null;
    deliveryInfo: DeliveryInfo;
    paymentPhase: PaymentPhase;
}

export default function BuyStepConfirm({
    formStep,
    selectedPaymentMethod,
    deliveryInfo,
    paymentPhase,
}: BuyStepConfirmParams) {
    return (
        <>
            <AnimatePresence initial={false}>
                {formStep === 'confirm' && (
                    <motion.div
                        key="confirm-summary"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={variants}
                    >
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Checkout summary
                            </h2>

                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">
                                        Payment Method
                                    </h3>
                                    <p className="text-gray-600">
                                        {selectedPaymentMethod
                                            ? selectedPaymentMethod.charAt(0).toUpperCase() +
                                              selectedPaymentMethod.slice(1)
                                            : 'No payment method selected'}
                                    </p>
                                </div>

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
                                            {deliveryInfo.recipientEmail || 'Not set'}
                                        </p>
                                        {deliveryInfo.message && (
                                            <p>
                                                <strong>Message:</strong> {deliveryInfo.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Optional: small status chip */}
                            <div className="text-sm text-gray-600">
                                Payment:{' '}
                                {paymentPhase.state === 'success'
                                    ? 'Completed'
                                    : 'Ready to process'}
                            </div>
                            <div className="text-sm text-gray-500">
                                Continue below in the <strong>Payment</strong> section to complete
                                your order.
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
