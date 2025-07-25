'use client';

import { StoreLocation } from '@/types';
import AddName from './addname';
import StartForm from './startform';
import AddLocation from './addlocation';
import AddCategory from './addcategory';
import { Button } from '@/components/ui/button';

interface AddStoreFormProps {
    formStep: 'start' | 'name' | 'location' | 'category' | 'done';
    setFormStep: (step: 'start' | 'name' | 'location' | 'category' | 'done') => void;
    storeName: string;
    location: StoreLocation | null;
    storeCategory: string;
    setStoreName: (name: string) => void;
    setStoreCategory: (category: string) => void;
    setLocation: (location: StoreLocation | null) => void;
    createStore: () => void;
    loading: boolean;
}

export default function AddStoreForm({
    formStep,
    setFormStep,
    storeName,
    location,
    storeCategory,
    setStoreName,
    setStoreCategory,
    setLocation,
    createStore,
    loading,
}: AddStoreFormProps) {
    return (
        <>
            {formStep === 'start' && <StartForm />}
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    createStore();
                }}
                className="flex flex-col gap-2"
            >
                {formStep === 'name' && (
                    <AddName storeName={storeName} setStoreName={setStoreName} />
                )}
                {formStep === 'location' && (
                    <AddLocation location={location} setLocation={setLocation} loading={loading} />
                )}
                {formStep === 'category' && (
                    <AddCategory
                        storeCategory={storeCategory}
                        setStoreCategory={setStoreCategory}
                    />
                )}
                {formStep === 'done' && storeName && storeCategory && location && (
                    <>
                        <div>
                            You are one click away from creating your store. Review the preview and
                            press the &quot;Create Store&quot; button if everything looks good. You
                            will be able to add more information later.
                        </div>

                        <div className="flex flex-row w-full">
                            <Button
                                className="mt-10 w-full mx-2"
                                variant="default"
                                onClick={() => setFormStep('category')}
                            >
                                Back
                            </Button>

                            <Button
                                className="mt-10 w-full mx-2"
                                variant="highlighted"
                                type="submit"
                            >
                                Create store
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </>
    );
}
