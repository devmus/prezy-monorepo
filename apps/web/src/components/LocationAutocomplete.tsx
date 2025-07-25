'use client';

import { useState } from 'react';
import { usePlacesAutocomplete } from '@/hooks/usePlacesAutocomplete';
import { AddressComponent } from '@/types';

interface Props {
    onSelect: (data: {
        address: string;
        city: string;
        zipCode: string;
        country: string;
        coordinates: { latitude: number; longitude: number };
    }) => void;
}

export function LocationAutocomplete({ onSelect }: Props) {
    const [query, setQuery] = useState('');
    const { predictions, loading } = usePlacesAutocomplete(query);

    const handleSelect = async (placeId: string) => {
        const res = await fetch(`/api/places/details?placeId=${placeId}`);
        const data = await res.json();
        const result = data.result;

        const get = (type: string) =>
            (result.address_components as AddressComponent[]).find((c) => c.types.includes(type))
                ?.long_name || '';

        onSelect({
            address: `${get('route')} ${get('street_number')}`.trim(),
            city: get('locality') || get('postal_town'),
            zipCode: get('postal_code'),
            country: get('country'),
            coordinates: {
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng,
            },
        });

        setQuery(result.name || result.formatted_address);

        setTimeout(() => setQuery(''), 0);
    };

    return (
        <div className="flex-grow relative">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or address"
                className="border   rounded-md p-2 w-full"
                name="address_new_123"
                autoComplete='new_password'
            />
            {loading && <div className="absolute bg-white p-2">Loading...</div>}
            {!loading && predictions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-200 w-full rounded-md shadow-md">
                    {predictions.map((p) => (
                        <li
                            key={p.place_id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(p.place_id)}
                        >
                            {p.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
