import { useState } from 'react';
import { toast } from 'sonner';

export function useCreateService(id: string, onServiceCreated?: () => Promise<void>) {
    const [loading, setLoading] = useState(false);

    const addService = async (
        serviceName: string,
        serviceDescription: string,
        servicePrice: string,
        serviceCategory: string,
        serviceImageUrl: string,
    ) => {
        if (
            !serviceName.trim() ||
            !serviceDescription.trim() ||
            !servicePrice.trim() ||
            !serviceCategory.trim()
        ) {
            toast.error('Please enter all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/services/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: serviceName,
                    description: serviceDescription,
                    price: servicePrice,
                    category: serviceCategory,
                    imageUrl: serviceImageUrl,
                    storeId: id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create service');
            }

            await response.json();
            toast.success('Service created successfully!');
            if (onServiceCreated) {
                await onServiceCreated();
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to create service. Please try again.',
            );
            console.error('Error creating service:', error);
        } finally {
            setLoading(false);
        }
    };

    return { addService, loading };
}
