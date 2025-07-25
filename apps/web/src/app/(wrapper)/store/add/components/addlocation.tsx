import { Button } from '@/components/ui/button';
import UseMyLocation from './usemylocation';
import { StoreLocation } from '@/types';
import { LocationAutocomplete } from '@/components/LocationAutocomplete';
import { useState } from 'react';

interface AddLocationProps {
    location: StoreLocation | null;
    setLocation: (location: StoreLocation | null) => void;
    loading: boolean;
}

export default function AddLocation({ location, setLocation, loading }: AddLocationProps) {
    const [manualEntry, setManualEntry] = useState(false);

    function normalizeLocation(partial: Partial<StoreLocation> = {}): StoreLocation {
        return {
            address: partial.address ?? '',
            city: partial.city ?? '',
            zipCode: partial.zipCode ?? '',
            country: partial.country ?? '',
            coordinates: partial.coordinates ?? { latitude: 0, longitude: 0 },
        };
    }

    return (
        <>
            <section className="bg-[gray]/5 p-2 rounded-lg">
                <p className="m-2">Step 3: Enter your location:</p>

                <div className="flex flex-col gap-2">
                    <div>
                        <div className="flex flex-row flex-wrap w-full gap-2">
                            <LocationAutocomplete
                                onSelect={(location) => {
                                    setLocation(location);
                                }}
                            />

                            <UseMyLocation setLocation={setLocation} />
                        </div>
                    </div>

                    {!location && !manualEntry && (
                        <Button
                            variant="outline"
                            onClick={(e) => {
                                e.preventDefault();
                                setManualEntry(true);
                            }}
                        >
                            Enter address manually
                        </Button>
                    )}
                </div>
                <div className="flex flex-col gap-2 mt-6">
                    {(location || manualEntry) && (
                        <>
                            <input
                                className="border   rounded-md p-2 w-full"
                                type="text"
                                placeholder="Street address and number"
                                value={location?.address}
                                onChange={(e) =>
                                    setLocation(
                                        normalizeLocation({ ...location, address: e.target.value }),
                                    )
                                }
                                disabled={loading}
                            />
                            <input
                                className="border   rounded-md p-2 w-full"
                                type="text"
                                placeholder="City"
                                value={location?.city}
                                onChange={(e) =>
                                    setLocation(
                                        normalizeLocation({ ...location, city: e.target.value }),
                                    )
                                }
                                disabled={loading}
                            />
                            <input
                                className="border   rounded-md p-2 w-full"
                                type="text"
                                placeholder="ZIP Code"
                                value={location?.zipCode}
                                onChange={(e) =>
                                    setLocation(
                                        normalizeLocation({ ...location, zipCode: e.target.value }),
                                    )
                                }
                                disabled={loading}
                            />
                            <input
                                className="border   rounded-md p-2 w-full"
                                type="text"
                                placeholder="Country"
                                value={location?.country}
                                onChange={(e) =>
                                    setLocation(
                                        normalizeLocation({ ...location, country: e.target.value }),
                                    )
                                }
                                disabled={loading}
                            />
                            <div className="text-xs text-muted-foreground">
                                Coordinates: {location?.coordinates.latitude},{' '}
                                {location?.coordinates.longitude}
                            </div>
                        </>
                    )}

                    <div className="flex flex-row w-full"></div>
                </div>
            </section>
        </>
    );
}
