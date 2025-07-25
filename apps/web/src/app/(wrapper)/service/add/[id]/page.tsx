'use client';

import ServicePreview from '@/app/components/servicePreview';
import { useCreateService } from '@/hooks/useCreateService';
import { fetcher } from '@/lib/fetcher';
import { GetStoreResponse } from '@/types/api';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

export default function AddServicePage() {
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    const [serviceCategory, setServiceCategory] = useState('');
    const [serviceImageUrl, setServiceImageUrl] = useState('');
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const {
        data: store,
        error,
        isLoading,
    } = useSWR<GetStoreResponse>(`/api/stores/list/${id}`, fetcher);

    const { addService, loading } = useCreateService(id, async () => {
        setServiceName('');
        setServiceDescription('');
        setServicePrice('');
        setServiceCategory('');
        setServiceImageUrl('');
        router.push(`/store/${id}`);
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading store: {error.message}</div>;
    if (!store?.success) return <div>No store found</div>;

    const currentStore = store.data.store;

    return (
        <div className="flex flex-1 flex-col h-full p-8 items-center">
            <div className="p-6 bg-card border   rounded-lg w-full">
                <h3 className="font-semibold mb-2">Add a service</h3>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await addService(
                            serviceName,
                            serviceDescription,
                            servicePrice,
                            serviceCategory,
                            serviceImageUrl,
                        );
                    }}
                    className="flex flex-col gap-2"
                >
                    <input
                        className="border   rounded-md p-2 w-full"
                        type="text"
                        name="name"
                        placeholder="Service name"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        className="border   rounded-md p-2 w-full"
                        type="text"
                        name="description"
                        placeholder="Service description"
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        className="border   rounded-md p-2 w-full"
                        type="number"
                        name="price"
                        placeholder="Service price"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        className="border   rounded-md p-2 w-full"
                        type="text"
                        name="category"
                        placeholder="Service category"
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        disabled={loading}
                    />
                    <ImageSelector
                        loading={loading}
                        serviceImageUrl={serviceImageUrl}
                        setServiceImageUrl={setServiceImageUrl}
                    />

                    <button
                        type="submit"
                        className="text-sm text-muted-foreground bg-[lightblue] rounded-md p-2 w-20"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add'}
                    </button>
                </form>
            </div>
            <h3 className="text-xl mt-10 mb-2 font-semibold text-gray-800">Live Preview</h3>
            <ServicePreview
                name={serviceName}
                storeName={currentStore.name}
                imageUrl={serviceImageUrl}
                description={serviceDescription}
                price={servicePrice}
                category={serviceCategory}
            />
        </div>
    );
}

function ImageSelector({
    loading,
    serviceImageUrl,
    setServiceImageUrl,
}: {
    loading: boolean;
    serviceImageUrl: string;
    setServiceImageUrl: (value: string) => void;
}) {
    return (
        <select
            className="border   rounded-md p-2 w-full"
            name="imageUrl"
            value={serviceImageUrl}
            onChange={(e) => setServiceImageUrl(e.target.value)}
            disabled={loading}
        >
            <option value="">Select a spa image</option>
            <option value="/images/image1.webp">Back massage man</option>
            <option value="/images/image2.webp">Foot massage</option>
            <option value="/images/image3.webp">Back massage lady</option>
            <option value="/images/image4.webp">Back massage lady 2</option>
            <option value="/images/image5.webp">Belly massage</option>
            <option value="/images/image6.webp">Back massage lady 3</option>
            <option value="/images/image7.webp">Face massage</option>
            <option value="/images/image8.webp">Couple massage</option>
            <option value="/images/image9.webp">Neck massage</option>
        </select>
    );
}
