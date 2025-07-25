import { Button } from '@/components/ui/button';
import { StoreLocation } from '@/types';


export default function UseMyLocation({
    setLocation,
}: {
    setLocation: (location: StoreLocation | null) => void;
}) {
    return (
        <Button
            type="button"
            variant="location"
            onClick={async () => {
                if (!navigator.geolocation) {
                    alert('Geolocation not supported');
                    return;
                }

                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const res = await fetch(
                            `/api/places/reverse?lat=${latitude}&lng=${longitude}`,
                        );
                        const data = await res.json();

                        if (data.success) {
                            console.log(data.location);
                            
                            setLocation(data.location);
                        } else {
                            alert('Failed to get address from location');
                        }
                    },
                    (error) => {
                        alert('Could not get your location');
                        console.error(error);
                    },
                );
            }}
        >
            📍 Use my current location
        </Button>
    );
}
