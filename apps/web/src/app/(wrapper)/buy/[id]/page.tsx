// /app/(wrapper)/buy/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { GetServiceResponse } from '@/types/api';
import { IService, PaymentMethod } from '@/types';
import BuyStepDetails from './components/BuyStepDetails';
import BuyStepMethod from './components/BuyStepMethod';
import BuyStepMessage from './components/BuyStepMessage';
import BuyStepConfirm from './components/BuyStepConfirm';

interface DeliveryInfo {
    receiptEmail: string;
    giftCardEmail: string;
    message: string;
}

export default function CheckoutPage() {
    const { id } = useParams<{ id: string }>();
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');
    const {
        data,
        error: serviceError,
        isLoading,
    } = useSWR<GetServiceResponse>(`/api/services/list/${id}`, fetcher);
    const [formStep, setFormStep] = useState<'details' | 'method' | 'delivery' | 'confirm'>(
        'details',
    );
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        receiptEmail: '',
        giftCardEmail: '',
        message: '',
    });

    //method - only stripe now, swish, klarna, crypto?
    //delivery - reciept, beneficiery of giftcard, message - if logged in, have first pre filled and then a button that suggest use same as above...

    // const handleConfirm = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch(`/api/checkout/stripe/${id}`, {
    //             method: 'POST',
    //         });

    //         const data = await response.json();

    //         if (data.url) {
    //             window.location.href = data.url; // redirect to Stripe checkout
    //         } else {
    //             throw new Error('Stripe URL missing');
    //         }
    //     } catch (err: unknown) {
    //         if (err instanceof Error) {
    //             setError(err.message);
    //         } else {
    //             setError('Something went wrong. Please try again.');
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    if (isLoading) return <div>Loading...</div>;
    if (serviceError) return <div>Error loading services: {serviceError.message}</div>;
    if (!data?.success) return <div>Service not found</div>;

    const service: IService | undefined = data?.data?.service;

    return (
        <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg space-y-4">
            <h1 className="text-3xl font-bold text-center py-2">Checkout</h1>

            <BuyStepDetails formStep={formStep} setFormStep={setFormStep} service={service} />
            <BuyStepMethod
                formStep={formStep}
                setFormStep={setFormStep}
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
            />
            <BuyStepMessage
                formStep={formStep}
                setFormStep={setFormStep}
                deliveryInfo={deliveryInfo}
                setDeliveryInfo={setDeliveryInfo}
            />
            <BuyStepConfirm
                formStep={formStep}
                setFormStep={setFormStep}
                selectedPaymentMethod={selectedPaymentMethod}
                serviceId={id}
                deliveryInfo={deliveryInfo}
            />

            {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
        </div>
    );
}
