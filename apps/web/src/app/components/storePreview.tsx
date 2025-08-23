'use client';

import MapWithMarker from '@/components/MapWithMarker';
import { StoreLocation } from '@prezy/types';

type StorePreviewProps = {
    storeName: string;
    storeCategory: string;
    location: StoreLocation | null;
};

export default function StorePreview({ storeName, storeCategory, location }: StorePreviewProps) {
    if (!storeName && !storeCategory && !location) return null;

    return (
        <>
            <span className="flex flex-row justify-center items-center mt-6 no-wrap  h-[32px] bg-[white] text-blue-600 px-4 text-xs font-semibold rounded-t-md hover:bg-blue-200 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h11M3 6h11m-7 8h7"
                    />
                </svg>
                Store Preview
            </span>
            <div className="flex flex-col w-full bg-white p-6 mb-6 rounded-xl shadow border">
                {/* <div className="flex flex-col w-full items-center mb-4"></div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold text-center text-gray-800">
                            {storeName || 'Store name'}
                        </h2>
                        <strong>Category:</strong>
                        <p className="text-gray-600">{storeCategory || 'No category yet.'}</p>
                    </div>
                    <div className="flex flex-col">
                        <strong>Location:</strong>
                        {location ? (
                            <>
                                <p className="text-gray-600">
                                    {location?.address || 'No address yet.'}
                                </p>
                                <p className="text-gray-600">{location?.city || 'No city yet.'}</p>
                            </>
                        ) : (
                            <div>No location yet.</div>
                        )}
                        {location && (
                            <div className="w-full mt-4 rounded-xl overflow-hidden">
                                <MapWithMarker
                                    lat={location.coordinates.latitude}
                                    lng={location.coordinates.longitude}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
