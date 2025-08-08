'use client';

import { IService } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { GetStoreResponse } from '@/types/api';
import ServiceCard from '@/components/ui/ServiceCard';
import { useAuth } from '@/hooks/useAuth';

export default function StoreDetailsPage() {
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const {
        data: store,
        error,
        isLoading,
    } = useSWR<GetStoreResponse>(`/api/stores/list/${id}`, fetcher);
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading store: {error.message}</div>;
    if (!store?.success) return <div>No store found</div>;

    const currentStore = store.data.store;

    const myStore = user?.email === currentStore.shopkeeper;

    return (
        <div className="flex flex-1 flex-col h-full p-8 justify-between">
            {currentStore && (
                <div className="">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6">{currentStore.name}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {currentStore.services.length === 0 ? (
                                <p>No Services found.</p>
                            ) : (
                                <>
                                    {currentStore.services.map((service: IService) => (
                                        <ServiceCard
                                            key={service._id}
                                            service={service}
                                            serviceList={false}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {myStore && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => router.push(`/service/add/${id}`)}
                >
                    Add Service
                </button>
            )}
        </div>
    );
}
