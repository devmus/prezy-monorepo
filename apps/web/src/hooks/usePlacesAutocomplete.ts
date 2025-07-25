import { Prediction } from '@/types';
import { useEffect, useState } from 'react';

export function usePlacesAutocomplete(input: string) {
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPredictions = async () => {
            if (!input) {
                setPredictions([]);
                return;
            }

            setLoading(true);
            const res = await fetch(`/api/places/autocomplete?input=${input}`);
            const data = await res.json();

            if (data.success) {
                setPredictions(data.predictions);
            } else {
                console.error('Places API error:', data.error);
                setPredictions([]);
            }

            setLoading(false);
        };

        const timeoutId = setTimeout(fetchPredictions, 300);
        return () => clearTimeout(timeoutId);
    }, [input]);

    return { predictions, loading };
}
