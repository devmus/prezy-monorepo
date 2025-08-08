'use client';

import { IService } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

export interface ServiceCardProps {
    service: IService;
    serviceList: boolean; // Servicelist is set to true to show store name or false to show description
}

export default function ServiceCard({ service, serviceList }: ServiceCardProps) {
    return (
        <Link href={`/service/${service._id}`}>
            <div className="group transition-transform duration-200 hover:-translate-y-1">
                <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
                    {service.imageUrl && (
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
                    )}

                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{service.name}</h3>
                    {serviceList && <p className="text-xs text-gray-400">{service.store.name}</p>}
                    {!serviceList && (
                        <p className="text-sm text-gray-500 mb-1 line-clamp-2">
                            {service.description}
                        </p>
                    )}
                    <p className="text-xs text-gray-400">Price: {service.price}</p>
                </div>
            </div>
        </Link>
    );
}
