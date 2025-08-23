// // apps\web\src\app\(wrapper)\buy\[id]\components\PaymentModule.tsx

// import { PaymentMethod, PaymentStatus } from '@prezy/types';

// interface PaymentModuleParams {
//     selectedPaymentMethod: PaymentMethod | null;
//     paymentStatus: PaymentStatus;
// }

// export default function PaymentModule({
//     selectedPaymentMethod,
//     paymentStatus,
// }: PaymentModuleParams) {
//     return (
//         <>
//             {/* Payment Instructions */}
//             <SwishPayment selectedPaymentMethod={selectedPaymentMethod} />

//             {/* Error Message */}
//             {paymentStatus.error && (
//                 <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
//                     <p className="text-red-800">{paymentStatus.error}</p>
//                 </div>
//             )}

//             {/* Success Message */}
//             {paymentStatus.success && selectedPaymentMethod === 'swish' && (
//                 <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
//                     <p className="text-green-800">
//                         Payment initiated! Please complete the Swish payment and then confirm below.
//                     </p>
//                 </div>
//             )}
//         </>
//     );
// }

// interface SwishPaymentParams {
//     selectedPaymentMethod: PaymentMethod | null;
// }

// function SwishPayment({ selectedPaymentMethod }: SwishPaymentParams) {
//     return (
//         <>
//             {selectedPaymentMethod === 'swish' && showSwishInstructions && (
//                 <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
//                     <h3 className="font-medium text-blue-900 mb-2">Swish Payment Instructions</h3>
//                     <ol className="list-decimal list-inside space-y-2 text-blue-800">
//                         <li>Open your Swish app</li>
//                         <li>Scan the QR code or enter the payment number</li>
//                         <li>Enter the amount and confirm payment</li>
//                         <li>Wait for payment confirmation</li>
//                         <li>Click &quot;Confirm Payment&quot; below once completed</li>
//                     </ol>
//                 </div>
//             )}
//         </>
//     );
// }

'use client';

import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DeliveryInfo, PaymentMethod, PaymentPhase } from '@prezy/types';

export interface PaymentModuleProps {
    formStep: 'details' | 'method' | 'delivery' | 'confirm';
    method: PaymentMethod | null;
    serviceId: string;
    deliveryInfo: DeliveryInfo;
    onStatusChange?: (p: PaymentPhase) => void; // sync with summary
}

export default function PaymentModule({
    formStep,
    method,
    serviceId,
    deliveryInfo,
    onStatusChange,
}: PaymentModuleProps) {
    const [phase, setPhase] = useState<PaymentPhase>({ state: 'idle' });
    const [showSwishInstructions, setShowSwishInstructions] = useState(false);

    const updatePhase = (p: PaymentPhase) => {
        setPhase(p);
        onStatusChange?.(p);
    };

    const isBusy = phase.state === 'initiating' || phase.state === 'redirecting';
    const errorMsg = phase.state === 'error' ? phase.message : null;

    const startStripe = useCallback(async () => {
        updatePhase({ state: 'initiating' });
        try {
            const res = await fetch(`/api/checkout/stripe/${serviceId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deliveryInfo }),
            });
            const data = await res.json();
            if (data.url) {
                updatePhase({ state: 'redirecting' });
                window.location.href = data.url;
            } else {
                throw new Error('Stripe URL missing');
            }
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Payment failed. Please try again.';
            updatePhase({ state: 'error', message });
        }
    }, [serviceId, deliveryInfo]);

    const startSwish = useCallback(async () => {
        updatePhase({ state: 'initiating' });
        try {
            const res = await fetch('/api/checkout/swish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ serviceId, deliveryInfo }),
            });
            const data = await res.json();
            if (data.success) {
                setShowSwishInstructions(true);
                updatePhase({ state: 'awaiting_user' });
            } else {
                throw new Error(data.error || 'Failed to create Swish payment');
            }
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Payment failed. Please try again.';
            updatePhase({ state: 'error', message });
        }
    }, [serviceId, deliveryInfo]);

    const confirmSwishAndDeliver = useCallback(async () => {
        updatePhase({ state: 'initiating' });
        try {
            // Depending on your webhook design, you may not need this explicit confirm step.
            // Placeholder:
            // const res = await fetch('/api/checkout/confirm-delivery', {...});
            // const data = await res.json();
            // if (!data.success) throw new Error(data.error || 'Failed to confirm delivery');

            updatePhase({ state: 'success' });
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Failed to confirm delivery.';
            updatePhase({ state: 'error', message });
        }
    }, []);

    const action = useMemo(() => {
        if (method === 'stripe') {
            return {
                label: phase.state === 'initiating' ? 'Processing...' : 'Pay with Stripe',
                onClick: startStripe,
                show: true,
            };
        }
        if (method === 'swish' && !showSwishInstructions) {
            return {
                label: phase.state === 'initiating' ? 'Processing...' : 'Start Swish Payment',
                onClick: startSwish,
                show: true,
            };
        }
        if (method === 'swish' && showSwishInstructions) {
            return {
                label:
                    phase.state === 'initiating'
                        ? 'Confirming...'
                        : 'Confirm Payment & Send Gift Card',
                onClick: confirmSwishAndDeliver,
                show: true,
            };
        }
        return { label: '', onClick: () => {}, show: false };
    }, [
        method,
        phase.state,
        showSwishInstructions,
        startStripe,
        startSwish,
        confirmSwishAndDeliver,
    ]);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Payment</h2>

            {/* Instructions */}
            {method === 'swish' && showSwishInstructions && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Swish Payment Instructions</h3>
                    <ol className="list-decimal list-inside space-y-2 text-blue-800">
                        <li>Open your Swish app</li>
                        <li>Scan the QR code or enter the payment number</li>
                        <li>Enter the amount and confirm payment</li>
                        <li>Wait for payment confirmation</li>
                        <li>Click &quot;Confirm Payment&quot; below once completed</li>
                    </ol>
                </div>
            )}

            {/* Error / Success */}
            {errorMsg && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-red-800">{errorMsg}</p>
                </div>
            )}
            {phase.state === 'success' && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-green-800">
                        Payment completed. Your gift card will be delivered shortly.
                    </p>
                </div>
            )}

            {/* Primary action */}
            {action.show && (
                <Button
                    variant="wide_blue"
                    size="lg"
                    onClick={action.onClick}
                    disabled={isBusy || formStep !== 'confirm'}
                >
                    {action.label}
                </Button>
            )}
        </div>
    );
}
