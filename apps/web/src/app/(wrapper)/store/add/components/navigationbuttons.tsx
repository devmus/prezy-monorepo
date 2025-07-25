import { Button } from '@/components/ui/button';
import { StoreLocation } from '@/types';

interface NavigationButtonsProps {
    formStep: 'start' | 'name' | 'location' | 'category' | 'done';
    setFormStep: (step: 'start' | 'name' | 'location' | 'category' | 'done') => void;
    storeName: string;
    location: StoreLocation | null;
    storeCategory: string;
}

export default function NavigationButtons({
    formStep,
    storeName,
    setFormStep,
    location,
    storeCategory,
}: NavigationButtonsProps) {
    return (
        <>
            {formStep === 'start' && (
                <div className="flex flex-row w-full">
                    <Button
                        className="mt-10 w-full"
                        variant="highlighted"
                        onClick={() => setFormStep('name')}
                    >
                        Start
                    </Button>
                </div>
            )}
            {formStep === 'name' && (
                <div className="flex flex-row w-full">
                    <Button
                        className="mt-10 w-full mx-2"
                        variant="default"
                        onClick={() => setFormStep('start')}
                    >
                        Back
                    </Button>
                    <Button
                        className="mt-10 w-full mx-2"
                        variant={storeName ? 'highlighted' : 'outline'}
                        disabled={!storeName}
                        onClick={() => setFormStep('category')}
                    >
                        Next
                    </Button>
                </div>
            )}
            {formStep === 'category' && (
                <div className="flex flex-row w-full">
                    <Button
                        className="mt-10 w-full mx-2"
                        variant="default"
                        onClick={() => setFormStep('name')}
                    >
                        {' '}
                        Back
                    </Button>
                    <Button
                        className="mt-10 w-full mx-2"
                        variant={storeCategory ? 'highlighted' : 'outline'}
                        disabled={!storeCategory}
                        onClick={() => setFormStep('location')}
                    >
                        {' '}
                        Next
                    </Button>
                </div>
            )}
            {formStep === 'location' && (
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
                        variant={location ? 'highlighted' : 'outline'}
                        disabled={!location}
                        onClick={() => setFormStep('done')}
                    >
                        Next
                    </Button>
                </div>
            )}
        </>
    );
}
