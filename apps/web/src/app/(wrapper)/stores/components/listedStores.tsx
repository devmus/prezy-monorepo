'use client';

import { IStore, UserDTO } from '@prezy/types';
import StoreCard from '@/components/ui/StoreCard';

interface ListedStoresParams {
    stores: { data: { stores: IStore[] } };
    user: UserDTO | null;
}

export default function ListedStores({ stores, user }: ListedStoresParams) {
    const storeList = stores.data.stores;

    return (
        <>
            {storeList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {storeList.map((store: IStore) => (
                        <StoreCard key={store._id} store={store} user={user} />
                    ))}
                </div>
            ) : (
                <div className="p-6 bg-card border   rounded-lg">
                    <h3 className="font-semibold mb-2">No stores found</h3>
                </div>
            )}
        </>
    );
}
