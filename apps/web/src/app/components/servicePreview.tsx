'use client';

import Image from 'next/image';

type ServicePreviewProps = {
    name: string;
    storeName: string;
    imageUrl: string;
    description: string;
    price: string | number;
    category: string;
};

export default function ServicePreview({
    name,
    storeName,
    imageUrl,
    description,
    price,
    category,
}: ServicePreviewProps) {
    if (!name && !description && !price && !category) return null;

    return (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow border mt-8">
            <div className="flex flex-col items-center mb-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    {name || 'Service name'}
                </h2>
                <span className="mt-2 text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {storeName || 'Store name'}
                </span>
            </div>

            {imageUrl && (
                <div className="flex justify-center mb-4">
                    <div className="w-48 h-48 relative rounded-xl overflow-hidden border border-gray-200 shadow">
                        <Image
                            src={imageUrl}
                            alt={name || 'Preview image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            )}

            <div className="space-y-3 text-sm text-gray-700">
                <div>
                    <strong>Description:</strong>
                    <p className="text-gray-600">{description || 'No description yet.'}</p>
                </div>
                <div>
                    <strong>Price:</strong>
                    <p className="text-gray-600">{price ? `$${price}` : 'No price yet.'}</p>
                </div>
                <div>
                    <strong>Category:</strong>
                    <p className="text-gray-600">{category || 'No category yet.'}</p>
                </div>
            </div>
        </div>
    );
}
