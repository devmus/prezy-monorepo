'use client';

import { useState } from 'react';
import { StoreLocation } from '@/types';
import AddStoreForm from './components/addstoreform';
import StorePreview from './components/storePreview';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useCreateStore } from '@/hooks/useCreateStore';
import { Button } from '@/components/ui/button';
import NavigationButtons from './components/navigationbuttons';

export default function AddStorePage() {
    const router = useRouter();
    const [storeName, setStoreName] = useState('');
    const [storeCategory, setStoreCategory] = useState('');
    const [location, setLocation] = useState<StoreLocation | null>(null);
    const [formStep, setFormStep] = useState<'start' | 'name' | 'category' | 'location' | 'done'>('start');


    const resetForm = () => {
        setStoreName('');
        setStoreCategory('');
        setLocation(null);
        setFormStep('start');
    };

    const { addStore, loading } = useCreateStore(async () => {
        setStoreName('');
        setStoreCategory('');
        setLocation(null);
        router.push(`/stores`);
    });

    const createStore = async () => {
        if (storeName && storeCategory && location) {
            await addStore(storeName, storeCategory, location);
        }
    };

    return (
        <div className="flex flex-1 flex-col h-full p-8 items-center">
            <div className="p-6 bg-card border   rounded-lg w-full ">
                <div className="w-full">

                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-semibold">Add a store</h3>
                <Button className="mx-2" variant={formStep === "start" ? "outline" : "destructive"} disabled={formStep === "start"} onClick={resetForm}> Reset all 
                </Button>
                
                </div>
                </div>
                <Separator className="my-6" />
                <AddStoreForm
                    formStep={formStep}
                    setFormStep={setFormStep}
                    storeName={storeName}
                    location={location}
                    storeCategory={storeCategory}
                    setStoreName={setStoreName}
                    setStoreCategory={setStoreCategory}
                    setLocation={setLocation}
                    createStore={createStore}
                    loading={loading}
                />
                <NavigationButtons formStep={formStep}
                setFormStep={setFormStep}
                storeName={storeName}
                location={location}
                storeCategory={storeCategory}
                />

            </div>

            <div className="flex flex-col w-full items-center">
                
                    <StorePreview
                        storeName={storeName}
                        storeCategory={storeCategory}
                        location={location}
                    />
                


            </div>
        </div>
    );
}
