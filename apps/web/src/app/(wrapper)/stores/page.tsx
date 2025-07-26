'use client';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { IStore } from '@/types';
import { fetcher } from '@/lib/fetcher';
import { ListStoresResponse } from '@/types/api';
import StoreCard from '@/components/ui/StoreCard';

export default function StoresPage() {
    const {
        data: stores,
        error,
        isLoading,
    } = useSWR<ListStoresResponse>('/api/stores/list', fetcher);
    const router = useRouter();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading stores: {error.message}</div>;
    if (!stores?.success) return <div>No stores found</div>;

    const storeList = stores.data.stores;

    return (
        <div className="flex flex-1 flex-col h-full p-8 justify-between">
            <div className="">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Stores on Prezy</h1>
                    <p className="text-muted-foreground mb-8">
                        Here are the stores. Click on a store to view its details.
                    </p>
                    {storeList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {storeList.map((store: IStore) => (
                                <StoreCard key={store._id} store={store} />
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 bg-card border   rounded-lg">
                            <h3 className="font-semibold mb-2">No stores found</h3>
                        </div>
                    )}
                </div>
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => router.push(`/store/add`)}
            >
                Add Store
            </button>
        </div>
    );
}
