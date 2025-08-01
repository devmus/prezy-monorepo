'use client';

import { IStore } from '@/types';
import Link from 'next/link';
// import Image from 'next/image';

export interface StoreCardProps {
    store: IStore;
}

export default function StoreCard({ store }: StoreCardProps) {
    const services = store?.services;

    return (
        // <div className="p-6 bg-card border   rounded-lg">
        //     <h3 className="font-semibold mb-2">{store.name}</h3>
        // </div>

        <Link href={`/store/${store._id}`}>
            <div className="group transition-transform duration-200 hover:-translate-y-1">
                <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
                    {/* {service.imageUrl && (
                        <div className="w-full h-40 relative rounded-md overflow-hidden mb-4">
                            <Image
                                src={service.imageUrl}
                                alt={service.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    )} */}

                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{store.name}</h3>
                    <div className="flex flex-col my-3">
                        <p className="text-sm text-gray-500 mb-1 line-clamp-2">{store.category}</p>
                        {services && (
                            <p className="text-xs text-gray-400">
                                Services offered: {services.length}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col my-3">
                        <p className="text-sm text-gray-500 mb-1 line-clamp-2">
                            {store.location.address}
                        </p>
                        <p className="text-sm text-gray-500 mb-1 line-clamp-2">
                            {store.location.city}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
