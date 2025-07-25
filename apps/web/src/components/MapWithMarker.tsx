'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface Props {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: '100%',
  height: '300px',
};

const centerOffset = 0.002; // optional, to center map slightly above the pin

export default function MapWithMarker({ lat, lng }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: lat - centerOffset, lng }}
      zoom={15}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
}
