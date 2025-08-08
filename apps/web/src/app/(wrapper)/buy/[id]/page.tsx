// /app/(wrapper)/buy/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { GetServiceResponse } from '@/types/api';
import { IService } from '@/types';
import { Button } from '@/components/ui/button';
import BuyStepDetails from './components/BuyStepDetails';

export default function CheckoutPage() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {
        data,
        error: serviceError,
        isLoading,
    } = useSWR<GetServiceResponse>(`/api/services/list/${id}`, fetcher);
    const [formStep, setFormStep] = useState<'details' | 'method' | 'delivery' | 'confirm'>(
        'details',
    );

    //method - only stripe now, swish, klarna, crypto?
    //delivery - reciept, beneficiery of giftcard, message - if logged in, have first pre filled and then a button that suggest use same as above...

    const handleConfirm = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/checkout/stripe/${id}`, {
                method: 'POST',
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url; // redirect to Stripe checkout
            } else {
                throw new Error('Stripe URL missing');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (serviceError) return <div>Error loading services: {serviceError.message}</div>;
    if (!data?.success) return <div>Service not found</div>;

    const service: IService | undefined = data?.data?.service;

    return (
        <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg space-y-8">
            <h1 className="text-3xl font-bold text-center">Checkout</h1>

            <BuyStepDetails formStep={formStep} setFormStep={setFormStep} service={service} />

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="pt-4">
                <Button
                    // onClick={handleConfirm}
                    onClick={() => setFormStep('method')}
                    disabled={loading}
                    variant="wide_blue"
                    size="lg"
                >
                    {loading ? 'Processing...' : 'Confirm selection'}
                </Button>
            </div>
        </div>
    );
}
