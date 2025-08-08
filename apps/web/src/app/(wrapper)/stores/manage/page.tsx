// apps\web\src\app\(wrapper)\stores\manage\page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ListedStores from '@/app/(wrapper)/stores/components/listedStores';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { ListStoresResponse } from '@/types/api';

export default function StoresPage() {
    const { user } = useAuth();
    const router = useRouter();
    const {
        data: stores,
        error,
        isLoading,
    } = useSWR<ListStoresResponse>('/api/stores/list?mine=true', fetcher);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading stores: {error.message}</div>;
    if (!stores?.success) return <div>No stores found</div>;

    return (
        <div className="flex flex-1 flex-col h-full p-8 justify-between">
            <div className="">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">My stores</h1>
                    <p className="text-muted-foreground mb-8">
                        These are your stores. Click on a store to view and edit its details.
                    </p>
                    <ListedStores stores={stores} user={user} />
                </div>
            </div>
            {user && user?.role === 'shopkeeper' && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => router.push(`/store/add`)}
                >
                    Add a store
                </button>
            )}
        </div>
    );
}
