import { useState } from 'react';
import { toast } from 'sonner';
import { StoreLocation } from '@/types';

export function useCreateStore(onStoreCreated?: () => Promise<void>) {
    const [loading, setLoading] = useState(false);

    const addStore = async (
        storeName: string,
        storeCategory: string,
        location: StoreLocation,
    ) => {
        if (!storeName.trim()) {
            toast.error('Please enter a store name');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('/api/stores/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: storeName,
                    category: storeCategory,
                    location: location,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create store');
            }

            await response.json();
            toast.success('Store created successfully!');
            if (onStoreCreated) {
                await onStoreCreated();
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to create store. Please try again.',
            );
            console.error('Error creating store:', error);
        } finally {
            setLoading(false);
        }
    };

    return { addStore, loading };
}
